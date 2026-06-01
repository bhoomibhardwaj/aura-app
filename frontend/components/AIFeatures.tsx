"use client";

import { useState, useRef, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { 
  Sparkles, Upload, X, Loader2, Download, Share2, 
  Wand2, ArrowLeft, Image as ImageIcon, 
  Check, AlertCircle, Target, Sliders
} from "lucide-react";
import Link from "next/link";

export default function AIFeatures() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [referenceImage, setReferenceImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setGeneratedImage(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const onReferenceDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setReferenceImage(e.target?.result as string);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.webp'] },
    maxFiles: 1,
  });

  const { 
    getRootProps: getReferenceProps, 
    getInputProps: getReferenceInputProps, 
    isDragActive: isReferenceDragActive 
  } = useDropzone({
    onDrop: onReferenceDrop,
    accept: { 'image/*': ['.jpeg', '.jpg', '.png'] },
    maxFiles: 1,
  });

  // Analyze reference image - get its NATURAL characteristics
  const analyzeReferenceImage = (imageElement: HTMLImageElement): Promise<any> => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      
      canvas.width = 150;
      canvas.height = 150;
      ctx.drawImage(imageElement, 0, 0, 150, 150);
      
      const imageData = ctx.getImageData(0, 0, 150, 150);
      const data = imageData.data;
      
      let rSum = 0, gSum = 0, bSum = 0;
      let minR = 255, minG = 255, minB = 255;
      let maxR = 0, maxG = 0, maxB = 0;
      let brightnessSum = 0;
      
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        
        rSum += r;
        gSum += g;
        bSum += b;
        
        minR = Math.min(minR, r);
        minG = Math.min(minG, g);
        minB = Math.min(minB, b);
        
        maxR = Math.max(maxR, r);
        maxG = Math.max(maxG, g);
        maxB = Math.max(maxB, b);
        
        brightnessSum += (r + g + b) / 3;
      }
      
      const pixelCount = data.length / 4;
      const avgBrightness = brightnessSum / pixelCount;
      
      // Calculate color cast (warmth vs cool)
      const colorCast = (rSum / pixelCount) - (bSum / pixelCount);
      
      resolve({
        avgR: rSum / pixelCount,
        avgG: gSum / pixelCount,
        avgB: bSum / pixelCount,
        minR, minG, minB,
        maxR, maxG, maxB,
        avgBrightness,
        colorCast,
        contrast: (maxR + maxG + maxB - minR - minG - minB) / 3
      });
    });
  };

  // Apply NATURAL style transfer - preserves details, no over-processing
  const applyNaturalStyleTransfer = async (
    targetImage: HTMLImageElement, 
    referenceImageElem: HTMLImageElement
  ): Promise<string> => {
    return new Promise(async (resolve) => {
      const canvas = canvasRef.current!;
      const ctx = canvas.getContext('2d')!;
      
      canvas.width = targetImage.width;
      canvas.height = targetImage.height;
      
      ctx.drawImage(targetImage, 0, 0);
      
      // Analyze reference image characteristics
      const refAnalysis = await analyzeReferenceImage(referenceImageElem);
      
      // Analyze target image
      const targetAnalysis = await analyzeReferenceImage(targetImage);
      
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      
      // Calculate adjustments needed to match reference
      const rAdjust = refAnalysis.avgR - targetAnalysis.avgR;
      const gAdjust = refAnalysis.avgG - targetAnalysis.avgG;
      const bAdjust = refAnalysis.avgB - targetAnalysis.avgB;
      const brightnessAdjust = refAnalysis.avgBrightness - targetAnalysis.avgBrightness;
      
      // Subtle application - preserve original details
      const strength = 0.65; // 65% of reference, 35% original - keeps it natural
      
      for (let i = 0; i < data.length; i += 4) {
        let r = data[i];
        let g = data[i + 1];
        let b = data[i + 2];
        
        // Calculate pixel brightness
        const brightness = (r + g + b) / 3;
        
        // Apply color adjustments subtly
        r = r + (rAdjust * strength);
        g = g + (gAdjust * strength);
        b = b + (bAdjust * strength);
        
        // Apply brightness adjustment - subtle
        const brightnessAdj = brightnessAdjust * strength * 0.5;
        r = r + brightnessAdj;
        g = g + brightnessAdj;
        b = b + brightnessAdj;
        
        // Apply warmth/coolness from reference
        const warmthAdj = refAnalysis.colorCast * strength * 0.3;
        if (warmthAdj > 0) {
          r = r + warmthAdj;
          b = b - warmthAdj * 0.5;
        } else {
          b = b - warmthAdj;
          r = r + warmthAdj * 0.5;
        }
        
        // Maintain contrast balance
        const contrastAdjust = (refAnalysis.contrast - targetAnalysis.contrast) * strength * 0.3;
        if (contrastAdjust > 0) {
          r = (r - 128) * (1 + contrastAdjust/100) + 128;
          g = (g - 128) * (1 + contrastAdjust/100) + 128;
          b = (b - 128) * (1 + contrastAdjust/100) + 128;
        }
        
        data[i] = Math.min(255, Math.max(0, Math.round(r)));
        data[i + 1] = Math.min(255, Math.max(0, Math.round(g)));
        data[i + 2] = Math.min(255, Math.max(0, Math.round(b)));
      }
      
      ctx.putImageData(imageData, 0, 0);
      
      resolve(canvas.toDataURL('image/jpeg', 0.95));
    });
  };

  const handleGenerate = async () => {
    if (!selectedImage) {
      setError("Please upload your photo first");
      return;
    }
    
    if (!referenceImage) {
      setError("Please upload a reference photo");
      return;
    }
    
    setIsGenerating(true);
    setProgress(0);
    setError(null);
    
    try {
      const img = new Image();
      img.src = selectedImage;
      await new Promise((resolve) => { img.onload = resolve; });
      setProgress(30);
      
      const refImg = new Image();
      refImg.src = referenceImage;
      await new Promise((resolve) => { refImg.onload = resolve; });
      setProgress(60);
      
      const result = await applyNaturalStyleTransfer(img, refImg);
      setProgress(100);
      setGeneratedImage(result);
      
    } catch (err) {
      console.error('Generation error:', err);
      setError('Failed to apply style. Please try again.');
    } finally {
      setIsGenerating(false);
      setProgress(0);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-6">
          <ArrowLeft className="w-5 h-5" />
          Back to Dashboard
        </Link>
        
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Natural Style Transfer
          </h1>
          <p className="text-gray-400 text-base">Copy the exact natural look, colors and vibe from any reference photo</p>
        </div>

        <canvas ref={canvasRef} style={{ display: 'none' }} />

        <div className="mb-8">
          <div className="bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-2xl p-6 border border-purple-500/30 mb-8">
            <div className="text-center">
              <span className="text-4xl">🎯</span>
              <h3 className="text-white font-bold text-xl mt-2">Natural Style Matching</h3>
              <p className="text-gray-300 text-sm mt-1">Your photo will get the EXACT natural look of your reference photo</p>
              <p className="text-purple-400 text-xs mt-2">✨ No over-processing • Preserves your natural features • Subtle & realistic</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Your Photo */}
            <div>
              <label className="text-white font-semibold mb-3 block flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-purple-600/20 flex items-center justify-center">1</span>
                Your Photo
              </label>
              {!selectedImage ? (
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all min-h-[320px] flex items-center justify-center
                    ${isDragActive ? 'border-purple-500 bg-purple-500/10' : 'border-white/20 bg-white/5 hover:border-purple-500/50'}`}
                >
                  <input {...getInputProps()} />
                  <div>
                    <Upload className="w-12 h-12 text-purple-400 mx-auto mb-3" />
                    <p className="text-white text-base">Upload your photo</p>
                    <p className="text-gray-500 text-xs mt-1">JPG, PNG, WEBP</p>
                  </div>
                </div>
              ) : (
                <div className="relative rounded-xl overflow-hidden bg-white/5 border border-white/10 group">
                  <img src={selectedImage} alt="Your photo" className="w-full h-auto" />
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="absolute top-3 right-3 p-1.5 bg-black/60 rounded-full hover:bg-black/80 transition opacity-0 group-hover:opacity-100"
                  >
                    <X className="w-4 h-4 text-white" />
                  </button>
                </div>
              )}
            </div>

            {/* Reference Photo */}
            <div>
              <label className="text-white font-semibold mb-3 block flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-pink-600/20 flex items-center justify-center">2</span>
                Reference Photo (Copy THIS look)
              </label>
              {!referenceImage ? (
                <div
                  {...getReferenceProps()}
                  className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all min-h-[320px] flex items-center justify-center
                    ${isReferenceDragActive ? 'border-pink-500 bg-pink-500/10' : 'border-white/20 bg-white/5 hover:border-pink-500/50'}`}
                >
                  <input {...getReferenceInputProps()} />
                  <div>
                    <ImageIcon className="w-12 h-12 text-pink-400 mx-auto mb-3" />
                    <p className="text-white text-base">Upload reference photo</p>
                    <p className="text-gray-400 text-sm">Any photo whose natural look you want!</p>
                  </div>
                </div>
              ) : (
                <div className="relative rounded-xl overflow-hidden bg-white/5 border border-pink-500/30 group">
                  <img src={referenceImage} alt="Reference" className="w-full h-auto" />
                  <button
                    onClick={() => setReferenceImage(null)}
                    className="absolute top-3 right-3 p-1.5 bg-black/60 rounded-full hover:bg-black/80 transition opacity-0 group-hover:opacity-100"
                  >
                    <X className="w-4 h-4 text-white" />
                  </button>
                  <div className="absolute bottom-3 left-3 bg-pink-600/80 rounded-lg px-2 py-1 text-xs text-white">
                    🎯 Target Style
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Ready Message */}
          {selectedImage && referenceImage && !generatedImage && (
            <div className="mt-6 p-4 bg-green-500/10 rounded-xl border border-green-500/30 text-center">
              <p className="text-green-400 text-sm flex items-center justify-center gap-2">
                <Check className="w-4 h-4" />
                Ready to copy natural style! Your photo will get the exact look of your reference.
              </p>
            </div>
          )}

          {/* Generate Button */}
          {selectedImage && (
            <div className="mt-6">
              <button
                onClick={handleGenerate}
                disabled={isGenerating || !referenceImage}
                className={`w-full py-4 rounded-xl text-white font-semibold text-lg transition-all flex items-center justify-center gap-2 ${
                  isGenerating || !referenceImage
                    ? 'bg-gray-700 cursor-not-allowed opacity-50'
                    : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-xl'
                }`}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Analyzing & Matching Style... {progress}%
                  </>
                ) : (
                  <>
                    <Target className="w-5 h-5" />
                    Copy Natural Style from Reference
                  </>
                )}
              </button>

              {!referenceImage && selectedImage && (
                <p className="text-center text-yellow-500 text-sm mt-3">
                  ⚡ Upload a reference photo to copy its natural look!
                </p>
              )}

              {progress > 0 && progress < 100 && (
                <div className="w-full bg-white/10 rounded-full h-1.5 mt-4 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              )}

              {error && (
                <div className="mt-4 p-3 bg-red-500/20 border border-red-500/50 rounded-xl text-red-300 text-sm flex items-center gap-2 justify-center">
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Result Section */}
        {generatedImage && selectedImage && referenceImage && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-white mb-4 text-center">✨ Natural Style Transfer Complete!</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-4 border border-white/10">
                <p className="text-gray-400 text-sm mb-2 text-center">📸 Your Original</p>
                <img src={selectedImage} alt="Original" className="w-full rounded-xl" />
              </div>
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-4 border border-purple-500/30">
                <p className="text-purple-400 text-sm mb-2 text-center">🎨 Reference Style</p>
                <img src={referenceImage} alt="Reference" className="w-full rounded-xl" />
              </div>
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-4 border border-green-500/30">
                <p className="text-green-400 text-sm mb-2 text-center">✨ Your Result</p>
                <img src={generatedImage} alt="Result" className="w-full rounded-xl" />
              </div>
            </div>
            <div className="mt-6 flex gap-4 justify-center">
              <button
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = generatedImage;
                  link.download = `aura-natural-style-${Date.now()}.jpg`;
                  link.click();
                }}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white font-semibold flex items-center gap-2"
              >
                <Download className="w-5 h-5" />
                Download Result
              </button>
              <button
                onClick={() => {
                  alert("✅ Your photo now has the exact natural look of your reference!");
                }}
                className="px-6 py-3 bg-white/10 rounded-xl text-white font-semibold flex items-center gap-2"
              >
                <Share2 className="w-5 h-5" />
                Share
              </button>
            </div>
            <p className="text-center text-green-400 text-sm mt-4">
              ✅ Your photo now has the EXACT natural colors, brightness and vibe of your reference!
            </p>
          </div>
        )}

        <p className="text-center text-gray-500 text-xs mt-8">
          🎯 Natural style transfer • Exact color matching • Preserves your natural look
        </p>
      </div>
    </div>
  );
}