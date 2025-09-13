'use client';

import { useState, useMemo } from 'react';
import glossaryData from '../data/glossary.json';

interface GlossaryEntry {
  term: string;
  definition: string;
  category: string;
  usedBy: string;
  example: string;
  icon: string;
  docsLink?: string;
}

const categories = [
  'All',
  'Governance',
  'Tech / AI',
  'Web3 / Blockchain',
  'Ambassador Workgroups',
  'Grant Programs',
  'Social/XP Systems'
];

// Animation component for visual explanations
const getAnimatedVisualization = (term: string) => {
  switch (term.toLowerCase()) {
    case 'governance proposal':
      return (
        <div className="relative w-full h-full flex items-center justify-center">
          <svg width="200" height="150" viewBox="0 0 200 150" className="animate-pulse">
            {/* Ballot Box */}
            <rect x="60" y="80" width="80" height="60" fill="#8b5cf6" rx="5" className="animate-slideDown" style={{animationDelay: '0.5s'}} />
            <rect x="65" y="75" width="70" height="5" fill="#a855f7" rx="2" />
            <text x="100" y="115" textAnchor="middle" fill="white" fontSize="10">VOTE</text>
            
            {/* Person */}
            <circle cx="30" cy="50" r="15" fill="#06b6d4" className="animate-bounce" style={{animationDelay: '1s'}} />
            <rect x="20" y="65" width="20" height="30" fill="#06b6d4" rx="3" />
            
            {/* Proposal Paper */}
            <rect x="15" y="40" width="30" height="20" fill="white" rx="2" className="animate-slideRight" style={{animationDelay: '1.5s'}} />
            <line x1="20" y1="45" x2="40" y2="45" stroke="#333" strokeWidth="1" />
            <line x1="20" y1="50" x2="35" y2="50" stroke="#333" strokeWidth="1" />
            <line x1="20" y1="55" x2="38" y2="55" stroke="#333" strokeWidth="1" />
            
            {/* Arrow */}
            <path d="M45 50 L55 50 M50 45 L55 50 L50 55" stroke="#10b981" strokeWidth="2" fill="none" className="animate-pulse" style={{animationDelay: '2s'}} />
          </svg>
        </div>
      );
      
    case 'agix token':
      return (
        <div className="relative w-full h-full flex items-center justify-center">
          <svg width="250" height="150" viewBox="0 0 250 150" className="animate-pulse">
            {/* Central AGIX Token */}
            <circle cx="125" cy="75" r="25" fill="#8b5cf6" className="animate-spin" style={{animationDuration: '3s'}} />
            <text x="125" y="80" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">AGIX</text>
            
            {/* Transaction Flow */}
            <circle cx="50" cy="50" r="15" fill="#06b6d4" className="animate-pulse" style={{animationDelay: '0.5s'}} />
            <circle cx="200" cy="50" r="15" fill="#06b6d4" className="animate-pulse" style={{animationDelay: '1s'}} />
            
            {/* Arrows showing flow */}
            <path d="M70 55 L100 70" stroke="#10b981" strokeWidth="3" fill="none" className="animate-drawLine" style={{animationDelay: '1.5s'}} />
            <path d="M150 70 L180 55" stroke="#10b981" strokeWidth="3" fill="none" className="animate-drawLine" style={{animationDelay: '2s'}} />
            
            {/* Governance Vote */}
            <rect x="40" y="100" width="30" height="20" fill="#a855f7" rx="3" className="animate-slideUp" style={{animationDelay: '2.5s'}} />
            <text x="55" y="112" textAnchor="middle" fill="white" fontSize="8">VOTE</text>
            
            {/* AI Service */}
            <rect x="180" y="100" width="30" height="20" fill="#f59e0b" rx="3" className="animate-slideUp" style={{animationDelay: '3s'}} />
            <text x="195" y="112" textAnchor="middle" fill="white" fontSize="8">AI</text>
            
            {/* Connection lines */}
            <path d="M55 100 L110 85" stroke="#8b5cf6" strokeWidth="2" fill="none" strokeDasharray="5,5" className="animate-pulse" style={{animationDelay: '3.5s'}} />
            <path d="M140 85 L195 100" stroke="#8b5cf6" strokeWidth="2" fill="none" strokeDasharray="5,5" className="animate-pulse" style={{animationDelay: '4s'}} />
          </svg>
        </div>
      );
      
    case 'deepfunding':
      return (
        <div className="relative w-full h-full flex items-center justify-center">
          <svg width="220" height="150" viewBox="0 0 220 150">
            {/* Funding Pool */}
            <ellipse cx="110" cy="120" rx="80" ry="20" fill="#1e40af" className="animate-pulse" />
            <text x="110" y="125" textAnchor="middle" fill="white" fontSize="10">Funding Pool</text>
            
            {/* AI Projects */}
            <rect x="20" y="40" width="40" height="30" fill="#8b5cf6" rx="5" className="animate-slideDown" style={{animationDelay: '0.5s'}} />
            <text x="40" y="58" textAnchor="middle" fill="white" fontSize="8">AI Project</text>
            
            <rect x="90" y="20" width="40" height="30" fill="#8b5cf6" rx="5" className="animate-slideDown" style={{animationDelay: '1s'}} />
            <text x="110" y="38" textAnchor="middle" fill="white" fontSize="8">AI Project</text>
            
            <rect x="160" y="40" width="40" height="30" fill="#8b5cf6" rx="5" className="animate-slideDown" style={{animationDelay: '1.5s'}} />
            <text x="180" y="58" textAnchor="middle" fill="white" fontSize="8">AI Project</text>
            
            {/* Funding Arrows */}
            <path d="M40 70 L70 100" stroke="#10b981" strokeWidth="3" fill="none" className="animate-drawLine" style={{animationDelay: '2s'}} />
            <path d="M110 50 L110 100" stroke="#10b981" strokeWidth="3" fill="none" className="animate-drawLine" style={{animationDelay: '2.5s'}} />
            <path d="M180 70 L150 100" stroke="#10b981" strokeWidth="3" fill="none" className="animate-drawLine" style={{animationDelay: '3s'}} />
            
            {/* Dollar signs */}
            <text x="55" y="85" fill="#10b981" fontSize="16" className="animate-bounce" style={{animationDelay: '3.5s'}}>$</text>
            <text x="110" y="75" fill="#10b981" fontSize="16" className="animate-bounce" style={{animationDelay: '4s'}}>$</text>
            <text x="165" y="85" fill="#10b981" fontSize="16" className="animate-bounce" style={{animationDelay: '4.5s'}}>$</text>
          </svg>
        </div>
      );
      
    case 'xp':
      return (
        <div className="relative w-full h-full flex items-center justify-center">
          <svg width="200" height="150" viewBox="0 0 200 150">
            {/* Person */}
            <circle cx="50" cy="50" r="20" fill="#06b6d4" className="animate-pulse" />
            <rect x="35" y="70" width="30" height="40" fill="#06b6d4" rx="5" />
            
            {/* Task/Quest */}
            <rect x="120" y="40" width="60" height="40" fill="#8b5cf6" rx="5" className="animate-slideLeft" style={{animationDelay: '0.5s'}} />
            <text x="150" y="63" textAnchor="middle" fill="white" fontSize="10">Complete Task</text>
            
            {/* Arrow */}
            <path d="M80 60 L115 60" stroke="#10b981" strokeWidth="3" fill="none" className="animate-drawLine" style={{animationDelay: '1s'}} />
            
            {/* XP Points */}
            <circle cx="50" cy="30" r="12" fill="#f59e0b" className="animate-bounce" style={{animationDelay: '1.5s'}} />
            <text x="50" y="35" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">+100</text>
            <text x="50" y="20" textAnchor="middle" fill="#f59e0b" fontSize="8">XP</text>
            
            {/* Progress Bar */}
            <rect x="20" y="120" width="160" height="10" fill="#374151" rx="5" />
            <rect x="20" y="120" width="80" height="10" fill="#10b981" rx="5" className="animate-fillProgress" style={{animationDelay: '2s'}} />
            <text x="100" y="145" textAnchor="middle" fill="#10b981" fontSize="10">Level Progress</text>
          </svg>
        </div>
      );
      
    case 'quest':
      return (
        <div className="relative w-full h-full flex items-center justify-center">
          <svg width="200" height="150" viewBox="0 0 200 150">
            {/* Quest Board */}
            <rect x="60" y="20" width="80" height="100" fill="#8b5cf6" rx="5" className="animate-slideDown" />
            <text x="100" y="40" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">QUEST</text>
            
            {/* Quest Items */}
            <rect x="70" y="50" width="60" height="8" fill="white" rx="2" className="animate-slideRight" style={{animationDelay: '0.5s'}} />
            <rect x="70" y="65" width="60" height="8" fill="white" rx="2" className="animate-slideRight" style={{animationDelay: '1s'}} />
            <rect x="70" y="80" width="60" height="8" fill="white" rx="2" className="animate-slideRight" style={{animationDelay: '1.5s'}} />
            
            {/* Checkmarks */}
            <path d="M75 54 L78 57 L85 50" stroke="#10b981" strokeWidth="2" fill="none" className="animate-drawLine" style={{animationDelay: '2s'}} />
            <path d="M75 69 L78 72 L85 65" stroke="#10b981" strokeWidth="2" fill="none" className="animate-drawLine" style={{animationDelay: '2.5s'}} />
            
            {/* Reward Chest */}
            <rect x="85" y="95" width="30" height="20" fill="#f59e0b" rx="3" className="animate-bounce" style={{animationDelay: '3s'}} />
            <ellipse cx="100" cy="95" rx="15" ry="5" fill="#fbbf24" />
            <text x="100" y="130" textAnchor="middle" fill="#f59e0b" fontSize="10">Reward!</text>
            
            {/* Sparkles */}
            <circle cx="75" cy="90" r="2" fill="#fbbf24" className="animate-ping" style={{animationDelay: '3.5s'}} />
            <circle cx="125" cy="95" r="2" fill="#fbbf24" className="animate-ping" style={{animationDelay: '4s'}} />
            <circle cx="100" cy="85" r="2" fill="#fbbf24" className="animate-ping" style={{animationDelay: '4.5s'}} />
          </svg>
        </div>
      );
      
    default:
      return (
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="text-6xl animate-bounce">{glossaryData.find(entry => entry.term.toLowerCase() === term.toLowerCase())?.icon || '🔍'}</div>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-full animate-pulse" />
        </div>
      );
  }
};

export default function VisualGlossary() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedEntry, setSelectedEntry] = useState<GlossaryEntry | null>(null);

  const filteredEntries = useMemo(() => {
    return glossaryData.filter((entry: GlossaryEntry) => {
      const matchesSearch = entry.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           entry.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           entry.usedBy.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || entry.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              SingularityNET Visual Glossary
            </h1>
            <p className="mt-2 text-lg text-gray-300">
              Interactive terminology guide for the Ambassador Program
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search terms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pl-12 bg-gray-800/50 border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25'
                    : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-600/50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="text-center mb-6">
          <p className="text-gray-400">
            Showing {filteredEntries.length} of {glossaryData.length} terms
          </p>
        </div>

        {/* Glossary Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredEntries.map((entry: GlossaryEntry, index) => (
            <div
              key={index}
              onClick={() => setSelectedEntry(entry)}
              className="bg-gray-800/30 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 hover:border-purple-400/40 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-3xl">{entry.icon}</div>
                <span className="text-xs px-2 py-1 bg-purple-600/20 text-purple-300 rounded-full">
                  {entry.category}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                {entry.term}
              </h3>
              <p className="text-gray-300 text-sm mb-3 line-clamp-3">
                {entry.definition}
              </p>
              <div className="text-xs text-gray-400">
                <span className="font-medium">Used by:</span> {entry.usedBy}
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredEntries.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-300 mb-2">No terms found</h3>
            <p className="text-gray-400">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </main>

      {/* Animated Modal for Entry Details */}
      {selectedEntry && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-gray-800 border border-purple-500/30 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-slideUp">
            <div className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="text-4xl animate-bounce">{selectedEntry.icon}</div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{selectedEntry.term}</h2>
                    <span className="text-sm px-3 py-1 bg-purple-600/20 text-purple-300 rounded-full">
                      {selectedEntry.category}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedEntry(null)}
                  className="text-gray-400 hover:text-white transition-colors hover:rotate-90 transform duration-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* Animated Visual Explanation */}
              <div className="mb-6 bg-gray-900/50 rounded-xl p-6 border border-purple-500/20">
                <h3 className="text-lg font-semibold text-purple-300 mb-4">Visual Explanation</h3>
                <div className="flex justify-center items-center h-48">
                  {getAnimatedVisualization(selectedEntry.term)}
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-purple-300 mb-2">Definition</h3>
                    <p className="text-gray-300">{selectedEntry.definition}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-purple-300 mb-2">Example Use Case</h3>
                    <p className="text-gray-300 italic">&ldquo;{selectedEntry.example}&rdquo;</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-purple-300 mb-2">Used By</h3>
                    <p className="text-gray-300">{selectedEntry.usedBy}</p>
                  </div>
                  
                  {selectedEntry.docsLink && (
                    <div>
                      <a
                        href={selectedEntry.docsLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all duration-200 hover:scale-105"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        View Documentation
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
