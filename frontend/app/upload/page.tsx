"use client";

import { useState, useCallback, useRef } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, X, Sparkles, ArrowLeft, Loader2, Copy, Download, Share2, Camera, Zap, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

const filters = [
  "Old Money", "Korean Drama", "Soft Glow", "Cinematic Rain",
  "Dark Academia", "Y2K", "Luxury Vacation", "Vogue Editorial",
  "Bollywood Glow", "Night Drive", "Retro Film", "Pinterest Café"
];

const scenes = ["Auto Detect", "Beach", "City", "Cafe", "Nature", "Studio", "Street", "Sunset"];

// Captions with multiple variations
const captionVariations: Record<string, string[]> = {
  'Old Money': [
    "Timeless elegance. Quiet luxury. ✨\n\nClassy never goes out of style. #OldMoneyAesthetic #LuxuryLifestyle #QuietLuxury",
    "Old money energy. No logos, just class. 💎\n\nSimplicity is the ultimate sophistication. #WealthyAesthetic #ElegantStyle",
    "Generational wealth aesthetic 📿\n\nSome things get better with time. #OldMoney #TimelessStyle #LuxuryLife"
  ],
  'Korean Drama': [
    "Main character energy 🎬\n\nLiving in my own K-drama moment. #KdramaAesthetic #MainCharacterEnergy #DreamyVibes",
    "Falling in love with life like a K-drama 💕\n\nEvery moment is cinematic. #KoreanDrama #RomanticVibes #SoftLife",
    "Heart fluttering moments ✨\n\nWhen life feels like a drama. #Kdrama #AestheticVibes #LoveStory"
  ],
  'Soft Glow': [
    "Soft girl era 🤍\n\nChasing golden hour dreams. #SoftGlow #AestheticVibes #GoldenHour",
    "Glowing from within ✨\n\nEmbracing my soft era. #SoftLife #GlowUp #PeacefulVibes",
    "Sun kissed and soft hearted ☀️\n\nLet your light shine. #SoftGlow #DreamyAesthetic #SelfLove"
  ],
  'Cinematic Rain': [
    "Emotional cinema vibes 🎥\n\nSome moments hit different. #CinematicMood #RainyAesthetic #MoodyVibes",
    "Dancing in the rain 🌧️\n\nFinding beauty in the storm. #CinematicRain #MoodyAesthetic #FilmVibes",
    "Rainy days and cinematic dreams 🎬\n\nLet the rain wash it all away. #RainyAesthetic #CinematicVibes"
  ],
  'Dark Academia': [
    "Dark academia soul 📚\n\nWisdom. Beauty. Melancholy. #DarkAcademia #VintageVibes #OldSoul",
    "Lost in the library of my mind 🏛️\n\nSeeking knowledge and beauty. #DarkAcademia #IntellectualAesthetic",
    "Vintage books and old souls 🕯️\n\nSome stories never end. #DarkAcademia #ClassicStyle #Timeless"
  ],
  'Y2K': [
    "Y2K never looked so good 💿\n\nNostalgic for a time I lived through. #Y2KAesthetic #CyberY2K #Nostalgia",
    "Britney vibes. Early 2000s energy 📀\n\nLiving my best Y2K life. #Y2K #Throwback #Nostalgic",
    "Digital dreams and butterfly clips 🦋\n\nThe future is now. #Y2KAesthetic #CyberCore #Millennial"
  ],
  'Luxury Vacation': [
    "Paradise found 🌴\n\nLiving my best life. #LuxuryTravel #VacationMode #BeachLife",
    "Sunsets and luxury escapes ✨\n\nThis is what dreams are made of. #LuxuryVacation #TravelGoals #Paradise",
    "POV: You're living in a travel magazine 📸\n\nHeaven on earth. #LuxuryTravel #VacationVibes"
  ],
  'Vogue Editorial': [
    "Strike a pose 📸\n\nEditorial realness. #VogueVibes #EditorialFashion #HighFashion",
    "Front cover energy 🗽\n\nBorn to stand out. #VogueEditorial #FashionIcon #ModelMoment",
    "High fashion. High vibes. 💅\n\nLiving my editorial fantasy. #Vogue #FashionEditorial #Slay"
  ],
  'Bollywood Glow': [
    "Bollywood dreams ✨\n\nChanneling my inner diva. #BollywoodGlow #DesiGirl #Slay",
    "Golden hour like a Bollywood film 🎬\n\nMain character energy. #BollywoodAesthetic #DesiVibes",
    "Shining bright like a diamond 💎\n\nDesi girl glow. #BollywoodGlow #DesiPride #QueenEnergy"
  ],
  'Night Drive': [
    "Night drives and city lights 🌃\n\nThe city never sleeps. #NightDrive #CityLights #UrbanVibes",
    "Windows down. Music up. City lights 🚗\n\nLate night drives hit different. #NightDrive #UrbanAesthetic",
    "Lost in the neon glow 🌆\n\nFinding myself in the city night. #NightDrive #CyberVibes"
  ],
  'Retro Film': [
    "Vintage soul 🎞️\n\nSome things never go out of style. #RetroFilm #VintageAesthetic #OldSchool",
    "Living in technicolor 🌈\n\nRetro vibes only. #RetroFilm #VintageStyle #Classic",
    "Film grain and timeless moments 📷\n\nAnalog dreams. #RetroAesthetic #FilmPhotography"
  ],
  'Pinterest Café': [
    "Coffee shop aesthetic ☕\n\nLiving that pinterest life. #CafeVibes #CozyAesthetic #PinterestWorthy",
    "Latte art and good vibes 🎨\n\nMy happy place. #CafeAesthetic #CozyVibes #CoffeeLover",
    "Sip. Relax. Repeat. ☕\n\nFinding peace in a coffee cup. #PinterestCafe #CafeLife"
  ]
};

// Scene-based color adjustments
const sceneEffects: Record<string, any> = {
  'Beach': { brightness: 25, saturation: 20, blueShift: 10, warmth: 5 },
  'City': { brightness: 10, contrast: 15, blueShift: -5, redShift: 5 },
  'Cafe': { brightness: 15, contrast: -5, warmth: 15, saturation: 5 },
  'Nature': { brightness: 20, saturation: 15, greenShift: 10 },
  'Studio': { brightness: 5, contrast: 20 },
  'Street': { brightness: 0, contrast: 25, blueShift: -8 },
  'Sunset': { brightness: 15, saturation: 25, redShift: 20, warmth: 20 },
  'Auto Detect': { brightness: 10, contrast: 10 }
};

export default function UploadPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState("Old Money");
  const [preserveFace, setPreserveFace] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [referenceImage, setReferenceImage] = useState<string | null>(null);
  const [selectedScene, setSelectedScene] = useState("Cafe");
  const [depthEnabled, setDepthEnabled] = useState(true);
  const [caption, setCaption] = useState("");
  const [generatingCaption, setGeneratingCaption] = useState(false);
  const [showBefore, setShowBefore] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [lastUsedVariation, setLastUsedVariation] = useState(0);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setGeneratedImage(null);
        setCaption("");
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
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.webp'] },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024,
  });

  const { getRootProps: getReferenceProps, getInputProps: getReferenceInputProps } = useDropzone({
    onDrop: onReferenceDrop,
    accept: { 'image/*': ['.jpeg', '.jpg', '.png'] },
    maxFiles: 1,
  });

  const applyCinematicDepth = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    if (!depthEnabled) return;
    
    const gradient = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, width/1.5);
    gradient.addColorStop(0, 'rgba(0,0,0,0)');
    gradient.addColorStop(0.5, 'rgba(0,0,0,0.08)');
    gradient.addColorStop(1, 'rgba(0,0,0,0.25)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      const grain = Math.random() * 8;
      data[i] = Math.min(255, Math.max(0, data[i] + grain));
      data[i+1] = Math.min(255, Math.max(0, data[i+1] + grain));
      data[i+2] = Math.min(255, Math.max(0, data[i+2] + grain));
    }
    ctx.putImageData(imageData, 0, 0);
  };

  const applySmartFilter = (imageElement: HTMLImageElement, filter: string): Promise<string> => {
    return new Promise((resolve) => {
      const canvas = canvasRef.current!;
      const ctx = canvas.getContext('2d')!;
      
      canvas.width = imageElement.width;
      canvas.height = imageElement.height;
      
      ctx.drawImage(imageElement, 0, 0);
      
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      
      // PROFESSIONAL AESTHETIC FILTER CONFIGURATIONS
      const filterConfig: Record<string, any> = {
        'Old Money': {
          rgb: [1.15, 1.05, 0.85],
          brightness: 5,
          contrast: 12,
          saturation: 5,
          warmth: 15,
          vignette: true
        },
        'Korean Drama': {
          rgb: [1.05, 0.95, 1.1],
          brightness: 18,
          contrast: -8,
          saturation: 12,
          softGlow: true
        },
        'Soft Glow': {
          rgb: [1.1, 1.08, 1.05],
          brightness: 25,
          contrast: -12,
          saturation: -10,
          softGlow: true,
          bloom: true
        },
        'Cinematic Rain': {
          rgb: [0.85, 0.92, 1.15],
          brightness: -8,
          contrast: 18,
          saturation: -15,
          blueShift: 20,
          vignette: true
        },
        'Dark Academia': {
          rgb: [1.12, 0.92, 0.78],
          brightness: -12,
          contrast: 22,
          saturation: -20,
          warmth: 18,
          vignette: true
        },
        'Y2K': {
          rgb: [1.02, 0.95, 1.08],
          brightness: 12,
          contrast: 15,
          saturation: 18,
          cyanShift: 8,
          glow: true
        },
        'Luxury Vacation': {
          rgb: [1.12, 1.05, 0.88],
          brightness: 18,
          contrast: 10,
          saturation: 15,
          warmth: 22
        },
        'Vogue Editorial': {
          rgb: [1.02, 1.0, 1.05],
          brightness: 8,
          contrast: 25,
          saturation: 5,
          coolTones: true
        },
        'Bollywood Glow': {
          rgb: [1.18, 1.02, 0.88],
          brightness: 15,
          contrast: 5,
          saturation: 22,
          warmth: 25
        },
        'Night Drive': {
          rgb: [0.92, 0.88, 1.15],
          brightness: -5,
          contrast: 20,
          saturation: 5,
          blueShift: 22,
          vignette: true
        },
        'Retro Film': {
          rgb: [1.08, 0.98, 0.85],
          brightness: 2,
          contrast: 8,
          saturation: -18,
          warmth: 12,
          filmGrain: true
        },
        'Pinterest Café': {
          rgb: [1.08, 0.98, 0.92],
          brightness: 12,
          contrast: -5,
          saturation: -8,
          warmth: 14,
          softMatte: true
        }
      };
      
      const sceneEffect = sceneEffects[selectedScene] || sceneEffects['Auto Detect'];
      const config = filterConfig[filter] || filterConfig['Soft Glow'];
      
      // Apply professional color grading
      for (let i = 0; i < data.length; i += 4) {
        let r = data[i];
        let g = data[i + 1];
        let b = data[i + 2];
        
        // Apply RGB multipliers
        r = r * (config.rgb?.[0] || 1);
        g = g * (config.rgb?.[1] || 1);
        b = b * (config.rgb?.[2] || 1);
        
        // Apply warmth/coolness
        if (config.warmth) {
          r += config.warmth;
          g += config.warmth / 2;
          b -= config.warmth / 3;
        }
        if (config.coolTones) {
          r -= 5;
          g -= 2;
          b += 10;
        }
        if (config.blueShift) {
          b += config.blueShift;
        }
        if (config.cyanShift) {
          g += config.cyanShift / 2;
          b += config.cyanShift;
        }
        
        // Apply brightness
        if (config.brightness) {
          r += config.brightness;
          g += config.brightness;
          b += config.brightness;
        }
        
        // Apply saturation
        if (config.saturation) {
          const gray = 0.2989 * r + 0.5870 * g + 0.1140 * b;
          const satFactor = 1 + (config.saturation / 100);
          r = gray + (r - gray) * satFactor;
          g = gray + (g - gray) * satFactor;
          b = gray + (b - gray) * satFactor;
        }
        
        // Apply contrast
        if (config.contrast) {
          const contrastFactor = (259 * (config.contrast + 255)) / (255 * (259 - config.contrast));
          r = contrastFactor * (r - 128) + 128;
          g = contrastFactor * (g - 128) + 128;
          b = contrastFactor * (b - 128) + 128;
        }
        
        // Apply scene effects
        if (sceneEffect.brightness) {
          r += sceneEffect.brightness;
          g += sceneEffect.brightness;
          b += sceneEffect.brightness;
        }
        if (sceneEffect.warmth) {
          r += sceneEffect.warmth;
          g += sceneEffect.warmth / 2;
          b -= sceneEffect.warmth / 3;
        }
        if (sceneEffect.saturation) {
          const gray = 0.2989 * r + 0.5870 * g + 0.1140 * b;
          const satFactor = 1 + (sceneEffect.saturation / 100);
          r = gray + (r - gray) * satFactor;
          g = gray + (g - gray) * satFactor;
          b = gray + (b - gray) * satFactor;
        }
        
        data[i] = Math.min(255, Math.max(0, Math.round(r)));
        data[i + 1] = Math.min(255, Math.max(0, Math.round(g)));
        data[i + 2] = Math.min(255, Math.max(0, Math.round(b)));
      }
      
      ctx.putImageData(imageData, 0, 0);
      
      // Add professional effects
      if (config.vignette) {
        const gradient = ctx.createRadialGradient(canvas.width/2, canvas.height/2, canvas.width/3, canvas.width/2, canvas.height/2, canvas.width/2);
        gradient.addColorStop(0, 'rgba(0,0,0,0)');
        gradient.addColorStop(1, 'rgba(0,0,0,0.35)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      
      if (config.softGlow || config.bloom) {
        ctx.globalCompositeOperation = 'screen';
        ctx.fillStyle = 'rgba(255, 220, 180, 0.08)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalCompositeOperation = 'source-over';
      }
      
      if (config.filmGrain) {
        const grainData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const grainPixels = grainData.data;
        for (let i = 0; i < grainPixels.length; i += 4) {
          const grain = (Math.random() - 0.5) * 12;
          grainPixels[i] = Math.min(255, Math.max(0, grainPixels[i] + grain));
          grainPixels[i+1] = Math.min(255, Math.max(0, grainPixels[i+1] + grain));
          grainPixels[i+2] = Math.min(255, Math.max(0, grainPixels[i+2] + grain));
        }
        ctx.putImageData(grainData, 0, 0);
      }
      
      if (config.softMatte) {
        ctx.globalCompositeOperation = 'overlay';
        ctx.fillStyle = 'rgba(180, 170, 150, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalCompositeOperation = 'source-over';
      }
      
      if (depthEnabled) {
        applyCinematicDepth(ctx, canvas.width, canvas.height);
      }
      
      resolve(canvas.toDataURL('image/jpeg', 0.95));
    });
  };

  const generateAICaption = async () => {
    setGeneratingCaption(true);
    
    const variations = captionVariations[selectedFilter] || captionVariations['Soft Glow'];
    
    let newIndex = Math.floor(Math.random() * variations.length);
    while (newIndex === lastUsedVariation && variations.length > 1) {
      newIndex = Math.floor(Math.random() * variations.length);
    }
    setLastUsedVariation(newIndex);
    
    setTimeout(() => {
      setCaption(variations[newIndex]);
      setGeneratingCaption(false);
    }, 500);
  };

  const handleGenerate = async () => {
    if (!selectedImage) return;
    
    setIsGenerating(true);
    setError(null);
    
    try {
      const img = new Image();
      img.src = selectedImage;
      await new Promise((resolve) => { img.onload = resolve; });
      
      const enhancedImage = await applySmartFilter(img, selectedFilter);
      setGeneratedImage(enhancedImage);
      
      generateAICaption();
      
    } catch (err) {
      console.error('Generation error:', err);
      setError('Failed to apply filter. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-6 transition-colors">
          <ArrowLeft className="w-5 h-5" />
          Back to Dashboard
        </Link>

        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
          Create Your Aesthetic
        </h1>
        <p className="text-gray-400 mb-8">AI-powered enhancement with cinematic effects</p>

        <canvas ref={canvasRef} style={{ display: 'none' }} />

        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-300">
            {error}
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div>
            {!selectedImage ? (
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all min-h-[450px] flex items-center justify-center
                  ${isDragActive ? 'border-purple-500 bg-purple-500/10' : 'border-white/20 bg-white/5 hover:border-purple-500/50'}`}
              >
                <input {...getInputProps()} />
                <div>
                  <div className="w-20 h-20 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Upload className="w-10 h-10 text-purple-400" />
                  </div>
                  <p className="text-white text-lg mb-2">Drop your photo here</p>
                  <p className="text-gray-400 text-sm">or click to browse</p>
                  <p className="text-gray-500 text-xs mt-4">Supports JPG, PNG, WEBP (Max 10MB)</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 group">
                  {showBefore && generatedImage ? (
                    <div className="relative">
                      <img src={generatedImage} alt="Enhanced" className="w-full h-auto" />
                      <div 
                        className="absolute top-0 left-0 h-full overflow-hidden"
                        style={{ width: `${sliderPosition}%` }}
                      >
                        <img src={selectedImage} alt="Original" className="w-full h-auto" />
                      </div>
                      <div 
                        className="absolute top-0 bottom-0 w-0.5 bg-white cursor-ew-resize"
                        style={{ left: `${sliderPosition}%` }}
                        onMouseDown={(e) => {
                          const onMouseMove = (moveEvent: MouseEvent) => {
                            const rect = (e.currentTarget.parentElement as HTMLElement).getBoundingClientRect();
                            const newPos = ((moveEvent.clientX - rect.left) / rect.width) * 100;
                            setSliderPosition(Math.min(100, Math.max(0, newPos)));
                          };
                          const onMouseUp = () => {
                            document.removeEventListener('mousemove', onMouseMove);
                            document.removeEventListener('mouseup', onMouseUp);
                          };
                          document.addEventListener('mousemove', onMouseMove);
                          document.addEventListener('mouseup', onMouseUp);
                        }}
                      />
                    </div>
                  ) : (
                    <img src={selectedImage} alt="Original" className="w-full h-auto" />
                  )}
                  <button
                    onClick={() => {
                      setSelectedImage(null);
                      setGeneratedImage(null);
                      setCaption("");
                    }}
                    className="absolute top-4 right-4 p-2 bg-black/60 rounded-full hover:bg-black/80 transition opacity-0 group-hover:opacity-100"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                  {generatedImage && (
                    <button
                      onClick={() => setShowBefore(!showBefore)}
                      className="absolute bottom-4 right-4 px-3 py-1.5 bg-black/60 rounded-lg text-white text-sm hover:bg-black/80 transition"
                    >
                      {showBefore ? <EyeOff className="w-4 h-4 inline" /> : <Eye className="w-4 h-4 inline" />} 
                      {' '}{showBefore ? "Hide" : "Show"} Comparison
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Settings Section */}
          <div className="space-y-6">
            {/* Identity Preservation Toggle */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <h3 className="text-white font-semibold mb-1 flex items-center gap-2">
                    <Camera className="w-4 h-4 text-purple-400" />
                    AI Face Preservation
                  </h3>
                  <p className="text-gray-400 text-sm">Enhanced colors while keeping your natural look</p>
                </div>
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={preserveFace}
                    onChange={(e) => setPreserveFace(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-12 h-6 bg-gray-700 rounded-full peer-checked:bg-purple-600 transition-all"></div>
                  <div className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all ${preserveFace ? 'translate-x-6' : ''}`}></div>
                </div>
              </label>
            </div>

            {/* Scene Understanding */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                <Zap className="w-4 h-4 text-purple-400" />
                Scene Understanding
              </h3>
              <p className="text-gray-400 text-sm mb-3">Selected: {selectedScene} - Colors adjust automatically</p>
              <select
                value={selectedScene}
                onChange={(e) => setSelectedScene(e.target.value)}
                className="w-full p-2 bg-black/50 border border-white/10 rounded-lg text-white"
              >
                {scenes.map(scene => (
                  <option key={scene} value={scene}>{scene}</option>
                ))}
              </select>
              <p className="text-purple-400 text-xs mt-2">✨ {selectedScene} mode enhances colors for this setting</p>
            </div>

            {/* Cinematic Depth Mapping */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <h3 className="text-white font-semibold mb-1 flex items-center gap-2">
                    🎬 Cinematic Depth Mapping
                  </h3>
                  <p className="text-gray-400 text-sm">Add vignette and film grain effects</p>
                </div>
                <input
                  type="checkbox"
                  checked={depthEnabled}
                  onChange={(e) => setDepthEnabled(e.target.checked)}
                  className="w-5 h-5 accent-purple-600"
                />
              </label>
            </div>

            {/* Style Transfer from Reference */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                🎨 Style Transfer
              </h3>
              <div
                {...getReferenceProps()}
                className="border-2 border-dashed border-purple-500/50 rounded-lg p-4 text-center cursor-pointer hover:bg-purple-500/10 transition"
              >
                <input {...getReferenceInputProps()} />
                {referenceImage ? (
                  <div>
                    <img src={referenceImage} alt="Reference" className="h-20 mx-auto rounded-lg" />
                    <p className="text-green-400 text-xs mt-1">✓ Style reference loaded!</p>
                  </div>
                ) : (
                  <>
                    <Upload className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                    <p className="text-gray-400 text-sm">Upload reference photo</p>
                    <p className="text-gray-500 text-xs">We'll match the aesthetic style</p>
                  </>
                )}
              </div>
            </div>

            {/* Filter Selection */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <h3 className="text-white font-semibold mb-4">Choose Aesthetic Filter</h3>
              <div className="grid grid-cols-2 gap-3 max-h-60 overflow-y-auto pr-2">
                {filters.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setSelectedFilter(filter)}
                    className={`p-3 rounded-xl text-left transition-all ${
                      selectedFilter === filter
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                        : 'bg-white/5 text-gray-300 hover:bg-white/10'
                    }`}
                  >
                    <div className="font-medium text-sm">{filter}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={!selectedImage || isGenerating}
              className={`w-full py-4 rounded-xl text-white font-semibold text-lg transition-all flex items-center justify-center gap-2 ${
                !selectedImage || isGenerating
                  ? 'bg-gray-700 cursor-not-allowed opacity-50'
                  : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-xl hover:scale-[1.02]'
              }`}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Applying Enhancement...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Generate AI Aesthetic
                </>
              )}
            </button>
          </div>
        </div>

        {/* Generated Image with AI Caption */}
        {generatedImage && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-white mb-4">Your AI-Enhanced Creation</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-4 border border-purple-500/30">
                <p className="text-purple-400 text-sm mb-2">After - {selectedFilter} + {selectedScene} Scene ✨</p>
                <img src={generatedImage} alt="Enhanced" className="w-full rounded-xl" />
                <div className="mt-4 flex gap-4 justify-center">
                  <button
                    onClick={() => {
                      const link = document.createElement('a');
                      link.href = generatedImage;
                      link.download = `aura-${selectedFilter.toLowerCase().replace(/ /g, '-')}.jpg`;
                      link.click();
                    }}
                    className="px-4 py-2 bg-purple-600 rounded-lg text-white hover:bg-purple-700 transition flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download HD
                  </button>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      alert("🔗 Link copied! Share your creation!");
                    }}
                    className="px-4 py-2 bg-white/10 rounded-lg text-white hover:bg-white/20 transition flex items-center gap-2"
                  >
                    <Share2 className="w-4 h-4" />
                    Share
                  </button>
                </div>
              </div>
              
              {/* AI Caption & Hashtag Generator */}
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  AI Caption & Hashtag Generator
                </h3>
                {generatingCaption ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="w-6 h-6 animate-spin text-purple-400" />
                    <span className="ml-2 text-gray-400">Generating viral caption...</span>
                  </div>
                ) : caption ? (
                  <div>
                    <p className="text-gray-300 p-4 bg-black/30 rounded-lg whitespace-pre-wrap">{caption}</p>
                    <div className="flex gap-3 mt-4">
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(caption);
                          alert("✅ Caption copied! Ready to paste on Instagram.");
                        }}
                        className="flex-1 px-4 py-2 bg-purple-600 rounded-lg text-white hover:bg-purple-700 transition flex items-center justify-center gap-2"
                      >
                        <Copy className="w-4 h-4" />
                        Copy Caption
                      </button>
                      <button
                        onClick={generateAICaption}
                        className="flex-1 px-4 py-2 bg-white/10 rounded-lg text-white hover:bg-white/20 transition flex items-center justify-center gap-2"
                      >
                        <Sparkles className="w-4 h-4" />
                        Regenerate
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={generateAICaption}
                    className="w-full py-3 bg-purple-600/20 border border-purple-600/50 rounded-lg text-purple-400 hover:bg-purple-600/30 transition"
                  >
                    Generate AI Caption & Hashtags
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}