// src/components/GraphQLTest.js
import React, { useState, useEffect } from 'react';
import graphqlService from '../services/graphqlService';

const GraphQLTest = () => {
  const [academicYears, setAcademicYears] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [mentees, setMentees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    testGraphQLAPI();
  }, []);

  const testGraphQLAPI = async () => {
    try {
      console.log('Testing GraphQL API...');
      
      // First, create a sample academic year
      const newAcademicYear = await graphqlService.createAcademicYear({
        yearLabel: "2025-2026",
        startDate: "2025-08-01",
        endDate: "2026-07-31",
        isActive: true
      });
      console.log('Created academic year:', newAcademicYear);

      // Create a sample mentor
      const newMentor = await graphqlService.createMentor({
        firstName: "Sarah",
        lastName: "Johnson",
        email: "sarah.j@test.com",
        phone: "555-0101",
        specialties: ["College Prep", "SAT Tutoring"],
        maxMentees: 3,
        status: "ACTIVE"
      });
      console.log('Created mentor:', newMentor);

      // Create a sample mentee
      const newMentee = await graphqlService.createMentee({
        firstName: "Alex",
        lastName: "Kim",
        email: "alex.k@test.com",
        phone: "555-0201",
        gradeLevel: 11,
        graduationYear: 2026,
        interests: ["Engineering", "Robotics"],
        goals: "Get into MIT for engineering",
        status: "ACTIVE"
      });
      console.log('Created mentee:', newMentee);

      // Fetch all data
      const years = await graphqlService.getAcademicYears();
      const mentorsList = await graphqlService.getMentors();
      const menteesList = await graphqlService.getMentees();

      setAcademicYears(years);
      setMentors(mentorsList);
      setMentees(menteesList);
      
    } catch (error) {
      console.error('GraphQL test error:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const createSampleMatch = async () => {
    try {
      if (mentors.length > 0 && mentees.length > 0 && academicYears.length > 0) {
        const match = await graphqlService.createMatch({
          mentorID: mentors[0].id,
          menteeID: mentees[0].id,
          academicYearID: academicYears[0].id,
          matchDate: new Date().toISOString().split('T')[0],
          status: "ACTIVE",
          matchNotes: "Great pairing based on shared interests in engineering"
        });
        console.log('Created match:', match);
        alert('Match created successfully!');
      }
    } catch (error) {
      console.error('Error creating match:', error);
      alert('Error creating match: ' + error.message);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <p>Testing GraphQL API...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '20px', color: 'red' }}>
        <h2>GraphQL Error</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>GraphQL API Test - Success! 🎉</h2>
      
      <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#d4edda', borderRadius: '5px' }}>
        <h3>API Status: Connected ✅</h3>
        <p>Your GraphQL API is working perfectly with authentication!</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
        
        <div>
          <h3>Academic Years ({academicYears.length})</h3>
          {academicYears.map(year => (
            <div key={year.id} style={{ 
              padding: '10px', 
              border: '1px solid #ddd', 
              borderRadius: '5px', 
              marginBottom: '10px',
              backgroundColor: year.isActive ? '#e7f5e7' : '#f8f9fa'
            }}>
              <strong>{year.yearLabel}</strong><br />
              Status: {year.isActive ? '✅ Active' : '⏸️ Inactive'}<br />
              <small>ID: {year.id}</small>
            </div>
          ))}
        </div>

        <div>
          <h3>Mentors ({mentors.length})</h3>
          {mentors.map(mentor => (
            <div key={mentor.id} style={{ 
              padding: '10px', 
              border: '1px solid #ddd', 
              borderRadius: '5px', 
              marginBottom: '10px' 
            }}>
              <strong>{mentor.firstName} {mentor.lastName}</strong><br />
              Email: {mentor.email}<br />
              Specialties: {mentor.specialties?.join(', ')}<br />
              Max Mentees: {mentor.maxMentees}<br />
              <small>ID: {mentor.id}</small>
            </div>
          ))}
        </div>

        <div>
          <h3>Mentees ({mentees.length})</h3>
          {mentees.map(mentee => (
            <div key={mentee.id} style={{ 
              padding: '10px', 
              border: '1px solid #ddd', 
              borderRadius: '5px', 
              marginBottom: '10px' 
            }}>
              <strong>{mentee.firstName} {mentee.lastName}</strong><br />
              Grade: {mentee.gradeLevel}<br />
              Email: {mentee.email}<br />
              Interests: {mentee.interests?.join(', ')}<br />
              <small>ID: {mentee.id}</small>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <button 
          onClick={createSampleMatch}
          style={{ 
            padding: '10px 20px', 
            backgroundColor: '#007bff', 
            color: 'white', 
            border: 'none', 
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Create Sample Match
        </button>
      </div>

      <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '5px' }}>
        <h4>Next Steps:</h4>
        <ul>
          <li>✅ GraphQL API is working</li>
          <li>✅ Authentication is integrated</li>
          <li>✅ Data is being stored in DynamoDB</li>
          <li>🎯 Ready to build your real Dashboard!</li>
        </ul>
      </div>
    </div>
  );
};

export default GraphQLTest;