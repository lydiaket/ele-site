// src/components/ApiTest.js
import React, { useState, useEffect } from 'react';
import apiService from '../services/apiService';

const ApiTest = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    testApi();
  }, []);

  const testApi = async () => {
    try {
      setLoading(true);
      
      // Test all API endpoints
      const [health, mentors, mentees, stats] = await Promise.all([
        apiService.getHealth(),
        apiService.getMentors(),
        apiService.getMentees(),
        apiService.getDashboardStats()
      ]);

      setData({ health, mentors, mentees, stats });
      setLoading(false);
      
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (loading) return <div style={{padding: '20px'}}>Loading API test...</div>;
  if (error) return <div style={{padding: '20px', color: 'red'}}>Error: {error}</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>🚀 Express API Test - Success!</h2>
      
      <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#d4edda', borderRadius: '5px' }}>
        <h3>✅ Health Check</h3>
        <p><strong>Status:</strong> {data.health?.status}</p>
        <p><strong>Message:</strong> {data.health?.message}</p>
        <p><strong>Timestamp:</strong> {data.health?.timestamp}</p>
      </div>

      <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#e2e8f0', borderRadius: '5px' }}>
        <h3>👥 Mentors ({data.mentors?.length || 0})</h3>
        {data.mentors?.map(mentor => (
          <div key={mentor.id} style={{ marginBottom: '10px', padding: '10px', backgroundColor: 'white', borderRadius: '3px' }}>
            <strong>{mentor.first_name} {mentor.last_name}</strong><br/>
            <span>{mentor.occupation} - {mentor.email}</span>
          </div>
        ))}
      </div>

      <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#fef7e0', borderRadius: '5px' }}>
        <h3>🎓 Mentees ({data.mentees?.length || 0})</h3>
        {data.mentees?.map(mentee => (
          <div key={mentee.id} style={{ marginBottom: '10px', padding: '10px', backgroundColor: 'white', borderRadius: '3px' }}>
            <strong>{mentee.first_name} {mentee.last_name}</strong><br/>
            <span>Grade {mentee.grade_level} at {mentee.school}</span>
          </div>
        ))}
      </div>

      <div style={{ padding: '15px', backgroundColor: '#f0f9ff', borderRadius: '5px' }}>
        <h3>📊 Dashboard Stats</h3>
        <p><strong>Total Mentors:</strong> {data.stats?.totalMentors}</p>
        <p><strong>Total Mentees:</strong> {data.stats?.totalMentees}</p>
        <p><strong>Total Matches:</strong> {data.stats?.totalMatches}</p>
        <p><strong>Available Mentors:</strong> {data.stats?.availableMentors}</p>
      </div>

      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f0fdf4', borderRadius: '5px' }}>
        <h3>🎯 Next Steps</h3>
        <ul>
          <li>✅ Express API working perfectly</li>
          <li>✅ React app connecting to API</li>
          <li>🔄 Ready to update Dashboard with real data</li>
          <li>🔄 Ready to add database connection</li>
        </ul>
      </div>
    </div>
  );
};

export default ApiTest;