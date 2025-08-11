'use client';

import { useState, useEffect } from 'react';

// Dynamic imports for confetti (optional dependencies)
let Confetti = null;
let useWindowSize = null;

try {
  const confettiModule = require('react-confetti');
  const reactUseModule = require('react-use');
  Confetti = confettiModule.default || confettiModule;
  useWindowSize = reactUseModule.useWindowSize;
} catch (e) {
  console.log('Confetti libraries not installed');
}

export default function HomePage() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showConfetti, setShowConfetti] = useState(true);
  
  // Get window size (with fallback if react-use not available)
  const windowSize = useWindowSize ? useWindowSize() : { width: 1200, height: 800 };

  useEffect(() => {
    fetchLeaderboard();
    
    // Show confetti and hide after 5 seconds
    if (Confetti) {
      console.log('Showing confetti!');
      const timer = setTimeout(() => {
        console.log('Hiding confetti');
        setShowConfetti(false);
      }, 5000);
      
      return () => clearTimeout(timer);
    } else {
      console.log('Confetti library not available');
      setShowConfetti(false);
    }
  }, []);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api');
      if (!response.ok) {
        throw new Error('Failed to fetch leaderboard');
      }
      const data = await response.json();
      setLeaderboard(data.users || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="text-center mt-4 text-gray-600">Loading leaderboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <div className="text-red-500 text-xl mb-4">⚠️</div>
          <p className="text-red-600">Error: {error}</p>
          <button 
            onClick={fetchLeaderboard}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 relative">
    {/* Show confetti when available and enabled */}
    {Confetti && showConfetti && (
      <Confetti
        width={windowSize.width}
        height={windowSize.height}
        numberOfPieces={300}
        recycle={false}
      />
    )}
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">🏆 YesCity Leaderboard</h1>
          <p className="text-gray-600">Competition rankings and scores</p>
        </div>

        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          {leaderboard.length === 0 ? (
            <div className="p-12 text-center">
              <div className="text-6xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No participants yet</h3>
              <p className="text-gray-500">The leaderboard will appear once participants are added.</p>
            </div>
          ) : (
            <>
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
                <div className="flex justify-between items-center text-white font-semibold">
                  <span className="w-16">Rank</span>
                  <span className="flex-1 text-left ml-6">Name</span>
                  <span className="w-24 text-right">Points</span>
                </div>
              </div>
              
              <div className="divide-y divide-gray-200">
                {leaderboard.map((user, index) => (
                  <div 
                    key={user._id} 
                    className={`px-6 py-4 flex justify-between items-center hover:bg-gray-50 transition-colors ${
                      index === 0 ? 'bg-yellow-50' : 
                      index === 1 ? 'bg-gray-50' : 
                      index === 2 ? 'bg-orange-50' : ''
                    }`}
                  >
                    <div className="w-16 flex items-center">
                      <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${
                        index === 0 ? 'bg-yellow-400 text-yellow-900' :
                        index === 1 ? 'bg-gray-400 text-gray-900' :
                        index === 2 ? 'bg-orange-400 text-orange-900' :
                        'bg-indigo-100 text-indigo-800'
                      }`}>
                        {index + 1}
                      </span>
                    </div>
                    
                    <div className="flex-1 ml-6">
                      <span className={`font-semibold ${
                        index === 0 ? 'text-yellow-900' :
                        index === 1 ? 'text-gray-900' :
                        index === 2 ? 'text-orange-900' :
                        'text-gray-800'
                      }`}>
                        {user.name}
                      </span>
                    </div>
                    
                    <div className="w-24 text-right">
                      <span className={`font-bold text-lg ${
                        index === 0 ? 'text-yellow-600' :
                        index === 1 ? 'text-gray-600' :
                        index === 2 ? 'text-orange-600' :
                        'text-indigo-600'
                      }`}>
                        {user.points}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="text-center mt-8">
          <button 
            onClick={fetchLeaderboard}
            className="px-6 py-2 mb-6 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
          >
            Refresh Leaderboard
          </button>
        </div>

        <footer className='absolute z-10 bottom-1 right-1 left-0 w-full text-sm text-amber-600 text-center'>
            Made for you by <a className='underline' href="https://www.linkedin.com/in/aaditya-pandey-ab2829257/">Aaditya</a>
        </footer>
      </div>
    </div>
  );
}