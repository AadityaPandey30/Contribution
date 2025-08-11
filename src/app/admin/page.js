'use client';

import { useState, useEffect } from 'react';

export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const [notes, setNotes] = useState([]); // 🆕 notes state
  const [loading, setLoading] = useState(true);
  const [loadingNotes, setLoadingNotes] = useState(true); // 🆕 loading for notes
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  
  // Form states
  const [newUserName, setNewUserName] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [pointsToAdd, setPointsToAdd] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Notes form
  const [newNote, setNewNote] = useState('');
  const [isSavingNote, setIsSavingNote] = useState(false);

  useEffect(() => {
    fetchUsers();
    fetchNotes(); // 🆕
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api');
      if (!response.ok) throw new Error('Failed to fetch users');
      const data = await response.json();
      setUsers(data.users || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchNotes = async () => {
    try {
      setLoadingNotes(true);
      const response = await fetch('/api/admin?type=notes');
      if (!response.ok) throw new Error('Failed to fetch notes');
      const data = await response.json();
      setNotes(data.notes || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingNotes(false);
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
    if (!newUserName.trim()) return showMessage('Please enter a name', 'error');

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'addUser', name: newUserName.trim() }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to add user');

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
    if (!selectedUser) return showMessage('Please select a user', 'error');
    if (!pointsToAdd || isNaN(pointsToAdd)) return showMessage('Please enter valid points', 'error');

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'addPoints',
          userId: selectedUser,
          points: parseInt(pointsToAdd)
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to add points');

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

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!newNote.trim()) return showMessage('Please enter a note', 'error');

    setIsSavingNote(true);
    try {
      const response = await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'addNote', noteContent: newNote.trim() })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to save note');

      setNewNote('');
      showMessage('Note added successfully!');
      fetchNotes();
    } catch (err) {
      showMessage(err.message, 'error');
    } finally {
      setIsSavingNote(false);
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      const response = await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'deleteNote', noteId: id }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to delete note');

      showMessage('Note deleted successfully!');
      fetchNotes();
    } catch (err) {
      showMessage(err.message, 'error');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">⚙️ Admin Panel</h1>
          <p className="text-gray-600">Manage users, points & important notes</p>
        </div>

        {/* Status Messages */}
        {success && <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">✅ {success}</div>}
        {error && <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">❌ {error}</div>}

        <div className="grid md:grid-cols-2 gap-8">
          {/* Add New User */}
          <div className="bg-white rounded-lg shadow-xl p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">👤 Add New User</h2>
            <form onSubmit={handleAddUser} className="space-y-4">
              <input type="text" value={newUserName} onChange={(e) => setNewUserName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="Enter user name" disabled={isSubmitting} />
              <button type="submit" disabled={isSubmitting}
                className="w-full py-2 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700">{isSubmitting ? 'Adding...' : 'Add User (10 points)'}</button>
            </form>
          </div>

          {/* Add Points */}
          <div className="bg-white rounded-lg shadow-xl p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">🎯 Add Points</h2>
            <form onSubmit={handleAddPoints} className="space-y-4">
              <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg" disabled={isSubmitting}>
                <option value="">Choose a user...</option>
                {users.map((user) => <option key={user._id} value={user._id}>{user.name} ({user.points} points)</option>)}
              </select>
              <input type="number" value={pointsToAdd} onChange={(e) => setPointsToAdd(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="Enter points" disabled={isSubmitting} />
              <button type="submit" disabled={isSubmitting}
                className="w-full py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700">{isSubmitting ? 'Adding Points...' : 'Add Points'}</button>
            </form>
          </div>
        </div>

        {/* Notes Keeper Section */}
        <div className="mt-8 bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 px-6 py-4">
            <h3 className="text-xl font-bold text-white">📝 Important Notes</h3>
          </div>
          <form onSubmit={handleAddNote} className="p-6 flex gap-4">
            <input type="text" value={newNote} onChange={(e) => setNewNote(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-600 rounded-lg" placeholder="Write a new note..." disabled={isSavingNote} />
            <button type="submit" disabled={isSavingNote}
              className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700">{isSavingNote ? 'Saving...' : 'Save'}</button>
          </form>
          {loadingNotes ? (
            <div className="p-8 text-center text-gray-600">Loading notes...</div>
          ) : notes.length === 0 ? (
            <div className="p-8 text-center text-gray-600">No notes yet. Add your first one above.</div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {notes.map((note) => (
                <li key={note._id} className="flex justify-between items-center px-6 py-4">
                  <span className="text-gray-800">{note.content}</span>
                  <button onClick={() => handleDeleteNote(note._id)}
                    className="text-red-500 hover:text-red-700">🗑 Delete</button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Navigation */}
        <div className="text-center mt-8">
          <a href="/" className="inline-block px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">View Leaderboard</a>
        </div>
      </div>
    </div>
  );
}
