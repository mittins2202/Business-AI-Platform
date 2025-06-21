import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { quizQuestions } from '../data/quizQuestions';
import { QuizAnswer } from '../types';
import ProgressBar from '../components/ProgressBar';

function Quiz() {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState<string | number | string[]>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showRoundBreak, setShowRoundBreak] = useState(false); // Start with false - no initial round break
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const currentQuestion = quizQuestions[currentQuestionIndex];
  // Fix progress calculation - show 0% on first question
  const progress = showRoundBreak ? 
    (currentQuestionIndex / quizQuestions.length) * 100 : 
    (currentQuestionIndex / quizQuestions.length) * 100;

  // Get the current round info with emojis
  const getRoundInfo = () => {
    const questionNumber = currentQuestionIndex + 1;
    if (questionNumber <= 8) return { 
      round: 1, 
      title: "Motivation & Vision",
      description: "These questions focus on your goals, desired outcomes, and long-term vision.",
      emoji: "🎯"
    };
    if (questionNumber <= 15) return { 
      round: 2, 
      title: "Time, Effort & Learning Style",
      description: "These questions explore your availability, consistency, and how you like to learn.",
      emoji: "⏰"
    };
    if (questionNumber <= 25) return { 
      round: 3, 
      title: "Personality & Preferences",
      description: "This section will help uncover your style, strengths, and working preferences.",
      emoji: "🧠"
    };
    if (questionNumber <= 30) return { 
      round: 4, 
      title: "Tools & Work Environment",
      description: "Now we'll look at your environment and access to key tools.",
      emoji: "🛠️"
    };
    if (questionNumber <= 35) return { 
      round: 5, 
      title: "Strategy & Decision-Making",
      description: "These questions dig into your strategic preferences and mindset.",
      emoji: "📊"
    };
    return { 
      round: 6, 
      title: "Business Model Fit Filters",
      description: "Final stretch. These questions will help filter your best-fit business paths.",
      emoji: "🎯"
    };
  };

  const roundInfo = getRoundInfo();

  // Check if we should show a round break - exclude question 1 (index 0)
  const shouldShowRoundBreak = () => {
    const questionNumber = currentQuestionIndex + 1;
    return questionNumber === 9 || questionNumber === 16 || questionNumber === 26 || questionNumber === 31 || questionNumber === 36;
  };

  // Reset current answer when question changes
  useEffect(() => {
    if (!showRoundBreak) {
      const existingAnswer = answers.find(a => a.questionId === currentQuestion.id);
      if (existingAnswer) {
        setCurrentAnswer(existingAnswer.answer);
      } else {
        if (currentQuestion.type === 'multi-select') {
          setCurrentAnswer([]);
        } else {
          setCurrentAnswer('');
        }
      }
    }
  }, [currentQuestionIndex, currentQuestion?.id, answers, showRoundBreak]);

  const handleAnswerChange = (value: string | number | string[]) => {
    setCurrentAnswer(value);
  };

  const handleNext = () => {
    // Save current answer
    const newAnswer: QuizAnswer = {
      questionId: currentQuestion.id,
      answer: currentAnswer
    };

    const updatedAnswers = answers.filter(a => a.questionId !== currentQuestion.id);
    updatedAnswers.push(newAnswer);
    setAnswers(updatedAnswers);

    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      // Check if we need to show a round break for the next question
      if (shouldShowRoundBreak()) {
        setShowRoundBreak(true);
      }
    } else {
      handleSubmit(updatedAnswers);
    }
  };

  const handleRoundBreakNext = () => {
    setShowRoundBreak(false);
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      const prevQuestionIndex = currentQuestionIndex - 1;
      setCurrentQuestionIndex(prevQuestionIndex);
      
      // Check if the previous question should show a round break
      const prevQuestionNumber = prevQuestionIndex + 1;
      if (prevQuestionNumber === 1 || prevQuestionNumber === 9 || prevQuestionNumber === 16 || prevQuestionNumber === 26 || prevQuestionNumber === 31 || prevQuestionNumber === 36) {
        setShowRoundBreak(true);
      } else {
        setShowRoundBreak(false);
      }
    }
  };

  const handleSubmit = async (finalAnswers: QuizAnswer[]) => {
    setIsSubmitting(true);
    
    // Store answers in localStorage for the results page
    localStorage.setItem('quizAnswers', JSON.stringify(finalAnswers));
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Show success modal with confetti
    setIsSubmitting(false);
    setShowSuccessModal(true);
  };

  const handleViewResults = () => {
    setShowSuccessModal(false);
    navigate('/results');
  };

  // Confetti animation component
  const ConfettiPiece = ({ delay }: { delay: number }) => (
    <motion.div
      initial={{ y: -100, x: Math.random() * 400 - 200, rotate: 0, opacity: 1 }}
      animate={{ 
        y: window.innerHeight + 100, 
        x: Math.random() * 400 - 200, 
        rotate: 360,
        opacity: 0 
      }}
      transition={{ 
        duration: 3 + Math.random() * 2, 
        delay: delay,
        ease: "easeOut" 
      }}
      className={`absolute w-3 h-3 ${
        Math.random() > 0.5 ? 'bg-blue-500' : 
        Math.random() > 0.5 ? 'bg-green-500' : 
        Math.random() > 0.5 ? 'bg-yellow-500' : 
        Math.random() > 0.5 ? 'bg-purple-500' : 'bg-pink-500'
      } rounded-sm`}
      style={{
        left: '50%',
        top: 0,
      }}
    />
  );

  const isAnswered = () => {
    if (currentQuestion.type === 'multi-select') {
      return Array.isArray(currentAnswer) && currentAnswer.length > 0;
    }
    return currentAnswer !== '' && currentAnswer !== null && currentAnswer !== undefined;
  };

  // Render round break screen
  if (showRoundBreak) {
    const currentRoundInfo = getRoundInfo();
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-12">
            <div className="mb-8">
              <div className="text-6xl mb-6">{currentRoundInfo.emoji}</div>
              <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full text-lg font-bold mb-6">
                Round {currentRoundInfo.round}
              </div>
              <h1 className="text-4xl font-bold text-slate-800 mb-4">
                {currentRoundInfo.title}
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed">
                {currentRoundInfo.description}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {currentQuestionIndex > 0 && (
                <button
                  onClick={handlePrevious}
                  className="px-8 py-3 bg-white/80 backdrop-blur-sm text-slate-700 rounded-2xl font-medium text-lg hover:bg-white border border-slate-200 hover:shadow-md transition-all duration-200"
                >
                  ← Previous
                </button>
              )}
              <button
                onClick={handleRoundBreakNext}
                className="px-12 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-medium text-lg hover:shadow-lg hover:shadow-blue-500/25 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              >
                Continue to Round {currentRoundInfo.round} →
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const renderQuestion = () => {
    switch (currentQuestion.type) {
      case 'multiple-choice':
        return (
          <div className="space-y-3">
            {currentQuestion.options?.map((option, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.005, y: -1 }}
                whileTap={{ scale: 0.998 }}
                onClick={() => handleAnswerChange(option)}
                className={`w-full p-5 text-left rounded-2xl transition-all duration-300 group relative overflow-hidden ${
                  currentAnswer === option
                    ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-slate-800 shadow-lg border-2 border-blue-300/50'
                    : 'bg-white/90 backdrop-blur-sm hover:bg-white text-slate-700 border-2 border-slate-200 hover:border-slate-300 hover:shadow-md'
                }`}
              >
                <div className="relative flex items-center justify-between">
                  <span className="font-semibold text-base leading-relaxed pr-4">{option}</span>
                  
                  {/* Checkmark icon */}
                  {currentAnswer === option && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center"
                    >
                      <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </motion.div>
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        );

      case 'scale':
        // Get descriptive labels for each scale value based on question type
        const getScaleLabels = (questionId: string) => {
          const labels: Record<string, { short: string[], long: string[] }> = {
            'consistency': {
              short: ['Give up easily', 'Sometimes quit', 'Usually finish', 'Very consistent', 'Always complete'],
              long: ['Struggle to finish projects', 'Complete most things I start', 'Generally see things through', 'Rarely leave things unfinished', 'Never give up on commitments']
            },
            'trial-error': {
              short: ['Avoid completely', 'Prefer clear plans', 'Some is okay', 'Comfortable with it', 'Love experimenting'],
              long: ['Need detailed instructions', 'Prefer structured approaches', 'Can handle some uncertainty', 'Enjoy figuring things out', 'Thrive on trial and error']
            },
            'routines': {
              short: ['Hate routines', 'Prefer flexibility', 'Some structure', 'Like routines', 'Thrive on routine'],
              long: ['Need constant variety', 'Enjoy flexible schedules', 'Balance structure and freedom', 'Work best with consistency', 'Excel with rigid structure']
            },
            'discouragement': {
              short: ['Very easily', 'Often affected', 'Sometimes down', 'Usually resilient', 'Never discouraged'],
              long: ['Setbacks stop me completely', 'Need encouragement to continue', 'Bounce back with some effort', 'Use setbacks as motivation', 'Setbacks fuel my determination']
            },
            'organization': {
              short: ['Very disorganized', 'Somewhat messy', 'Average order', 'Well organized', 'Extremely organized'],
              long: ['Chaos is my normal', 'Some organization helps', 'Keep important things organized', 'Systems keep me efficient', 'Everything has its place']
            },
            'self-motivation': {
              short: ['Need external push', 'Some guidance', 'Moderately driven', 'Self-motivated', 'Highly driven'],
              long: ['Require constant encouragement', 'Work better with accountability', 'Can motivate myself usually', 'Rarely need external motivation', 'Internal drive is unstoppable']
            },
            'uncertainty': {
              short: ['Very uncomfortable', 'Prefer certainty', 'Some ambiguity', 'Comfortable', 'Thrive in unknown'],
              long: ['Need clear plans always', 'Prefer predictable outcomes', 'Can handle some unknowns', 'Comfortable with ambiguity', 'Uncertainty excites me']
            },
            'public-face': {
              short: ['Very uncomfortable', 'Prefer background', 'Neutral about it', 'Comfortable', 'Love spotlight'],
              long: ['Avoid public attention', 'Work better behind scenes', 'Can be visible when needed', 'Enjoy being recognized', 'Natural public presence']
            },
            'competitiveness': {
              short: ['Not competitive', 'Slightly competitive', 'Moderately so', 'Very competitive', 'Extremely driven'],
              long: ['Prefer collaboration', 'Enjoy friendly competition', 'Motivated by competition', 'Must win to feel satisfied', 'Competition fuels everything']
            },
            'creativity': {
              short: ['Not creative', 'Somewhat creative', 'Moderately so', 'Very creative', 'Extremely creative'],
              long: ['Prefer proven methods', 'Occasional creative moments', 'Enjoy creative challenges', 'Creativity comes naturally', 'Innovation is my strength']
            },
            'communication': {
              short: ['Very uncomfortable', 'Somewhat shy', 'Neutral', 'Comfortable', 'Natural communicator'],
              long: ['Avoid interaction when possible', 'Prefer written communication', 'Can communicate when needed', 'Enjoy connecting with others', 'Communication energizes me']
            },
            'tech-skills': {
              short: ['Very low', 'Basic skills', 'Moderate skills', 'Good with tech', 'Very tech-savvy'],
              long: ['Technology intimidates me', 'Can handle basic tasks', 'Comfortable with most tech', 'Quick to learn new tools', 'Technology comes naturally']
            },
            'internet-access': {
              short: ['Very unreliable', 'Sometimes issues', 'Generally reliable', 'Very reliable', 'Excellent'],
              long: ['Frequent connectivity problems', 'Occasional interruptions', 'Mostly stable connection', 'Rarely have issues', 'Always connected reliably']
            },
            'risk-tolerance': {
              short: ['Very uncomfortable', 'Somewhat cautious', 'Moderate risk', 'Comfortable', 'Love taking risks'],
              long: ['Prefer guaranteed outcomes', 'Some uncertainty is okay', 'Calculated risks appeal to me', 'Comfortable with uncertainty', 'High risk, high reward mindset']
            },
            'feedback-response': {
              short: ['Take personally', 'Sometimes defensive', 'Generally receptive', 'Use constructively', 'Actively seek it'],
              long: ['Criticism hurts deeply', 'Can be defensive initially', 'Usually accept feedback well', 'Turn feedback into improvement', 'Feedback accelerates my growth']
            },
            'control': {
              short: ['Not important', 'Somewhat important', 'Moderately so', 'Very important', 'Extremely important'],
              long: ['Happy to follow others', 'Can lead when necessary', 'Prefer some autonomy', 'Need significant control', 'Must control my destiny']
            },
            'social-media': {
              short: ['Not interested', 'Rarely use', 'Occasional user', 'Active user', 'Very engaged'],
              long: ['Avoid social platforms', 'Check occasionally', 'Regular but casual use', 'Daily active engagement', 'Social media is essential']
            },
            'meaningful-work': {
              short: ['Not important', 'Somewhat important', 'Moderately so', 'Very important', 'Extremely important'],
              long: ['Work is just work', 'Some meaning is nice', 'Prefer purposeful work', 'Must feel meaningful', 'Purpose drives everything']
            }
          };
          return labels[questionId] || {
            short: ['Very Low', 'Low', 'Moderate', 'High', 'Very High'],
            long: ['Minimal involvement', 'Some involvement', 'Moderate involvement', 'High involvement', 'Maximum involvement']
          };
        };

        const scaleLabels = getScaleLabels(currentQuestion.id);
        
        return (
          <div className="space-y-8">
            {/* Low/High Labels */}
            <div className="flex justify-between text-sm text-slate-500 px-4">
              <span className="font-medium">Low</span>
              <span className="font-medium">High</span>
            </div>
            
            {/* Scale Options */}
            <div className="grid grid-cols-5 gap-3">
              {[1, 2, 3, 4, 5].map((value) => (
                <motion.button
                  key={value}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswerChange(value)}
                  className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
                    currentAnswer === value
                      ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-slate-800 shadow-lg border-2 border-blue-300/50'
                      : 'bg-white/90 backdrop-blur-sm hover:bg-white text-slate-700 border-2 border-slate-200 hover:border-slate-300 hover:shadow-md'
                  }`}
                >
                  <div className="text-2xl font-bold mb-2">{value}</div>
                  <div className="text-xs font-semibold text-slate-600 leading-tight">
                    {scaleLabels.short[value - 1]}
                  </div>
                </motion.button>
              ))}
            </div>
            
            {/* Selected Description */}
            {currentAnswer && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <div className="inline-flex items-center px-6 py-3 bg-blue-50 rounded-full">
                  <span className="text-blue-700 font-semibold">
                    {scaleLabels.long[(currentAnswer as number) - 1]}
                  </span>
                </div>
              </motion.div>
            )}
          </div>
        );

      case 'multi-select':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-center mb-6">
              <div className="inline-flex items-center px-4 py-2 bg-amber-100/80 backdrop-blur-sm text-amber-800 rounded-full text-sm font-semibold border border-amber-200">
                Select all that apply
              </div>
            </div>
            {currentQuestion.options?.map((option, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.005, y: -1 }}
                whileTap={{ scale: 0.998 }}
                onClick={() => {
                  const currentAnswers = Array.isArray(currentAnswer) ? currentAnswer : [];
                  const newAnswers = currentAnswers.includes(option)
                    ? currentAnswers.filter(a => a !== option)
                    : [...currentAnswers, option];
                  handleAnswerChange(newAnswers);
                }}
                className={`w-full p-5 text-left rounded-2xl transition-all duration-300 group relative overflow-hidden ${
                  Array.isArray(currentAnswer) && currentAnswer.includes(option)
                    ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-slate-800 shadow-lg border-2 border-blue-300/50'
                    : 'bg-white/90 backdrop-blur-sm hover:bg-white text-slate-700 border-2 border-slate-200 hover:border-slate-300 hover:shadow-md'
                }`}
              >
                <div className="relative flex items-center justify-between">
                  <span className="font-semibold text-base leading-relaxed pr-4">{option}</span>
                  
                  {/* Checkmark icon */}
                  {Array.isArray(currentAnswer) && currentAnswer.includes(option) && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center"
                    >
                      <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </motion.div>
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        );

      case 'yes-no':
        return (
          <div className="space-y-3">
            {['Yes', 'No'].map((option) => (
              <motion.button
                key={option}
                whileHover={{ scale: 1.005, y: -1 }}
                whileTap={{ scale: 0.998 }}
                onClick={() => handleAnswerChange(option)}
                className={`w-full p-5 text-left rounded-2xl transition-all duration-300 group relative overflow-hidden ${
                  currentAnswer === option
                    ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-slate-800 shadow-lg border-2 border-blue-300/50'
                    : 'bg-white/90 backdrop-blur-sm hover:bg-white text-slate-700 border-2 border-slate-200 hover:border-slate-300 hover:shadow-md'
                }`}
              >
                <div className="relative flex items-center justify-center">
                  <span className="font-semibold text-base leading-relaxed">{option}</span>
                </div>
              </motion.button>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center space-x-3">
              <div className="inline-flex items-center px-3 py-1 bg-white/80 backdrop-blur-sm text-slate-700 rounded-full text-sm font-medium border border-slate-200">
                Round {roundInfo.round}
              </div>
              <span className="text-slate-600 font-medium">{roundInfo.title}</span>
            </div>
            <span className="text-sm text-slate-500 font-medium">
              {currentQuestionIndex + 1} of {quizQuestions.length}
            </span>
          </div>
          
          {/* Progress Bar */}
          <div className="relative">
            <div className="w-full bg-slate-200 rounded-full h-3 shadow-inner">
              <div 
                className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-500 ease-out shadow-sm"
                style={{ width: `${progress}%` }}
              >
                <div className="h-full w-full bg-white/20 rounded-full"></div>
              </div>
            </div>
            <div className="absolute -top-1 right-0 transform translate-x-1/2">
              <div className="w-5 h-5 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full shadow-lg border-2 border-white"></div>
            </div>
          </div>
          
          <div className="flex justify-between mt-2">
            <span className="text-xs text-slate-500">Start</span>
            <span className="text-xs text-slate-500 font-medium">{Math.round(progress)}% Complete</span>
            <span className="text-xs text-slate-500">Finish</span>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-8 mb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestionIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-slate-800 leading-relaxed">
                  {currentQuestion.question}
                </h2>
              </div>
              
              <div className="space-y-4">
                {renderQuestion()}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className={`px-8 py-3 rounded-2xl font-medium transition-all duration-200 ${
              currentQuestionIndex === 0
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                : 'bg-white/80 backdrop-blur-sm text-slate-700 hover:bg-white border border-slate-200 hover:shadow-md'
            }`}
          >
            ← Previous
          </button>

          <button
            onClick={handleNext}
            disabled={!isAnswered() || isSubmitting}
            className={`px-8 py-3 rounded-2xl font-semibold transition-all duration-200 ${
              !isAnswered() || isSubmitting
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-500/25 transform hover:scale-[1.02] active:scale-[0.98]'
            }`}
          >
            {isSubmitting ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Processing...</span>
              </div>
            ) : currentQuestionIndex === quizQuestions.length - 1 ? (
              'Get My Results →'
            ) : (
              'Next →'
            )}
          </button>
        </div>
      </div>

      {/* Success Modal with Confetti */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          {/* Confetti Animation */}
          <div className="fixed inset-0 pointer-events-none overflow-hidden">
            {Array.from({ length: 50 }).map((_, i) => (
              <ConfettiPiece key={i} delay={i * 0.1} />
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-white rounded-3xl p-12 max-w-md w-full text-center shadow-2xl"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="text-8xl mb-6"
            >
              🎉
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-4xl font-bold text-slate-800 mb-4"
            >
              Success!
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-xl text-slate-600 mb-8 leading-relaxed"
            >
              Your quiz is complete! We're analyzing your responses to create personalized business recommendations just for you.
            </motion.p>
            
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              onClick={handleViewResults}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-medium text-lg hover:shadow-lg hover:shadow-blue-500/25 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              View My Results →
            </motion.button>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default Quiz;