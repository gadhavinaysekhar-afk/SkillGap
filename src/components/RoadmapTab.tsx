import React, { useState } from "react";
import { Check, Play, FileText, Lock, MessageSquare, Calendar, Clock, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { SkillAnalysis, UserProfile, GuideData } from "../types";

interface RoadmapTabProps {
  analysis: SkillAnalysis;
  profile: UserProfile;
  activeGuide: GuideData | null;
  onFetchGuide: (topic: string, weekTitle: string) => void;
  loadingGuide: boolean;
  onCloseGuide: () => void;
}

export default function RoadmapTab({
  analysis,
  profile,
  activeGuide,
  onFetchGuide,
  loadingGuide,
  onCloseGuide,
}: RoadmapTabProps) {
  const [completedWeeks, setCompletedWeeks] = useState<string[]>(["Week 1", "Week 2-3"]);
  const [showMentorModal, setShowMentorModal] = useState(false);
  const [mentorDate, setMentorDate] = useState("2026-06-15");
  const [mentorTime, setMentorTime] = useState("14:00");
  const [mentorBooked, setMentorBooked] = useState(false);

  const toggleWeekCompleted = (week: string) => {
    if (completedWeeks.includes(week)) {
      setCompletedWeeks(completedWeeks.filter((w) => w !== week));
    } else {
      setCompletedWeeks([...completedWeeks, week]);
    }
  };

  const handleBookMentor = (e: React.FormEvent) => {
    e.preventDefault();
    setMentorBooked(true);
    setTimeout(() => {
      setShowMentorModal(false);
      setMentorBooked(false);
      alert(`Mentor session booked successfully for ${mentorDate} at ${mentorTime}!`);
    }, 1500);
  };

  return (
    <div className="flex flex-col gap-6 select-none w-full px-1 py-1 pb-16 relative text-white">
      {/* Header Info */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display font-bold text-xl text-white">Product Strategy</h2>
          <p className="text-xs text-slate-400 mt-0.5 font-light">Gap-closing plan based on your analysis</p>
        </div>
        <div className="p-2.5 bg-white/10 border border-white/10 rounded-xl shadow-md">
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 items-start w-full">
        {/* Left Column (Focus & Mentorship) - 5 cols list on desktop */}
        <div className="lg:col-span-5 flex flex-col gap-6 w-full">
          {/* Current Focus Highlight Box */}
          <div className="bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-3xl p-5 shadow-lg flex flex-col gap-4">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold uppercase tracking-wider text-slate-400 font-display">Current Focus</span>
              <span className="bg-emerald-500 text-white rounded-md px-2.5 py-1 text-[10px] font-bold">Week 4</span>
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-white">Market Analysis Deep-Dive</h3>
              <p className="text-xs font-semibold text-rose-400 flex items-center gap-1 mt-1 font-mono">
                <span>⚠️</span> Addressing identified "Moderate" Gap
              </p>
            </div>

            {/* Focus Progress indicators */}
            <div className="w-full">
              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: "33%" }}></div>
              </div>
              <div className="flex justify-between text-[10px] text-slate-400 font-bold mt-2 font-mono">
                <span>33% Completed</span>
                <span>8 weeks left</span>
              </div>
            </div>

            {/* Split Stats parameters */}
            <div className="grid grid-cols-2 gap-3 border-t border-white/10 pt-4 text-center">
              <div>
                <span className="text-[9px] uppercase tracking-wider font-bold text-slate-400">Weekly Commitment</span>
                <p className="text-base font-bold text-white mt-0.5">6-8 hrs</p>
              </div>
              <div className="border-l border-white/10">
                <span className="text-[9px] uppercase tracking-wider font-bold text-slate-400">Goal Credential</span>
                <p className="text-base font-bold text-white mt-0.5">Level 2 Cert</p>
              </div>
            </div>
          </div>

          {/* Unlock Mentorship Banner representing image precisely */}
          <div className="bg-gradient-to-tr from-slate-900/90 to-blue-950/70 border border-white/10 text-white rounded-3xl p-5 shadow-xl flex items-start gap-4 relative overflow-hidden">
            {/* Abstract gear motif at top right corner */}
            <div className="absolute right-3 top-3 text-white/15 select-none pointer-events-none">
              <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 16h-2v-2h2v2zm0-4h-2V7h2v7z" />
              </svg>
            </div>

            <div className="p-3 bg-white/10 rounded-2xl border border-white/10">
              <MessageSquare size={20} className="text-slate-200" />
            </div>

            <div className="flex flex-col gap-3 relative z-10">
              <div>
                <h4 className="font-display font-bold text-sm tracking-tight text-white">Unlock Mentorship</h4>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  Get personalized feedback on your Week 4 worksheet from a Senior PM to bridge your analysis gap faster.
                </p>
              </div>
              <button
                onClick={() => setShowMentorModal(true)}
                className="self-start px-4 py-2 bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
              >
                Book a Session
              </button>
            </div>
          </div>
        </div>

        {/* Right Column (Milestones Timeline) - 7 cols list on desktop */}
        <div className="lg:col-span-7 relative w-full">
          <h3 className="font-display font-bold text-sm text-slate-300 mb-6 uppercase tracking-wider">
            Gap-Closing Milestones
          </h3>

          {/* Continuous Connecting Line representing image precisely */}
          <div className="absolute left-6 top-16 bottom-16 w-0.5 bg-white/10"></div>

          <div className="flex flex-col gap-8">
            {analysis.roadmap.map((item, idx) => {
              const isCompleted = completedWeeks.includes(item.week);
              const isActive = item.status === "active";
              const isLocked = item.status === "locked" && !isCompleted && !isActive;

              return (
                <div key={idx} className="flex gap-4 relative">
                  {/* Timeline Icon Marker */}
                  <div className="relative z-10 flex items-center justify-center">
                    {isCompleted ? (
                      <button
                        onClick={() => toggleWeekCompleted(item.week)}
                        className="w-12 h-12 bg-white/20 text-white rounded-full flex items-center justify-center border-4 border-slate-950 shadow-md transition-all cursor-pointer hover:bg-white/30"
                      >
                        <Check size={18} />
                      </button>
                    ) : isActive ? (
                      <button
                        onClick={() => toggleWeekCompleted(item.week)}
                        className="w-12 h-12 bg-emerald-500/10 text-emerald-400 border-4 border-emerald-500 rounded-full flex items-center justify-center shadow-lg cursor-pointer relative"
                      >
                        <div className="w-4.5 h-4.5 bg-emerald-500 rounded-full animate-pulse"></div>
                      </button>
                    ) : (
                      <div className="w-12 h-12 bg-white/[0.03] text-slate-500 rounded-full flex items-center justify-center border-4 border-slate-950 shadow-inner">
                        {isLocked ? <Lock size={15} /> : <div className="w-2.5 h-2.5 bg-slate-500 rounded-full" />}
                      </div>
                    )}
                  </div>

                  {/* Milestone Detail Card */}
                  <div
                    className={`flex-1 glass-card border rounded-3xl p-5 shadow-lg flex flex-col gap-3 transition-opacity ${
                      isLocked ? "opacity-55 border-white/5 bg-white/[0.01]" : "border-white/10"
                    }`}
                  >
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">
                          {item.week}
                        </span>
                        <h4 className={`text-sm font-bold mt-0.5 ${isLocked ? "text-slate-400 font-medium" : "text-white"}`}>
                          {item.title}
                        </h4>
                      </div>
                      {/* Badge resolved/active indicator */}
                      {isCompleted ? (
                        <span className="text-[9px] font-bold text-[#81cf87] bg-emerald-500/15 border border-emerald-500/20 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                          <Check size={8} /> Gap Resolved
                        </span>
                      ) : isActive ? (
                        <span className="text-[9px] font-bold text-[#ff6868] bg-rose-500/15 border border-rose-500/20 px-2.5 py-0.5 rounded-full uppercase">
                          🚨 Moderate Gap
                        </span>
                      ) : item.focusGap && item.focusGap.includes("Planning") ? (
                        <span className="text-[9px] font-bold text-[#f7b05b] bg-amber-500/15 border border-amber-500/20 px-2.5 py-0.5 rounded-full">
                          ⚠️ Critical Gap
                        </span>
                      ) : null}
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed font-light">{item.description}</p>

                    {/* Resource Actions / Clickables (strictly in active weeks) */}
                    {!isLocked && item.resources && item.resources.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-1">
                        {item.resources.map((res, rIdx) => (
                          <button
                            key={rIdx}
                            type="button"
                            onClick={() => onFetchGuide(res.title, item.title)}
                            className="flex items-center gap-2 px-3 py-2 border border-white/10 hover:border-white/20 bg-white/[0.05] hover:bg-white/[0.1] rounded-xl text-[10px] font-bold text-slate-200 transition-all cursor-pointer shadow-xs"
                          >
                            {res.type === "resource" ? <Play size={10} /> : <FileText size={10} />}
                            <span>{res.title}</span>
                            <span className="text-[8px] font-light text-slate-400">({res.duration})</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mentor Appointment Modal Dialog */}
      {showMentorModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6 z-50">
          <div className="glass-card rounded-3xl max-w-sm w-full p-6 shadow-2xl flex flex-col gap-4 text-white bg-slate-900/95 border border-white/15">
            <div className="flex items-center gap-2">
              <div className="bg-white/10 p-2 rounded-xl text-yellow-300 border border-white/10">
                <Sparkles size={18} />
              </div>
              <h3 className="font-display font-bold text-lg text-white">Book PM Mentor Session</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Select an available time slot below to sync with an industry mentor for live portfolio feedback and strategic coaching.
            </p>
            <form onSubmit={handleBookMentor} className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Available Date</label>
                <div className="relative text-white">
                  <Calendar size={14} className="absolute left-3 top-3.5 text-slate-400" />
                  <input
                    type="date"
                    value={mentorDate}
                    onChange={(e) => setMentorDate(e.target.value)}
                    className="w-full bg-white/[0.05] border border-white/15 p-2.5 pl-9 rounded-xl text-xs text-white"
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Preferred Time</label>
                <div className="relative text-white">
                  <Clock size={14} className="absolute left-3 top-3.5 text-slate-400" />
                  <select
                    value={mentorTime}
                    onChange={(e) => setMentorTime(e.target.value)}
                    className="w-full bg-slate-900 border border-white/15 p-2.5 pl-9 rounded-xl text-xs cursor-pointer text-white"
                  >
                    <option value="10:00">10:00 AM (PDT)</option>
                    <option value="12:30">12:30 PM (PDT)</option>
                    <option value="14:00">02:00 PM (PDT)</option>
                    <option value="16:30">04:30 PM (PDT)</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setShowMentorModal(false)}
                  className="py-3 border border-white/10 hover:bg-white/5 rounded-xl text-xs font-bold text-slate-400 cursor-pointer hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={mentorBooked}
                  className="py-3 bg-white hover:bg-slate-100 text-slate-950 font-bold rounded-xl text-xs cursor-pointer shadow-md disabled:opacity-50 transition-colors"
                >
                  {mentorBooked ? "Reserving..." : "Confirm Booking"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Dynamic Slide-Over Study Worksheet Panel fetched from Gemini backend */}
      {activeGuide && (
        <div className="fixed inset-y-0 right-0 max-w-md w-full bg-[#0a0d16]/95 backdrop-blur-3xl shadow-2xl z-50 flex flex-col border-l border-white/10 overflow-hidden transform transition-all">
          <div className="bg-white/[0.05] text-white p-5 flex items-center justify-between border-b border-white/10">
            <div>
              <span className="text-[10px] font-semibold text-emerald-400 tracking-wider uppercase font-mono">
                Active Study Workshop
              </span>
              <h3 className="font-display font-bold text-base leading-snug mt-0.5">{activeGuide.title}</h3>
            </div>
            <button
              onClick={onCloseGuide}
              className="p-1 px-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-xs font-bold transition-colors cursor-pointer text-white"
            >
              Close
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
            {/* Summary */}
            <div className="bg-white/[0.03] border border-white/10 p-4 rounded-2xl shadow-sm text-white">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
                Concept Overview
              </h4>
              <p className="text-xs text-slate-305 leading-relaxed font-light">{activeGuide.summary}</p>
            </div>

            {/* Takeaways */}
            <div className="bg-white/[0.03] border border-white/10 p-5 rounded-2xl shadow-sm text-white text-xs leading-relaxed font-light">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                Key Action Steps
              </h4>
              <ul className="flex flex-col gap-2.5 list-disc pl-4 text-slate-300">
                {activeGuide.keyTakeaways.map((item, id) => (
                  <li key={id}>{item}</li>
                ))}
              </ul>
            </div>

            {/* Interactive Exercises */}
            <div className="flex flex-col gap-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                Interactive Exercises
              </h4>
              {activeGuide.exercises.map((ex, id) => (
                <div key={id} className="bg-white/[0.03] border border-white/10 p-4 rounded-2xl flex flex-col gap-2 shadow-sm text-white">
                  <p className="text-xs font-semibold text-white">
                    Q{id + 1}: {ex.question}
                  </p>
                  <div className="bg-white/5 p-2.5 rounded-xl text-[10px] text-slate-300 border border-white/10 font-light italic">
                    <span className="font-bold text-emerald-400 not-italic block mb-0.5">💡 Mentorship Hint:</span>
                    {ex.hint}
                  </div>
                  <textarea
                    rows={2}
                    className="w-full bg-white/[0.05] border border-white/15 outline-none p-2.5 rounded-xl text-xs text-white mt-1 resize-none focus:border-white/30"
                    placeholder="Type your strategic draft here..."
                  />
                </div>
              ))}
            </div>

            {/* Deep Guide Content Panel */}
            <div className="bg-white/[0.03] border border-white/10 p-5 rounded-2xl flex flex-col gap-3 text-white">
              <h4 className="text-xs font-bold text-slate-300 flex items-center gap-1.5 font-display">
                Deep Guide Material
              </h4>
              <div className="text-xs text-slate-300 space-y-4 font-light leading-relaxed whitespace-pre-line">
                {activeGuide.guideContent}
              </div>
            </div>
          </div>

          <div className="bg-[#0a0d14]/80 border-t border-white/10 p-4 flex gap-3">
            <button
              onClick={onCloseGuide}
              className="w-full py-3 bg-white hover:bg-slate-100 text-slate-800 text-xs font-bold rounded-xl transition-colors cursor-pointer text-center shadow-lg"
            >
              Mark Reading as Finished
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
