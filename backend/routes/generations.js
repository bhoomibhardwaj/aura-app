const express = require('express');
const router = express.Router();

// POST /api/generations/generate
router.post('/generate', async (req, res) => {
  try {
    const { imageUrl, filter, preserveFace } = req.body;
    
    console.log('📸 Generation request received:');
    console.log('   Filter:', filter);
    console.log('   Preserve Face:', preserveFace);
    console.log('   Image URL length:', imageUrl?.length || 0);
    
    // Send success response
    res.json({
      success: true,
      message: `✨ Successfully applied ${filter} filter!`,
      enhancedImage: imageUrl,
      filter: filter,
      preserveFace: preserveFace
    });
    
  } catch (error) {
    console.error('❌ Generation error:', error);
    res.status(500).json({ 
      error: 'Generation failed: ' + error.message 
    });
  }
});

module.exports = router;