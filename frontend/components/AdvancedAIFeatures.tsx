"use client";

import { useState, useRef, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { 
  Sparkles, Upload, X, Loader2, Download, 
  Gem, Scissors, Droplets, Clock, Smile, Heart, ArrowLeft
} from "lucide-react";
import Link from "next/link";

export default function AdvancedAIFeatures() {
  const [activeFeature, setActiveFeature] = useState("hair");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedHairColor, setSelectedHairColor] = useState("brown");
  const [selectedAge, setSelectedAge] = useState("younger5");
  const [selectedAccessory, setSelectedAccessory] = useState("earrings");
  const [selectedExpression, setSelectedExpression] = useState("smile");
  const [selectedBody, setSelectedBody] = useState("slim");
  const [error, setError] = useState<string | null>(null);
  
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

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.webp'] },
    maxFiles: 1,
  });

  const features = [
    { id: "hair", name: "💇 Hair Color", icon: <Droplets className="w-5 h-5" /> },
    { id: "age", name: "👶 Age", icon: <Clock className="w-5 h-5" /> },
    { id: "jewelry", name: "💎 Jewelry", icon: <Gem className="w-5 h-5" /> },
    { id: "expression", name: "😊 Expression", icon: <Smile className="w-5 h-5" /> },
    { id: "body", name: "👗 Body", icon: <Scissors className="w-5 h-5" /> },
  ];

  const hairColors = [
    { name: "Black", value: "black", color: "#1a1a1a" },
    { name: "Brown", value: "brown", color: "#654321" },
    { name: "Caramel", value: "caramel", color: "#a5734b" },
    { name: "Auburn", value: "auburn", color: "#aa4632" },
    { name: "Platinum", value: "platinum", color: "#e6dcc8" },
    { name: "Honey", value: "honey", color: "#daa520" },
    { name: "Rose Gold", value: "rose", color: "#b76e79" },
    { name: "Silver", value: "silver", color: "#c0c0c0" },
  ];

  const ageOptions = [
    { value: "younger5", name: "5 Years Younger", emoji: "👶" },
    { value: "younger10", name: "10 Years Younger", emoji: "👼" },
    { value: "older5", name: "5 Years Older", emoji: "👨" },
    { value: "older10", name: "10 Years Older", emoji: "👴" },
  ];

  const accessories = [
    { value: "earrings", name: "Earrings", emoji: "✨" },
    { value: "necklace", name: "Necklace", emoji: "💎" },
    { value: "sunglasses", name: "Sunglasses", emoji: "🕶️" },
    { value: "crown", name: "Crown", emoji: "👑" },
  ];

  const expressions = [
    { value: "smile", name: "Smile", emoji: "😊" },
    { value: "natural", name: "Natural", emoji: "😐" },
  ];

  const bodyOptions = [
    { value: "slim", name: "Slim Fit", emoji: "💪" },
    { value: "athletic", name: "Athletic", emoji: "🏋️" },
    { value: "toned", name: "Toned", emoji: "🌟" },
    { value: "natural", name: "Natural", emoji: "✨" },
  ];

  const handleGenerate = async () => {
    if (!selectedImage) return;
    
    setIsGenerating(true);
    setError(null);
    
    try {
      // Simulate processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      setGeneratedImage(selectedImage);
    } catch (err) {
      setError('Failed to transform');
    } finally {
      setIsGenerating(false);
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
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Advanced AI Studio
          </h1>
          <p className="text-gray-400">Coming Soon - AI features under development</p>
        </div>

        <canvas ref={canvasRef} style={{ display: 'none' }} />

        <div className="flex flex-wrap gap-3 justify-center mb-10">
          {features.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFeature(f.id)}
              className={`px-5 py-2 rounded-xl flex items-center gap-2 transition-all ${
                activeFeature === f.id
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              {f.icon}
              <span>{f.name}</span>
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload */}
          <div>
            {!selectedImage ? (
              <div {...getRootProps()} className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer min-h-[400px] flex items-center justify-center
                ${isDragActive ? 'border-purple-500 bg-purple-500/10' : 'border-white/20 bg-white/5'}`}>
                <input {...getInputProps()} />
                <Upload className="w-12 h-12 text-purple-400 mx-auto mb-3" />
                <p className="text-white">Upload your photo</p>
                <p className="text-gray-500 text-xs mt-2">AI features coming soon!</p>
              </div>
            ) : (
              <div className="relative rounded-xl overflow-hidden">
                <img src={selectedImage} alt="Preview" className="w-full h-auto" />
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-3 right-3 p-1.5 bg-black/60 rounded-full"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="space-y-4">
            {activeFeature === "hair" && (
              <div className="bg-white/5 rounded-2xl p-5">
                <h3 className="text-white font-semibold mb-4">Choose Hair Color</h3>
                <div className="grid grid-cols-4 gap-2">
                  {hairColors.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => setSelectedHairColor(color.value)}
                      className={`p-2 rounded-xl text-center transition-all ${selectedHairColor === color.value ? 'ring-2 ring-purple-500' : ''}`}
                    >
                      <div className="w-full h-10 rounded-lg mb-1" style={{ backgroundColor: color.color }} />
                      <span className="text-xs text-white">{color.name}</span>
                    </button>
                  ))}
                </div>
                <p className="text-yellow-500 text-xs text-center mt-3">⚠️ Coming Soon - AI hair color change</p>
              </div>
            )}

            {activeFeature === "age" && (
              <div className="bg-white/5 rounded-2xl p-5">
                <h3 className="text-white font-semibold mb-4">Age Transformation</h3>
                <div className="grid grid-cols-2 gap-3">
                  {ageOptions.map((age) => (
                    <button
                      key={age.value}
                      onClick={() => setSelectedAge(age.value)}
                      className={`p-4 rounded-xl text-center transition-all ${selectedAge === age.value ? 'bg-purple-600' : 'bg-white/10'}`}
                    >
                      <span className="text-3xl block">{age.emoji}</span>
                      <span className="text-sm text-white">{age.name}</span>
                    </button>
                  ))}
                </div>
                <p className="text-yellow-500 text-xs text-center mt-3">⚠️ Coming Soon - AI age transformation</p>
              </div>
            )}

            {activeFeature === "jewelry" && (
              <div className="bg-white/5 rounded-2xl p-5">
                <h3 className="text-white font-semibold mb-4">Add Accessories</h3>
                <div className="grid grid-cols-2 gap-3">
                  {accessories.map((item) => (
                    <button
                      key={item.value}
                      onClick={() => setSelectedAccessory(item.value)}
                      className={`p-3 rounded-xl text-center transition-all ${selectedAccessory === item.value ? 'bg-purple-600' : 'bg-white/10'}`}
                    >
                      <span className="text-2xl block">{item.emoji}</span>
                      <span className="text-sm text-white">{item.name}</span>
                    </button>
                  ))}
                </div>
                <p className="text-yellow-500 text-xs text-center mt-3">⚠️ Coming Soon - AI jewelry addition</p>
              </div>
            )}

            {activeFeature === "expression" && (
              <div className="bg-white/5 rounded-2xl p-5">
                <h3 className="text-white font-semibold mb-4">Choose Expression</h3>
                <div className="grid grid-cols-2 gap-3">
                  {expressions.map((expr) => (
                    <button
                      key={expr.value}
                      onClick={() => setSelectedExpression(expr.value)}
                      className={`p-4 rounded-xl text-center transition-all ${selectedExpression === expr.value ? 'bg-purple-600' : 'bg-white/10'}`}
                    >
                      <span className="text-3xl block">{expr.emoji}</span>
                      <span className="text-sm text-white">{expr.name}</span>
                    </button>
                  ))}
                </div>
                <p className="text-yellow-500 text-xs text-center mt-3">⚠️ Coming Soon - AI expression change</p>
              </div>
            )}

            {activeFeature === "body" && (
              <div className="bg-white/5 rounded-2xl p-5">
                <h3 className="text-white font-semibold mb-4">Body Effect</h3>
                <div className="grid grid-cols-2 gap-3">
                  {bodyOptions.map((body) => (
                    <button
                      key={body.value}
                      onClick={() => setSelectedBody(body.value)}
                      className={`p-4 rounded-xl text-center transition-all ${selectedBody === body.value ? 'bg-purple-600' : 'bg-white/10'}`}
                    >
                      <span className="text-2xl block">{body.emoji}</span>
                      <span className="text-sm text-white">{body.name}</span>
                    </button>
                  ))}
                </div>
                <p className="text-yellow-500 text-xs text-center mt-3">⚠️ Coming Soon - AI body enhancement</p>
              </div>
            )}

            <button
              onClick={handleGenerate}
              disabled={!selectedImage || isGenerating}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold disabled:opacity-50"
            >
              {isGenerating ? <Loader2 className="animate-spin mx-auto" /> : "Apply Transformation (Coming Soon)"}
            </button>

            {error && <div className="text-red-400 text-center">{error}</div>}
          </div>
        </div>

        {generatedImage && (
          <div className="mt-12">
            <h3 className="text-white text-xl mb-4 text-center">Preview</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/5 rounded-xl p-4">
                <p className="text-gray-400 text-sm mb-2">Original</p>
                <img src={selectedImage!} alt="Original" className="w-full rounded-lg" />
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-purple-500/30">
                <p className="text-purple-400 text-sm mb-2">Preview</p>
                <img src={generatedImage} alt="Result" className="w-full rounded-lg" />
              </div>
            </div>
          </div>
        )}

        <div className="text-center mt-8 p-4 bg-yellow-500/10 rounded-xl border border-yellow-500/30">
          <p className="text-yellow-400 text-sm">
            🚀 Advanced AI features are under development. Currently available: 
            <Link href="/upload" className="text-purple-400 mx-1">Aesthetic Filters</Link> & 
            <Link href="/ai-studio" className="text-purple-400 ml-1">Celebrity Style Transfer</Link>
          </p>
        </div>
      </div>
    </div>
  );
}