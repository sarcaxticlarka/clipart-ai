const { buildPrompt } = require("./promptBuilder");
const axios = require("axios");

/**
 * Generates clipart using AI Horde img2img (when source image provided)
 * or text-to-image (when no source image).
 * Images are generated server-side and returned as URLs.
 */
const generateImage = async (styleId, description, sourceImage) => {
  const prompt = buildPrompt(styleId, description);
  const seed = String(Math.floor(Math.random() * 1000000));

  try {
    // Build AI Horde request
    const requestBody = {
      prompt: prompt,
      params: {
        width: 512,
        height: 512,
        steps: 30,
        cfg_scale: 7,
        seed: seed,
        sampler_name: "k_euler_a",
        denoising_strength: sourceImage ? 0.55 : 1.0, // Lower = more faithful to source
      },
      nsfw: false,
      censor_nsfw: true,
      models: ["Deliberate"],
      r2: true,
    };

    // If source image is provided, use img2img
    if (sourceImage) {
      requestBody.source_image = sourceImage;
      requestBody.source_processing = "img2img";
      console.log(`[Gen] img2img for ${styleId} (denoising: 0.55)`);
    } else {
      console.log(`[Gen] text2img for ${styleId}`);
    }

    // Submit to AI Horde
    const submitResponse = await axios.post(
      "https://aihorde.net/api/v2/generate/async",
      requestBody,
      {
        headers: {
          apikey: "0000000000",
          "Content-Type": "application/json",
        },
        timeout: 30000,
        maxBodyLength: 50 * 1024 * 1024, // 50MB max for base64
        maxContentLength: 50 * 1024 * 1024,
      }
    );

    const jobId = submitResponse.data.id;
    console.log(`[Gen] Job ${jobId} submitted for ${styleId}`);

    // Poll for completion (max 120 seconds)
    const maxWait = 120000;
    const pollInterval = 3000;
    const startTime = Date.now();

    while (Date.now() - startTime < maxWait) {
      await new Promise((r) => setTimeout(r, pollInterval));

      const statusResponse = await axios.get(
        `https://aihorde.net/api/v2/generate/check/${jobId}`,
        { timeout: 10000 }
      );

      const { done, queue_position, wait_time } = statusResponse.data;
      console.log(`[Gen] ${styleId} job ${jobId}: done=${done}, queue=${queue_position}, eta=${wait_time}s`);

      if (done) {
        const resultResponse = await axios.get(
          `https://aihorde.net/api/v2/generate/status/${jobId}`,
          { timeout: 15000 }
        );

        const generations = resultResponse.data.generations;
        if (!generations || generations.length === 0) {
          throw new Error("No image generated");
        }

        const imageUrl = generations[0].img;
        console.log(`[Gen] ${styleId} complete! URL: ${imageUrl.substring(0, 60)}...`);

        return {
          styleId,
          url: imageUrl, // Direct URL to the generated image
        };
      }
    }

    throw new Error("Generation timed out");
  } catch (error) {
    console.error(`[Gen] Error for ${styleId}:`, error.response?.data || error.message);
    throw error;
  }
};

/**
 * Generates multiple clipart images in parallel.
 */
const generateParallel = async (styleIds, description, sourceImage) => {
  const promises = styleIds.map((styleId) =>
    generateImage(styleId, description, sourceImage)
  );
  return Promise.all(promises);
};

module.exports = {
  generateImage,
  generateParallel,
};
