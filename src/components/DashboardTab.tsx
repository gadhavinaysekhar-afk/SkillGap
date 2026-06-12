import React from "react";
import { RefreshCw, UserCheck, ChevronRight, Award, FolderOpen, AlertCircle } from "lucide-react";
import { SkillAnalysis, UserProfile } from "../types";

interface DashboardTabProps {
  analysis: SkillAnalysis;
  profile: UserProfile;
  onSetTab: (tabName: string) => void;
  onTriggerRescan: () => void;
  loading: boolean;
}

export default function DashboardTab({ analysis, profile, onSetTab, onTriggerRescan, loading }: DashboardTabProps) {
  // Extract custom parameters or default from analysis
  const score = analysis.readinessScore || 72;

  return (
    <div className="flex flex-col gap-6 select-none w-full px-1 py-2">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 items-start">
        {/* Main core segment (7 cols on lg, 1 col on md) */}
        <div className="lg:col-span-7 flex flex-col gap-6 w-full">
          {/* Career Readiness Main Card */}
          <div className="bg-white/[0.04] backdrop-blur-xl border border-white/15 text-white rounded-3xl p-6 shadow-2xl flex flex-col gap-6 relative overflow-hidden">
            {/* Decorative Glowing Core inside Card */}
            <div className="absolute -right-6 -top-6 w-32 h-32 rounded-full bg-blue-500/20 blur-xl pointer-events-none"></div>
            <div className="absolute -left-12 -bottom-12 w-48 h-48 rounded-full bg-emerald-500/15 blur-2xl pointer-events-none"></div>

            <div>
              <span className="text-[10px] font-bold tracking-widest text-slate-300 uppercase">
                Career Readiness
              </span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="font-display font-extrabold text-5xl leading-none text-white tracking-tight">{score}</span>
                <span className="text-xl font-bold text-slate-300">%</span>
              </div>
              <h2 className="font-display font-bold text-xl mt-4 leading-tight text-white">
                {profile.targetRole || "Senior UX Architect"}
              </h2>
              <p className="text-xs text-slate-300 font-light mt-1.5 leading-relaxed">
                Aligning your trajectory with modern professional standard tracks.
              </p>
            </div>

            {/* Card Action Buttons */}
            <div className="grid grid-cols-2 gap-3 mt-1 relative z-10">
              <button
                onClick={onTriggerRescan}
                disabled={loading}
                className="flex items-center justify-center gap-2 py-3 bg-white hover:bg-slate-100 text-slate-950 rounded-xl text-xs font-bold shadow-md transition-all cursor-pointer disabled:opacity-50"
              >
                <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
                {loading ? "Aligning..." : "Scan Again"}
              </button>
              <button
                onClick={() => onSetTab("profile")}
                className="flex items-center justify-center gap-2 py-3 bg-white/10 hover:bg-white/15 text-white border border-white/10 rounded-xl text-xs font-bold shadow-inner transition-all cursor-pointer"
              >
                <UserCheck size={14} />
                Update Profile
              </button>
            </div>
          </div>

          {/* Next Milestone Stage Card */}
          <div className="glass-card rounded-3xl p-5 shadow-lg border border-white/10 flex flex-col gap-4 text-white">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-white/10 text-white border border-white/10 rounded-xl">
                <Award size={18} />
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Next Milestone</h3>
                <p className="text-sm font-semibold text-white mt-0.5">Design Leadership Credential</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              4 key developmental milestone modules remaining inside your dashboard path to elevate your readiness.
            </p>

            {/* Progress Bar */}
            <div>
              <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold mb-1.5">
                <span>Progress</span>
                <span>65%</span>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: "65%" }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary segment (5 cols on lg, 1 col on md) */}
        <div className="lg:col-span-5 flex flex-col gap-6 w-full">
          {/* Skills Acquired Bento Card */}
          <div className="glass-card rounded-3xl p-5 shadow-lg border border-white/10 flex flex-col gap-4 text-white">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-sm text-white">Skills Acquired</h3>
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                Verified
              </span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {analysis.strengths.slice(0, 4).map((str, idx) => (
                <span
                  key={idx}
                  className="text-xs px-3 py-1.5 bg-white/5 text-white rounded-xl font-medium border border-white/10"
                >
                  {str.name}
                </span>
              ))}
              <span className="text-xs px-3 py-1.5 bg-white/10 text-slate-300 font-bold rounded-xl border border-white/15">
                +{analysis.strengths.length + 5} more
              </span>
            </div>

            <button
              onClick={() => onSetTab("progress")}
              className="text-xs text-slate-300 font-semibold hover:text-white flex items-center gap-1 mt-1 transition-colors self-start cursor-pointer group"
            >
              View Skill Gap Matrix
              <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Recommended Focus Areas */}
          <div className="flex flex-col gap-3">
            <h3 className="font-display font-medium text-slate-300 text-sm">Recommended Focus Gaps</h3>
            <div className="flex flex-col gap-2">
              {analysis.skillsToDevelop.map((wk, idx) => (
                <div
                  key={idx}
                  onClick={() => onSetTab("roadmap")}
                  className="glass-card hover:bg-white/[0.1] border border-white/10 hover:border-white/20 rounded-2xl p-4 flex items-center justify-between shadow-sm transition-all cursor-pointer group text-white"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-white/5 text-white border border-white/10 rounded-xl">
                      <FolderOpen size={16} />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-white group-hover:text-white">
                        {wk.name}
                      </h4>
                      <p className="text-[10px] text-slate-400 font-light mt-0.5">
                        Target priority gap inside week milestones
                      </p>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-slate-400 group-hover:translate-x-1 transition-transform" />
                </div>
              ))}

              <div
                onClick={() => onSetTab("progress")}
                className="glass-card hover:bg-white/[0.1] border border-white/10 hover:border-white/20 rounded-2xl p-4 flex items-center justify-between shadow-sm transition-all cursor-pointer group text-white animate-pulse"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-red-500/10 text-red-400 border border-red-500/15 rounded-xl">
                    <AlertCircle size={16} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-red-300">Strategic Product Roadmaps</h4>
                    <p className="text-[10px] text-slate-400 font-light mt-0.5">Critical gaps recommended for assessment</p>
                  </div>
                </div>
                <ChevronRight size={16} className="text-slate-400 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
