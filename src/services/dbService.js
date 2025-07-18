// // src/services/dbService.js
// const { Pool } = require('pg');

// // Database connection configuration
// const pool = new Pool({
//   host: process.env.REACT_APP_DB_HOST,
//   port: process.env.REACT_APP_DB_PORT,
//   database: process.env.REACT_APP_DB_NAME,
//   user: process.env.REACT_APP_DB_USER,
//   password: process.env.REACT_APP_DB_PASSWORD,
//   ssl: {
//     rejectUnauthorized: false // Required for AWS RDS
//   }
// });

// // Test database connection
// export const testConnection = async () => {
//   try {
//     const client = await pool.connect();
//     const result = await client.query('SELECT NOW()');
//     client.release();
//     console.log('Database connected successfully:', result.rows[0]);
//     return true;
//   } catch (error) {
//     console.error('Database connection failed:', error);
//     return false;
//   }
// };

// // Academic Years
// export const getAcademicYears = async () => {
//   try {
//     const result = await pool.query(
//       'SELECT * FROM academic_years ORDER BY start_date DESC'
//     );
//     return result.rows;
//   } catch (error) {
//     console.error('Error fetching academic years:', error);
//     throw error;
//   }
// };

// export const getActiveAcademicYear = async () => {
//   try {
//     const result = await pool.query(
//       'SELECT * FROM academic_years WHERE is_active = true LIMIT 1'
//     );
//     return result.rows[0];
//   } catch (error) {
//     console.error('Error fetching active academic year:', error);
//     throw error;
//   }
// };

// // Mentors
// export const getMentors = async () => {
//   try {
//     const result = await pool.query(`
//       SELECT m.*, 
//              COUNT(mm.id) as current_mentees,
//              (m.max_mentees - COUNT(mm.id)) as available_slots
//       FROM mentors m
//       LEFT JOIN mentor_mentee_matches mm ON m.id = mm.mentor_id 
//         AND mm.status = 'active'
//       WHERE m.status = 'active'
//       GROUP BY m.id
//       ORDER BY m.last_name, m.first_name
//     `);
//     return result.rows;
//   } catch (error) {
//     console.error('Error fetching mentors:', error);
//     throw error;
//   }
// };

// export const addMentor = async (mentorData) => {
//   try {
//     const {
//       firstName, lastName, email, phone, 
//       specialties, maxMentees, availabilityNotes
//     } = mentorData;
    
//     const result = await pool.query(`
//       INSERT INTO mentors 
//       (first_name, last_name, email, phone, specialties, max_mentees, availability_notes)
//       VALUES ($1, $2, $3, $4, $5, $6, $7)
//       RETURNING *
//     `, [firstName, lastName, email, phone, specialties, maxMentees, availabilityNotes]);
    
//     return result.rows[0];
//   } catch (error) {
//     console.error('Error adding mentor:', error);
//     throw error;
//   }
// };

// // Mentees
// export const getMentees = async (academicYearId = null) => {
//   try {
//     let query = `
//       SELECT m.*, 
//              mm.id as match_id,
//              mm.mentor_id,
//              ment.first_name as mentor_first_name,
//              ment.last_name as mentor_last_name
//       FROM mentees m
//       LEFT JOIN mentor_mentee_matches mm ON m.id = mm.mentee_id 
//         AND mm.status = 'active'
//       LEFT JOIN mentors ment ON mm.mentor_id = ment.id
//       WHERE m.status = 'active'
//     `;
    
//     const params = [];
//     if (academicYearId) {
//       query += ' AND (mm.academic_year_id = $1 OR mm.academic_year_id IS NULL)';
//       params.push(academicYearId);
//     }
    
//     query += ' ORDER BY m.grade_level DESC, m.last_name, m.first_name';
    
//     const result = await pool.query(query, params);
//     return result.rows;
//   } catch (error) {
//     console.error('Error fetching mentees:', error);
//     throw error;
//   }
// };

// export const addMentee = async (menteeData) => {
//   try {
//     const {
//       firstName, lastName, email, phone, 
//       gradeLevel, graduationYear, interests, goals, parentContact
//     } = menteeData;
    
//     const result = await pool.query(`
//       INSERT INTO mentees 
//       (first_name, last_name, email, phone, grade_level, graduation_year, interests, goals, parent_contact)
//       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
//       RETURNING *
//     `, [firstName, lastName, email, phone, gradeLevel, graduationYear, interests, goals, parentContact]);
    
//     return result.rows[0];
//   } catch (error) {
//     console.error('Error adding mentee:', error);
//     throw error;
//   }
// };

// // Matches
// export const getMatches = async (academicYearId) => {
//   try {
//     const result = await pool.query(`
//       SELECT mm.*,
//              ment.first_name as mentor_first_name,
//              ment.last_name as mentor_last_name,
//              ment.email as mentor_email,
//              ment.phone as mentor_phone,
//              m.first_name as mentee_first_name,
//              m.last_name as mentee_last_name,
//              m.email as mentee_email,
//              m.phone as mentee_phone,
//              m.grade_level,
//              ay.year_label
//       FROM mentor_mentee_matches mm
//       JOIN mentors ment ON mm.mentor_id = ment.id
//       JOIN mentees m ON mm.mentee_id = m.id
//       JOIN academic_years ay ON mm.academic_year_id = ay.id
//       WHERE mm.academic_year_id = $1 AND mm.status = 'active'
//       ORDER BY ment.last_name, m.last_name
//     `, [academicYearId]);
    
//     return result.rows;
//   } catch (error) {
//     console.error('Error fetching matches:', error);
//     throw error;
//   }
// };

// export const createMatch = async (mentorId, menteeId, academicYearId, notes = '') => {
//   try {
//     const result = await pool.query(`
//       INSERT INTO mentor_mentee_matches 
//       (mentor_id, mentee_id, academic_year_id, match_notes)
//       VALUES ($1, $2, $3, $4)
//       RETURNING *
//     `, [mentorId, menteeId, academicYearId, notes]);
    
//     return result.rows[0];
//   } catch (error) {
//     console.error('Error creating match:', error);
//     throw error;
//   }
// };

// // Dashboard stats
// export const getDashboardStats = async (academicYearId) => {
//   try {
//     const statsQuery = await pool.query(`
//       SELECT 
//         (SELECT COUNT(*) FROM mentors WHERE status = 'active') as total_mentors,
//         (SELECT COUNT(*) FROM mentees WHERE status = 'active') as total_mentees,
//         (SELECT COUNT(*) FROM mentor_mentee_matches WHERE academic_year_id = $1 AND status = 'active') as total_matches,
//         (SELECT COUNT(*) FROM mentees m 
//          WHERE m.status = 'active' 
//          AND NOT EXISTS (
//            SELECT 1 FROM mentor_mentee_matches mm 
//            WHERE mm.mentee_id = m.id 
//            AND mm.academic_year_id = $1 
//            AND mm.status = 'active'
//          )) as unmatched_mentees,
//         (SELECT COUNT(*) FROM mentors m 
//          WHERE m.status = 'active' 
//          AND (
//            SELECT COUNT(*) FROM mentor_mentee_matches mm 
//            WHERE mm.mentor_id = m.id 
//            AND mm.academic_year_id = $1 
//            AND mm.status = 'active'
//          ) < m.max_mentees) as available_mentors
//     `, [academicYearId]);
    
//     return statsQuery.rows[0];
//   } catch (error) {
//     console.error('Error fetching dashboard stats:', error);
//     throw error;
//   }
// };

// export default {
//   testConnection,
//   getAcademicYears,
//   getActiveAcademicYear,
//   getMentors,
//   addMentor,
//   getMentees,
//   addMentee,
//   getMatches,
//   createMatch,
//   getDashboardStats
// };