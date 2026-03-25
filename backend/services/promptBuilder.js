const STYLE_PROMPTS = {
  cartoon: "Modern premium 3D cartoon style, reminiscent of high-end animation studios like Pixar, smooth textures, vibrant colors, clean lighting, friendly professional aesthetic.",
  "flat-illustration": "Modern flat vector illustration style, clean geometric shapes, minimalist details, harmonious color palette, high-end tech company brand aesthetic, 2D but with depth.",
  anime: "High-quality modern anime style, clean line art, soft cel-shading, cinematic lighting, expressive features, reminiscent of high-budget feature films.",
  "pixel-art": "Premium 32-bit pixel art style, high detail, vibrant colors, clean lighting, nostalgic but modern execution, professional game asset aesthetic.",
  sketch: "High-end graphite and ink sketch style, clean lines, professional cross-hatching, artistic charcoal textures, elegant and minimal outline.",
};

/**
 * Builds a prompt for DALL-E 3 based on the selected style and user image description.
 * Since we are doing image-to-image (proxy via descriptive text or just using the style instructions),
 * we'll focus on the stylistic elements.
 */
const buildPrompt = (styleId, additionalPrompt = "") => {
  const styleInstruction = STYLE_PROMPTS[styleId] || STYLE_PROMPTS.cartoon;
  return `${styleInstruction} ${additionalPrompt} The subject should be clearly recognizable. High resolution, professional design, clipart style, isolated on a clean background.`;
};

module.exports = {
  buildPrompt,
  STYLE_PROMPTS,
};
