import React, { useState } from "react";
import { ArrowLeft, Camera, Edit2 } from "lucide-react";
import { motion } from "motion/react";
import { UserProfile } from "../types";

interface OnboardingScreenProps {
  onBack: () => void;
  onComplete: (profile: UserProfile) => void;
  initialName?: string;
}

const AVATAR_OPTIONS = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256", // Female Professional
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=256", // Male Professional (resembling original John Doe)
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=256", // Female Creative
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=256", // Male Creative
];

export default function OnboardingScreen({ onBack, onComplete, initialName }: OnboardingScreenProps) {
  const [fullName, setFullName] = useState(initialName || "John Doe");
  const [course, setCourse] = useState("Product Strategy");
  const [currentYear, setCurrentYear] = useState("Professional");
  const [targetRole, setTargetRole] = useState("Senior Product Designer");
  const [currentSkills, setCurrentSkills] = useState(
    "User Research, Wireframing, Figma Prototyping, Design Systems, Stakeholder Interviews"
  );
  const [selectedAvatar, setSelectedAvatar] = useState(AVATAR_OPTIONS[1]);
  const [showAvatarModal, setShowAvatarModal] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete({
      fullName,
      targetRole,
      course,
      currentYear,
      currentSkills,
      avatarUrl: selectedAvatar,
      badges: ["Early Adopter", "Fast Learner"],
      focusTimeHours: 128,
      learningLevel: 42,
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-transparent select-none w-full max-w-md mx-auto relative overflow-y-auto">
      {/* Top Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-white/[0.04] border-b border-white/10 backdrop-blur-md">
        <button
          type="button"
          onClick={onBack}
          className="p-1.5 hover:bg-white/10 rounded-full text-slate-300 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft size={20} />
        </button>
        <span className="font-display font-semibold text-lg text-white">SkillGap</span>
        <span className="text-xs font-semibold text-slate-400">Step 1 of 2</span>
      </div>

      {/* Progress Bar (50% complete) */}
      <div className="w-full h-1.5 bg-white/10">
        <div className="h-full bg-emerald-500 transition-all duration-500" style={{ width: "50%" }}></div>
      </div>

      {/* Main Form content */}
      <form onSubmit={handleSubmit} className="flex-1 px-6 py-8 flex flex-col gap-6">
        <div>
          <h2 className="font-display font-bold text-2xl text-white tracking-tight">Tell us about yourself</h2>
          <p className="text-sm text-slate-300 mt-1">Let's build your profile to start bridging the gap.</p>
        </div>

        {/* Profile Avatar Selection Box */}
        <div className="flex flex-col items-center justify-center my-2 relative">
          <div className="relative group cursor-pointer" onClick={() => setShowAvatarModal(true)}>
            <img
              src={selectedAvatar}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-4 border-white/20 shadow-md group-hover:opacity-90 transition-opacity"
            />
            {/* Edit marker resembling original screenshot */}
            <div className="absolute bottom-0 right-0 p-1.5 bg-blue-600 border-2 border-white/30 rounded-full text-white shadow-sm flex items-center justify-center">
              <Edit2 size={10} />
            </div>
          </div>
          <span className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase mt-2.5">
            Tap avatar to change
          </span>
        </div>

        {/* Input fields */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-300">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-3 bg-white/[0.05] border border-white/15 focus:border-white/30 text-white rounded-xl text-sm outline-none transition-colors"
              placeholder="Elena Rodriguez"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-300">Course / Discipline</label>
              <select
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                className="w-full px-3 py-3 bg-slate-900 border border-white/15 focus:border-white/30 text-white rounded-xl text-sm outline-none cursor-pointer"
              >
                <option value="Product Strategy">Product Strategy</option>
                <option value="UX/UI Design">UX/UI Design</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Data Analytics">Data Analytics</option>
                <option value="Modern Marketing">Modern Marketing</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-300">Current Year</label>
              <select
                value={currentYear}
                onChange={(e) => setCurrentYear(e.target.value)}
                className="w-full px-3 py-3 bg-slate-900 border border-white/15 focus:border-white/30 text-white rounded-xl text-sm outline-none cursor-pointer"
              >
                <option value="First Year">First Year</option>
                <option value="Second Year">Second Year</option>
                <option value="Third Year">Third Year</option>
                <option value="Final Year">Final Year</option>
                <option value="Professional">Professional</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-300">Target Role</label>
            <input
              type="text"
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              className="w-full px-4 py-3 bg-white/[0.05] border border-white/15 focus:border-white/30 text-white rounded-xl text-sm outline-none transition-colors font-semibold"
              placeholder="Senior Product Designer"
              required
            />
            <span className="text-[10px] text-slate-400">We will align your gaps & roadmap directly to this target.</span>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-300">Your Current Skills / Expertise</label>
            <textarea
              value={currentSkills}
              onChange={(e) => setCurrentSkills(e.target.value)}
              rows={3}
              className="w-full px-4 py-3 bg-white/[0.05] border border-white/15 focus:border-white/30 text-white rounded-xl text-sm outline-none transition-colors resize-none"
              placeholder="Figma, User Research, Agile, Coding, Python, SQL..."
            />
            <span className="text-[10px] text-slate-400">List skills you know (comma-separated) to scan for gaps.</span>
          </div>
        </div>

        {/* Next Button */}
        <button
          type="submit"
          className="w-full py-4 bg-white hover:bg-slate-100 text-slate-950 font-bold rounded-xl flex items-center justify-center gap-2 mt-4 shadow-md transition-all cursor-pointer text-sm"
        >
          Next
          <span className="font-light">→</span>
        </button>
      </form>

      {/* Avatar Dialog Modal */}
      {showAvatarModal && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6 z-50">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass-card p-6 rounded-3xl w-full max-w-xs shadow-2xl flex flex-col gap-4 text-white bg-slate-950/80"
          >
            <h3 className="font-bold text-center text-white">Choose Profile Picture</h3>
            <div className="grid grid-cols-2 gap-4 my-2">
              {AVATAR_OPTIONS.map((url, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    setSelectedAvatar(url);
                    setShowAvatarModal(false);
                  }}
                  className={`relative rounded-full aspect-square border-4 cursor-pointer overflow-hidden transition-all ${
                    selectedAvatar === url ? "border-emerald-500 scale-105" : "border-transparent opacity-80"
                  }`}
                >
                  <img src={url} alt={`Avatar option ${i}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowAvatarModal(false)}
              className="py-1.5 text-xs text-slate-400 hover:text-white font-bold border-t border-white/10"
            >
              Cancel
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}
