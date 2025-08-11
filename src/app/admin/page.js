'use client';

import { useState, useEffect } from 'react';

export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  
  // Form states
  const [newUserName, setNewUserName] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [pointsToAdd, setPointsToAdd] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api');
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      setUsers(data.users || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (message, type = 'success') => {
    if (type === 'success') {
      setSuccess(message);
      setError(null);
    } else {
      setError(message);
      setSuccess(null);
    }
    setTimeout(() => {
      setSuccess(null);
      setError(null);
    }, 3000);
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    if (!newUserName.trim()) {
      showMessage('Please enter a name', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'addUser',
          name: newUserName.trim()
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to add user');
      }

      setNewUserName('');
      showMessage(`User "${data.user.name}" added successfully!`);
      fetchUsers();
    } catch (err) {
      showMessage(err.message, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddPoints = async (e) => {
    e.preventDefault();
    if (!selectedUser) {
      showMessage('Please select a user', 'error');
      return;
    }
    if (!pointsToAdd || isNaN(pointsToAdd)) {
      showMessage('Please enter valid points', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'addPoints',
          userId: selectedUser,
          points: parseInt(pointsToAdd)
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to add points');
      }

      setSelectedUser('');
      setPointsToAdd('');
      showMessage(`Points added successfully! ${data.user.name} now has ${data.user.points} points.`);
      fetchUsers();
    } catch (err) {
      showMessage(err.message, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">⚙️ Admin Panel</h1>
          <p className="text-gray-600">Manage users and points</p>
        </div>

        {/* Status Messages */}
        {success && (
          <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
            ✅ {success}
          </div>
        )}
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            ❌ {error}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-8">
          {/* Add New User Form */}
          <div className="bg-white rounded-lg shadow-xl p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">👤 Add New User</h2>
            <form onSubmit={handleAddUser} className="space-y-4">
              <div>
                <label htmlFor="newUserName" className="block text-sm font-medium text-gray-700 mb-2">
                  User Name
                </label>
                <input
                  type="text"
                  id="newUserName"
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  className="w-full px-4 py-2 border text-gray-600 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Enter user name"
                  disabled={isSubmitting}
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
              >
                {isSubmitting ? 'Adding...' : 'Add User (10 points)'}
              </button>
            </form>
          </div>

          {/* Add Points Form */}
          <div className="bg-white rounded-lg shadow-xl p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">🎯 Add Points</h2>
            <form onSubmit={handleAddPoints} className="space-y-4">
              <div>
                <label htmlFor="selectedUser" className="block text-sm font-medium text-gray-700 mb-2">
                  Select User
                </label>
                <select
                  id="selectedUser"
                  value={selectedUser}
                  onChange={(e) => setSelectedUser(e.target.value)}
                  className="w-full px-4 py-2 border text-gray-600 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  disabled={isSubmitting}
                >
                  <option value="">Choose a user...</option>
                  {users.map((user) => (
                    <option key={user._id} value={user._id}>
                      {user.name} (Current: {user.points} points)
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="pointsToAdd" className="block text-sm font-medium text-gray-700 mb-2">
                  Points to Add
                </label>
                <input
                  type="number"
                  id="pointsToAdd"
                  value={pointsToAdd}
                  onChange={(e) => setPointsToAdd(e.target.value)}
                  className="w-full px-4 text-gray-600 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Enter points"
                  disabled={isSubmitting}
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting || users.length === 0}
                className="w-full py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
              >
                {isSubmitting ? 'Adding Points...' : 'Add Points'}
              </button>
            </form>
          </div>
        </div>

        {/* Users List */}
        <div className="mt-8 bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4">
            <h3 className="text-xl font-bold text-white">📋 All Users</h3>
          </div>
          
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading users...</p>
            </div>
          ) : users.length === 0 ? (
            <div className="p-8 text-center">
              <div className="text-4xl mb-4">👥</div>
              <p className="text-gray-600">No users found. Add your first user above!</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              <div className="px-6 py-3 bg-gray-50 flex justify-between items-center font-medium text-gray-700">
                <span>Name</span>
                <span>Points</span>
              </div>
              {users.map((user) => (
                <div key={user._id} className="px-6 py-4 flex justify-between items-center hover:bg-gray-50">
                  <span className="font-medium text-gray-800">{user.name}</span>
                  <span className="font-bold text-purple-600">{user.points}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="text-center mt-8">
          <a
            href="/"
            className="inline-block px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
          >
            View Leaderboard
          </a>
        </div>
      </div>
    </div>
  );
}