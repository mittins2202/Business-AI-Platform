import { QuizAnswer } from '../types';
import { BusinessModel } from '../data/businessModels';

export const calculateBusinessMatch = (answers: QuizAnswer[], business: BusinessModel): number => {
  let score = 0;
  let totalWeight = 0;

  // Convert answers to a map for easier lookup
  const answerMap = new Map<string, string | number | string[]>();
  answers.forEach(answer => {
    answerMap.set(answer.questionId, answer.answer);
  });

  // Helper function to get answer value
  const getAnswer = (questionId: string): string | number | string[] | undefined => {
    return answerMap.get(questionId);
  };

  // Helper function to check if answer includes a value (for multi-select)
  const answerIncludes = (questionId: string, value: string): boolean => {
    const answer = getAnswer(questionId);
    if (Array.isArray(answer)) {
      return answer.includes(value);
    }
    return answer === value;
  };

  // Helper function to get scale answer as number
  const getScaleAnswer = (questionId: string): number => {
    const answer = getAnswer(questionId);
    return typeof answer === 'number' ? answer : 0;
  };

  // Scoring logic based on business model characteristics
  
  // 1. Time commitment matching (weight: 15)
  const timeCommitment = getAnswer('time-commitment');
  if (timeCommitment) {
    totalWeight += 15;
    if (business.difficulty === 'Beginner') {
      if (timeCommitment === 'Less than 5 hours' || timeCommitment === '5–10 hours') {
        score += 15;
      } else if (timeCommitment === '10–25 hours') {
        score += 10;
      } else {
        score += 5;
      }
    } else if (business.difficulty === 'Intermediate') {
      if (timeCommitment === '10–25 hours' || timeCommitment === '25+ hours') {
        score += 15;
      } else if (timeCommitment === '5–10 hours') {
        score += 8;
      } else {
        score += 3;
      }
    } else { // Advanced
      if (timeCommitment === '25+ hours') {
        score += 15;
      } else if (timeCommitment === '10–25 hours') {
        score += 10;
      } else {
        score += 2;
      }
    }
  }

  // 2. Investment matching (weight: 12)
  const investment = getAnswer('investment');
  if (investment) {
    totalWeight += 12;
    const businessInvestment = business.initialInvestment;
    
    if (investment === '$0') {
      if (businessInvestment.includes('$0') || businessInvestment.includes('$100')) {
        score += 12;
      } else {
        score += 2;
      }
    } else if (investment === 'Under $250') {
      if (businessInvestment.includes('$100') || businessInvestment.includes('$200') || businessInvestment.includes('$500')) {
        score += 12;
      } else if (businessInvestment.includes('$0')) {
        score += 10;
      } else {
        score += 4;
      }
    } else if (investment === '$250–$1,000') {
      if (businessInvestment.includes('$500') || businessInvestment.includes('$1,000')) {
        score += 12;
      } else {
        score += 6;
      }
    } else { // $1,000+
      if (businessInvestment.includes('$1,000') || businessInvestment.includes('$2,000') || businessInvestment.includes('$5,000')) {
        score += 12;
      } else {
        score += 4;
      }
    }
  }

  // 3. Income expectations (weight: 10)
  const targetIncome = getAnswer('target-income');
  if (targetIncome) {
    totalWeight += 10;
    const businessIncome = business.potentialIncome;
    
    if (targetIncome === 'Less than $500') {
      if (businessIncome.includes('$300') || businessIncome.includes('$500')) {
        score += 10;
      } else {
        score += 6;
      }
    } else if (targetIncome === '$500–$2,000') {
      if (businessIncome.includes('$500') || businessIncome.includes('$1,000') || businessIncome.includes('$2,000')) {
        score += 10;
      } else {
        score += 5;
      }
    } else if (targetIncome === '$2,000–$5,000') {
      if (businessIncome.includes('$2,000') || businessIncome.includes('$3,000') || businessIncome.includes('$4,000') || businessIncome.includes('$5,000')) {
        score += 10;
      } else {
        score += 6;
      }
    } else { // $5,000+
      if (businessIncome.includes('$5,000') || businessIncome.includes('$10,000') || businessIncome.includes('$15,000') || businessIncome.includes('$20,000')) {
        score += 10;
      } else {
        score += 4;
      }
    }
  }

  // 4. Tech skills matching (weight: 10)
  const techSkills = getScaleAnswer('tech-skills');
  if (techSkills > 0) {
    totalWeight += 10;
    const requiredSkills = business.requiredSkills.join(' ').toLowerCase();
    
    if (requiredSkills.includes('programming') || requiredSkills.includes('development') || requiredSkills.includes('technical')) {
      // High tech requirement
      if (techSkills >= 4) {
        score += 10;
      } else if (techSkills >= 3) {
        score += 6;
      } else {
        score += 2;
      }
    } else if (requiredSkills.includes('marketing') || requiredSkills.includes('social media') || requiredSkills.includes('design')) {
      // Medium tech requirement
      if (techSkills >= 3) {
        score += 10;
      } else if (techSkills >= 2) {
        score += 7;
      } else {
        score += 4;
      }
    } else {
      // Low tech requirement
      if (techSkills >= 2) {
        score += 10;
      } else {
        score += 8;
      }
    }
  }

  // 5. Risk tolerance (weight: 8)
  const riskTolerance = getScaleAnswer('risk-tolerance');
  if (riskTolerance > 0) {
    totalWeight += 8;
    
    if (business.category === 'Finance' || business.scalability === 'High') {
      // High risk businesses
      if (riskTolerance >= 4) {
        score += 8;
      } else if (riskTolerance >= 3) {
        score += 5;
      } else {
        score += 2;
      }
    } else if (business.difficulty === 'Advanced') {
      // Medium risk
      if (riskTolerance >= 3) {
        score += 8;
      } else if (riskTolerance >= 2) {
        score += 6;
      } else {
        score += 3;
      }
    } else {
      // Lower risk
      if (riskTolerance >= 2) {
        score += 8;
      } else {
        score += 6;
      }
    }
  }

  // 6. Communication preferences (weight: 8)
  const communication = getScaleAnswer('communication');
  const clientCalls = getAnswer('client-calls');
  if (communication > 0 || clientCalls) {
    totalWeight += 8;
    const requiresDirectCommunication = business.requiredSkills.some(skill => 
      skill.toLowerCase().includes('communication') || 
      skill.toLowerCase().includes('customer service') ||
      skill.toLowerCase().includes('teaching') ||
      skill.toLowerCase().includes('sales')
    );
    
    if (requiresDirectCommunication) {
      if (communication >= 4 && clientCalls === 'Yes') {
        score += 8;
      } else if (communication >= 3) {
        score += 6;
      } else if (clientCalls === 'Yes') {
        score += 4;
      } else {
        score += 2;
      }
    } else {
      if (communication <= 2 && clientCalls === 'No') {
        score += 8;
      } else {
        score += 6;
      }
    }
  }

  // 7. Creativity matching (weight: 7)
  const creativity = getScaleAnswer('creativity');
  if (creativity > 0) {
    totalWeight += 7;
    
    if (business.category === 'Creative') {
      if (creativity >= 4) {
        score += 7;
      } else if (creativity >= 3) {
        score += 5;
      } else {
        score += 2;
      }
    } else {
      if (creativity >= 3) {
        score += 7;
      } else {
        score += 5;
      }
    }
  }

  // 8. Social media interest (weight: 6)
  const socialMedia = getScaleAnswer('social-media');
  if (socialMedia > 0) {
    totalWeight += 6;
    
    if (business.id === 'social-media-management' || business.id === 'content-creation-influencing') {
      if (socialMedia >= 4) {
        score += 6;
      } else if (socialMedia >= 3) {
        score += 4;
      } else {
        score += 1;
      }
    } else {
      if (socialMedia >= 3) {
        score += 6;
      } else {
        score += 4;
      }
    }
  }

  // 9. Passive income preference (weight: 6)
  const passiveIncome = getScaleAnswer('passive-income');
  if (passiveIncome > 0) {
    totalWeight += 6;
    
    const isPassiveIncomeModel = business.id === 'affiliate-marketing' || 
                                business.id === 'online-course' || 
                                business.id === 'print-on-demand' ||
                                business.id === 'digital-product-creation' ||
                                business.id === 'investing-trading';
    
    if (isPassiveIncomeModel) {
      if (passiveIncome >= 4) {
        score += 6;
      } else if (passiveIncome >= 3) {
        score += 4;
      } else {
        score += 2;
      }
    } else {
      if (passiveIncome <= 2) {
        score += 6;
      } else {
        score += 4;
      }
    }
  }

  // 10. Self-motivation (weight: 5)
  const selfMotivation = getScaleAnswer('self-motivation');
  if (selfMotivation > 0) {
    totalWeight += 5;
    
    if (selfMotivation >= 4) {
      score += 5;
    } else if (selfMotivation >= 3) {
      score += 4;
    } else {
      score += 2;
    }
  }

  // 11. Organization skills (weight: 4)
  const organization = getScaleAnswer('organization');
  if (organization > 0) {
    totalWeight += 4;
    
    if (business.difficulty === 'Advanced' || business.category === 'Service') {
      if (organization >= 4) {
        score += 4;
      } else if (organization >= 3) {
        score += 3;
      } else {
        score += 1;
      }
    } else {
      if (organization >= 3) {
        score += 4;
      } else {
        score += 3;
      }
    }
  }

  // Calculate final percentage
  if (totalWeight === 0) return 0;
  
  const percentage = Math.round((score / totalWeight) * 100);
  
  // Ensure minimum variance and cap at 100%
  return Math.min(100, Math.max(25, percentage));
};

export const getUserProfile = (answers: QuizAnswer[]) => {
  const answerMap = new Map<string, string | number | string[]>();
  answers.forEach(answer => {
    answerMap.set(answer.questionId, answer.answer);
  });

  const getAnswer = (questionId: string): string | number | string[] | undefined => {
    return answerMap.get(questionId);
  };

  const getScaleAnswer = (questionId: string): number => {
    const answer = getAnswer(questionId);
    return typeof answer === 'number' ? answer : 0;
  };

  return {
    motivation: getAnswer('motivation') as string || 'Not specified',
    timeCommitment: getAnswer('time-commitment') as string || 'Not specified',
    personalityTraits: [
      `Organization: ${getScaleAnswer('organization')}/5`,
      `Self-motivation: ${getScaleAnswer('self-motivation')}/5`,
      `Risk tolerance: ${getScaleAnswer('risk-tolerance')}/5`,
      `Creativity: ${getScaleAnswer('creativity')}/5`
    ],
    riskTolerance: `${getScaleAnswer('risk-tolerance')}/5`,
    techSkills: `${getScaleAnswer('tech-skills')}/5`
  };
};