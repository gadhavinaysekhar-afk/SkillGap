export interface Strength {
  name: string;
  matchPercent: number;
}

export interface SkillToDevelop {
  name: string;
  currentPercent: number;
  description: string;
}

export interface ResourceItem {
  title: string;
  type: string; // 'resource' | 'worksheet'
  duration: string;
}

export interface RoadmapItem {
  week: string;
  title: string;
  description: string;
  status: string; // 'resolved' | 'active' | 'locked'
  focusGap: string;
  resources?: ResourceItem[];
}

export interface AlternativePath {
  title: string;
  growthType: string;
  keyFocus: string;
  matchPercent: number;
  salaryRange: string;
  skillGapPercent: number;
}

export interface UserProfile {
  fullName: string;
  targetRole: string;
  course: string;
  currentYear: string;
  currentSkills: string;
  avatarUrl: string;
  badges: string[];
  focusTimeHours: number;
  learningLevel: number;
}

export interface SkillAnalysis {
  readinessScore: number;
  strengths: Strength[];
  skillsToDevelop: SkillToDevelop[];
  priorityFocus: string[];
  roadmap: RoadmapItem[];
  alternativePaths: AlternativePath[];
}

export interface GuideData {
  title: string;
  summary: string;
  keyTakeaways: string[];
  exercises: { question: string; hint: string }[];
  guideContent: string;
}
