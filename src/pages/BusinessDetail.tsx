import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { businessModels } from '../data/businessModels';
import { QuizAnswer } from '../types';
import { generateAIAnalysis, getMatchColor, getMatchLabel } from '../utils/aiAnalysis';
import { calculateBusinessMatch } from '../utils/quizLogic';

const BusinessDetail = () => {
  const { businessId } = useParams<{ businessId: string }>();
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswer[]>([]);
  const [showAIReport, setShowAIReport] = useState(false);
  const [matchPercentage, setMatchPercentage] = useState<number>(0);
  
  const business = businessModels.find(b => b.id === businessId);

  useEffect(() => {
    // Load quiz answers from localStorage
    const savedAnswers = localStorage.getItem('quizAnswers');
    if (savedAnswers) {
      const parsedAnswers = JSON.parse(savedAnswers);
      setQuizAnswers(parsedAnswers);
      setShowAIReport(true);
      
      // Calculate match percentage using the same algorithm as Results page
      if (business) {
        const matchScore = calculateBusinessMatch(parsedAnswers, business);
        setMatchPercentage(matchScore);
      }
    }
  }, [business]);

  // Generate AI analysis if quiz data is available
  let aiAnalysis = null;
  if (showAIReport && quizAnswers.length > 0) {
    aiAnalysis = generateAIAnalysis(business, quizAnswers);
    // Override the AI analysis match score with the consistent calculation
    if (aiAnalysis) {
      aiAnalysis.matchScore = matchPercentage;
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link 
          to="/explore" 
          className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-8 transition-colors font-medium"
        >
          ← Back to Business Explorer
        </Link>

        {/* AI Analysis Report */}
        {showAIReport && aiAnalysis && (
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-xl p-8 mb-8 text-white">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mr-4">
                <span className="text-2xl">🤖</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold">AI Personalized Report</h2>
                <p className="text-indigo-100">Based on your quiz responses</p>
              </div>
            </div>

            {/* Match Score */}
            <div className="bg-white/10 rounded-xl p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">Overall Match Score</h3>
                <div className="text-right">
                  <div className="text-3xl font-bold">{aiAnalysis.matchScore}%</div>
                  <div className="text-sm text-indigo-200">{getMatchLabel(aiAnalysis.matchScore)}</div>
                </div>
              </div>
              <div className="w-full bg-white/20 rounded-full h-3">
                <div 
                  className="bg-white h-3 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${aiAnalysis.matchScore}%` }}
                ></div>
              </div>
            </div>

            {/* Strengths */}
            {aiAnalysis.strengths.length > 0 && (
              <div className="bg-white/10 rounded-xl p-6 mb-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <span className="mr-2">💪</span>
                  Your Strengths for This Business
                </h3>
                <ul className="space-y-2">
                  {aiAnalysis.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-green-300 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-indigo-100">{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Challenges */}
            {aiAnalysis.challenges.length > 0 && (
              <div className="bg-white/10 rounded-xl p-6 mb-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <span className="mr-2">⚡</span>
                  Areas to Consider
                </h3>
                <ul className="space-y-2">
                  {aiAnalysis.challenges.map((challenge, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-yellow-300 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-indigo-100">{challenge}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Personalized Insights */}
            <div className="bg-white/10 rounded-xl p-6 mb-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <span className="mr-2">💡</span>
                Personalized Insights
              </h3>
              <ul className="space-y-2">
                {aiAnalysis.insights.map((insight, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-blue-300 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-indigo-100">{insight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recommendations */}
            {aiAnalysis.recommendations.length > 0 && (
              <div className="bg-white/10 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <span className="mr-2">🎯</span>
                  AI Recommendations
                </h3>
                <ul className="space-y-2">
                  {aiAnalysis.recommendations.map((recommendation, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-purple-300 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-indigo-100">{recommendation}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center mr-3">
                <span className="text-indigo-600 font-bold">⏱️</span>
              </div>
              <h3 className="font-semibold text-gray-900">Time to Start</h3>
            </div>
            <p className="text-2xl font-bold text-indigo-600">{business.timeToStart}</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                <span className="text-green-600 font-bold">💰</span>
              </div>
              <h3 className="font-semibold text-gray-900">Initial Investment</h3>
            </div>
            <p className="text-2xl font-bold text-green-600">{business.initialInvestment}</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                <span className="text-purple-600 font-bold">📈</span>
              </div>
              <h3 className="font-semibold text-gray-900">Potential Income</h3>
            </div>
            <p className="text-2xl font-bold text-purple-600">{business.potentialIncome}</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                <span className="text-orange-600 font-bold">📅</span>
              </div>
              <h3 className="font-semibold text-gray-900">Time Commitment</h3>
            </div>
            <p className="text-2xl font-bold text-orange-600">{business.timeCommitment}</p>
          </div>
        </div>

        {/* Detailed Business Overview */}
        {business.detailedDescription && (
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center mr-4">
                <span className="text-white text-xl">📊</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Complete Business Overview</h3>
            </div>
            
            <div className="space-y-8">
              {business.detailedDescription.split('\n\n').map((section, index) => {
                const lines = section.split('\n');
                const firstLine = lines[0];
                
                // Check if this is a section header (ALL CAPS)
                if (firstLine.match(/^[A-Z\s&():]+:$/)) {
                  const sectionTitle = firstLine.replace(':', '');
                  const content = lines.slice(1).join('\n');
                  
                  return (
                    <div key={index} className="border-l-4 border-indigo-500 pl-6">
                      <h4 className="text-lg font-bold text-indigo-700 mb-3 uppercase tracking-wide">
                        {sectionTitle}
                      </h4>
                      <div className="space-y-2">
                        {content.split('\n').map((line, lineIndex) => {
                          if (line.trim().startsWith('•')) {
                            const bulletContent = line.replace('•', '').trim();
                            const [boldPart, ...rest] = bulletContent.split(':');
                            
                            return (
                              <div key={lineIndex} className="flex items-start mb-3">
                                <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                <div className="text-gray-700">
                                  {rest.length > 0 ? (
                                    <>
                                      <span className="font-semibold text-gray-900">{boldPart}:</span>
                                      <span className="ml-1">{rest.join(':')}</span>
                                    </>
                                  ) : (
                                    bulletContent
                                  )}
                                </div>
                              </div>
                            );
                          }
                          return line.trim() ? (
                            <p key={lineIndex} className="text-gray-700 leading-relaxed">
                              {line}
                            </p>
                          ) : null;
                        })}
                      </div>
                    </div>
                  );
                }
                
                // Regular paragraph content
                return (
                  <div key={index} className="text-gray-700 leading-relaxed">
                    {section.split('\n').map((line, lineIndex) => (
                      line.trim() ? (
                        <p key={lineIndex} className="mb-3">
                          {line}
                        </p>
                      ) : null
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Pros and Cons */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                <span className="text-green-600 font-bold">✅</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900">Advantages</h3>
            </div>
            <ul className="space-y-3">
              {business.pros.map((pro, index) => (
                <li key={index} className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-700">{pro}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                <span className="text-red-600 font-bold">⚠️</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900">Challenges</h3>
            </div>
            <ul className="space-y-3">
              {business.cons.map((con, index) => (
                <li key={index} className="flex items-start">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-700">{con}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Required Skills */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
              <span className="text-blue-600 font-bold">🎓</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900">Required Skills</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {business.requiredSkills.map((skill, index) => (
              <span 
                key={index} 
                className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Ready to Get Started?</h3>
          <p className="text-indigo-100 mb-6">
            Take our quiz to see if this business model is right for you, or explore more options.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/quiz" 
              className="px-8 py-3 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Take the Quiz
            </Link>
            <Link 
              to="/explore" 
              className="px-8 py-3 bg-indigo-500 text-white rounded-lg font-semibold hover:bg-indigo-400 transition-colors"
            >
              Explore More Options
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessDetail;