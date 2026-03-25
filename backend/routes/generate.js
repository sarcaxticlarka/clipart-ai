const express = require("express");
const router = express.Router();
const { generateParallel } = require("../services/openaiService");

// Increase body size limit for base64 images
router.use(express.json({ limit: "20mb" }));

router.post("/generate", async (req, res) => {
  const { styles, description, sourceImage } = req.body;

  if (!styles || !Array.isArray(styles) || styles.length === 0) {
    return res.status(400).json({ error: "Missing or invalid 'styles' array." });
  }

  try {
    console.log(`[Generate] Styles: ${styles.join(", ")}, hasImage: ${!!sourceImage}`);
    const results = await generateParallel(styles, description || "", sourceImage);
    res.json({ results });
  } catch (error) {
    res.status(500).json({ error: "Failed to generate images.", details: error.message });
  }
});

module.exports = router;
