// src/components/DatabaseTest.js
import React, { useState, useEffect } from 'react';
import dbService from '../services/dbService';

const DatabaseTest = () => {
  const [connectionStatus, setConnectionStatus] = useState('testing...');
  const [mentors, setMentors] = useState([]);
  const [mentees, setMentees] = useState([]);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    testDatabase();
  }, []);

  const testDatabase = async () => {
    try {
      // Test connection
      const connected = await dbService.testConnection();
      setConnectionStatus(connected ? 'Connected ✅' : 'Failed ❌');

      if (connected) {
        // Fetch sample data
        const mentorData = await dbService.getMentors();
        const menteeData = await dbService.getMentees();
        const activeYear = await dbService.getActiveAcademicYear();
        
        setMentors(mentorData);
        setMentees(menteeData);

        if (activeYear) {
          const statsData = await dbService.getDashboardStats(activeYear.id);
          setStats(statsData);
        }
      }
    } catch (error) {
      console.error('Database test failed:', error);
      setConnectionStatus('Error: ' + error.message);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Database Connection Test</h2>
      <p><strong>Status:</strong> {connectionStatus}</p>

      {stats && (
        <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f5f5f5', borderRadius: '5px' }}>
          <h3>Dashboard Stats</h3>
          <ul>
            <li>Total Mentors: {stats.total_mentors}</li>
            <li>Total Mentees: {stats.total_mentees}</li>
            <li>Current Matches: {stats.total_matches}</li>
            <li>Unmatched Mentees: {stats.unmatched_mentees}</li>
            <li>Available Mentors: {stats.available_mentors}</li>
          </ul>
        </div>
      )}

      <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
        <div style={{ flex: 1 }}>
          <h3>Mentors ({mentors.length})</h3>
          {mentors.map(mentor => (
            <div key={mentor.id} style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ddd', borderRadius: '3px' }}>
              <strong>{mentor.first_name} {mentor.last_name}</strong><br />
              Email: {mentor.email}<br />
              Current Mentees: {mentor.current_mentees}/{mentor.max_mentees}<br />
              Available Slots: {mentor.available_slots}
            </div>
          ))}
        </div>

        <div style={{ flex: 1 }}>
          <h3>Mentees ({mentees.length})</h3>
          {mentees.map(mentee => (
            <div key={mentee.id} style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ddd', borderRadius: '3px' }}>
              <strong>{mentee.first_name} {mentee.last_name}</strong><br />
              Grade: {mentee.grade_level}<br />
              Email: {mentee.email}<br />
              {mentee.mentor_first_name ? (
                <span style={{ color: 'green' }}>
                  Matched with: {mentee.mentor_first_name} {mentee.mentor_last_name}
                </span>
              ) : (
                <span style={{ color: 'orange' }}>Unmatched</span>
              )}
            </div>
          ))}
        </div>
      </div>

      <button onClick={testDatabase} style={{ marginTop: '20px', padding: '10px 20px' }}>
        Refresh Data
      </button>
    </div>
  );
};

export default DatabaseTest;