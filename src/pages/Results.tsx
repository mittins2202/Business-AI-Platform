      import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { businessModels } from '../data/businessModels';
import { calculateBusinessMatch } from '../utils/quizLogic';
import { generateAIAnalysis } from '../utils/aiAnalysis';
import { QuizAnswer } from '../types';

const Results = () => {
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [businessMatches, setBusinessMatches] = useState<any[]>([]);

  useEffect(() => {
    // Get answers from localStorage
    const storedAnswers = localStorage.getItem('quizAnswers');
    if (storedAnswers) {
      const parsedAnswers: QuizAnswer[] = JSON.parse(storedAnswers);
      setAnswers(parsedAnswers);
      
      // Calculate matches and get top 4
      const matches = businessModels.map(business => ({
        ...business,
        matchPercentage: calculateBusinessMatch(parsedAnswers, business),
        aiAnalysis: generateAIAnalysis(business, parsedAnswers)
      })).sort((a, b) => b.matchPercentage - a.matchPercentage).slice(0, 4);
      
      setBusinessMatches(matches);
    }
  }, []);

  const getMatchColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-600';
    if (percentage >= 80) return 'text-blue-600';
    if (percentage >= 70) return 'text-orange-600';
    return 'text-gray-600';
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCardBorder = (index: number) => {
    if (index === 0) return 'border-yellow-300 bg-gradient-to-br from-yellow-50 to-orange-50';
    return 'border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Your Perfect Business Matches
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Based on your responses, here are the top 4 business models that align with your goals, skills, and lifestyle.
          </motion.p>
        </div>

        {/* Complete AI Custom Report Section */}
        {businessMatches.length > 0 && businessMatches[0].aiAnalysis && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white text-center shadow-xl">
              <h2 className="text-2xl font-bold mb-3">
                Complete AI Custom Report
              </h2>
              <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
                Get detailed personalized analysis, match insights, and strategic recommendations for all your top business matches.
              </p>
              
              <Link
                to={`/business/${businessMatches[0].id}`}
                className="inline-flex items-center px-6 py-3 bg-white text-purple-600 rounded-xl font-semibold hover:bg-purple-50 transition-colors"
              >
                View Complete Report
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </motion.div>
        )}

        {/* Business Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {businessMatches.map((business, index) => (
            <motion.div
              key={business.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative border-2 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 ${getCardBorder(index)}`}
            >
              {/* AI Recommended Badge */}
              {index === 0 && (
                <div className="absolute -top-4 left-8">
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    AI RECOMMENDED
                  </div>
                </div>
              )}

              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mr-4 ${index === 0 ? 'bg-yellow-500' : 'bg-blue-500'}`}>
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{business.title}</h3>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(business.difficulty)}`}>
                      {business.difficulty}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-4xl font-bold ${getMatchColor(business.matchPercentage)}`}>
                    {business.matchPercentage}%
                  </div>
                  <div className="text-sm text-gray-600">AI Match</div>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-700 mb-6 text-lg">{business.description}</p>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <div className="text-sm text-gray-600">Time to Profit</div>
                    <div className="font-semibold">{business.timeToStart}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                  <div>
                    <div className="text-sm text-gray-600">Startup Cost</div>
                    <div className="font-semibold">{business.initialInvestment}</div>
                  </div>
                </div>
              </div>

              {/* Potential Income */}
              <div className="flex items-center mb-6">
                <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                <div>
                  <div className="text-sm text-gray-600">Potential Income</div>
                  <div className="text-2xl font-bold text-green-600">{business.potentialIncome}</div>
                </div>
              </div>

              {/* Pros and Skills */}
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <div className="flex items-center mb-3">
                    <svg className="w-4 h-4 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="font-semibold text-gray-900">Top Pros</span>
                  </div>
                  <ul className="space-y-1">
                    {business.pros.slice(0, 3).map((pro, i) => (
                      <li key={i} className="text-sm text-gray-700 flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="flex items-center mb-3">
                    <svg className="w-4 h-4 text-orange-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-semibold text-gray-900">Key Skills</span>
                  </div>
                  <ul className="space-y-1">
                    {business.requiredSkills.slice(0, 3).map((skill, i) => (
                      <li key={i} className="text-sm text-gray-700 flex items-start">
                        <span className="text-orange-500 mr-2">•</span>
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* AI Personalized Report Preview */}
              {business.aiAnalysis && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="mt-6 relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 rounded-2xl p-1"
                >
                  {/* Animated background elements */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 animate-pulse"></div>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
                  
                  <div className="relative bg-white rounded-xl p-6">
                    {/* Header with animated AI icon */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center">
                        <motion.div 
                          animate={{ rotate: [0, 5, -5, 0] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                          className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mr-4 shadow-lg"
                        >
                          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                          </svg>
                        </motion.div>
                        <div>
                          <h4 className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            AI Match Analysis
                          </h4>
                          <p className="text-sm text-gray-500 flex items-center">
                            <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                            Personalized for you
                          </p>
                        </div>
                      </div>
                      
                      {/* Match score badge */}
                      <div className="relative">
                        <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                          <span className="text-white font-bold text-lg">{business.matchPercentage}%</span>
                        </div>
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3 text-yellow-800" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Insights with enhanced visuals */}
                    <div className="space-y-4 mb-6">
                      {business.aiAnalysis.strengths.slice(0, 2).map((strength, i) => (
                        <motion.div 
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + i * 0.1 }}
                          className="flex items-start group"
                        >
                          <div className="relative mr-4 mt-1">
                            <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                              </svg>
                            </div>
                            <div className="absolute -inset-1 bg-green-400/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
                          </div>
                          <div className="flex-1">
                            <span className="text-gray-800 font-medium leading-relaxed">{strength}</span>
                            <div className="w-full bg-green-100 rounded-full h-1 mt-2">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: "85%" }}
                                transition={{ delay: 0.7 + i * 0.1, duration: 0.8 }}
                                className="bg-gradient-to-r from-green-400 to-emerald-500 h-1 rounded-full"
                              ></motion.div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                      
                      {business.aiAnalysis.challenges.slice(0, 1).map((challenge, i) => (
                        <motion.div 
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.7 + i * 0.1 }}
                          className="flex items-start group"
                        >
                          <div className="relative mr-4 mt-1">
                            <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                              </svg>
                            </div>
                            <div className="absolute -inset-1 bg-amber-400/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
                          </div>
                          <div className="flex-1">
                            <span className="text-gray-800 font-medium leading-relaxed">{challenge}</span>
                            <div className="w-full bg-amber-100 rounded-full h-1 mt-2">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: "60%" }}
                                transition={{ delay: 0.9, duration: 0.8 }}
                                className="bg-gradient-to-r from-amber-400 to-orange-500 h-1 rounded-full"
                              ></motion.div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Enhanced CTA Button */}
                    <Link
                      to={`/business/${business.id}`}
                      className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-center py-4 px-6 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105"
                    >
                      View Complete Analysis →
                    </Link>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center bg-white rounded-2xl p-8 shadow-lg"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Want to Explore More Options?
          </h3>
          <p className="text-gray-600 mb-6">
            Check out all 19 business models in our comprehensive explorer.
          </p>
          <Link
            to="/explore"
            className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
          >
            Explore All Business Models
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Results;