'use client';
import { useState, useEffect } from 'react';
import { Calendar, User, MapPin, Tag, Clock, Eye, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

export default function AdminContributionsPage() {
  const [contributions, setContributions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedContribution, setSelectedContribution] = useState(null);
  const [updating, setUpdating] = useState(null);
  const [adminRemarks, setAdminRemarks] = useState('');
  const [points, setPoints] = useState(10);

  useEffect(() => {
    fetchContributions();
  }, []);

  const fetchContributions = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/contri');
      const data = await response.json();
      
      if (data.success) {
        setContributions(data.data);
      } else {
        console.error('Failed to fetch contributions');
      }
    } catch (error) {
      console.error('Error fetching contributions:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateContributionStatus = async (contributionId, status) => {
    try {
      setUpdating(contributionId);
      
      const response = await fetch('/api/contri', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contributionId,
          status,
          adminRemarks,
          points: (status === 'accepted' || status === 'approved') ? points : 0
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        // Remove the contribution from the list since it's no longer pending
        setContributions(prev => prev.filter(c => c._id !== contributionId));
        setSelectedContribution(null);
        setAdminRemarks('');
        setPoints(10);
      } else {
        alert('Failed to update contribution status');
      }
    } catch (error) {
      console.error('Error updating contribution:', error);
      alert('Error updating contribution');
    } finally {
      setUpdating(null);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'approved': return 'bg-blue-100 text-blue-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin - Contribution Management</h1>
          <p className="text-gray-600">Review and manage pending contributions</p>
        </div>

        {contributions.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <AlertCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No pending contributions</h3>
            <p className="text-gray-500">All contributions have been reviewed.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Contributions List */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Pending Contributions ({contributions.length})
              </h2>
              {contributions.map((contribution) => (
                <div
                  key={contribution._id}
                  className={`bg-white rounded-lg shadow p-6 cursor-pointer transition-all hover:shadow-md ${
                    selectedContribution?._id === contribution._id ? 'ring-2 ring-blue-500' : ''
                  }`}
                  onClick={() => setSelectedContribution(contribution)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-medium text-gray-900 truncate pr-4">
                      {contribution.title}
                    </h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(contribution.status)}`}>
                      {contribution.status}
                    </span>
                  </div>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>{contribution.cityName}</span>
                    </div>
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      <span>User ID: {contribution.userId.slice(-8)}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>{new Date(contribution.submittedAt).toLocaleDateString()}</span>
                    </div>
                    {contribution.category && (
                      <div className="flex items-center">
                        <Tag className="h-4 w-4 mr-2" />
                        <span>{contribution.category}</span>
                      </div>
                    )}
                  </div>
                  
                  {contribution.description && (
                    <p className="mt-3 text-sm text-gray-700 line-clamp-2">
                      {contribution.description}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Contribution Details */}
            <div className="sticky top-6">
              {selectedContribution ? (
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center mb-4">
                    <Eye className="h-5 w-5 mr-2 text-gray-400" />
                    <h2 className="text-xl font-semibold text-gray-900">Contribution Details</h2>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Title</h3>
                      <p className="text-gray-700">{selectedContribution.title}</p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Description</h3>
                      <p className="text-gray-700 whitespace-pre-wrap">
                        {selectedContribution.description || 'No description provided'}
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="font-medium text-gray-900 mb-2">City</h3>
                        <p className="text-gray-700">{selectedContribution.cityName}</p>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 mb-2">Category</h3>
                        <p className="text-gray-700">{selectedContribution.category || 'N/A'}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">User ID</h3>
                      <p className="text-gray-700 font-mono text-sm">{selectedContribution.userId}</p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Submitted</h3>
                      <p className="text-gray-700">
                        {new Date(selectedContribution.submittedAt).toLocaleString()}
                      </p>
                    </div>
                    
                    {selectedContribution.images && selectedContribution.images.length > 0 && (
                      <div>
                        <h3 className="font-medium text-gray-900 mb-2">Images ({selectedContribution.images.length})</h3>
                        <div className="grid grid-cols-1 gap-2">
                          {selectedContribution.images.slice(0, 4).map((image, index) => (
                            <img
                              key={index}
                              src={image}
                              alt={`Contribution image ${index + 1}`}
                              className="w-full object-cover rounded border"
                            />
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {selectedContribution.video && (
                      <div>
                        <h3 className="font-medium text-gray-900 mb-2">Video</h3>
                        <video
                          src={selectedContribution.video}
                          controls
                          className="w-full h-48 rounded border"
                        />
                      </div>
                    )}
                    
                    {/* Admin Action Form */}
                    <div className="border-t pt-6 mt-6">
                      <h3 className="font-medium text-gray-900 mb-4">Admin Actions</h3>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Admin Remarks
                          </label>
                          <textarea
                            value={adminRemarks}
                            onChange={(e) => setAdminRemarks(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows={3}
                            placeholder="Add remarks (optional)"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Points to Award (for accepted/approved)
                          </label>
                          <input
                            type="number"
                            value={points}
                            onChange={(e) => setPoints(Number(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            min="0"
                            max="100"
                          />
                        </div>
                        
                        <div className="grid grid-cols-3 gap-3">
                          <button
                            onClick={() => updateContributionStatus(selectedContribution._id, 'accepted')}
                            disabled={updating === selectedContribution._id}
                            className="flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Accept
                          </button>
                          
                          <button
                            onClick={() => updateContributionStatus(selectedContribution._id, 'approved')}
                            disabled={updating === selectedContribution._id}
                            className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Approve
                          </button>
                          
                          <button
                            onClick={() => updateContributionStatus(selectedContribution._id, 'rejected')}
                            disabled={updating === selectedContribution._id}
                            className="flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Reject
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow p-8 text-center">
                  <Eye className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Select a contribution</h3>
                  <p className="text-gray-500">Choose a contribution from the list to view details and take action.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}