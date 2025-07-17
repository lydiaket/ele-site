/* eslint-disable */
// AdminForms.js - Component for adding mentors and mentees
import React, { useState } from 'react';

const AdminForms = ({ onDataAdded }) => {
  const [showMentorForm, setShowMentorForm] = useState(false);
  const [showMenteeForm, setShowMenteeForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mentor form state
  const [mentorData, setMentorData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    school: ''
  });

  // Mentee form state
  const [menteeData, setMenteeData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    academic_year: '2025-2026',
    graduation_year: ''
  });

  const handleMentorChange = (e) => {
    setMentorData({
      ...mentorData,
      [e.target.name]: e.target.value
    });
  };

  const handleMenteeChange = (e) => {
    setMenteeData({
      ...menteeData,
      [e.target.name]: e.target.value
    });
  };

  const handleMentorSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:3001/api/mentors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mentorData)
      });

      if (response.ok) {
        // Reset form
        setMentorData({
          first_name: '',
          last_name: '',
          email: '',
          phone: '',
          school: ''
        });
        setShowMentorForm(false);
        
        // Notify parent to refresh data
        if (onDataAdded) {
          onDataAdded();
        }
        
        alert('Mentor added successfully!');
      } else {
        const error = await response.json();
        alert(`Error: ${error.error || 'Failed to add mentor'}`);
      }
    } catch (error) {
      console.error('Error adding mentor:', error);
      alert('Error adding mentor. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMenteeSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:3001/api/mentees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(menteeData)
      });

      if (response.ok) {
        // Reset form
        setMenteeData({
          first_name: '',
          last_name: '',
          email: '',
          phone: '',
          academic_year: '2025-2026',
          graduation_year: ''
        });
        setShowMenteeForm(false);
        
        // Notify parent to refresh data
        if (onDataAdded) {
          onDataAdded();
        }
        
        alert('Mentee added successfully!');
      } else {
        const error = await response.json();
        alert(`Error: ${error.error || 'Failed to add mentee'}`);
      }
    } catch (error) {
      console.error('Error adding mentee:', error);
      alert('Error adding mentee. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ 
      marginBottom: "30px", 
      padding: "20px", 
      backgroundColor: "#f1f3f4", 
      borderRadius: "8px",
      border: "1px solid #d1ecf1"
    }}>
      <h3 style={{ margin: "0 0 20px 0", color: "#0c5460" }}>Admin Controls</h3>
      
      {/* Action Buttons */}
      <div style={{ display: "flex", gap: "15px", marginBottom: "20px" }}>
        <button
          onClick={() => {
            setShowMentorForm(!showMentorForm);
            setShowMenteeForm(false);
          }}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          {showMentorForm ? "Cancel" : "+ Add Mentor"}
        </button>
        
        <button
          onClick={() => {
            setShowMenteeForm(!showMenteeForm);
            setShowMentorForm(false);
          }}
          style={{
            padding: "10px 20px",
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

      {/* Mentor Form */}
      {showMentorForm && (
        <div style={{
          padding: "20px",
          backgroundColor: "white",
          borderRadius: "8px",
          border: "1px solid #dee2e6",
          marginBottom: "20px"
        }}>
          <h4 style={{ marginTop: 0, color: "#007bff" }}>Add New Mentor</h4>
          <form onSubmit={handleMentorSubmit}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginBottom: "15px" }}>
              <div>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                  First Name *
                </label>
                <input
                  type="text"
                  name="first_name"
                  value={mentorData.first_name}
                  onChange={handleMentorChange}
                  required
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    border: "1px solid #ced4da",
                    borderRadius: "4px"
                  }}
                />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                  Last Name *
                </label>
                <input
                  type="text"
                  name="last_name"
                  value={mentorData.last_name}
                  onChange={handleMentorChange}
                  required
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    border: "1px solid #ced4da",
                    borderRadius: "4px"
                  }}
                />
              </div>
            </div>
            
            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={mentorData.email}
                onChange={handleMentorChange}
                required
                style={{
                  width: "100%",
                  padding: "8px 12px",
                  border: "1px solid #ced4da",
                  borderRadius: "4px"
                }}
              />
            </div>
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginBottom: "15px" }}>
              <div>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={mentorData.phone}
                  onChange={handleMentorChange}
                  placeholder="e.g., 301-555-0123"
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    border: "1px solid #ced4da",
                    borderRadius: "4px"
                  }}
                />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                  School/University
                </label>
                <input
                  type="text"
                  name="school"
                  value={mentorData.school}
                  onChange={handleMentorChange}
                  placeholder="e.g., Georgetown University"
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    border: "1px solid #ced4da",
                    borderRadius: "4px"
                  }}
                />
              </div>
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                padding: "10px 20px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: isSubmitting ? "not-allowed" : "pointer"
              }}
            >
              {isSubmitting ? "Adding Mentor..." : "Add Mentor"}
            </button>
          </form>
        </div>
      )}

      {/* Mentee Form */}
      {showMenteeForm && (
        <div style={{
          padding: "20px",
          backgroundColor: "white",
          borderRadius: "8px",
          border: "1px solid #dee2e6"
        }}>
          <h4 style={{ marginTop: 0, color: "#28a745" }}>Add New Mentee</h4>
          <form onSubmit={handleMenteeSubmit}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginBottom: "15px" }}>
              <div>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                  First Name *
                </label>
                <input
                  type="text"
                  name="first_name"
                  value={menteeData.first_name}
                  onChange={handleMenteeChange}
                  required
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    border: "1px solid #ced4da",
                    borderRadius: "4px"
                  }}
                />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                  Last Name *
                </label>
                <input
                  type="text"
                  name="last_name"
                  value={menteeData.last_name}
                  onChange={handleMenteeChange}
                  required
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    border: "1px solid #ced4da",
                    borderRadius: "4px"
                  }}
                />
              </div>
            </div>
            
            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={menteeData.email}
                onChange={handleMenteeChange}
                required
                style={{
                  width: "100%",
                  padding: "8px 12px",
                  border: "1px solid #ced4da",
                  borderRadius: "4px"
                }}
              />
            </div>
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "15px", marginBottom: "15px" }}>
              <div>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={menteeData.phone}
                  onChange={handleMenteeChange}
                  placeholder="e.g., 240-555-0123"
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    border: "1px solid #ced4da",
                    borderRadius: "4px"
                  }}
                />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                  Academic Year
                </label>
                <select
                  name="academic_year"
                  value={menteeData.academic_year}
                  onChange={handleMenteeChange}
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    border: "1px solid #ced4da",
                    borderRadius: "4px"
                  }}
                >
                  <option value="2025-2026">2025-2026</option>
                  <option value="2024-2025">2024-2025</option>
                  <option value="2023-2024">2023-2024</option>
                </select>
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                  Graduation Year
                </label>
                <input
                  type="number"
                  name="graduation_year"
                  value={menteeData.graduation_year}
                  onChange={handleMenteeChange}
                  placeholder="e.g., 2026"
                  min="2024"
                  max="2030"
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    border: "1px solid #ced4da",
                    borderRadius: "4px"
                  }}
                />
              </div>
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                padding: "10px 20px",
                backgroundColor: "#28a745",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: isSubmitting ? "not-allowed" : "pointer"
              }}
            >
              {isSubmitting ? "Adding Mentee..." : "Add Mentee"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminForms;