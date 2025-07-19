/* eslint-disable */
// server.js - Updated with real database connection
require('dotenv').config(); 
const express = require('express');
const cors = require('cors');
const pool = require('./db'); 
const cognitoAdminService = require('./services/cognitoAdminService');

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Health check with database connection test
app.get('/api/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({
      status: 'healthy',
      message: 'ELE Mentorship API is running',
      timestamp: new Date().toISOString(),
      database: 'connected'
    });
  } catch (error) {
    console.error('Health check failed:', error);
    res.status(500).json({
      status: 'unhealthy',
      message: 'API running but database connection failed',
      timestamp: new Date().toISOString(),
      database: 'disconnected',
      error: error.message
    });
  }
});

// Get academic years
app.get('/api/academic-years', async (req, res) => {
  try {
    const result = await pool.query('SELECT DISTINCT academic_year FROM academic_years ORDER BY academic_year DESC');
    const academicYears = result.rows.map(row => row.academic_year);
    
    // If no academic years in database, return default range
    if (academicYears.length === 0) {
      return res.json(['2025-2026', '2024-2025', '2023-2024']);
    }
    
    res.json(academicYears);
  } catch (error) {
    console.error('Error fetching academic years:', error);
    res.status(500).json({ error: 'Failed to fetch academic years' });
  }
});

// Updated mentors endpoint - shows mentors with NULL academic_year for all years
app.get('/api/mentors', async (req, res) => {
  try {
    const { academic_year } = req.query;
    
    // Mentors with NULL academic_year appear for all years
    // Mentors with specific academic_year only appear for that year
    let query = 'SELECT id, first_name, last_name, email, phone, school, academic_year, is_active, created_at FROM mentors WHERE is_active = true AND (academic_year IS NULL';
    const params = [];
    
    if (academic_year && academic_year !== 'all') {
      query += ' OR academic_year = $1)';
      params.push(academic_year);
    } else {
      query += ')';
    }
    
    query += ' ORDER BY last_name, first_name';
    
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching mentors:', error);
    res.status(500).json({ error: 'Failed to fetch mentors' });
  }
});

// Real mentees endpoint (unchanged)
app.get('/api/mentees', async (req, res) => {
  try {
    const { academic_year } = req.query;
    
    let query = 'SELECT id, first_name, last_name, email, phone, graduation_year, academic_year, is_active, created_at FROM mentees WHERE is_active = true';
    const params = [];
    
    if (academic_year && academic_year !== 'all') {
      query += ' AND academic_year = $1';
      params.push(academic_year);
    }
    
    query += ' ORDER BY last_name, first_name';
    
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching mentees:', error);
    res.status(500).json({ error: 'Failed to fetch mentees' });
  }
});

// Updated dashboard stats - counts all-years mentors for any year selection
app.get('/api/dashboard/stats', async (req, res) => {
  try {
    const { academic_year } = req.query;
    
    // Count mentors (including all-years mentors for any year selection)
    let mentorQuery = 'SELECT COUNT(*) as count FROM mentors WHERE is_active = true AND (academic_year IS NULL';
    let menteeQuery = 'SELECT COUNT(*) as count FROM mentees WHERE is_active = true';
    
    const params = [];
    
    if (academic_year && academic_year !== 'all') {
      mentorQuery += ' OR academic_year = $1)';
      menteeQuery += ' AND academic_year = $1';
      params.push(academic_year);
    } else {
      mentorQuery += ')';
    }
    
    const [mentorResult, menteeResult] = await Promise.all([
      pool.query(mentorQuery, params),
      pool.query(menteeQuery, params.length > 0 ? params : [])
    ]);
    
    const totalMentors = parseInt(mentorResult.rows[0].count);
    const totalMentees = parseInt(menteeResult.rows[0].count);
    
    res.json({
      totalMentors,
      totalMentees,
      unMatchedMentees: totalMentees, 
      academicYear: academic_year || 'All Years'
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard stats' });
  }
});

// POST /api/mentors - Add new mentor
app.post('/api/mentors', async (req, res) => {
  try {
    const { first_name, last_name, email, phone, school } = req.body;
    
    // Validate required fields
    if (!first_name || !last_name || !email) {
      return res.status(400).json({ error: 'First name, last name, and email are required' });
    }
    
    const query = `
      INSERT INTO mentors (first_name, last_name, email, phone, school, academic_year, is_active) 
      VALUES ($1, $2, $3, $4, $5, NULL, true) 
      RETURNING *
    `;
    
    const result = await pool.query(query, [first_name, last_name, email, phone, school]);
    
    res.status(201).json({
      message: 'Mentor added successfully',
      mentor: result.rows[0]
    });
  } catch (error) {
    console.error('Error adding mentor:', error);
    
    // Handle unique constraint violation (duplicate email)
    if (error.code === '23505') {
      return res.status(400).json({ error: 'Email already exists' });
    }
    
    res.status(500).json({ error: 'Failed to add mentor' });
  }
});

// POST /api/mentees - Add new mentee
app.post('/api/mentees', async (req, res) => {
  try {
    const { first_name, last_name, email, phone, academic_year, graduation_year } = req.body;
    
    // Validate required fields
    if (!first_name || !last_name || !email) {
      return res.status(400).json({ error: 'First name, last name, and email are required' });
    }
    
    const query = `
      INSERT INTO mentees (first_name, last_name, email, phone, academic_year, graduation_year, is_active) 
      VALUES ($1, $2, $3, $4, $5, $6, true) 
      RETURNING *
    `;
    
    const result = await pool.query(query, [
      first_name, 
      last_name, 
      email, 
      phone, 
      academic_year || '2025-2026', 
      graduation_year
    ]);
    
    res.status(201).json({
      message: 'Mentee added successfully',
      mentee: result.rows[0]
    });
  } catch (error) {
    console.error('Error adding mentee:', error);
    
    // Handle unique constraint violation (duplicate email)
    if (error.code === '23505') {
      return res.status(400).json({ error: 'Email already exists' });
    }
    
    res.status(500).json({ error: 'Failed to add mentee' });
  }
});

// PUT /api/mentors/:id - Update mentor
app.put('/api/mentors/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { first_name, last_name, email, phone, school } = req.body;
    
    const query = `
      UPDATE mentors 
      SET first_name = $1, last_name = $2, email = $3, phone = $4, school = $5, updated_at = CURRENT_TIMESTAMP
      WHERE id = $6 
      RETURNING *
    `;
    
    const result = await pool.query(query, [first_name, last_name, email, phone, school, id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Mentor not found' });
    }
    
    res.json({
      message: 'Mentor updated successfully',
      mentor: result.rows[0]
    });
  } catch (error) {
    console.error('Error updating mentor:', error);
    res.status(500).json({ error: 'Failed to update mentor' });
  }
});

// PUT /api/mentees/:id - Update mentee
app.put('/api/mentees/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { first_name, last_name, email, phone, academic_year, graduation_year } = req.body;
    
    const query = `
      UPDATE mentees 
      SET first_name = $1, last_name = $2, email = $3, phone = $4, academic_year = $5, graduation_year = $6, updated_at = CURRENT_TIMESTAMP
      WHERE id = $7 
      RETURNING *
    `;
    
    const result = await pool.query(query, [first_name, last_name, email, phone, academic_year, graduation_year, id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Mentee not found' });
    }
    
    res.json({
      message: 'Mentee updated successfully',
      mentee: result.rows[0]
    });
  } catch (error) {
    console.error('Error updating mentee:', error);
    res.status(500).json({ error: 'Failed to update mentee' });
  }
 });

// GET /api/matches - Get all matches with optional academic year filter
app.get('/api/matches', async (req, res) => {
  try {
    const { academic_year } = req.query;
    
    let query = `
      SELECT 
        mm.*,
        m.first_name as mentor_first_name,
        m.last_name as mentor_last_name,
        me.first_name as mentee_first_name,
        me.last_name as mentee_last_name
      FROM mentor_mentee_matches mm
      JOIN mentors m ON mm.mentor_id = m.id
      JOIN mentees me ON mm.mentee_id = me.id
      WHERE mm.status = 'active'
    `;
    
    const params = [];
    
    if (academic_year && academic_year !== 'all') {
      query += ' AND mm.academic_year = $1';
      params.push(academic_year);
    }
    
    query += ' ORDER BY mm.created_at DESC';
    
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching matches:', error);
    res.status(500).json({ error: 'Failed to fetch matches' });
  }
});

// POST /api/matches - Create new match
app.post('/api/matches', async (req, res) => {
  try {
    const { mentor_id, mentee_id, academic_year } = req.body;
    
    // Check if mentee is already matched
    const existingMatch = await pool.query(
      'SELECT id FROM mentor_mentee_matches WHERE mentee_id = $1 AND status = \'active\'',
      [mentee_id]
    );
    
    if (existingMatch.rows.length > 0) {
      return res.status(400).json({ error: 'Mentee is already matched to another mentor' });
    }
    
    const query = `
      INSERT INTO mentor_mentee_matches (mentor_id, mentee_id, academic_year, status, match_date)
      VALUES ($1, $2, $3, 'active', CURRENT_DATE)
      RETURNING *
    `;
    
    const result = await pool.query(query, [mentor_id, mentee_id, academic_year]);
    
    res.status(201).json({
      message: 'Match created successfully',
      match: result.rows[0]
    });
  } catch (error) {
    console.error('Error creating match:', error);
    res.status(500).json({ error: 'Failed to create match' });
  }
});

// DELETE /api/matches/:id - Remove match
app.delete('/api/matches/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const query = 'UPDATE mentor_mentee_matches SET status = \'inactive\' WHERE id = $1 RETURNING *';
    const result = await pool.query(query, [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Match not found' });
    }
    
    res.json({
      message: 'Match removed successfully',
      match: result.rows[0]
    });
  } catch (error) {
    console.error('Error removing match:', error);
    res.status(500).json({ error: 'Failed to remove match' });
  }
});



// Route to create a new user
app.post('/api/admin/users', async (req, res) => {
  try {
    console.log('Admin creating new user...');
    
    // Get the email from the request
    const { email, name, role } = req.body;
    
    // Basic validation
    if (!email || !email.includes('@')) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid email address'
      });
    }

    console.log(`Creating user with email: ${email}`);
    
    // Use our service to create the user
    const result = await cognitoAdminService.createUser(email);
    
    if (result.success) {
      // User created successfully
      res.status(201).json({
        success: true,
        message: result.message,
        temporaryPassword: result.temporaryPassword
      });
    } else {
      // Something went wrong
      res.status(400).json({
        success: false,
        error: result.error
      });
    }
    
  } catch (error) {
    console.error('Server error creating user:', error);
    res.status(500).json({
      success: false,
      error: 'Server error - please try again'
    });
  }
});

// Route to get all users
app.get('/api/admin/users', async (req, res) => {
  try {
    console.log('Admin requesting user list...');
    
    // Use our service to get the user list
    const result = await cognitoAdminService.listUsers();
    
    if (result.success) {
      res.json({
        success: true,
        users: result.users
      });
    } else {
      res.status(500).json({
        success: false,
        error: result.error
      });
    }
    
  } catch (error) {
    console.error('Server error listing users:', error);
    res.status(500).json({
      success: false,
      error: 'Server error - please try again'
    });
  }
});

// Route to enable or disable a user
app.patch('/api/admin/users/:username', async (req, res) => {
  try {
    const { username } = req.params; // Get username from URL
    const { action } = req.body;     // Get action from request body
    
    console.log(`Admin ${action}ing user: ${username}`);
    
    let result;
    if (action === 'enable') {
      result = await cognitoAdminService.enableUser(username);
    } else if (action === 'disable') {
      result = await cognitoAdminService.disableUser(username);
    } else {
      return res.status(400).json({
        success: false,
        error: 'Action must be either "enable" or "disable"'
      });
    }
    
    if (result.success) {
      res.json({
        success: true,
        message: result.message
      });
    } else {
      res.status(400).json({
        success: false,
        error: result.error
      });
    }
    
  } catch (error) {
    console.error('Server error updating user:', error);
    res.status(500).json({
      success: false,
      error: 'Server error - please try again'
    });
  }
});

// Route to delete a user
app.delete('/api/admin/users/:username', async (req, res) => {
  try {
    const { username } = req.params; // Get username from URL
    
    console.log(`Admin deleting user: ${username}`);
    
    const result = await cognitoAdminService.deleteUser(username);
    
    if (result.success) {
      res.json({
        success: true,
        message: result.message
      });
    } else {
      res.status(400).json({
        success: false,
        error: result.error
      });
    }
    
  } catch (error) {
    console.error('Server error deleting user:', error);
    res.status(500).json({
      success: false,
      error: 'Server error - please try again'
    });
  }
});

app.listen(port, () => {
  console.log(`🚀 ELE Mentorship API running on http://localhost:${port}`);
  console.log(`📊 Health check: http://localhost:${port}/api/health`);
  console.log(`👥 Real mentors: http://localhost:${port}/api/mentors`);
  console.log(`🎓 Real mentees: http://localhost:${port}/api/mentees`);
});

process.on('SIGINT', () => {
  console.log('\n👋 Shutting down server...');
  process.exit(0);
});