import React, { useState } from "react";
import { Sparkles, Computer, Apple } from "lucide-react";
import { motion } from "motion/react";

interface AuthScreenProps {
  onLogin: (email: string) => void;
}

export default function AuthScreen({ onLogin }: AuthScreenProps) {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("name@example.com");
  const [password, setPassword] = useState("password123");
  const [fullName, setFullName] = useState("John Doe");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email);
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-screen px-6 py-12 bg-transparent select-none overflow-y-auto w-full max-w-md mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="font-display font-bold text-3xl text-white">SkillGap</h1>
        <p className="text-sm text-slate-300 mt-2">Your bridge to professional mastery.</p>
      </div>

      {/* Main Form Container */}
      <div className="w-full glass-card rounded-3xl p-6 shadow-2xl mb-8 relative">
        {/* Toggle Slide Selection */}
        <div className="flex bg-white/[0.04] border border-white/10 p-1.5 rounded-2xl mb-6 relative">
          <button
            type="button"
            onClick={() => setActiveTab("login")}
            className={`flex-1 py-2.5 text-sm font-medium rounded-xl transition-all cursor-pointer ${
              activeTab === "login" 
                ? "bg-white/20 text-white border border-white/10 shadow-md" 
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("signup")}
            className={`flex-1 py-2.5 text-sm font-medium rounded-xl transition-all cursor-pointer ${
              activeTab === "signup" 
                ? "bg-white/20 text-white border border-white/10 shadow-md" 
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Dynamic Form Greeting */}
        <div className="mb-6">
          <h2 className="font-semibold text-lg text-white">
            {activeTab === "login" ? "Welcome back" : "Create your account"}
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            {activeTab === "login" 
              ? "Enter your credentials to continue learning." 
              : "Tell us basic details to initiate your profile."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {activeTab === "signup" && (
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-300">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-3 bg-white/[0.05] border border-white/15 focus:border-white/30 text-white rounded-xl text-sm outline-none transition-colors"
                placeholder="John Doe"
                required
              />
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-300">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-white/[0.05] border border-white/15 focus:border-white/30 text-white rounded-xl text-sm outline-none transition-colors"
              placeholder="name@example.com"
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-slate-300">Password</label>
              {activeTab === "login" && (
                <button type="button" className="text-xs font-medium text-slate-300 hover:underline">
                  Forgot?
                </button>
              )}
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-white/[0.05] border border-white/15 focus:border-white/30 text-white rounded-xl text-sm outline-none transition-colors"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-white hover:bg-slate-100 text-slate-950 font-bold rounded-xl mt-2 transition-colors cursor-pointer shadow-md text-sm"
          >
            {activeTab === "login" ? "Log In" : "Register"}
          </button>
        </form>

        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <span className="relative bg-[#1a1f2c] border border-white/10 px-3 py-1 rounded-full text-[10px] tracking-wider text-slate-300 uppercase font-bold">
            Or continue with
          </span>
        </div>

        {/* Social Authentication */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => onLogin("google-user@gmail.com")}
            className="flex items-center justify-center gap-2 py-3 bg-white/[0.05] hover:bg-white/[0.09] border border-white/10 rounded-xl text-xs font-medium text-white transition-colors cursor-pointer"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v3.92h6.69c-.29 1.5-.14 3-.98 4.09v3.4hc2.3-2.1 3.63-5.2 3.63-9.34z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.97-1.08 7.96-2.91l-3.4-2.64c-.94.63-2.15 1-3.56 1-2.73 0-5.05-1.84-5.87-4.31H3.61v2.76C5.58 20.31 9.4 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M6.13 14.14A7.18 7.18 0 0 1 5.75 12c0-.75.13-1.48.38-2.14V7.1H3.61a12 12 0 0 0 0 9.8l2.52-2.76z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.43-3.43C17.96 1.19 15.24 0 12 0 9.4 0 5.58 3.69 3.61 7.1l2.52 2.76C6.95 7.34 9.27 4.75 12 4.75z"
              />
            </svg>
            Google
          </button>
          <button
            type="button"
            onClick={() => onLogin("apple-user@icloud.com")}
            className="flex items-center justify-center gap-2 py-3 bg-white/[0.05] hover:bg-white/[0.09] border border-white/10 rounded-xl text-xs font-medium text-white transition-colors cursor-pointer"
          >
            <Apple size={15} className="text-white" />
            Apple
          </button>
        </div>
      </div>

      {/* Decorative Bottom Sections resembling original screenshot perfectly */}
      <div className="grid grid-cols-2 gap-4 w-full mb-8">
        {/* Mock Laptop desk card */}
        <div className="relative glass-card h-28 rounded-2xl overflow-hidden shadow-sm flex items-center justify-center p-2">
          {/* Mock abstract geometric setup mimicking desk illustration */}
          <div className="relative flex flex-col items-center gap-2">
            <div className="w-16 h-10 bg-white/10 rounded-md flex items-end justify-center p-1 border border-white/20 shadow-xs">
              <div className="w-14 h-1 bg-white/20 rounded-sm"></div>
            </div>
            <div className="w-18 h-1 bg-white/40 rounded-full"></div>
            {/* Lamp base dot */}
            <div className="absolute -right-4 -top-2 w-1.5 h-10 bg-white/25 rotate-15 rounded-full"></div>
            <div className="absolute -right-6 -top-4 w-4 h-3 bg-white/15 rounded-b-md shadow-xs"></div>
          </div>
        </div>

        {/* AI-Powered roadmaps feature card */}
        <div className="glass-card rounded-2xl p-4 flex flex-col items-center justify-center text-center shadow-sm">
          <div className="bg-white/15 p-2 rounded-full mb-2 text-yellow-300 border border-white/10 shadow-xs">
            <Sparkles size={16} />
          </div>
          <p className="text-xs font-bold text-white font-display">AI-Powered Skill</p>
          <p className="text-[10px] text-slate-300 mt-0.5">Roadmaps</p>
        </div>
      </div>

      <span className="text-[10px] text-slate-500 font-light translate-y-3">
        © 2024 SkillGap Education Platform.
      </span>
    </div>
  );
}
