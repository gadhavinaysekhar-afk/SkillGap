import React, { useState } from "react";
import { Sparkles, Brain, GitCompare, ChevronRight, Play, Compass, ArrowRight, UserCheck } from "lucide-react";
import { motion } from "motion/react";
import { SkillAnalysis, UserProfile } from "../types";

interface ComparePathsTabProps {
  analysis: SkillAnalysis;
  profile: UserProfile;
  loadingQuiz: boolean;
  quizResult: { recommendedPivot: string; matchReason: string; nextSteps: string[] } | null;
  onRunQuiz: (answers: string[]) => void;
  onClearQuiz: () => void;
}

const QUIZ_QUESTIONS = [
  {
    text: "What drives you most during a professional campaign?",
    options: [
      { text: "Architecting logical frameworks & data pipelines", value: "data-logical" },
      { text: "Polishing fine visual touches & product aesthetics", value: "visual-creative" },
      { text: "Structuring business growth plans & ROI metrics", value: "business-strategic" }
    ]
  },
  {
    text: "How do you prefer to interact inside team cohorts?",
    options: [
      { text: "Facilitating cross-team collaboration & alignment", value: "collaborator" },
      { text: "Owning high-complexity individual technical challenges", value: "solo-champion" },
      { text: "Presenting metrics & progress directly to executives", value: "communicator" }
    ]
  },
  {
    text: "If you had 3 hours to self-study, which would you pick?",
    options: [
      { text: "Complex charting engines & d3 dashboards", value: "chart-vis" },
      { text: "A/B landing experiments & user conversion models", value: "marketing-psych" },
      { text: "Strategic market mapping & risk mitigation plans", value: "business-risk" }
    ]
  }
];

export default function ComparePathsTab({
  analysis,
  profile,
  loadingQuiz,
  quizResult,
  onRunQuiz,
  onClearQuiz,
}: ComparePathsTabProps) {
  const [quizActive, setQuizActive] = useState(false);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [selectedDetails, setSelectedDetails] = useState<typeof analysis.alternativePaths[0] | null>(null);

  const selectOption = (optValue: string) => {
    const nextAnswers = [...userAnswers, optValue];
    setUserAnswers(nextAnswers);

    if (currentQuestionIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
    } else {
      // Completed last question, submit answers list to AI!
      onRunQuiz(nextAnswers);
    }
  };

  const handleStartQuiz = () => {
    setQuizActive(true);
    setCurrentQuestionIdx(0);
    setUserAnswers([]);
    onClearQuiz();
  };

  const handleExitQuiz = () => {
    setQuizActive(false);
    onClearQuiz();
  };

  return (
    <div className="flex flex-col gap-6 select-none w-full px-1 py-1 pb-16 relative text-white">
      {/* Quiz Overlay screen */}
      {quizActive && (
        <div className="absolute inset-x-0 top-0 bg-[#070b16] min-h-screen z-30 flex flex-col gap-6 text-white pb-20">
          <div className="bg-white/[0.04] border-b border-white/10 p-5 flex items-center justify-between">
            <h3 className="font-display font-bold text-sm">Wildcard Pivot Explorer</h3>
            <button
              onClick={handleExitQuiz}
              className="text-xs px-2.5 py-1 bg-white/10 hover:bg-white/20 border border-white/20 rounded-md text-white cursor-pointer"
            >
              Exit
            </button>
          </div>

          <div className="flex-1 px-5 py-6 flex flex-col justify-between">
            {!quizResult && !loadingQuiz ? (
              // Active question
              <div className="flex-1 flex flex-col justify-center gap-8">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase font-mono">
                    Question {currentQuestionIdx + 1} of {QUIZ_QUESTIONS.length}
                  </span>
                  <h4 className="font-display font-medium text-lg text-white mt-2 leading-snug">
                    {QUIZ_QUESTIONS[currentQuestionIdx].text}
                  </h4>
                </div>

                <div className="flex flex-col gap-3">
                  {QUIZ_QUESTIONS[currentQuestionIdx].options.map((opt, oIdx) => (
                    <button
                      key={oIdx}
                      type="button"
                      onClick={() => selectOption(opt.value)}
                      className="w-full text-left px-5 py-4 border border-white/10 hover:border-white/25 bg-white/[0.04] hover:bg-white/[0.08] rounded-2xl text-xs font-semibold text-slate-200 hover:text-white transition-all cursor-pointer shadow-sm"
                    >
                      {opt.text}
                    </button>
                  ))}
                </div>
              </div>
            ) : loadingQuiz ? (
              // Quiz Loading
              <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center">
                <Brain className="w-12 h-12 text-emerald-400 animate-pulse" />
                <div>
                  <h4 className="font-semibold text-white text-sm">Reasoning Gaps pivot...</h4>
                  <p className="text-[10px] text-slate-400 mt-1">Our server-side Gemini model is mapping your inputs.</p>
                </div>
              </div>
            ) : (
              // Result Card
              <div className="flex-1 flex flex-col gap-6">
                <div className="text-center">
                  <div className="w-14 h-14 bg-white/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-3 border border-white/10 shadow-md">
                    <Sparkles size={24} />
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none block">
                    Ideal Surprise Fit
                  </span>
                  <h3 className="font-display font-extrabold text-2xl text-white mt-1 leading-none tracking-tight">
                    {quizResult?.recommendedPivot}
                  </h3>
                </div>

                <div className="glass-card border border-white/10 p-5 rounded-2xl shadow-md text-white">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5 font-mono">Match Reasoning</h4>
                  <p className="text-xs text-slate-300 leading-relaxed font-light">{quizResult?.matchReason}</p>
                </div>

                <div className="glass-card border border-white/10 p-5 rounded-2xl shadow-md text-white">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 font-mono">Next Action steps</h4>
                  <div className="flex flex-col gap-3">
                    {quizResult?.nextSteps.map((step, sIdx) => (
                      <div key={sIdx} className="flex gap-2 text-xs text-slate-300 leading-relaxed font-light">
                        <span className="text-emerald-400 font-bold">•</span>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleStartQuiz}
                  className="w-full py-4 bg-white hover:bg-slate-100 text-slate-950 text-xs font-extrabold rounded-2xl transition-all shadow-md cursor-pointer mt-auto"
                >
                  Restart Wildcard Quiz
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Main explores page layout */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display font-bold text-xl text-white">Explore & Compare</h2>
          <p className="text-xs text-slate-400 mt-0.5">Paths for your profile</p>
        </div>
      </div>

      <p className="text-xs text-slate-300 leading-relaxed font-light">
        Compare recommended career pivots side-by-side to see what alignment fits your future goals best.
      </p>

      {/* Top Strengths capsule box representing screenshot precisamente */}
      <div className="glass-card border border-white/10 rounded-3xl p-5 shadow-lg flex flex-col gap-3 text-white">
        <div className="flex items-center gap-2">
          <Brain size={14} className="text-slate-400" />
          <h3 className="text-[10px] font-bold text-slate-400 tracking-widest uppercase font-mono">Your Top Strengths</h3>
        </div>
        <div className="flex flex-wrap gap-1.5 mt-1">
          <span className="text-xs px-3 py-1.5 bg-white/5 text-white border border-white/10 rounded-xl font-medium">
            Strategic Synthesis
          </span>
          <span className="text-xs px-3 py-1.5 bg-white/5 text-white border border-white/10 rounded-xl font-medium">
            Systems Thinking
          </span>
          <span className="text-xs px-3 py-1.5 bg-white/5 text-white border border-white/10 rounded-xl font-medium">
            Agility
          </span>
        </div>
      </div>

      {/* Top matches layout */}
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-baseline">
          <h3 className="font-display font-bold text-sm text-slate-300 uppercase tracking-wider">Top Matches</h3>
          <span className="text-[10px] text-slate-400 font-bold flex items-center gap-1 font-mono md:hidden">
            Scroll to compare <ArrowRight size={10} />
          </span>
        </div>

        {/* Horizontal scroll grid card layout exactly matching the image, now styled with grid on wide viewports */}
        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-x-auto md:overflow-x-visible pb-4 scroll-smooth pr-1 md:pr-0">
          {analysis.alternativePaths.map((pathItem, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 w-72 md:w-full bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-3xl p-5 shadow-lg flex flex-col gap-4 text-white hover:border-white/20 transition-all"
            >
              <div className="relative">
                {/* Match Badge item */}
                <span className="absolute top-3 left-3 bg-emerald-500/95 text-white rounded-md px-2.5 py-1 text-[10px] font-bold z-10 shadow-sm">
                  {pathItem.matchPercent}% Match
                </span>
                {/* Mock image mockup layout card */}
                <div className="h-32 bg-slate-950/80 border border-white/10 rounded-2xl overflow-hidden shadow-inner flex items-center justify-center p-2 relative text-white">
                  {/* Subtle dashboard lines resembling the desktop vector chart precisely */}
                  <div className="absolute inset-0 bg-[radial-gradient(#ffffff04_1px,transparent_1px)] [background-size:10px_10px]" />
                  <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center select-none bg-white/5">
                    <svg className="w-12 h-12 stroke-[1.5] text-emerald-400/40 animate-pulse" viewBox="0 0 24 24" fill="none">
                      <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5" />
                    </svg>
                  </div>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase font-mono">
                  {pathItem.growthType}
                </span>
                <h4 className="font-display font-bold text-base text-white leading-snug mt-0.5">
                  {pathItem.title}
                </h4>
              </div>

              <div className="border-t border-white/10 pt-3 flex flex-col gap-2 text-xs font-light">
                <div>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider font-mono">Key Focus</span>
                  <p className="text-slate-300 leading-normal mt-0.5 font-light">{pathItem.keyFocus}</p>
                </div>

                <div>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider font-mono">Skill Gap</span>
                  <p className="text-slate-200 mt-0.5 font-semibold">Minimal gap ({pathItem.skillGapPercent || 15}%)</p>
                </div>

                <div>
                  <span className="text-[9px] font-bold text-rose-300 bg-rose-500/10 border border-rose-500/15 px-1.5 py-0.5 rounded-md mt-1 inline-block font-mono">
                    Salary Outlook
                  </span>
                  <p className="text-sm font-bold text-white mt-0.5 leading-snug">{pathItem.salaryRange}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedDetails(pathItem)}
                className="w-full py-2.5 bg-white/10 border border-white/10 hover:bg-white/15 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer mt-auto"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Want a Wildcard Career Quiz Section Card with elegant structure */}
      <div className="border-2 border-dashed border-white/20 bg-white/[0.02] rounded-3xl p-6 flex flex-col items-center justify-center text-center mt-3 shadow-md">
        <div className="w-12 h-12 bg-white/10 text-white rounded-full flex items-center justify-center shadow-inner mb-4 border border-white/10">
          <Compass size={20} className="text-slate-300" />
        </div>
        <h3 className="font-display font-bold text-white text-base leading-snug">Want a wildcard?</h3>
        <p className="text-xs text-slate-300 leading-relaxed max-w-sm mt-1.5 font-light">
          Discover roles that match your hidden potential, not just your career history.
        </p>
        <button
          onClick={handleStartQuiz}
          type="button"
          className="px-6 py-3 bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer mt-4"
        >
          Start Wildcard Quiz
        </button>
      </div>

      {/* Beautiful Details Modal to replace unsafe iframe alert */}
      {selectedDetails && (
        <div className="fixed inset-0 bg-[#070b16]/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-950/95 border border-white/15 rounded-3xl max-w-md w-full p-6 shadow-2xl relative animate-fadeIn">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest font-mono">
                  {selectedDetails.matchPercent}% Match Recommendation
                </span>
                <h3 className="font-display font-bold text-xl text-white mt-1 leading-snug">
                  {selectedDetails.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedDetails(null)}
                className="text-slate-400 hover:text-white p-1 hover:bg-white/10 rounded-lg text-xs"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-col gap-4 text-xs">
              <div className="p-4 bg-white/[0.04] border border-white/10 rounded-2xl">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Key Focus Area</span>
                <p className="text-slate-200 leading-relaxed font-light">{selectedDetails.keyFocus}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="p-3 bg-white/[0.04] border border-white/10 rounded-2xl">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Pathway Type</span>
                  <p className="text-xs font-semibold text-white mt-1">{selectedDetails.growthType}</p>
                </div>
                <div className="p-3 bg-white/[0.04] border border-white/10 rounded-2xl">
                  <span className="text-[9px] font-bold text-rose-300 uppercase tracking-widest block">Expected Salary</span>
                  <p className="text-xs font-semibold text-white mt-1">{selectedDetails.salaryRange}</p>
                </div>
              </div>

              <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-start gap-2.5">
                <UserCheck size={16} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-emerald-300">Recommended Next Step</h4>
                  <p className="text-slate-300 mt-0.5 leading-relaxed font-light">
                    Recommended training path has been successfully unlocked! You can proceed with target credentials on the roadmap.
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setSelectedDetails(null)}
              className="w-full mt-6 py-3 bg-white hover:bg-slate-100 text-slate-950 font-bold rounded-xl shadow-md transition-all cursor-pointer"
            >
              Continue Explore
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
