"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Crown, Sparkles, Zap, Shield, Infinity, IndianRupee, Rocket, Star } from "lucide-react";
import Link from "next/link";

export default function PricingPage() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("yearly");

  const plans = [
    {
      name: "Free",
      monthlyPrice: 0,
      yearlyPrice: 0,
      description: "Perfect for trying out",
      features: [
        "5 free generations",
        "Basic filters",
        "Standard quality export",
        "Watermarked images",
        "Email support"
      ],
      buttonText: "Get Started",
      buttonLink: "/auth/signup",
      popular: false,
    },
    {
      name: "Pro Monthly",
      monthlyPrice: 199,
      yearlyPrice: 199,
      description: "Flexible monthly plan",
      features: [
        "✨ Unlimited generations",
        "🎨 All 12+ aesthetic filters",
        "📸 HD export (4K)",
        "🚫 No watermark",
        "⚡ Priority processing",
        "🔒 Face preservation",
        "🤖 AI caption generator",
        "🎬 Scene understanding",
        "💎 Priority support"
      ],
      buttonText: "Start Monthly",
      buttonLink: "/auth/signup",
      popular: false,
    },
    {
      name: "Pro Yearly",
      monthlyPrice: 1999,
      yearlyPrice: 1999,
      description: "Best value - Save 16%",
      features: [
        "✨ Unlimited generations",
        "🎨 All 12+ aesthetic filters",
        "📸 HD export (4K)",
        "🚫 No watermark",
        "⚡ Priority processing",
        "🔒 Face preservation",
        "🤖 AI caption generator",
        "🎬 Scene understanding",
        "💎 Priority support",
        "🎁 2 months free",
        "🔥 Early access to new filters"
      ],
      buttonText: "Get Pro Yearly",
      buttonLink: "/auth/signup",
      popular: true,
    }
  ];

  const monthlyPlan = plans[1];
  const yearlyPlan = plans[2];
  const savings = (monthlyPlan.monthlyPrice * 12) - yearlyPlan.yearlyPrice;

  const getDisplayPrice = (plan: any) => {
    if (plan.name === "Free") return 0;
    if (plan.name === "Pro Monthly") {
      return plan.monthlyPrice;
    }
    if (plan.name === "Pro Yearly") {
      return plan.yearlyPrice;
    }
    return plan.monthlyPrice;
  };

  const getPriceLabel = (plan: any) => {
    if (plan.name === "Free") return "forever";
    if (plan.name === "Pro Monthly") return "month";
    if (plan.name === "Pro Yearly") return "year";
    return "month";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Simple, Transparent Pricing
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Choose the plan that fits your needs. Cancel anytime.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative bg-white/5 backdrop-blur-lg rounded-2xl p-8 border transition-all duration-300 hover:scale-[1.02] ${
                plan.popular 
                  ? 'border-purple-500 shadow-2xl shadow-purple-500/30 bg-gradient-to-b from-purple-900/20 to-pink-900/20' 
                  : 'border-white/10'
              }`}
            >
              {plan.popular && (
                <>
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white text-sm font-semibold flex items-center gap-1 whitespace-nowrap">
                    <Crown className="w-3 h-3" />
                    Most Popular
                  </div>
                  <div className="absolute top-20 -right-2 w-20 h-20 bg-purple-500/20 rounded-full blur-2xl" />
                  <div className="absolute -bottom-2 -left-2 w-20 h-20 bg-pink-500/20 rounded-full blur-2xl" />
                </>
              )}
              
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-gray-400 text-sm">{plan.description}</p>
                <div className="mt-4">
                  <span className="text-5xl font-bold text-white flex items-center justify-center gap-1">
                    <IndianRupee className="w-8 h-8" />
                    {getDisplayPrice(plan).toLocaleString('en-IN')}
                  </span>
                  <span className="text-gray-400 text-sm">
                    /{getPriceLabel(plan)}
                  </span>
                  {plan.name === "Pro Yearly" && (
                    <p className="text-green-400 text-sm mt-1">
                      ✨ Just ₹{Math.round(1999 / 12)}/month
                    </p>
                  )}
                  {plan.name === "Pro Yearly" && (
                    <p className="text-purple-400 text-xs mt-1">
                      🎉 Save ₹{savings} compared to monthly
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-3 mb-8 max-h-96 overflow-y-auto pr-2">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2 text-gray-300">
                    <Check className="w-4 h-4 text-purple-400 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <Link href={plan.buttonLink}>
                <button className={`w-full py-3 rounded-xl font-semibold transition-all ${
                  plan.popular 
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg hover:scale-[1.02]'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}>
                  {plan.buttonText}
                </button>
              </Link>

              {plan.popular && (
                <p className="text-center text-gray-500 text-xs mt-3">
                  ⭐ Best value for creators
                </p>
              )}
            </motion.div>
          ))}
        </div>

        {/* Savings Highlight */}
        <div className="mt-12 text-center">
          <div className="inline-block bg-gradient-to-r from-green-600/20 to-emerald-600/20 backdrop-blur-lg rounded-2xl px-6 py-3 border border-green-500/30">
            <p className="text-green-400 text-sm flex items-center gap-2">
              <Zap className="w-4 h-4 text-green-400" />
              🎉 Yearly Plan: Just ₹{Math.round(1999 / 12)}/month - Save ₹{savings} compared to monthly!
            </p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-white text-center mb-8">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              { q: "Can I cancel anytime?", a: "Yes, you can cancel your subscription anytime. No hidden fees." },
              { q: "What payment methods do you accept?", a: "We accept UPI, Credit/Debit cards, NetBanking, and PayPal." },
              { q: "Is there a free trial?", a: "Yes, you get 5 free generations to try Aura before upgrading." },
              { q: "Do you offer refunds?", a: "We offer a 7-day money-back guarantee for yearly plans." },
              { q: "Can I switch from monthly to yearly?", a: "Absolutely! You can upgrade anytime and we'll pro-rate the amount." },
              { q: "Is GST included?", a: "Yes, all prices include 18% GST as per Indian tax laws." }
            ].map((faq, i) => (
              <div key={i} className="bg-white/5 rounded-xl p-4 text-left hover:bg-white/10 transition">
                <h4 className="text-white font-semibold mb-2">{faq.q}</h4>
                <p className="text-gray-400 text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-16 text-center">
          <div className="flex flex-wrap justify-center gap-6">
            <div className="flex items-center gap-2 text-gray-400">
              <Shield className="w-5 h-5 text-green-400" />
              <span className="text-sm">Secure Payments</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Infinity className="w-5 h-5 text-purple-400" />
              <span className="text-sm">Cancel Anytime</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Crown className="w-5 h-5 text-yellow-400" />
              <span className="text-sm">14-Day Money Back</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}