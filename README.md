# ELE Mentorship Platform

A comprehensive full-stack mentorship management system designed to connect mentors and mentees in educational programs. Built with modern web technologies and cloud infrastructure for scalability and reliability.

## Features

### Core Functionality
- User Authentication - Secure login/logout via AWS Cognito
- Mentor Management - Add, edit, and manage mentor profiles
- Mentee Management - Add, edit, and manage mentee profiles  
- Smart Matching System - Interface for creating mentor-mentee pairs
- Academic Year Filtering - Filter data by specific academic years
- Real-time Dashboard - Live statistics and data visualization
- Match Status Tracking - Indicators for matched/unmatched status

### Advanced Features
- Multi-year Support - Mentors available across multiple academic years
- Relationship Tracking - See all current mentor-mentee relationships
- Contact Information - Phone numbers, emails, and school affiliations
- Graduation Tracking - Track mentee graduation years
- Database Integration - Real-time PostgreSQL database updates

## Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React Frontend │    │  Express.js API │    │  PostgreSQL DB  │
│   (Port 3000)   │◄──►│   (Port 3001)   │◄──►│   (AWS RDS)     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │
         ▼                       ▼
┌─────────────────┐    ┌─────────────────┐
│  AWS Cognito    │    │    REST API     │
│  Authentication │    │   Endpoints     │
└─────────────────┘    └─────────────────┘
```

## Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- PostgreSQL database (AWS RDS recommended)
- AWS Cognito User Pool (for authentication)

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/ele-mentorship-platform.git
cd ele-mentorship-platform
```

### 2. Backend Setup
```bash
cd ele-api
npm install
```

Create `.env` file in `ele-api/` directory:
```env
DB_HOST=your-rds-endpoint.amazonaws.com
DB_PORT=5432
DB_NAME=your_database_name
DB_USER=your_username
DB_PASSWORD=your_password
```

Start the backend server:
```bash
node server.js
```

The API will be running at `http://localhost:3001`

### 3. Frontend Setup
```bash
# From project root
npm install
npm start
```

The React app will be running at `http://localhost:3000`

### 4. Database Setup
Run the following SQL commands in your PostgreSQL database:

```sql
-- Create academic years table
CREATE TABLE academic_years (
    id SERIAL PRIMARY KEY,
    year_label VARCHAR(20) NOT NULL UNIQUE,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    is_active BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create mentors table
CREATE TABLE mentors (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    school VARCHAR(200),
    academic_year VARCHAR(20),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create mentees table
CREATE TABLE mentees (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    academic_year VARCHAR(20),
    graduation_year INTEGER,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create matches table
CREATE TABLE mentor_mentee_matches (
    id SERIAL PRIMARY KEY,
    mentor_id INTEGER REFERENCES mentors(id) ON DELETE CASCADE,
    mentee_id INTEGER REFERENCES mentees(id) ON DELETE CASCADE,
    academic_year VARCHAR(20),
    match_date DATE DEFAULT CURRENT_DATE,
    status VARCHAR(20) DEFAULT 'active',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(mentor_id, mentee_id, academic_year)
);
```

## API Endpoints

### Authentication
- All endpoints require AWS Cognito authentication
- Frontend handles authentication automatically

### Mentors
- `GET /api/mentors` - Get all mentors (with academic year filter)
- `POST /api/mentors` - Create new mentor
- `PUT /api/mentors/:id` - Update mentor
- `GET /api/mentors?academic_year=2024-2025` - Filter by academic year

### Mentees
- `GET /api/mentees` - Get all mentees (with academic year filter)
- `POST /api/mentees` - Create new mentee
- `PUT /api/mentees/:id` - Update mentee

### Matches
- `GET /api/matches` - Get all active matches
- `POST /api/matches` - Create new mentor-mentee match
- `DELETE /api/matches/:id` - Remove match

### System
- `GET /api/health` - System health check
- `GET /api/dashboard/stats` - Dashboard statistics

## Data Management

### Academic Year Logic
- Mentors with `academic_year = NULL` appear for all years
- Mentees are tied to specific academic years
- Matches are created within academic year contexts

### Example Data Structure
```javascript
// Mentor (available for all years)
{
  "id": 1,
  "first_name": "John",
  "last_name": "Smith",
  "email": "john@university.edu",
  "phone": "301-555-0123",
  "school": "Georgetown University",
  "academic_year": null  // Available for all years
}

// Mentee (specific year)
{
  "id": 1,
  "first_name": "Jane",
  "last_name": "Doe",
  "email": "jane@student.edu",
  "phone": "240-555-0456",
  "academic_year": "2024-2025",
  "graduation_year": 2025
}
```

## Configuration

### Environment Variables
```env
# Database Configuration
DB_HOST=your-database-host
DB_PORT=5432
DB_NAME=your_database_name
DB_USER=your_username
DB_PASSWORD=your_password

# AWS Configuration (set in AWS Amplify config)
REACT_APP_AWS_REGION=us-east-2
REACT_APP_USER_POOL_ID=us-east-2_xxxxxxxxx
REACT_APP_USER_POOL_WEB_CLIENT_ID=xxxxxxxxxxxxxxxxx
```

### AWS Cognito Setup
1. Create User Pool in AWS Cognito
2. Configure OAuth settings with redirect URLs
3. Update Amplify configuration in your React app

## Dashboard Features

### Main Interface
- System Status - API and database health indicators
- Statistics Cards - Total mentors, mentees, matches, and unmatched
- Academic Year Filter - Dropdown to filter by specific years
- Manage Matches Button - Toggle matching interface
- Inline Forms - Add/edit mentors and mentees directly in their sections

### Matching Interface
- Two-column layout - Available mentors and unmatched mentees
- Current matches displayed under each mentor
- Dropdown assignment for assigning mentees to mentors
- Remove matches functionality

### Status Indicators
- Border colors indicate match status
- Status badges show matched/unmatched state
- Relationship cards display mentor-mentee connections

## Deployment

### Frontend (React)
- Deploy to Vercel, Netlify, or AWS Amplify
- Configure environment variables for production
- Update API base URL for production backend

### Backend (Express.js)
- Deploy to Heroku, AWS EC2, or AWS Lambda
- Ensure environment variables are set
- Configure CORS for production frontend URL

### Database
- AWS RDS PostgreSQL (recommended)
- Configure security groups for backend access
- Regular backups and monitoring

## Security Features

- AWS Cognito Authentication - Enterprise-grade user management
- Protected Routes - Dashboard only accessible after login
- Input Validation - Server-side validation for all inputs
- SQL Injection Prevention - Parameterized queries
- Environment Variables - Sensitive data stored securely
- CORS Configuration - Controlled cross-origin access

## Testing

### API Testing
```bash
# Test health endpoint
curl http://localhost:3001/api/health

# Test mentors endpoint
curl http://localhost:3001/api/mentors

# Test with academic year filter
curl "http://localhost:3001/api/mentors?academic_year=2024-2025"
```

### Frontend Testing
- Navigate to `http://localhost:3000`
- Test login/logout flow
- Test CRUD operations for mentors/mentees
- Test matching functionality
- Test academic year filtering

## Sample Data

To get started quickly, you can add sample data:

```sql
-- Sample mentors (available for all years)
INSERT INTO mentors (first_name, last_name, email, phone, school, academic_year) VALUES
('Sarah', 'Johnson', 'sarah.j@university.edu', '301-555-0123', 'Georgetown University', NULL),
('Michael', 'Davis', 'michael.d@college.edu', '240-555-0456', 'University of Maryland', NULL);

-- Sample mentees (specific years)
INSERT INTO mentees (first_name, last_name, email, phone, academic_year, graduation_year) VALUES
('Emily', 'Smith', 'emily.s@student.edu', '301-555-0789', '2024-2025', 2025),
('David', 'Wilson', 'david.w@student.edu', '240-555-0321', '2024-2025', 2026);

-- Sample academic years
INSERT INTO academic_years (year_label, start_date, end_date, is_active) VALUES
('2024-2025', '2024-08-01', '2025-07-31', true),
('2025-2026', '2025-08-01', '2026-07-31', false);
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

### Common Issues

**"Failed to create match"**
- Ensure `mentor_mentee_matches` table exists
- Check that `academic_year` column is present
- Verify mentor and mentee IDs exist

**"Database connection failed"**
- Check `.env` file configuration
- Verify RDS security groups allow connections
- Confirm database credentials are correct

**"Authentication errors"**
- Verify AWS Cognito configuration
- Check Amplify setup in React app
- Ensure redirect URLs are configured

### Getting Help
- Check the [Issues](https://github.com/yourusername/ele-mentorship-platform/issues) page
- Create a new issue with detailed error information
- Include relevant logs and configuration details

## Tech Stack

- **Frontend:** React, AWS Amplify Auth, React Router
- **Backend:** Express.js, Node.js
- **Database:** PostgreSQL (AWS RDS)
- **Authentication:** AWS Cognito
- **API:** RESTful endpoints with JSON responses