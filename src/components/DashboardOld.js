import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, signOut } from "aws-amplify/auth";
import apiService from '../services/apiService';
import UserManagement from './UserManagement';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [apiData, setApiData] = useState({});
  const [apiLoading, setApiLoading] = useState(false);
  const [academicYears, setAcademicYears] = useState([]);
  const [selectedAcademicYear, setSelectedAcademicYear] = useState('2025-2026');
  const [matches, setMatches] = useState([]);

  // Form states
  const [showMentorForm, setShowMentorForm] = useState(false);
  const [showMenteeForm, setShowMenteeForm] = useState(false);
  const [showMatchingInterface, setShowMatchingInterface] = useState(false);
  const [editingMentor, setEditingMentor] = useState(null);
  const [editingMentee, setEditingMentee] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form data states
  const [mentorFormData, setMentorFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    school: ''
  });

  const [menteeFormData, setMenteeFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    academic_year: '2025-2026',
    graduation_year: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    checkAuthState();
  }, []);

  useEffect(() => {
    if (user) {
      loadAcademicYears();
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      loadApiData();
      loadMatches();
    }
  }, [user, selectedAcademicYear]);

  const checkAuthState = async () => {
    try {
      console.log("Checking auth state...");
      const currentUser = await getCurrentUser();
      console.log("Current user:", currentUser);
      setUser(currentUser);
      setError(null);
    } catch (error) {
      console.log("User not authenticated, redirecting to login:", error);
      setError("Not authenticated");
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  const loadAcademicYears = async () => {
    try {
      const defaultYears = ['2025-2026', '2024-2025', '2023-2024', '2022-2023', '2021-2022', '2020-2021'];
      setAcademicYears(defaultYears);
      setSelectedAcademicYear('2025-2026');
    } catch (err) {
      console.error('Error loading academic years:', err);
    }
  };

  const loadApiData = async () => {
    try {
      setApiLoading(true);
      
      const academicYearFilter = selectedAcademicYear === 'all' ? null : selectedAcademicYear;
      
      const [health, mentors, mentees, stats] = await Promise.all([
        apiService.getHealth(),
        apiService.getMentors(academicYearFilter),
        apiService.getMentees(academicYearFilter),
        apiService.getDashboardStats(academicYearFilter)
      ]);

      setApiData({ health, mentors, mentees, stats });
      
    } catch (err) {
      console.error('API Error:', err);
      setError(err.message);
    } finally {
      setApiLoading(false);
    }
  };

  const loadMatches = async () => {
    try {
      const academicYearFilter = selectedAcademicYear === 'all' ? null : selectedAcademicYear;
      const response = await fetch(`http://localhost:3001/api/matches${academicYearFilter ? `?academic_year=${academicYearFilter}` : ''}`);
      if (response.ok) {
        const matchData = await response.json();
        setMatches(matchData);
      }
    } catch (err) {
      console.error('Error loading matches:', err);
    }
  };

  const createMatch = async (mentorId, menteeId) => {
    try {
      const response = await fetch('http://localhost:3001/api/matches', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mentor_id: mentorId,
          mentee_id: menteeId,
          academic_year: selectedAcademicYear
        })
      });

      if (response.ok) {
        loadMatches();
        loadApiData();
        alert('Match created successfully!');
      } else {
        const error = await response.json();
        alert(`Error: ${error.error || 'Failed to create match'}`);
      }
    } catch (error) {
      console.error('Error creating match:', error);
      alert('Error creating match. Please try again.');
    }
  };

  const removeMatch = async (matchId) => {
    try {
      const response = await fetch(`http://localhost:3001/api/matches/${matchId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        loadMatches();
        loadApiData();
        alert('Match removed successfully!');
      } else {
        const error = await response.json();
        alert(`Error: ${error.error || 'Failed to remove match'}`);
      }
    } catch (error) {
      console.error('Error removing match:', error);
      alert('Error removing match. Please try again.');
    }
  };

  const getMentorMatches = (mentorId) => {
    return matches.filter(match => match.mentor_id === mentorId);
  };

  const getMenteeMatch = (menteeId) => {
    return matches.find(match => match.mentee_id === menteeId);
  };

  const getUnmatchedMentees = () => {
    const matchedMenteeIds = matches.map(match => match.mentee_id);
    return apiData.mentees?.filter(mentee => !matchedMenteeIds.includes(mentee.id)) || [];
  };

  // Previous form handling functions remain the same...
  const handleAcademicYearChange = (event) => {
    setSelectedAcademicYear(event.target.value);
  };

  const resetMentorForm = () => {
    setMentorFormData({
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      school: ''
    });
    setEditingMentor(null);
    setShowMentorForm(false);
  };

  const resetMenteeForm = () => {
    setMenteeFormData({
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      academic_year: '2025-2026',
      graduation_year: ''
    });
    setEditingMentee(null);
    setShowMenteeForm(false);
  };

  const handleMentorSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const url = editingMentor 
        ? `http://localhost:3001/api/mentors/${editingMentor.id}`
        : 'http://localhost:3001/api/mentors';
      
      const method = editingMentor ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mentorFormData)
      });

      if (response.ok) {
        resetMentorForm();
        loadApiData();
        alert(editingMentor ? 'Mentor updated successfully!' : 'Mentor added successfully!');
      } else {
        const error = await response.json();
        alert(`Error: ${error.error || 'Failed to save mentor'}`);
      }
    } catch (error) {
      console.error('Error saving mentor:', error);
      alert('Error saving mentor. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMenteeSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const url = editingMentee 
        ? `http://localhost:3001/api/mentees/${editingMentee.id}`
        : 'http://localhost:3001/api/mentees';
      
      const method = editingMentee ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(menteeFormData)
      });

      if (response.ok) {
        resetMenteeForm();
        loadApiData();
        alert(editingMentee ? 'Mentee updated successfully!' : 'Mentee added successfully!');
      } else {
        const error = await response.json();
        alert(`Error: ${error.error || 'Failed to save mentee'}`);
      }
    } catch (error) {
      console.error('Error saving mentee:', error);
      alert('Error saving mentee. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const startEditMentor = (mentor) => {
    setMentorFormData({
      first_name: mentor.first_name,
      last_name: mentor.last_name,
      email: mentor.email,
      phone: mentor.phone || '',
      school: mentor.school || ''
    });
    setEditingMentor(mentor);
    setShowMentorForm(true);
  };

  const startEditMentee = (mentee) => {
    setMenteeFormData({
      first_name: mentee.first_name,
      last_name: mentee.last_name,
      email: mentee.email,
      phone: mentee.phone || '',
      academic_year: mentee.academic_year || '2025-2026',
      graduation_year: mentee.graduation_year || ''
    });
    setEditingMentee(mentee);
    setShowMenteeForm(true);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/login");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <p>Loading...</p>
      </div>
    );
  }

  if (error && !user) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <p>Error: {error}</p>
        <button onClick={() => navigate("/login")}>Go to Login</button>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      {/* Header with user info and sign out */}
      <div style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center", 
        marginBottom: "30px",
        padding: "15px",
        backgroundColor: "#f8f9fa",
        borderRadius: "8px"
      }}>
        <div>
          <h1>ELE Mentorship Dashboard</h1>
          <p style={{ margin: "5px 0", color: "#666" }}>
            Welcome, {user?.signInDetails?.loginId || user?.username || "User"}!
          </p>
        </div>
        <button 
          onClick={handleSignOut}
          style={{
            padding: "10px 20px",
            backgroundColor: "#dc3545",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Sign Out
        </button>
      </div>

      {/* Academic Year Filter */}
      <div style={{ 
        marginBottom: "20px", 
        padding: "15px", 
        backgroundColor: "#e9ecef", 
        borderRadius: "8px",
        display: "flex",
        alignItems: "center",
        gap: "15px"
      }}>
        <label htmlFor="academicYear" style={{ fontWeight: "bold", color: "#495057" }}>
          Academic Year:
        </label>
        <select
          id="academicYear"
          value={selectedAcademicYear}
          onChange={handleAcademicYearChange}
          style={{
            padding: "8px 12px",
            fontSize: "14px",
            borderRadius: "4px",
            border: "1px solid #ced4da",
            backgroundColor: "white",
            minWidth: "150px"
          }}
        >
          <option value="all">All Years</option>
          {academicYears.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
        <span style={{ color: "#6c757d", fontSize: "14px" }}>
          {selectedAcademicYear === 'all' ? 'Showing all academic years' : `Showing ${selectedAcademicYear} data`}
        </span>
        
        <button
          onClick={() => setShowMatchingInterface(!showMatchingInterface)}
          style={{
            padding: "8px 16px",
            backgroundColor: "#ffc107",
            color: "#212529",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginLeft: "auto"
          }}
        >
          {showMatchingInterface ? "Hide Matching" : "Manage Matches"}
        </button>
      </div>

      {/* API Data Section */}
      {apiLoading ? (
        <div style={{ textAlign: "center", padding: "40px" }}>
          <p>Loading dashboard data...</p>
        </div>
      ) : (
        <>
          {/* System Status
          <div style={{ 
            marginBottom: "20px", 
            padding: "15px", 
            backgroundColor: "#d4edda", 
            borderRadius: "8px",
            border: "1px solid #c3e6cb"
          }}>
            <h3 style={{ margin: "0 0 10px 0", color: "#155724" }}>System Status</h3>
            <p><strong>API Status:</strong> {apiData.health?.status || "Unknown"}</p>
            <p><strong>Database:</strong> {apiData.health?.database || "Unknown"}</p>
            <p><strong>Last Updated:</strong> {apiData.health?.timestamp ? new Date(apiData.health.timestamp).toLocaleString() : "Unknown"}</p>
          </div> */}

          {/* Dashboard Stats */}
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", 
            gap: "15px", 
            marginBottom: "30px" 
          }}>
            <div style={{ padding: "20px", backgroundColor: "#e7f3ff", borderRadius: "8px", textAlign: "center" }}>
              <h3 style={{ margin: "0 0 10px 0", color: "#0066cc" }}>Total Mentors</h3>
              <p style={{ fontSize: "2em", fontWeight: "bold", margin: "0", color: "#0066cc" }}>
                {apiData.stats?.totalMentors || 0}
              </p>
            </div>
            
            <div style={{ padding: "20px", backgroundColor: "#fff3cd", borderRadius: "8px", textAlign: "center" }}>
              <h3 style={{ margin: "0 0 10px 0", color: "#856404" }}>Total Mentees</h3>
              <p style={{ fontSize: "2em", fontWeight: "bold", margin: "0", color: "#856404" }}>
                {apiData.stats?.totalMentees || 0}
              </p>
            </div>
            
            <div style={{ padding: "20px", backgroundColor: "#d1ecf1", borderRadius: "8px", textAlign: "center" }}>
              <h3 style={{ margin: "0 0 10px 0", color: "#0c5460" }}>Active Matches</h3>
              <p style={{ fontSize: "2em", fontWeight: "bold", margin: "0", color: "#0c5460" }}>
                {matches.length}
              </p>
            </div>
            
            <div style={{ padding: "20px", backgroundColor: "#f8d7da", borderRadius: "8px", textAlign: "center" }}>
              <h3 style={{ margin: "0 0 10px 0", color: "#721c24" }}>Unmatched</h3>
              <p style={{ fontSize: "2em", fontWeight: "bold", margin: "0", color: "#721c24" }}>
                {getUnmatchedMentees().length}
              </p>
            </div>
          </div>

          {/* Matching Interface */}
          {showMatchingInterface && (
            <div style={{ 
              marginBottom: "20px", 
              padding: "20px", 
              backgroundColor: "#fff3cd", 
              borderRadius: "8px",
              border: "1px solid #ffeaa7"
            }}>
              <h3 style={{ margin: "0 0 15px 0", color: "#856404" }}>Mentor-Mentee Matching Interface</h3>
              
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                {/* Available Mentors */}
                <div>
                  <h4 style={{ color: "#007bff" }}>Available Mentors</h4>
                  {apiData.mentors?.map(mentor => {
                    const mentorMatches = getMentorMatches(mentor.id);
                    return (
                      <div key={mentor.id} style={{
                        padding: "15px",
                        backgroundColor: "white",
                        borderRadius: "5px",
                        border: "1px solid #dee2e6",
                        marginBottom: "10px"
                      }}>
                        <strong>{mentor.first_name} {mentor.last_name}</strong>
                        <div style={{ fontSize: "14px", color: "#6c757d" }}>
                          {mentor.email} • {mentor.school}
                        </div>
                        
                        {mentorMatches.length > 0 && (
                          <div style={{ marginTop: "10px" }}>
                            <strong style={{ color: "#28a745" }}>Current Mentees:</strong>
                            {mentorMatches.map(match => {
                              const mentee = apiData.mentees?.find(m => m.id === match.mentee_id);
                              return mentee ? (
                                <div key={match.id} style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  padding: "5px 10px",
                                  backgroundColor: "#d4edda",
                                  borderRadius: "3px",
                                  margin: "5px 0"
                                }}>
                                  <span>{mentee.first_name} {mentee.last_name}</span>
                                  <button
                                    onClick={() => removeMatch(match.id)}
                                    style={{
                                      padding: "2px 8px",
                                      backgroundColor: "#dc3545",
                                      color: "white",
                                      border: "none",
                                      borderRadius: "3px",
                                      cursor: "pointer",
                                      fontSize: "12px"
                                    }}
                                  >
                                    Remove
                                  </button>
                                </div>
                              ) : null;
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Unmatched Mentees */}
                <div>
                  <h4 style={{ color: "#28a745" }}>Unmatched Mentees</h4>
                  {getUnmatchedMentees().map(mentee => (
                    <div key={mentee.id} style={{
                      padding: "15px",
                      backgroundColor: "white",
                      borderRadius: "5px",
                      border: "1px solid #dee2e6",
                      marginBottom: "10px"
                    }}>
                      <strong>{mentee.first_name} {mentee.last_name}</strong>
                      <div style={{ fontSize: "14px", color: "#6c757d", marginBottom: "10px" }}>
                        {mentee.email} • Graduating {mentee.graduation_year}
                      </div>
                      
                      <select
                        onChange={(e) => {
                          if (e.target.value) {
                            createMatch(parseInt(e.target.value), mentee.id);
                            e.target.value = "";
                          }
                        }}
                        style={{
                          padding: "5px",
                          border: "1px solid #ced4da",
                          borderRadius: "3px",
                          fontSize: "14px"
                        }}
                      >
                        <option value="">Assign to mentor...</option>
                        {apiData.mentors?.map(mentor => (
                          <option key={mentor.id} value={mentor.id}>
                            {mentor.first_name} {mentor.last_name}
                          </option>
                        ))}
                      </select>
                    </div>
                  ))}
                  
                  {getUnmatchedMentees().length === 0 && (
                    <p style={{ color: "#6c757d", fontStyle: "italic" }}>All mentees are matched!</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Mentors Section */}
          <div style={{ 
            marginBottom: "20px", 
            padding: "20px", 
            backgroundColor: "white", 
            borderRadius: "8px",
            border: "1px solid #dee2e6"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
              <h3 style={{ margin: "0", color: "#495057" }}>
                Active Mentors {selectedAcademicYear !== 'all' && `(${selectedAcademicYear})`}
              </h3>
              <button
                onClick={() => {
                  resetMentorForm();
                  setShowMentorForm(!showMentorForm);
                }}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer"
                }}
              >
                {showMentorForm ? "Cancel" : "+ Add Mentor"}
              </button>
            </div>

            {/* Mentor Form - keeping the same form as before */}
            {showMentorForm && (
              <div style={{
                padding: "15px",
                backgroundColor: "#f8f9fa",
                borderRadius: "5px",
                border: "1px solid #e9ecef",
                marginBottom: "15px"
              }}>
                <h5 style={{ marginTop: 0, color: "#007bff" }}>
                  {editingMentor ? "Edit Mentor" : "Add New Mentor"}
                </h5>
                <form onSubmit={handleMentorSubmit}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "10px" }}>
                    <input
                      type="text"
                      placeholder="First Name *"
                      value={mentorFormData.first_name}
                      onChange={(e) => setMentorFormData({...mentorFormData, first_name: e.target.value})}
                      required
                      style={{ padding: "8px", border: "1px solid #ced4da", borderRadius: "4px" }}
                    />
                    <input
                      type="text"
                      placeholder="Last Name *"
                      value={mentorFormData.last_name}
                      onChange={(e) => setMentorFormData({...mentorFormData, last_name: e.target.value})}
                      required
                      style={{ padding: "8px", border: "1px solid #ced4da", borderRadius: "4px" }}
                    />
                  </div>
                  <div style={{ marginBottom: "10px" }}>
                    <input
                      type="email"
                      placeholder="Email *"
                      value={mentorFormData.email}
                      onChange={(e) => setMentorFormData({...mentorFormData, email: e.target.value})}
                      required
                      style={{ width: "100%", padding: "8px", border: "1px solid #ced4da", borderRadius: "4px" }}
                    />
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "10px" }}>
                    <input
                      type="tel"
                      placeholder="Phone"
                      value={mentorFormData.phone}
                      onChange={(e) => setMentorFormData({...mentorFormData, phone: e.target.value})}
                      style={{ padding: "8px", border: "1px solid #ced4da", borderRadius: "4px" }}
                    />
                    <input
                      type="text"
                      placeholder="School/University"
                      value={mentorFormData.school}
                      onChange={(e) => setMentorFormData({...mentorFormData, school: e.target.value})}
                      style={{ padding: "8px", border: "1px solid #ced4da", borderRadius: "4px" }}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                      padding: "8px 16px",
                      backgroundColor: "#28a745",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: isSubmitting ? "not-allowed" : "pointer"
                    }}
                  >
                    {isSubmitting ? "Saving..." : (editingMentor ? "Update" : "Add")}
                  </button>
                </form>
              </div>
            )}

            {/* Mentors List with Match Info */}
            {apiData.mentors?.length > 0 ? (
              <div style={{ display: "grid", gap: "15px" }}>
                {apiData.mentors.map(mentor => {
                  const mentorMatches = getMentorMatches(mentor.id);
                  return (
                    <div key={mentor.id} style={{ 
                      padding: "15px", 
                      backgroundColor: "#f8f9fa", 
                      borderRadius: "5px",
                      border: "1px solid #e9ecef",
                      borderLeft: mentorMatches.length > 0 ? "4px solid #28a745" : "4px solid #6c757d"
                    }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <div style={{ flex: 1 }}>
                          <strong style={{ color: "#495057", fontSize: "16px" }}>
                            {mentor.first_name} {mentor.last_name}
                          </strong>
                          {mentorMatches.length > 0 && (
                            <span style={{
                              marginLeft: "10px",
                              padding: "2px 8px",
                              backgroundColor: "#28a745",
                              color: "white",
                              borderRadius: "12px",
                              fontSize: "12px"
                            }}>
                              {mentorMatches.length} mentee{mentorMatches.length !== 1 ? 's' : ''}
                            </span>
                          )}
                          <div style={{ marginTop: "8px", color: "#6c757d", lineHeight: "1.5" }}>
                            <div>{mentor.email}</div>
                            {mentor.phone && <div>{mentor.phone}</div>}
                            {mentor.school && <div>{mentor.school}</div>}
                          </div>
                          
                          {mentorMatches.length > 0 && (
                            <div style={{ marginTop: "10px" }}>
                              <strong style={{ color: "#28a745", fontSize: "14px" }}>Mentees:</strong>
                              {mentorMatches.map(match => {
                                const mentee = apiData.mentees?.find(m => m.id === match.mentee_id);
                                return mentee ? (
                                  <div key={match.id} style={{
                                    padding: "5px 10px",
                                    backgroundColor: "#d4edda",
                                    borderRadius: "3px",
                                    margin: "3px 0",
                                    fontSize: "14px"
                                  }}>
                                    {mentee.first_name} {mentee.last_name} • {mentee.email}
                                  </div>
                                ) : null;
                              })}
                            </div>
                          )}
                        </div>
                        <button
                          onClick={() => startEditMentor(mentor)}
                          style={{
                            padding: "5px 10px",
                            backgroundColor: "#6c757d",
                            color: "white",
                            border: "none",
                            borderRadius: "3px",
                            cursor: "pointer",
                            fontSize: "12px"
                          }}
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p style={{ color: "#6c757d", fontStyle: "italic" }}>No mentors found</p>
            )}
          </div>

          {/* Mentees Section */}
          <div style={{ 
            padding: "20px", 
            backgroundColor: "white", 
            borderRadius: "8px",
            border: "1px solid #dee2e6"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
              <h3 style={{ margin: "0", color: "#495057" }}>
                Active Mentees {selectedAcademicYear !== 'all' && `(${selectedAcademicYear})`}
              </h3>
              <button
                onClick={() => {
                  resetMenteeForm();
                  setShowMenteeForm(!showMenteeForm);
                }}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#28a745",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer"
                }}
              >
                {showMenteeForm ? "Cancel" : "+ Add Mentee"}
              </button>
            </div>

            {/* Mentee Form */}
            {showMenteeForm && (
              <div style={{
                padding: "15px",
                backgroundColor: "#f8f9fa",
                borderRadius: "5px",
                border: "1px solid #e9ecef",
                marginBottom: "15px"
              }}>
                <h5 style={{ marginTop: 0, color: "#28a745" }}>
                  {editingMentee ? "Edit Mentee" : "Add New Mentee"}
                </h5>
                <form onSubmit={handleMenteeSubmit}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "10px" }}>
                    <input
                      type="text"
                      placeholder="First Name *"
                      value={menteeFormData.first_name}
                      onChange={(e) => setMenteeFormData({...menteeFormData, first_name: e.target.value})}
                      required
                      style={{ padding: "8px", border: "1px solid #ced4da", borderRadius: "4px" }}
                    />
                    <input
                      type="text"
                      placeholder="Last Name *"
                      value={menteeFormData.last_name}
                      onChange={(e) => setMenteeFormData({...menteeFormData, last_name: e.target.value})}
                      required
                      style={{ padding: "8px", border: "1px solid #ced4da", borderRadius: "4px" }}
                    />
                  </div>
                  <div style={{ marginBottom: "10px" }}>
                    <input
                      type="email"
                      placeholder="Email *"
                      value={menteeFormData.email}
                      onChange={(e) => setMenteeFormData({...menteeFormData, email: e.target.value})}
                      required
                      style={{ width: "100%", padding: "8px", border: "1px solid #ced4da", borderRadius: "4px" }}
                    />
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px", marginBottom: "10px" }}>
                    <input
                      type="tel"
                      placeholder="Phone"
                      value={menteeFormData.phone}
                      onChange={(e) => setMenteeFormData({...menteeFormData, phone: e.target.value})}
                      style={{ padding: "8px", border: "1px solid #ced4da", borderRadius: "4px" }}
                    />
                    <select
                      value={menteeFormData.academic_year}
                      onChange={(e) => setMenteeFormData({...menteeFormData, academic_year: e.target.value})}
                      style={{ padding: "8px", border: "1px solid #ced4da", borderRadius: "4px" }}
                    >
                      <option value="2025-2026">2025-2026</option>
                      <option value="2024-2025">2024-2025</option>
                      <option value="2023-2024">2023-2024</option>
                    </select>
                    <input
                      type="number"
                      placeholder="Grad Year"
                      value={menteeFormData.graduation_year}
                      onChange={(e) => setMenteeFormData({...menteeFormData, graduation_year: e.target.value})}
                      min="2024"
                      max="2030"
                      style={{ padding: "8px", border: "1px solid #ced4da", borderRadius: "4px" }}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                      padding: "8px 16px",
                      backgroundColor: "#007bff",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: isSubmitting ? "not-allowed" : "pointer"
                    }}
                  >
                    {isSubmitting ? "Saving..." : (editingMentee ? "Update" : "Add")}
                  </button>
                </form>
              </div>
            )}

            {/* Mentees List with Match Info */}
            {apiData.mentees?.length > 0 ? (
              <div style={{ display: "grid", gap: "15px" }}>
                {apiData.mentees.map(mentee => {
                  const menteeMatch = getMenteeMatch(mentee.id);
                  const mentor = menteeMatch ? apiData.mentors?.find(m => m.id === menteeMatch.mentor_id) : null;
                  
                  return (
                    <div key={mentee.id} style={{ 
                      padding: "15px", 
                      backgroundColor: "#f8f9fa", 
                      borderRadius: "5px",
                      border: "1px solid #e9ecef",
                      borderLeft: menteeMatch ? "4px solid #28a745" : "4px solid #dc3545"
                    }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <div style={{ flex: 1 }}>
                          <strong style={{ color: "#495057", fontSize: "16px" }}>
                            {mentee.first_name} {mentee.last_name}
                          </strong>
                          {menteeMatch ? (
                            <span style={{
                              marginLeft: "10px",
                              padding: "2px 8px",
                              backgroundColor: "#28a745",
                              color: "white",
                              borderRadius: "12px",
                              fontSize: "12px"
                            }}>
                              Matched
                            </span>
                          ) : (
                            <span style={{
                              marginLeft: "10px",
                              padding: "2px 8px",
                              backgroundColor: "#dc3545",
                              color: "white",
                              borderRadius: "12px",
                              fontSize: "12px"
                            }}>
                              Unmatched
                            </span>
                          )}
                          
                          <div style={{ marginTop: "8px", color: "#6c757d", lineHeight: "1.5" }}>
                            <div>{mentee.email}</div>
                            {mentee.phone && <div>{mentee.phone}</div>}
                            {mentee.graduation_year && <div>Graduating {mentee.graduation_year}</div>}
                          </div>
                          
                          {menteeMatch && mentor && (
                            <div style={{ 
                              marginTop: "10px",
                              padding: "8px 12px",
                              backgroundColor: "#d4edda",
                              borderRadius: "5px",
                              border: "1px solid #c3e6cb"
                            }}>
                              <strong style={{ color: "#155724", fontSize: "14px" }}>
                                Mentor: {mentor.first_name} {mentor.last_name}
                              </strong>
                              <div style={{ fontSize: "13px", color: "#155724" }}>
                                {mentor.email} • {mentor.school}
                              </div>
                            </div>
                          )}
                        </div>
                        <button
                          onClick={() => startEditMentee(mentee)}
                          style={{
                            padding: "5px 10px",
                            backgroundColor: "#6c757d",
                            color: "white",
                            border: "none",
                            borderRadius: "3px",
                            cursor: "pointer",
                            fontSize: "12px"
                          }}
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p style={{ color: "#6c757d", fontStyle: "italic" }}>No mentees found</p>
            )}
          </div>
        </>
      )}
      <section className="dashboard-section">
        <UserManagement />
      </section>
    </div>
  );
};

export default Dashboard;