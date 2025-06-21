export interface QuizQuestion {
  id: string;
  question: string;
  type: 'multiple-choice' | 'scale' | 'multi-select' | 'yes-no';
  options?: string[];
  scaleMin?: number;
  scaleMax?: number;
  category: 'motivation' | 'time-effort' | 'personality' | 'tools' | 'strategy' | 'business-fit';
}

export interface QuizAnswer {
  questionId: string;
  answer: string | number | string[];
}

export interface BusinessModel {
  id: string;
  name: string;
  description: string;
  strengths: string[];
  weaknesses: string[];
  struggles: string[];
  solutions: string[];
  personality: string[];
  marketSize: string;
  incomeTiers: {
    beginner: string;
    intermediate: string;
    advanced: string;
  };
  resources: {
    platforms: string[];
    tools: string[];
    learning: string[];
  };
  startupCost: 'low' | 'medium' | 'high';
  timeToProfit: 'fast' | 'medium' | 'slow';
  scalability: 'low' | 'medium' | 'high';
}

export interface BusinessRecommendation {
  businessModel: BusinessModel;
  matchPercentage: number;
  reasoning: string[];
}

export interface QuizResult {
  recommendations: BusinessRecommendation[];
  userProfile: {
    motivation: string;
    timeCommitment: string;
    personalityTraits: string[];
    riskTolerance: string;
    techSkills: string;
  };
}