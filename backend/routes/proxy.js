const express = require("express");
const router = express.Router();
const axios = require("axios");

/**
 * Proxies images using AI Horde (free, no API key required).
 * Uses async generation: submit job → poll for result → return image.
 */
router.get("/image", async (req, res) => {
  const { prompt, seed, width = 512, height = 512 } = req.query;

  if (!prompt) {
    return res.status(400).send("Prompt is required");
  }

  try {
    // Step 1: Submit generation request
    console.log(`[Proxy] Submitting job for: ${prompt.substring(0, 60)}...`);
    const submitResponse = await axios.post(
      "https://aihorde.net/api/v2/generate/async",
      {
        prompt: prompt,
        params: {
          width: Math.min(parseInt(width), 768),
          height: Math.min(parseInt(height), 768),
          steps: 25,
          cfg_scale: 7,
          seed: seed ? String(seed) : undefined,
          sampler_name: "k_euler_a",
        },
        nsfw: false,
        censor_nsfw: true,
        models: ["Deliberate"],
        r2: true,
      },
      {
        headers: {
          "apikey": "0000000000", // Anonymous key — free tier
          "Content-Type": "application/json",
        },
        timeout: 15000,
      }
    );

    const jobId = submitResponse.data.id;
    console.log(`[Proxy] Job submitted: ${jobId}`);

    // Step 2: Poll for completion (max 90 seconds)
    const maxWait = 90000;
    const pollInterval = 3000;
    const startTime = Date.now();

    while (Date.now() - startTime < maxWait) {
      await new Promise((r) => setTimeout(r, pollInterval));

      const statusResponse = await axios.get(
        `https://aihorde.net/api/v2/generate/check/${jobId}`,
        { timeout: 10000 }
      );

      const { done, queue_position, wait_time } = statusResponse.data;
      console.log(`[Proxy] Job ${jobId}: done=${done}, queue=${queue_position}, eta=${wait_time}s`);

      if (done) {
        // Step 3: Retrieve the result
        const resultResponse = await axios.get(
          `https://aihorde.net/api/v2/generate/status/${jobId}`,
          { timeout: 15000 }
        );

        const generations = resultResponse.data.generations;
        if (!generations || generations.length === 0) {
          return res.status(500).json({ error: "No image generated" });
        }

        const imageUrl = generations[0].img;

        // Step 4: Stream the image back to client
        const imageResponse = await axios.get(imageUrl, {
          responseType: "stream",
          timeout: 30000,
        });

        res.setHeader("Content-Type", imageResponse.headers["content-type"] || "image/webp");
        res.setHeader("Cache-Control", "public, max-age=86400");
        imageResponse.data.pipe(res);
        return;
      }
    }

    // Timeout
    res.status(504).json({ error: "Generation timed out. Please try again." });
  } catch (error) {
    console.error(`[Proxy] Error: ${error.message}`, error.response?.data);
    res.status(500).json({
      error: "Failed to generate image",
      details: error.response?.data?.message || error.message,
    });
  }
});

module.exports = router;
