const Replicate = require('replicate');

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

// Style Transfer
async function styleTransfer(imageUrl, celebrityStyle) {
  const prompts = {
    deepika: "Bollywood actress Deepika Padukone style, glamorous, elegant, soft lighting",
    priyanka: "International diva style, powerful, confident, red carpet look",
    alia: "Girl next door, natural, fresh, dewy skin",
    kiara: "Glamorous, party look, sparkling",
    kareena: "Royal, regal, sophisticated, high fashion",
    srk: "Romantic hero, charming, warm lighting",
  };
  
  const output = await replicate.run("stability-ai/sdxl", {
    input: {
      image: imageUrl,
      prompt: prompts[celebrityStyle],
      strength: 0.7,
    },
  });
  
  return output[0];
}

// Background Changer
async function changeBackground(imageUrl, backgroundType) {
  // Remove background and add new one
  const backgrounds = {
    coffee: "cozy coffee shop interior, warm lighting, wooden tables",
    beach: "tropical beach, golden sand, turquoise water, sunset",
    luxury: "luxury 5-star hotel lobby, marble floors, chandeliers",
    nature: "lush green forest, natural sunlight, peaceful",
    city: "neon-lit city street at night, cyberpunk aesthetic",
    studio: "professional photo studio, softbox lighting, clean background",
  };
  
  // First remove background, then add new one
  const output = await replicate.run("cjwbw/rembg", {
    input: { image: imageUrl }
  });
  
  const finalOutput = await replicate.run("stability-ai/sdxl", {
    input: {
      image: output,
      prompt: backgrounds[backgroundType],
      strength: 0.8,
    },
  });
  
  return finalOutput[0];
}

module.exports = { styleTransfer, changeBackground };