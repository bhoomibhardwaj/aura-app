"use client";

import { motion } from "framer-motion";
import { Sparkles, Camera, Shield, Zap, ChevronRight, Star, Users, Globe, MessageCircle, Crown, Check } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => setScrolled(window.scrollY > 50));
    return () => window.removeEventListener('scroll', () => setScrolled(window.scrollY > 50));
  }, []);

  const features = [
    { icon: <Sparkles className="w-6 h-6" />, title: "AI Aesthetic Enhancement", desc: "Transform your photos with cinematic beauty" },
    { icon: <Shield className="w-6 h-6" />, title: "Identity Preservation", desc: "Your face, your body, your personality" },
    { icon: <Zap className="w-6 h-6" />, title: "Lightning Fast", desc: "Get enhanced images in seconds" },
    { icon: <Camera className="w-6 h-6" />, title: "12+ Aesthetic Filters", desc: "From Old Money to Korean Drama" }
  ];

  const stats = [
    { value: "50K+", label: "Active Users" },
    { value: "1M+", label: "Photos Enhanced" },
    { value: "4.9", label: "App Rating" },
    { value: "150+", label: "Countries" }
  ];

  const filters = ["Old Money", "Korean Drama", "Soft Glow", "Cinematic Rain", "Dark Academia", "Y2K", "Luxury Vacation", "Vogue Editorial", "Bollywood Glow", "Night Drive", "Retro Film", "Pinterest Café"];

  const pricingPlans = [
    { name: "Free", price: "$0", features: ["5 free generations", "Basic filters", "Standard quality"], buttonText: "Get Started", buttonLink: "/auth/signup", popular: false },
    { name: "Pro", price: "$9.99", features: ["Unlimited generations", "All 12+ filters", "HD export", "No watermark", "Priority processing"], buttonText: "Upgrade", buttonLink: "/auth/signup", popular: true },
    { name: "Business", price: "$29.99", features: ["Everything in Pro", "Team accounts", "API access", "Custom filters", "24/7 support"], buttonText: "Contact Us", buttonLink: "/auth/signup", popular: false }
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black">
      {/* Navbar */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-lg border-b border-white/10' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-white font-bold text-xl">Aura</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection('features')} className="text-gray-300 hover:text-white transition">Features</button>
            <button onClick={() => scrollToSection('pricing')} className="text-gray-300 hover:text-white transition">Pricing</button>
            <button onClick={() => scrollToSection('gallery')} className="text-gray-300 hover:text-white transition">Gallery</button>
            <Link href="/auth/signin" className="text-gray-300 hover:text-white transition">Sign In</Link>
            <Link href="/auth/signup" className="px-5 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-semibold hover:shadow-lg transition">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-pink-900/20 to-orange-900/20" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-600/30 rounded-full blur-3xl animate-pulse delay-1000" />
        
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-lg rounded-full px-4 py-2 mb-6 border border-white/20">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-gray-300">AI-Powered Aesthetic Enhancement</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                You, But Better.
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Cinematic AI enhancements that preserve your authentic identity. 
              Transform your photos into stunning aesthetic masterpieces without losing yourself.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/signup">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                >
                  Start Creating Free
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              </Link>
              <button 
                onClick={() => scrollToSection('features')}
                className="px-8 py-4 bg-white/10 backdrop-blur-lg rounded-full text-white font-semibold text-lg border border-white/20 hover:bg-white/20 transition-all"
              >
                Learn More
              </button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-8 border-t border-white/10">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold text-white">{stat.value}</div>
                  <div className="text-gray-400 text-sm mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-4 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Why Choose Aura?
          </h2>
          <p className="text-gray-400 text-lg">The most authentic AI aesthetic enhancement platform</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-purple-500/50 transition-all group"
            >
              <div className="text-purple-400 mb-4 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
<section id="pricing" className="py-24 px-4 bg-gradient-to-b from-transparent via-purple-950/20 to-transparent">
  <div className="max-w-7xl mx-auto">
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center mb-16"
    >
      <h2 className="text-4xl md:text-5xl font-bold mb-4">
        Simple, <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Transparent</span> Pricing
      </h2>
      <p className="text-gray-400 text-lg">Choose the plan that fits your needs</p>
    </motion.div>

    <div className="grid md:grid-cols-3 gap-8">
      {/* Free Plan */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0 }}
        className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10"
      >
        <h3 className="text-2xl font-bold text-white mb-2">Free</h3>
        <div className="text-4xl font-bold text-white mb-4">₹0</div>
        <div className="text-gray-400 text-sm mb-4">Forever free</div>
        <div className="space-y-3 mb-8">
          <div className="flex items-center gap-2 text-gray-300"><Check className="w-4 h-4 text-purple-400" /><span className="text-sm">5 free generations</span></div>
          <div className="flex items-center gap-2 text-gray-300"><Check className="w-4 h-4 text-purple-400" /><span className="text-sm">Basic filters</span></div>
          <div className="flex items-center gap-2 text-gray-300"><Check className="w-4 h-4 text-purple-400" /><span className="text-sm">Standard quality</span></div>
          <div className="flex items-center gap-2 text-gray-300"><Check className="w-4 h-4 text-purple-400" /><span className="text-sm">Watermarked images</span></div>
        </div>
        <Link href="/auth/signup">
          <button className="w-full py-3 rounded-xl font-semibold transition-all bg-white/10 text-white hover:bg-white/20">
            Get Started
          </button>
        </Link>
      </motion.div>

      {/* Monthly Plan */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10"
      >
        <h3 className="text-2xl font-bold text-white mb-2">Monthly</h3>
        <div className="text-4xl font-bold text-white mb-2">₹199<span className="text-gray-400 text-lg">/month</span></div>
        <div className="text-gray-400 text-sm mb-4">billed monthly</div>
        <div className="space-y-3 mb-8">
          <div className="flex items-center gap-2 text-gray-300"><Check className="w-4 h-4 text-purple-400" /><span className="text-sm">Unlimited generations</span></div>
          <div className="flex items-center gap-2 text-gray-300"><Check className="w-4 h-4 text-purple-400" /><span className="text-sm">All 12+ aesthetic filters</span></div>
          <div className="flex items-center gap-2 text-gray-300"><Check className="w-4 h-4 text-purple-400" /><span className="text-sm">HD export (4K)</span></div>
          <div className="flex items-center gap-2 text-gray-300"><Check className="w-4 h-4 text-purple-400" /><span className="text-sm">No watermark</span></div>
          <div className="flex items-center gap-2 text-gray-300"><Check className="w-4 h-4 text-purple-400" /><span className="text-sm">Priority processing</span></div>
          <div className="flex items-center gap-2 text-gray-300"><Check className="w-4 h-4 text-purple-400" /><span className="text-sm">Face preservation</span></div>
          <div className="flex items-center gap-2 text-gray-300"><Check className="w-4 h-4 text-purple-400" /><span className="text-sm">AI caption generator</span></div>
        </div>
        <Link href="/auth/signup">
          <button className="w-full py-3 rounded-xl font-semibold transition-all bg-white/10 text-white hover:bg-white/20">
            Start Monthly - ₹199
          </button>
        </Link>
      </motion.div>

      {/* Yearly Plan - Most Popular */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-purple-500 shadow-xl shadow-purple-500/20"
      >
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white text-sm font-semibold">
          Most Popular
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Yearly</h3>
        <div className="text-4xl font-bold text-white mb-2">₹999<span className="text-gray-400 text-lg">/year</span></div>
        <div className="text-purple-400 text-sm mb-4">billed annually (Save ₹1,389/year!)</div>
        <div className="text-green-400 text-xs mb-4">🎉 Just ₹83.25 per month - 58% OFF!</div>
        <div className="space-y-3 mb-8">
          <div className="flex items-center gap-2 text-gray-300"><Check className="w-4 h-4 text-purple-400" /><span className="text-sm">Unlimited generations</span></div>
          <div className="flex items-center gap-2 text-gray-300"><Check className="w-4 h-4 text-purple-400" /><span className="text-sm">All 12+ aesthetic filters</span></div>
          <div className="flex items-center gap-2 text-gray-300"><Check className="w-4 h-4 text-purple-400" /><span className="text-sm">HD export (4K)</span></div>
          <div className="flex items-center gap-2 text-gray-300"><Check className="w-4 h-4 text-purple-400" /><span className="text-sm">No watermark</span></div>
          <div className="flex items-center gap-2 text-gray-300"><Check className="w-4 h-4 text-purple-400" /><span className="text-sm">Priority processing</span></div>
          <div className="flex items-center gap-2 text-gray-300"><Check className="w-4 h-4 text-purple-400" /><span className="text-sm">Face preservation</span></div>
          <div className="flex items-center gap-2 text-gray-300"><Check className="w-4 h-4 text-purple-400" /><span className="text-sm">AI caption generator</span></div>
          <div className="flex items-center gap-2 text-gray-300"><Check className="w-4 h-4 text-green-400" /><span className="text-sm text-green-400">✨ 2 months free!</span></div>
        </div>
        <Link href="/auth/signup">
          <button className="w-full py-3 rounded-xl font-semibold transition-all bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg">
            Get Yearly - ₹999/year
          </button>
        </Link>
      </motion.div>
    </div>

    {/* Savings Highlight */}
    <div className="mt-12 text-center">
      <div className="inline-block bg-green-500/20 backdrop-blur-lg rounded-2xl px-6 py-3 border border-green-500/30">
        <p className="text-green-400 text-sm">
          💰 Yearly plan: Just ₹83.25/month - Save 58% compared to monthly!
        </p>
      </div>
    </div>
  </div>
</section>

      {/* Gallery Section */}
      <section id="gallery" className="py-24 px-4 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Community Gallery</span>
          </h2>
          <p className="text-gray-400 text-lg">See what others are creating with Aura</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {filters.slice(0, 8).map((filter, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="aspect-square bg-gradient-to-br from-purple-900 to-pink-900 rounded-2xl flex items-center justify-center p-4"
            >
              <p className="text-white font-semibold text-center text-sm">{filter}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
<section className="py-24 px-4 max-w-7xl mx-auto">
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="text-center mb-16"
  >
    <h2 className="text-4xl md:text-5xl font-bold mb-4">
      <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Loved by Creators</span>
    </h2>
    <p className="text-gray-400 text-lg">Join thousands of satisfied users from India and around the world</p>
  </motion.div>

  <div className="grid md:grid-cols-2 gap-8">
    {/* Testimonial 1 - Indian Creator */}
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-purple-500/50 transition-all group"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
          <span className="text-white font-bold">PR</span>
        </div>
        <div>
          <h4 className="font-semibold text-white text-lg">Priya Sharma</h4>
          <p className="text-gray-400 text-sm">Fashion Influencer • Mumbai</p>
        </div>
      </div>
      <div className="flex gap-1 mb-3">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
        ))}
      </div>
      <p className="text-gray-300 italic">"Aura ne mere Instagram game ko completely change kar diya! Filters itne natural hain ki face same rehta hai par photo aesthetic lagti hai. Best AI tool for Indian creators!"</p>
    </motion.div>

    {/* Testimonial 2 - Indian Photographer */}
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-purple-500/50 transition-all group"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
          <span className="text-white font-bold">AK</span>
        </div>
        <div>
          <h4 className="font-semibold text-white text-lg">Arjun Kapoor</h4>
          <p className="text-gray-400 text-sm">Wedding Photographer • Delhi</p>
        </div>
      </div>
      <div className="flex gap-1 mb-3">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
        ))}
      </div>
      <p className="text-gray-300 italic">"As a photographer, identity preservation is crucial. Aura gives that perfect cinematic look without changing the person's features. My clients absolutely love the results!"</p>
    </motion.div>

    {/* Testimonial 3 - Indian Content Creator */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-purple-500/50 transition-all group"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
          <span className="text-white font-bold">NV</span>
        </div>
        <div>
          <h4 className="font-semibold text-white text-lg">Neha Verma</h4>
          <p className="text-gray-400 text-sm">YouTuber • Bangalore</p>
        </div>
      </div>
      <div className="flex gap-1 mb-3">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
        ))}
      </div>
      <p className="text-gray-300 italic">"The Korean Drama filter is my absolute favorite! It gives that dreamy, soft look without overdoing it. Finally an AI that understands Indian skin tones perfectly!"</p>
    </motion.div>

    {/* Testimonial 4 - Indian Business Owner */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-purple-500/50 transition-all group"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center">
          <span className="text-white font-bold">RM</span>
        </div>
        <div>
          <h4 className="font-semibold text-white text-lg">Rajesh Malhotra</h4>
          <p className="text-gray-400 text-sm">E-commerce Brand Owner • Jaipur</p>
        </div>
      </div>
      <div className="flex gap-1 mb-3">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
        ))}
      </div>
      <p className="text-gray-300 italic">"Using Aura for our product photos has been a game-changer. The Old Money filter adds that premium, luxurious feel to our jewelry collection. Highly recommended for Indian businesses!"</p>
    </motion.div>
  </div>

  {/* Rating Summary */}
  <div className="mt-12 text-center">
    <div className="inline-flex items-center gap-4 bg-white/5 backdrop-blur-lg rounded-2xl px-8 py-4 border border-white/10">
      <div className="flex items-center gap-1">
        <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
        <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
        <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
        <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
        <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
      </div>
      <div className="text-white font-bold text-xl">4.9</div>
      <div className="text-gray-400">out of 5</div>
      <div className="w-px h-6 bg-white/20 mx-2"></div>
      <div className="text-gray-300">Based on <span className="text-white font-semibold">10,000+</span> Indian creators reviews</div>
    </div>
  </div>
</section>

      {/* CTA Section */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-3xl p-12 border border-purple-500/30"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Transform Your Photos?
            </h2>
            <p className="text-gray-300 mb-8">
              Join thousands of creators who are already enhancing their aesthetic with Aura.
            </p>
            <Link href="/auth/signup">
              <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-semibold text-lg hover:shadow-xl transition-all">
                Start Creating Free
              </button>
            </Link>
            <p className="text-gray-500 text-sm mt-4">No credit card required. 5 free generations.</p>
          </motion.div>
        </div>
      </section>

      {/* Floating WhatsApp Support Button */}
      <motion.a
        href="https://wa.me/918882287845?text=Hi%20Aura%20Team%2C%20I%20need%20help%20with%20my%20account"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full animate-ping" />
        <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full" />
        <MessageCircle className="w-6 h-6 text-white" />
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Need help? Chat with us!
        </span>
      </motion.a>
      <Link href="/ai-studio" className="text-gray-300 hover:text-white transition">AI Studio</Link>
    </div>
  );
}