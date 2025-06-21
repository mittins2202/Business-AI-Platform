import { useState } from 'react';
import { businessModels, BusinessModel } from '../data/businessModels';

const BusinessExplorer = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(businessModels.map(model => model.category)))];
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredModels = businessModels.filter(model => {
    const categoryMatch = selectedCategory === 'All' || model.category === selectedCategory;
    const difficultyMatch = selectedDifficulty === 'All' || model.difficulty === selectedDifficulty;
    return categoryMatch && difficultyMatch;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getScalabilityColor = (scalability: string) => {
    switch (scalability) {
      case 'Low': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'High': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Business Model Explorer
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the perfect business model for your goals, skills, and lifestyle. 
            Each model includes detailed insights to help you make an informed decision.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">Category:</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">Difficulty:</label>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {difficulties.map(difficulty => (
                  <option key={difficulty} value={difficulty}>{difficulty}</option>
                ))}
              </select>
            </div>
            <div className="ml-auto text-sm text-gray-600">
              Showing {filteredModels.length} of {businessModels.length} business models
            </div>
          </div>
        </div>

        {/* Business Models Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredModels.map((model) => (
            <BusinessModelCard key={model.id} model={model} />
          ))}
        </div>

        {filteredModels.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No business models match your current filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const BusinessModelCard = ({ model }: { model: BusinessModel }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getScalabilityColor = (scalability: string) => {
    switch (scalability) {
      case 'Low': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'High': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-gray-900">{model.title}</h3>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(model.difficulty)}`}>
            {model.difficulty}
          </span>
        </div>

        <p className="text-gray-600 mb-4">{model.description}</p>

        {/* Key Metrics */}
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Time to Start:</span>
            <span className="font-medium">{model.timeToStart}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Initial Investment:</span>
            <span className="font-medium">{model.initialInvestment}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Potential Income:</span>
            <span className="font-medium text-green-600">{model.potentialIncome}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Scalability:</span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getScalabilityColor(model.scalability)}`}>
              {model.scalability}
            </span>
          </div>
        </div>

        {/* Expand/Collapse Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full py-2 px-4 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-lg transition-colors duration-200 text-sm font-medium"
        >
          {isExpanded ? 'Show Less' : 'Show Details'}
        </button>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-gray-100 space-y-4">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Required Skills</h4>
              <div className="flex flex-wrap gap-1">
                {model.requiredSkills.map((skill, index) => (
                  <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Pros</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                {model.pros.map((pro, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    {pro}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Cons</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                {model.cons.map((con, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-red-500 mr-2">×</span>
                    {con}
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-sm text-gray-600">
              <strong>Time Commitment:</strong> {model.timeCommitment}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BusinessExplorer;