import { QuizAnswer } from '../types';
import { BusinessModel } from '../data/businessModels';

export interface AIAnalysis {
  matchScore: number; // 0-100
  strengths: string[];
  challenges: string[];
  insights: string[];
  recommendations: string[];
}

export function generateAIAnalysis(business: BusinessModel, answers: QuizAnswer[]): AIAnalysis {
  const getAnswer = (questionId: string) => {
    const answer = answers.find(a => a.questionId === questionId);
    return answer?.answer;
  };

  let matchScore = 50; // Start with base score
  const strengths: string[] = [];
  const challenges: string[] = [];
  const insights: string[] = [];
  const recommendations: string[] = [];

  // Analyze time commitment match
  const userTime = getAnswer('time-commitment') as string;
  if (userTime?.includes('25+') && business.timeCommitment.includes('20+')) {
    matchScore += 15;
    strengths.push('Your available time aligns perfectly with this business model');
  } else if (userTime?.includes('Less than 5') && business.timeCommitment.includes('20+')) {
    matchScore -= 10;
    challenges.push('This business requires more time than you currently have available');
    recommendations.push('Consider starting part-time and gradually increasing your commitment');
  }

  // Analyze investment comfort
  const userInvestment = getAnswer('investment') as string;
  if (userInvestment === '$0' && business.initialInvestment.includes('$0')) {
    matchScore += 10;
    strengths.push('Perfect fit - this business requires no upfront investment');
  } else if (userInvestment?.includes('$1,000+') && business.initialInvestment.includes('$500+')) {
    matchScore += 5;
    strengths.push('Your investment budget supports this business model');
  }

  // Analyze tech comfort vs requirements
  const techSkills = getAnswer('tech-skills') as number || 3;
  if (techSkills >= 4 && business.requiredSkills.includes('Basic tech skills')) {
    matchScore += 10;
    strengths.push('Your strong tech skills give you a significant advantage');
  } else if (techSkills <= 2 && business.requiredSkills.includes('Basic tech skills')) {
    matchScore -= 5;
    challenges.push('This business requires technical skills you may need to develop');
    recommendations.push('Consider taking online courses to improve your technical abilities');
  }

  // Analyze communication comfort
  const communicationScore = getAnswer('communication') as number || 3;
  const publicFaceScore = getAnswer('public-face') as number || 3;
  
  if (communicationScore >= 4 && business.requiredSkills.includes('Communication')) {
    matchScore += 10;
    strengths.push('Your communication skills are perfectly suited for this business');
  } else if (communicationScore <= 2 && business.requiredSkills.includes('Communication')) {
    challenges.push('This business involves significant client interaction');
    recommendations.push('Practice your communication skills or consider written-first approaches');
  }

  // Analyze creativity match
  const creativityScore = getAnswer('creativity') as number || 3;
  if (creativityScore >= 4 && business.category === 'Creative') {
    matchScore += 15;
    strengths.push('Your creative abilities are a perfect match for this business type');
  }

  // Analyze motivation alignment
  const motivation = getAnswer('motivation') as string;
  if (motivation?.includes('Financial freedom') && business.potentialIncome.includes('$5,000+')) {
    matchScore += 5;
    insights.push('This business has the income potential to support your financial goals');
  } else if (motivation?.includes('Purpose') && business.category === 'Education') {
    matchScore += 10;
    insights.push('This business aligns with your desire to make a meaningful impact');
  }

  // Analyze risk tolerance
  const riskTolerance = getAnswer('risk-tolerance') as number || 3;
  if (riskTolerance <= 2 && business.initialInvestment.includes('$0')) {
    matchScore += 5;
    insights.push('The low financial risk matches your cautious approach');
  } else if (riskTolerance >= 4 && business.scalability === 'High') {
    matchScore += 5;
    insights.push('Your comfort with risk positions you well for high-growth opportunities');
  }

  // Analyze consistency and self-motivation
  const consistency = getAnswer('consistency') as number || 3;
  const selfMotivation = getAnswer('self-motivation') as number || 3;
  
  if (consistency >= 4 && selfMotivation >= 4) {
    matchScore += 10;
    strengths.push('Your consistency and self-motivation are key success factors');
  } else if (consistency <= 2 || selfMotivation <= 2) {
    challenges.push('This business requires consistent effort and self-discipline');
    recommendations.push('Set up accountability systems and start with small, manageable goals');
  }

  // Analyze work style preferences
  const workStyle = getAnswer('work-style') as string;
  if (workStyle?.includes('Solo') && !business.requiredSkills.includes('Team coordination')) {
    matchScore += 5;
    insights.push('This business allows you to work independently, matching your preference');
  }

  // Analyze timeline expectations
  const firstIncome = getAnswer('first-income') as string;
  if (firstIncome?.includes('Under 1 month') && !business.timeToStart.includes('1-2 weeks')) {
    challenges.push('Your income timeline may be optimistic for this business model');
    recommendations.push('Allow more time for initial setup and first sales');
  }

  // Ensure we have enough content
  if (strengths.length === 0) {
    strengths.push('This business model offers good opportunities for your profile');
  }
  
  if (insights.length === 0) {
    insights.push('This business provides a balanced approach to building income');
  }
  
  if (recommendations.length === 0) {
    recommendations.push('Focus on your existing strengths while developing new skills gradually');
  }

  // Cap the match score
  matchScore = Math.min(100, Math.max(20, matchScore));

  return {
    matchScore,
    strengths,
    challenges,
    insights,
    recommendations
  };
}

export function getMatchColor(score: number): string {
  if (score >= 80) return 'text-green-600';
  if (score >= 60) return 'text-yellow-600';
  return 'text-red-600';
}

export function getMatchLabel(score: number): string {
  if (score >= 80) return 'Excellent Match';
  if (score >= 60) return 'Good Match';
  if (score >= 40) return 'Fair Match';
  return 'Needs Work';
}