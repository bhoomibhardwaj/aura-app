"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  Sparkles, Camera, Wand2, Heart, Palette, Gem, 
  Smile, Droplets, User, Scissors, ArrowRight, Crown 
} from "lucide-react";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Get user from localStorage
    const userStr = localStorage.getItem('user');
    if (userStr) {
      setUser(JSON.parse(userStr));
    } else {
      // Redirect to signin if no user
      window.location.href = '/auth/signin';
    }
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  const features = [
    { 
      name: "AI Aesthetic Studio", 
      href: "/upload", 
      icon: <Sparkles className="w-6 h-6" />, 
      color: "from-purple-600 to-pink-600",
      description: "12+ aesthetic filters, face preservation",
      popular: true
    },
    { 
      name: "Celebrity Style Studio", 
      href: "/ai-studio", 
      icon: <Wand2 className="w-6 h-6" />, 
      color: "from-blue-600 to-cyan-600",
      description: "Copy any celebrity's exact look",
      popular: true
    },
    { 
      name: "Advanced AI Studio", 
      href: "/advanced-ai", 
      icon: <Gem className="w-6 h-6" />, 
      color: "from-emerald-600 to-teal-600",
      description: "Age, hair color, accessories, expressions",
      popular: false
    },
  ];

  const quickActions = [
    { name: "Age Transformation", href: "/advanced-ai", icon: <User className="w-4 h-4" />, tag: "New" },
    { name: "Hair Color", href: "/advanced-ai", icon: <Droplets className="w-4 h-4" />, tag: "Trending" },
    { name: "Makeup", href: "/ai-studio", icon: <Heart className="w-4 h-4" />, tag: "Popular" },
    { name: "Background", href: "/ai-studio", icon: <Camera className="w-4 h-4" />, tag: "New" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black">
      {/* Header */}
      <div className="border-b border-white/10 bg-black/30 backdrop-blur-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-white font-bold text-xl">Aura</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/upload" className="text-gray-300 hover:text-white transition text-sm">Studio</Link>
            <Link href="/ai-studio" className="text-gray-300 hover:text-white transition text-sm">Celebrity AI</Link>
            <Link href="/advanced-ai" className="text-gray-300 hover:text-white transition text-sm">Advanced AI</Link>
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
              <span className="text-white text-sm font-bold">{user.name?.charAt(0) || "U"}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Welcome back, {user.name?.split(" ")[0]}!
          </h1>
          <p className="text-gray-400 mt-2">Ready to create something amazing today?</p>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-purple-500/50 transition-all group">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-400 text-sm">Credits Remaining</p>
              {user.subscription === "free" && (
                <Link href="/pricing" className="text-xs text-purple-400 hover:text-purple-300">
                  Upgrade
                </Link>
              )}
            </div>
            <p className="text-4xl font-bold text-white">{user.credits}</p>
            <p className="text-gray-500 text-xs mt-2">
              {user.subscription === "free" ? "Free tier • 5 free generations" : "Premium • Unlimited"}
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <p className="text-gray-400 text-sm mb-2">Subscription Plan</p>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold text-white capitalize">{user.subscription}</p>
              {user.subscription === "free" && (
                <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded-full">Upgrade to Pro</span>
              )}
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <p className="text-gray-400 text-sm mb-2">Featured Filter</p>
            <p className="text-white font-semibold">🔥 Korean Drama</p>
            <p className="text-gray-500 text-xs mt-1">Most popular this week</p>
          </div>
        </div>

        {/* Main Features */}
        <h2 className="text-2xl font-bold text-white mb-6">✨ AI Creative Suite</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => (
            <Link href={feature.href} key={index}>
              <div className={`bg-gradient-to-br ${feature.color} rounded-2xl p-6 hover:scale-[1.02] transition-all cursor-pointer group relative overflow-hidden`}>
                {feature.popular && (
                  <div className="absolute top-3 right-3 bg-white/20 backdrop-blur rounded-full px-2 py-0.5 text-xs">
                    🔥 Popular
                  </div>
                )}
                <div className="text-white mb-3">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.name}</h3>
                <p className="text-white/80 text-sm mb-4">{feature.description}</p>
                <button className="text-white text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                  Try Now <ArrowRight className="w-4 h-4" />
                </button>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">⚡ Quick Actions</h2>
          <Link href="/upload" className="text-purple-400 text-sm hover:text-purple-300">
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {quickActions.map((action, index) => (
            <Link href={action.href} key={index}>
              <div className="bg-white/5 backdrop-blur-lg rounded-xl p-4 text-center hover:bg-white/10 transition-all group">
                <div className="text-purple-400 mb-2 group-hover:scale-110 transition-transform">
                  {action.icon}
                </div>
                <p className="text-white text-sm font-medium">{action.name}</p>
                <span className="text-xs text-purple-400">{action.tag}</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Upgrade Banner for Free Users */}
        {user.subscription === "free" && (
          <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl p-6 border border-purple-500/30">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div>
                <h3 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
                  <Crown className="w-5 h-5 text-yellow-400" />
                  Unlock Premium Features
                </h3>
                <p className="text-gray-300 text-sm">Get unlimited generations, HD exports, and exclusive filters!</p>
              </div>
              <Link href="/pricing">
                <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white font-semibold hover:shadow-lg transition-all">
                  Upgrade Now
                </button>
              </Link>
            </div>
          </div>
        )}

        {/* Recent Activity Placeholder */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            💡 Tip: Try the <Link href="/advanced-ai" className="text-purple-400 hover:text-purple-300">Advanced AI Studio</Link> for age transformation & hair colors!
          </p>
        </div>
      </div>
    </div>
  );
}