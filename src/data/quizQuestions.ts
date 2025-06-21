import { QuizQuestion } from '../types';

export const quizQuestions: QuizQuestion[] = [
  // Round 1: Motivation & Vision
  {
    id: 'motivation',
    question: 'What is your main motivation for starting a business?',
    type: 'multiple-choice',
    category: 'motivation',
    options: [
      'Financial freedom',
      'Flexibility and autonomy',
      'Purpose and impact',
      'Creativity and passion'
    ]
  },
  {
    id: 'first-income',
    question: 'How soon do you want to earn your first $100?',
    type: 'multiple-choice',
    category: 'motivation',
    options: [
      'Under 1 month',
      '1–3 months',
      '3–6 months',
      'No rush'
    ]
  },
  {
    id: 'target-income',
    question: 'What monthly income would make you feel successful 12 months from now?',
    type: 'multiple-choice',
    category: 'motivation',
    options: [
      'Less than $500',
      '$500–$2,000',
      '$2,000–$5,000',
      '$5,000+'
    ]
  },
  {
    id: 'investment',
    question: 'How much money are you willing to invest upfront?',
    type: 'multiple-choice',
    category: 'motivation',
    options: [
      '$0',
      'Under $250',
      '$250–$1,000',
      '$1,000+'
    ]
  },
  {
    id: 'passion-importance',
    question: 'How important is it that your business reflects your personal identity or passion?',
    type: 'scale',
    category: 'motivation',
    scaleMin: 1,
    scaleMax: 5
  },
  {
    id: 'exit-strategy',
    question: 'Do you want to eventually sell or exit your business?',
    type: 'multiple-choice',
    category: 'motivation',
    options: ['Yes', 'No', 'Not sure']
  },
  {
    id: 'business-size',
    question: 'How large do you want your business to grow?',
    type: 'multiple-choice',
    category: 'motivation',
    options: [
      'Just a side income',
      'Full-time income',
      'Multi-6-figure brand',
      'A widely recognized company'
    ]
  },
  {
    id: 'passive-income',
    question: 'How important is long-term passive income to you?',
    type: 'scale',
    category: 'motivation',
    scaleMin: 1,
    scaleMax: 5
  },

  // Round 2: Time, Effort & Learning Style
  {
    id: 'time-commitment',
    question: 'How many hours per week can you realistically dedicate to your business?',
    type: 'multiple-choice',
    category: 'time-effort',
    options: [
      'Less than 5 hours',
      '5–10 hours',
      '10–25 hours',
      '25+ hours'
    ]
  },
  {
    id: 'consistency',
    question: 'How consistent are you with long-term goals?',
    type: 'scale',
    category: 'time-effort',
    scaleMin: 1,
    scaleMax: 5
  },
  {
    id: 'trial-error',
    question: 'How do you feel about trial and error?',
    type: 'scale',
    category: 'time-effort',
    scaleMin: 1,
    scaleMax: 5
  },
  {
    id: 'learning-style',
    question: 'How do you prefer to learn new things?',
    type: 'multiple-choice',
    category: 'time-effort',
    options: [
      'Hands-on',
      'Watching tutorials',
      'Reading/self-study',
      'One-on-one coaching'
    ]
  },
  {
    id: 'routines',
    question: 'How much do you enjoy building routines or systems?',
    type: 'scale',
    category: 'time-effort',
    scaleMin: 1,
    scaleMax: 5
  },
  {
    id: 'discouragement',
    question: 'How discouraged do you get if something doesn\'t work right away?',
    type: 'scale',
    category: 'time-effort',
    scaleMin: 1,
    scaleMax: 5
  },
  {
    id: 'learning-tools',
    question: 'Are you willing to learn new tools or software platforms?',
    type: 'multiple-choice',
    category: 'time-effort',
    options: ['Yes', 'No']
  },

  // Round 3: Personality & Preferences
  {
    id: 'organization',
    question: 'How organized are you?',
    type: 'scale',
    category: 'personality',
    scaleMin: 1,
    scaleMax: 5
  },
  {
    id: 'self-motivation',
    question: 'How self-motivated are you without external pressure?',
    type: 'scale',
    category: 'personality',
    scaleMin: 1,
    scaleMax: 5
  },
  {
    id: 'uncertainty',
    question: 'How well do you handle uncertainty and unclear steps?',
    type: 'scale',
    category: 'personality',
    scaleMin: 1,
    scaleMax: 5
  },
  {
    id: 'repetitive-tasks',
    question: 'How do you feel about repetitive tasks?',
    type: 'multiple-choice',
    category: 'personality',
    options: [
      'I avoid them',
      'I tolerate them',
      'I don\'t mind them',
      'I enjoy them'
    ]
  },
  {
    id: 'work-style',
    question: 'Do you prefer working solo or collaborating?',
    type: 'multiple-choice',
    category: 'personality',
    options: [
      'Solo only',
      'Mostly solo',
      'Team-oriented',
      'I like both'
    ]
  },
  {
    id: 'public-face',
    question: 'How comfortable are you being the face of a brand (e.g., social media, video)?',
    type: 'scale',
    category: 'personality',
    scaleMin: 1,
    scaleMax: 5
  },
  {
    id: 'competitiveness',
    question: 'How competitive are you?',
    type: 'scale',
    category: 'personality',
    scaleMin: 1,
    scaleMax: 5
  },
  {
    id: 'creativity',
    question: 'How much do you enjoy creative work (design, writing, ideation)?',
    type: 'scale',
    category: 'personality',
    scaleMin: 1,
    scaleMax: 5
  },
  {
    id: 'communication',
    question: 'How much do you enjoy direct communication with others (support, coaching, service)?',
    type: 'scale',
    category: 'personality',
    scaleMin: 1,
    scaleMax: 5
  },
  {
    id: 'structure',
    question: 'How much structure do you prefer in your work?',
    type: 'multiple-choice',
    category: 'personality',
    options: [
      'Clear steps and order',
      'Some structure',
      'Mostly flexible',
      'Total freedom'
    ]
  },

  // Round 4: Tools & Work Environment
  {
    id: 'tech-skills',
    question: 'How would you rate your tech skills overall?',
    type: 'scale',
    category: 'tools',
    scaleMin: 1,
    scaleMax: 5
  },
  {
    id: 'workspace',
    question: 'Do you have a consistent, quiet workspace?',
    type: 'multiple-choice',
    category: 'tools',
    options: ['Yes', 'No']
  },
  {
    id: 'support-system',
    question: 'How strong is your personal support system?',
    type: 'multiple-choice',
    category: 'tools',
    options: [
      'None',
      'One or two people',
      'A small but helpful group',
      'Very strong support'
    ]
  },
  {
    id: 'internet-access',
    question: 'How reliable is your access to internet and devices?',
    type: 'scale',
    category: 'tools',
    scaleMin: 1,
    scaleMax: 5
  },
  {
    id: 'familiar-tools',
    question: 'Which tools are you already familiar with?',
    type: 'multi-select',
    category: 'tools',
    options: [
      'Google Docs/Sheets',
      'Canva',
      'Notion',
      'Shopify/Wix/Squarespace',
      'Zoom/StreamYard',
      'None of the above'
    ]
  },

  // Round 5: Strategy & Decision-Making
  {
    id: 'decision-making',
    question: 'How do you typically make decisions?',
    type: 'multiple-choice',
    category: 'strategy',
    options: [
      'Quickly and instinctively',
      'After some research',
      'With a logical process',
      'After talking to others'
    ]
  },
  {
    id: 'risk-tolerance',
    question: 'How comfortable are you taking risks?',
    type: 'scale',
    category: 'strategy',
    scaleMin: 1,
    scaleMax: 5
  },
  {
    id: 'feedback-response',
    question: 'How do you usually respond to negative feedback or rejection?',
    type: 'scale',
    category: 'strategy',
    scaleMin: 1,
    scaleMax: 5
  },
  {
    id: 'path-preference',
    question: 'Do you prefer following proven paths or creating your own?',
    type: 'multiple-choice',
    category: 'strategy',
    options: [
      'Proven paths',
      'A mix',
      'Mostly original',
      'I want to build something new'
    ]
  },
  {
    id: 'control',
    question: 'How important is it for you to stay in full control of your business decisions?',
    type: 'scale',
    category: 'strategy',
    scaleMin: 1,
    scaleMax: 5
  },

  // Round 6: Business Model Fit Filters
  {
    id: 'online-presence',
    question: 'Are you comfortable having your face and voice online?',
    type: 'multiple-choice',
    category: 'business-fit',
    options: ['Yes', 'No']
  },
  {
    id: 'client-calls',
    question: 'Would you be okay talking to clients on Zoom or by phone?',
    type: 'multiple-choice',
    category: 'business-fit',
    options: ['Yes', 'No']
  },
  {
    id: 'physical-shipping',
    question: 'Would you be open to shipping physical products from your location?',
    type: 'multiple-choice',
    category: 'business-fit',
    options: ['Yes', 'No']
  },
  {
    id: 'work-preference',
    question: 'Would you rather:',
    type: 'multiple-choice',
    category: 'business-fit',
    options: [
      'Create once, earn passively',
      'Work consistently with people',
      'Mix of both'
    ]
  },
  {
    id: 'social-media',
    question: 'How interested are you in using social media to grow a business?',
    type: 'scale',
    category: 'business-fit',
    scaleMin: 1,
    scaleMax: 5
  },
  {
    id: 'ecosystem',
    question: 'Do you want to be part of an ecosystem (e.g., platforms, marketplaces, affiliate networks)?',
    type: 'multiple-choice',
    category: 'business-fit',
    options: ['Yes', 'No', 'Maybe']
  },
  {
    id: 'audience',
    question: 'Do you currently have any kind of audience or following?',
    type: 'multiple-choice',
    category: 'business-fit',
    options: [
      'Yes, highly engaged',
      'Yes, but small',
      'No',
      'Just starting'
    ]
  },
  {
    id: 'promoting-others',
    question: 'Would you be open to promoting someone else\'s product/service?',
    type: 'multiple-choice',
    category: 'business-fit',
    options: ['Yes', 'No']
  },
  {
    id: 'teach-or-solve',
    question: 'Would you prefer to teach others or solve problems for them?',
    type: 'multiple-choice',
    category: 'business-fit',
    options: ['Teach', 'Solve', 'Both', 'Neither']
  },
  {
    id: 'meaningful-work',
    question: 'How important is it to you that your business contributes to something meaningful?',
    type: 'scale',
    category: 'business-fit',
    scaleMin: 1,
    scaleMax: 5
  }
];