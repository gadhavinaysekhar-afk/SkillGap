import React, { useState } from "react";
import { User, Settings, Shield, Award, Zap, Trophy, Lock, Moon, Sun, ChevronRight, Edit3 } from "lucide-react";
import { UserProfile } from "../types";

interface ProfileTabProps {
  profile: UserProfile;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onLogout: () => void;
}

export default function ProfileTab({ profile, darkMode, onToggleDarkMode, onLogout }: ProfileTabProps) {
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [editName, setEditName] = useState(profile.fullName);
  const [editRole, setEditRole] = useState(profile.targetRole);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    profile.fullName = editName;
    profile.targetRole = editRole;
    setShowEditPopup(false);
  };

  return (
    <div className="flex flex-col gap-6 select-none w-full px-1 py-1 pb-16 relative text-white">
      {/* Top Header details */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display font-bold text-xl text-white">My Profile</h2>
          <p className="text-xs text-slate-400 mt-0.5 font-light">Control credentials & badges</p>
        </div>
        <button
          type="button"
          onClick={() => setShowEditPopup(true)}
          className="p-2.5 bg-white/10 border border-white/10 rounded-xl hover:bg-white/15 transition-all cursor-pointer shadow-md"
        >
          <Edit3 size={15} className="text-white" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 items-start w-full">
        {/* Left Column (Profile Avatar Card Summary & Action button) */}
        <div className="lg:col-span-5 flex flex-col gap-6 w-full">
          <div className="bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-lg flex flex-col items-center justify-center text-center">
            <div className="relative group cursor-pointer" onClick={() => setShowEditPopup(true)}>
              <img
                src={profile.avatarUrl}
                alt={profile.fullName}
                className="w-24 h-24 rounded-full object-cover border-4 border-white/20 shadow-lg group-hover:opacity-90 transition-opacity"
              />
              <div className="absolute bottom-0 right-0 p-1.5 bg-blue-600 border-2 border-white/30 rounded-full text-white shadow-md flex items-center justify-center">
                <Edit3 size={10} />
              </div>
            </div>

            <h3 className="font-display font-extrabold text-2xl text-white mt-4 leading-none tracking-tight">
              {profile.fullName}
            </h3>
            <p className="text-xs text-slate-350 mt-1.5 font-medium font-mono uppercase tracking-wider">
              {profile.targetRole} • Level {profile.learningLevel}
            </p>
          </div>

          {/* Red Log Out Button */}
          <button
            type="button"
            onClick={onLogout}
            className="w-full py-4 text-xs font-bold text-rose-450 hover:text-rose-300 bg-rose-500/10 border border-rose-500/15 rounded-2xl cursor-pointer hover:bg-rose-500/15 transition-all shadow-md text-center"
          >
            Log Out
          </button>
        </div>

        {/* Right Column (Achievements & Settings) */}
        <div className="lg:col-span-7 flex flex-col gap-6 w-full">
          {/* Achievements Horizontal row list representing screenshot precisely */}
          <div className="glass-card rounded-3xl p-5 shadow-lg flex flex-col gap-4 border border-white/10">
            <div className="flex justify-between items-center text-xs">
              <h4 className="font-display font-semibold text-slate-300 uppercase tracking-widest leading-none">
                Achievements
              </h4>
              <span className="text-[10px] text-slate-400 font-bold hover:underline cursor-pointer hover:text-white font-mono">View all</span>
            </div>

            <div className="grid grid-cols-4 gap-2 text-center mt-1">
              {/* Badge 1: Early Adopter */}
              <div className="flex flex-col items-center gap-1.5 opacity-100">
                <div className="w-12 h-12 bg-sky-500/10 border border-sky-500/15 text-sky-400 rounded-full flex items-center justify-center shadow-md">
                  <Award size={20} />
                </div>
                <span className="text-[9px] font-bold text-slate-300 leading-tight block">Early Adopter</span>
              </div>

              {/* Badge 2: Fast Learner */}
              <div className="flex flex-col items-center gap-1.5 opacity-100">
                <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/15 text-emerald-400 rounded-full flex items-center justify-center shadow-md">
                  <Zap size={20} />
                </div>
                <span className="text-[9px] font-bold text-slate-300 leading-tight block">Fast Learner</span>
              </div>

              {/* Badge 3: Strategist */}
              <div className="flex flex-col items-center gap-1.5 opacity-100">
                <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/15 text-amber-400 rounded-full flex items-center justify-center shadow-md">
                  <Trophy size={20} />
                </div>
                <span className="text-[9px] font-bold text-slate-300 leading-tight block">Strategist</span>
              </div>

              {/* Badge 4: Mentor (LOCKED) */}
              <div className="flex flex-col items-center gap-1.5 opacity-40">
                <div className="w-12 h-12 bg-white/[0.04] text-slate-500 rounded-full flex items-center justify-center shadow-inner relative border border-white/5">
                  <Lock size={14} className="absolute inset-auto" />
                </div>
                <span className="text-[9px] font-semibold text-slate-500 leading-tight block">Mentor</span>
              </div>
            </div>
          </div>

          {/* Account Settings List */}
          <div className="flex flex-col gap-3">
            <h4 className="font-display font-semibold text-xs text-slate-400 uppercase tracking-widest pr-4 mb-1">
              Account Settings
            </h4>

            <div className="glass-card border border-white/10 rounded-3xl overflow-hidden shadow-lg flex flex-col divide-y divide-white/10">
              {/* Edit Profile Slot */}
              <div
                onClick={() => setShowEditPopup(true)}
                className="flex items-center justify-between p-4.5 hover:bg-white/[0.04] transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="p-2.5 bg-white/10 text-white border border-white/10 rounded-xl shadow-xs">
                    <User size={16} />
                  </div>
                  <div className="text-left">
                    <h5 className="text-xs font-bold text-white leading-tight group-hover:text-white">Edit Profile</h5>
                    <p className="text-[10px] text-slate-400 font-light mt-0.5">Name, target career, and background details</p>
                  </div>
                </div>
                <ChevronRight size={16} className="text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </div>

              {/* Preferences Slot */}
              <div className="flex items-center justify-between p-4.5 hover:bg-white/[0.04] transition-colors cursor-pointer group">
                <div className="flex items-center gap-3.5">
                  <div className="p-2.5 bg-white/10 text-white border border-white/10 rounded-xl shadow-xs">
                    <Settings size={16} />
                  </div>
                  <div className="text-left">
                    <h5 className="text-xs font-bold text-white leading-tight group-hover:text-white">Preferences</h5>
                    <p className="text-[10px] text-slate-400 font-light mt-0.5">Notifications, commitments, and learning triggers</p>
                  </div>
                </div>
                <ChevronRight size={16} className="text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </div>

              {/* Dark Mode Slot Switch Toggler */}
              <div
                onClick={onToggleDarkMode}
                className="flex items-center justify-between p-4.5 hover:bg-white/[0.04] transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="p-2.5 bg-white/10 text-white border border-white/10 rounded-xl shadow-xs">
                    {darkMode ? <Sun size={16} /> : <Moon size={16} />}
                  </div>
                  <div className="text-left">
                    <h5 className="text-xs font-bold text-white leading-tight group-hover:text-white">Dark Mode</h5>
                    <p className="text-[10px] text-slate-400 font-light mt-0.5">Adjust complete application visual color scheme</p>
                  </div>
                </div>
                {/* Sliding Toggle Switch resembling Image 9 */}
                <div
                  className={`w-11 h-6 flex items-center rounded-full p-0.5 cursor-pointer border transition-colors ${
                    darkMode ? "bg-emerald-500 border-emerald-400" : "bg-white/10 border-white/15"
                  }`}
                >
                  <div
                    className={`bg-white w-4.5 h-4.5 rounded-full shadow-md transform transition-transform ${
                      darkMode ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </div>
              </div>

              {/* Security Slot */}
              <div className="flex items-center justify-between p-4.5 hover:bg-white/[0.04] transition-colors cursor-pointer group">
                <div className="flex items-center gap-3.5">
                  <div className="p-2.5 bg-rose-500/10 border border-rose-500/15 text-rose-455 rounded-xl shadow-xs">
                    <Shield size={16} />
                  </div>
                  <div className="text-left">
                    <h5 className="text-xs font-bold text-rose-300 leading-tight group-hover:text-rose-455">Security</h5>
                    <p className="text-[10px] text-slate-450 font-light mt-0.5 font-mono">Password encryption & multi-factor setup</p>
                  </div>
                </div>
                <ChevronRight size={16} className="text-slate-455 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Dialog Modal */}
      {showEditPopup && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6 z-50">
          <div className="glass-card p-6 rounded-3xl w-full max-w-sm shadow-2xl relative text-white bg-slate-900/95 border border-white/15 flex flex-col gap-4">
            <h3 className="font-display font-bold text-base text-white">Update Credentials</h3>
            <form onSubmit={handleSaveProfile} className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-slate-405 uppercase font-mono">Full Name</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full bg-white/[0.05] border border-white/15 focus:border-white/30 text-white outline-none p-2.5 rounded-xl text-xs"
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-slate-405 uppercase font-mono">Target Role</label>
                <input
                  type="text"
                  value={editRole}
                  onChange={(e) => setEditRole(e.target.value)}
                  className="w-full bg-white/[0.05] border border-white/15 focus:border-white/30 text-white outline-none p-2.5 rounded-xl text-xs"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setShowEditPopup(false)}
                  className="py-2.5 border border-white/10 hover:bg-white/5 text-xs font-bold text-slate-400 rounded-xl hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2.5 bg-white hover:bg-slate-100 text-slate-950 text-xs font-bold rounded-xl shadow-md cursor-pointer transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
