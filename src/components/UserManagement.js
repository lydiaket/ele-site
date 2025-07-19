// src/components/UserManagement.js
import React, { useState, useEffect } from 'react';
import './UserManagement.css';

const UserManagement = () => {
  // State for user list
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // State for creating new users
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserName, setNewUserName] = useState('');
  const [creating, setCreating] = useState(false);

  // Load users when component mounts
  useEffect(() => {
    loadUsers();
  }, []);

  // Function to load all users from API
  const loadUsers = async () => {
    try {
      setLoading(true);
      setError('');
      
      console.log('Loading users from API...');
      const response = await fetch('http://localhost:3001/api/admin/users');
      const data = await response.json();
      
      if (data.success) {
        setUsers(data.users);
        console.log(`Loaded ${data.users.length} users`);
      } else {
        setError(data.error || 'Failed to load users');
      }
    } catch (err) {
      console.error('Error loading users:', err);
      setError('Network error - make sure your backend server is running');
    } finally {
      setLoading(false);
    }
  };

  // Function to create a new user
  const createUser = async (e) => {
    e.preventDefault(); // Prevent form from refreshing page
    
    // Basic validation
    if (!newUserEmail || !newUserEmail.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    try {
      setCreating(true);
      setError('');
      setSuccess('');

      console.log(`Creating user: ${newUserEmail}`);
      
      const response = await fetch('http://localhost:3001/api/admin/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: newUserEmail,
          name: newUserName
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        setSuccess(`User created! Email: ${newUserEmail}, Temporary Password: ${data.temporaryPassword}`);
        setNewUserEmail(''); // Clear form
        setNewUserName('');   // Clear form
        loadUsers(); // Refresh the user list
      } else {
        setError(data.error || 'Failed to create user');
      }
    } catch (err) {
      console.error('Error creating user:', err);
      setError('Network error creating user');
    } finally {
      setCreating(false);
    }
  };

  // Function to enable/disable a user
  const toggleUserStatus = async (username, currentlyEnabled) => {
    try {
      const action = currentlyEnabled ? 'disable' : 'enable';
      console.log(`${action}ing user: ${username}`);
      
      const response = await fetch(`http://localhost:3001/api/admin/users/${username}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action }),
      });

      const data = await response.json();
      
      if (data.success) {
        setSuccess(data.message);
        loadUsers(); // Refresh the list
      } else {
        setError(data.error || 'Failed to update user');
      }
    } catch (err) {
      console.error('Error updating user:', err);
      setError('Network error updating user');
    }
  };

  // Function to delete a user
  const deleteUser = async (username, email) => {
    // Confirm before deleting
    const confirmed = window.confirm(
      `Are you sure you want to permanently delete user ${email}? This action cannot be undone.`
    );
    
    if (!confirmed) return;

    try {
      console.log(`Deleting user: ${username}`);
      
      const response = await fetch(`http://localhost:3001/api/admin/users/${username}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      
      if (data.success) {
        setSuccess(data.message);
        loadUsers(); // Refresh the list
      } else {
        setError(data.error || 'Failed to delete user');
      }
    } catch (err) {
      console.error('Error deleting user:', err);
      setError('Network error deleting user');
    }
  };

  // Helper function to format dates nicely
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Helper function to get a colored status badge
  const getStatusBadge = (status, enabled) => {
    if (!enabled) {
      return <span className="status-badge disabled">Disabled</span>;
    }
    
    switch (status) {
      case 'CONFIRMED':
        return <span className="status-badge confirmed">Active</span>;
      case 'FORCE_CHANGE_PASSWORD':
        return <span className="status-badge pending">Pending Setup</span>;
      case 'UNCONFIRMED':
        return <span className="status-badge unconfirmed">Unconfirmed</span>;
      default:
        return <span className="status-badge unknown">{status}</span>;
    }
  };

  return (
    <div className="user-management">
      <h2>👥 User Management</h2>
      
      {/* Alert Messages */}
      {error && (
        <div className="alert alert-error">
           {error}
          <button onClick={() => setError('')} className="alert-close">×</button>
        </div>
      )}
      
      {success && (
        <div className="alert alert-success">
          {success}
          <button onClick={() => setSuccess('')} className="alert-close">×</button>
        </div>
      )}

      {/* Create New User Form */}
      <div className="create-user-section">
        <h3> Create New User</h3>
        <form onSubmit={createUser} className="create-user-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                value={newUserEmail}
                onChange={(e) => setNewUserEmail(e.target.value)}
                required
                placeholder="user@example.com"
                disabled={creating}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="name">Full Name (Optional)</label>
              <input
                type="text"
                id="name"
                value={newUserName}
                onChange={(e) => setNewUserName(e.target.value)}
                placeholder="John Doe"
                disabled={creating}
              />
            </div>
            
            <div className="form-group">
              <button type="submit" disabled={creating} className="btn btn-primary">
                {creating ? ' Creating...' : '✨ Create User'}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Users List */}
      <div className="users-list-section">
        <div className="section-header">
          <h3> Existing Users ({users.length})</h3>
          <button onClick={loadUsers} className="btn btn-secondary" disabled={loading}>
            {loading ? ' Loading...' : ' Refresh'}
          </button>
        </div>
        
        {loading ? (
          <div className="loading">⏳ Loading users...</div>
        ) : users.length === 0 ? (
          <div className="no-users">
            <p>No users found. Create your first user above! 👆</p>
          </div>
        ) : (
          <div className="users-table-container">
            <table className="users-table">
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.username}>
                    <td>
                      <div className="user-email">
                        {user.email}
                        <small className="username">({user.username})</small>
                      </div>
                    </td>
                    <td>{getStatusBadge(user.status, user.enabled)}</td>
                    <td>{formatDate(user.created)}</td>
                    <td>
                      <div className="user-actions">
                        <button
                          onClick={() => toggleUserStatus(user.username, user.enabled)}
                          className={`btn btn-sm ${user.enabled ? 'btn-warning' : 'btn-success'}`}
                          title={user.enabled ? 'Disable this user' : 'Enable this user'}
                        >
                          {user.enabled ? 'Disable' : 'Enable'}
                        </button>
                        <button
                          onClick={() => deleteUser(user.username, user.email)}
                          className="btn btn-sm btn-danger"
                          title="Permanently delete this user"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Info Box */}
      <div className="info-box">
        <h4>ℹ How it works:</h4>
        <ul>
          <li><strong>Create User:</strong> Generates a temporary password and creates the account</li>
          <li><strong>Pending Setup:</strong> User must change password on first login</li>
          <li><strong>Active:</strong> User has completed setup and can access the platform</li>
          <li><strong>Disable:</strong> Temporarily blocks access without deleting the account</li>
        </ul>
      </div>
    </div>
  );
};

export default UserManagement;