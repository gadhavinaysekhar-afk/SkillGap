import React from "react";
import { Check, AlertCircle, ArrowDown, Play, Sparkles, Sliders } from "lucide-react";
import { SkillAnalysis, UserProfile } from "../types";

interface ProgressTabProps {
  analysis: SkillAnalysis;
  profile: UserProfile;
  onSetTab: (tabName: string) => void;
}

export default function ProgressTab({ analysis, profile, onSetTab }: ProgressTabProps) {
  const readiness = analysis.readinessScore || 72;
  const gap = 100 - readiness;

  // Handles client-side simulated PDF generator printing
  const handleDownloadPDF = () => {
    window.print();
  };

  return (
    <div className="flex flex-col gap-6 select-none w-full px-1 py-1 pb-16 text-white">
      {/* Top Header details */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display font-bold text-xl text-white">Gap Analysis</h2>
          <p className="text-xs text-slate-400 mt-0.5 font-light">Current vs Target comparison indicators</p>
        </div>
        <button
          onClick={handleDownloadPDF}
          className="p-2.5 bg-white/10 text-white border border-white/15 rounded-xl hover:bg-white/15 transition-colors cursor-pointer shadow-md"
          title="Print Report"
        >
          <ArrowDown size={16} className="text-white" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 items-start w-full">
        {/* Left column (Readiness meter & Quick recommendation) */}
        <div className="lg:col-span-5 flex flex-col gap-6 w-full animate-fadeIn">
          {/* Radial Doughnut Readiness Score Box */}
          <div className="bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-lg flex flex-col items-center justify-center text-center">
            {/* Responsive Circular Readiness Doughnut Gauge resembling Image 6 */}
            <div className="relative w-40 h-40 flex items-center justify-center select-none">
              <svg className="w-full h-full transform -rotate-90">
                {/* Background Circle Track */}
                <circle cx="80" cy="80" r="68" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="12" fill="transparent" />
                {/* Foreground Readiness Segment */}
                <circle
                  cx="80"
                  cy="80"
                  r="68"
                  stroke="#10b981"
                  strokeWidth="12"
                  fill="transparent"
                  strokeDasharray={427}
                  strokeDashoffset={427 - (427 * readiness) / 100}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="font-display font-extrabold text-4xl text-white leading-none tracking-tight">{readiness}%</span>
                <span className="text-[9px] uppercase tracking-widest font-bold text-slate-400 mt-1">Readiness</span>
              </div>
            </div>

            <div className="mt-5">
              <h3 className="font-display font-bold text-base text-white">
                Target: {profile.targetRole || "Senior Product Designer"}
              </h3>
              <p className="text-xs text-slate-300 mt-1.5 leading-relaxed font-light">
                Analysis shows a <span className="font-bold text-emerald-400">{gap}% gap</span> between your current profile and industry standards.
              </p>
            </div>
          </div>

          {/* Quick Start Recommendation Box */}
          <div className="flex flex-col gap-3">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Quick Start Recommendation
            </span>
            <div
              onClick={() => onSetTab("roadmap")}
              className="glass-card hover:bg-white/[0.1] border border-white/10 hover:border-white/20 rounded-2xl p-4 flex items-center justify-between shadow-sm transition-all cursor-pointer group text-white-700 animate-pulse"
            >
              <div className="flex items-center gap-3">
                {/* Cute mini card mock image */}
                <div className="relative w-14 h-12 bg-slate-950/80 border border-white/10 rounded-xl overflow-hidden flex items-center justify-center p-1 font-mono text-[8px] text-white">
                  <Sparkles size={16} className="text-yellow-300 animate-pulse" />
                </div>
                <div className="text-left">
                  <h4 className="text-xs font-bold text-white leading-tight font-display">Data Vis for Designers</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">Master the missing 18% gap in Active Week 4.</p>
                  <span className="text-[9px] font-bold text-emerald-400 flex items-center gap-1 mt-1">
                    <Play size={8} fill="currentColor" /> Start Learning
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Large Download Button */}
          <button
            onClick={handleDownloadPDF}
            className="w-full py-4 bg-white hover:bg-slate-100 text-slate-950 font-bold rounded-2xl flex items-center justify-center gap-3 shadow-md mt-2 transition-all cursor-pointer text-sm"
          >
            <ArrowDown size={16} />
            Download Full PDF Report
          </button>
        </div>

        {/* Right column (Strengths, Skills to Develop, Priority Focus) */}
        <div className="lg:col-span-7 flex flex-col gap-4 w-full">
          {/* Core Strengths */}
          <div className="glass-card rounded-3xl p-5 shadow-lg flex flex-col gap-4 text-white border-white/10">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-500/10 border border-emerald-500/15 rounded-xl text-emerald-400">
                <Check size={16} />
              </div>
              <div>
                <h4 className="font-display font-semibold text-sm text-white">Strengths</h4>
                <p className="text-[10px] text-slate-400 font-light">Matching your target role requirements</p>
              </div>
            </div>

            <div className="flex flex-col gap-3.5 mt-1">
              {analysis.strengths.map((str, id) => (
                <div key={id} className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center text-xs">
                     <span className="font-medium text-slate-200">{str.name}</span>
                     <span className="font-bold text-slate-300 font-mono">{str.matchPercent}% Match</span>
                  </div>
                  {/* Horizontal Progress bar */}
                  <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full"
                      style={{ width: `${str.matchPercent}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skills to Develop */}
          <div className="glass-card rounded-3xl p-5 shadow-lg flex flex-col gap-4 text-white border-white/10">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/10 rounded-xl text-white border border-white/10">
                <Sliders size={16} />
              </div>
              <div>
                <h4 className="font-display font-semibold text-sm text-white">Skills to Develop</h4>
                <p className="text-[10px] text-slate-400 font-light">Core areas to improve marketability</p>
              </div>
            </div>

            <div className="flex flex-col gap-4 mt-2">
              {analysis.skillsToDevelop.map((sk, id) => (
                <div key={id} className="flex flex-col gap-2">
                  <div className="flex justify-between items-center text-xs">
                     <span className="font-semibold text-slate-200 leading-tight">{sk.name}</span>
                     <span className="font-bold text-slate-300 font-mono">{sk.currentPercent}% Current</span>
                  </div>
                  {/* Horizontal Progress bar */}
                  <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-500 rounded-full"
                      style={{ width: `${sk.currentPercent}%` }}
                    ></div>
                  </div>
                  <p className="text-[10px] text-slate-400 leading-relaxed font-light italic mt-0.5">
                    {sk.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Priority Focus */}
          <div className="glass-card rounded-3xl p-5 shadow-lg flex flex-col gap-3 text-white border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-rose-500/10 border border-rose-500/15 rounded-xl text-rose-450">
                  <AlertCircle size={15} />
                </div>
                <h4 className="font-display font-semibold text-sm text-white">Priority Focus</h4>
              </div>
              <span className="text-[9px] font-bold text-rose-450 bg-rose-500/10 border border-rose-500/15 px-2 py-0.5 rounded-full">
                High Impact
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mt-1 font-light">
              Closing these gaps first will increase your hiring probability inside target tracks by <span className="font-bold text-rose-300">25%</span>:
            </p>

            <div className="flex flex-col gap-2 mt-2">
              {analysis.priorityFocus.map((item, id) => (
                <div
                  key={id}
                  className="flex items-center gap-2.5 px-3 py-2.5 border border-white/10 bg-white/5 rounded-xl text-xs font-semibold text-slate-200 shadow-sm"
                >
                  <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full"></div>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
