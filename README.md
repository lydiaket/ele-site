# ELE Site

A comprehensive mentorship platform featuring a public-facing website for program information and applications, plus a secure administrative dashboard for managing mentor-mentee relationships. Built with React, Express.js, and AWS cloud services.

## Project Overview

The ELE site consists of two main components:

1. **Public Website** - Information pages, program details, and application forms
2. **Admin Dashboard** - Secure platform for managing mentors, mentees, and matches

## Features

### Public Website
- **Home Page** - Program overview and key information
- **About Us** - Mission, vision, and team information
- **Apply** - Application forms for mentors and mentees
- **Resources** - Educational materials and guides
- **Newsletter** - Program updates and announcements
- **Responsive Design** - Mobile-friendly interface

### Admin Dashboard
- **Secure Authentication** - AWS Cognito OAuth integration
- **Mentor Management** - Add, edit, and track mentor profiles
- **Mentee Management** - Student profile management with graduation tracking
- **Matching System** - Visual interface for creating mentor-mentee pairs
- **Academic Year Filtering** - Multi-year program support
- **Real-time Statistics** - Dashboard with live data and metrics
- **Contact Management** - Phone, email, and institutional affiliations

## Architecture

### Frontend Architecture
```
Public Website (React Router)
├── Home (/), About (/about), Apply (/apply)
├── Resources (/resources), Newsletter (/newsletter)
└── Admin Login (/login) → Protected Dashboard (/dashboard)
```

### Full System Architecture
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React Frontend │    │  Express.js API │    │  PostgreSQL DB  │
│   (Port 3000)   │◄──►│   (Port 3001)   │◄──►│   (AWS RDS)     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │
         ▼                       ▼
┌─────────────────┐    ┌─────────────────┐
│  AWS Cognito    │    │    Admin API    │
│  Authentication │    │   Endpoints     │
└─────────────────┘    └─────────────────┘
```

## Tech Stack

### Frontend
- **React** - Main framework
- **React Router** - Client-side routing for public pages and admin
- **AWS Amplify** - Authentication SDK for admin dashboard
- **CSS** - Custom styling for responsive design

### Backend (Admin API)
- **Express.js** - REST API server
- **PostgreSQL** - Primary database (AWS RDS)
- **AWS Cognito** - User authentication and authorization
- **CORS** - Cross-origin resource sharing configuration

### Infrastructure
- **AWS RDS** - Managed PostgreSQL database
- **AWS Cognito** - Identity and access management
- **Node.js** - Runtime environment

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- PostgreSQL database (AWS RDS configured)
- AWS Cognito User Pool (for admin access)

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/ele-mentorship-platform.git
cd ele-mentorship-platform
```

### 2. Frontend Setup
```bash
# Install frontend dependencies
npm install

# Start development server (public website + admin)
npm start
```

The website will be running at `http://localhost:3000`

**Available Routes:**
- `/` - Home page
- `/about` - About us page
- `/apply` - Application page
- `/resources` - Resources page
- `/newsletter` - Newsletter page
- `/login` - Admin login (redirects to AWS Cognito)
- `/dashboard` - Admin dashboard (requires authentication)

### 3. Backend Setup (Admin API)
```bash
cd ele-api
npm install
```

Create `.env` file in `ele-api/` directory:
```env
DB_HOST=ele-mentorship-db.c5amyowwm996.us-east-2.rds.amazonaws.com
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

### 4. Database Setup
Run the following SQL commands in your PostgreSQL database:

```sql
-- Academic years table
CREATE TABLE academic_years (
    id SERIAL PRIMARY KEY,
    year_label VARCHAR(20) NOT NULL UNIQUE,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    is_active BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Mentors table
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

-- Mentees table
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

-- Mentor-mentee matches table
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

## Project Structure

```
ele-mentorship-platform/
├── public/
│   ├── index.html              # Main HTML template
│   ├── favicon.ico             # Site favicon
│   └── ...
├── src/
│   ├── components/
│   │   ├── Home.js             # Home page component
│   │   ├── About.js            # About page component
│   │   ├── Apply.js            # Application page component
│   │   ├── Resources.js        # Resources page component
│   │   ├── Newsletter.js       # Newsletter page component
│   │   ├── Login.js            # Admin login component
│   │   └── Dashboard.js        # Admin dashboard component
│   ├── services/
│   │   └── apiService.js       # API communication service
│   ├── App.js                  # Main app with routing
│   ├── App.css                 # Global styles
│   └── index.js                # React entry point
├── ele-api/                    # Backend API directory
│   ├── server.js               # Express server
│   ├── db.js                   # Database connection
│   ├── .env                    # Environment variables
│   └── package.json            # Backend dependencies
├── package.json                # Frontend dependencies
└── README.md                   # This file
```

## API Endpoints (Admin Only)

### Authentication
- All admin endpoints require AWS Cognito authentication
- Frontend handles authentication automatically

### Admin Dashboard API
- `GET /api/health` - System health check
- `GET /api/mentors` - Get all mentors (with academic year filter)
- `POST /api/mentors` - Create new mentor
- `PUT /api/mentors/:id` - Update mentor
- `GET /api/mentees` - Get all mentees (with academic year filter)
- `POST /api/mentees` - Create new mentee
- `PUT /api/mentees/:id` - Update mentee
- `GET /api/matches` - Get all active matches
- `POST /api/matches` - Create new mentor-mentee match
- `DELETE /api/matches/:id` - Remove match
- `GET /api/dashboard/stats` - Dashboard statistics

## Admin Dashboard Features

### User Management
- Secure login via AWS Cognito OAuth
- Automatic token refresh and session management
- Protected routes requiring authentication

### Mentor Management
- Add mentor profiles with contact information
- Edit existing mentor details
- Track university/school affiliations
- Multi-year availability (mentors can serve across academic years)

### Mentee Management
- Student profile management
- Graduation year tracking
- Academic year assignments
- Contact information management

### Matching System
- Visual interface for creating mentor-mentee pairs
- Dropdown assignment system
- Real-time match status updates
- Match history and management

### Academic Year Support
- Filter data by specific academic years (2020-2021 through 2025-2026)
- Multi-year program management
- Year-specific statistics and reporting

### Dashboard Analytics
- Real-time statistics display
- Total mentors, mentees, matches, and unmatched counts
- System health monitoring
- Database connection status

## Configuration

### Environment Variables
```env
# Backend API (.env in ele-api/)
DB_HOST=your-database-host
DB_PORT=5432
DB_NAME=your_database_name
DB_USER=your_username
DB_PASSWORD=your_password

# Frontend (set in AWS Amplify config)
REACT_APP_AWS_REGION=us-east-2
REACT_APP_USER_POOL_ID=us-east-2_xxxxxxxxx
REACT_APP_USER_POOL_WEB_CLIENT_ID=xxxxxxxxxxxxxxxxx
```

### AWS Cognito Setup
1. Create User Pool in AWS Cognito console
2. Configure OAuth settings with redirect URLs:
   - Sign-in redirect: `http://localhost:3000/` (dev) or `https://yourdomain.com/` (prod)
   - Sign-out redirect: `http://localhost:3000/` (dev) or `https://yourdomain.com/` (prod)
3. Update Amplify configuration in your React app

## Deployment

### Frontend Deployment
**Option 1: Vercel (Recommended)**
```bash
npm install -g vercel
vercel --prod
```

**Option 2: Netlify**
```bash
npm run build
# Upload build/ folder to Netlify
```

**Option 3: AWS Amplify Hosting**
```bash
amplify add hosting
amplify publish
```

### Backend Deployment
**Option 1: Heroku**
```bash
cd ele-api
git init
heroku create your-app-name-api
git add .
git commit -m "Deploy API"
git push heroku main
```

**Option 2: AWS EC2**
- Launch EC2 instance
- Install Node.js and PostgreSQL client
- Configure security groups for database access
- Deploy code and start server

### Database
- AWS RDS PostgreSQL (already configured)
- Ensure security groups allow backend server access
- Configure automated backups
- Monitor performance and scaling

## Security Features

### Public Website
- No authentication required for public pages
- Contact forms with input validation
- Secure form submission handling

### Admin Dashboard
- AWS Cognito enterprise-grade authentication
- OAuth 2.0 with PKCE for security
- Automatic token refresh and management
- Protected routes with authentication checks
- SQL injection prevention with parameterized queries
- CORS configuration for API security

## Development Workflow

### Running Locally
```bash
# Terminal 1: Frontend (public website + admin)
npm start

# Terminal 2: Backend API (admin functionality)
cd ele-api
node server.js
```

### Adding New Public Pages
1. Create component in `src/components/`
2. Add route in `App.js`
3. Add navigation link if needed
4. Style in `App.css`

### Adding Admin Features
1. Create API endpoint in `ele-api/server.js`
2. Add frontend functionality in `Dashboard.js`
3. Update database schema if needed
4. Test authentication flow

## Testing

### Frontend Testing
- Navigate to public pages: `http://localhost:3000/`
- Test admin login flow: `http://localhost:3000/login`
- Verify protected routes work correctly
- Test responsive design on mobile devices

### API Testing
```bash
# Test public endpoints
curl http://localhost:3001/api/health

# Test admin endpoints (requires authentication)
curl "http://localhost:3001/api/mentors"
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Make changes to public website OR admin dashboard
4. Test both public and admin functionality
5. Commit changes (`git commit -m 'Add new feature'`)
6. Push to branch (`git push origin feature/new-feature`)
7. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

### Common Issues

**Public website not loading**
- Check that React development server is running (`npm start`)
- Verify all components are properly exported
- Check browser console for JavaScript errors

**Admin login not working**
- Verify AWS Cognito configuration
- Check redirect URLs in Cognito console
- Ensure Amplify configuration is correct

**Database connection failed**
- Check `.env` file in `ele-api/` directory
- Verify RDS security groups allow connections
- Confirm database credentials are correct

**API endpoints not responding**
- Ensure backend server is running (`node server.js`)
- Check CORS configuration for frontend URL
- Verify database schema matches API expectations

### Getting Help
- Check the [Issues](https://github.com/yourusername/ele-mentorship-platform/issues) page
- Create a new issue with detailed information
- Include relevant logs and error messages
- Specify whether issue is with public website or admin dashboard

## Roadmap

### Public Website Enhancements
- Online application form submission
- Program testimonials and success stories
- Event calendar integration
- Newsletter signup functionality

### Admin Dashboard Enhancements
- Communication tracking between mentor-mentee pairs
- Automated matching algorithms
- Email notification system
- Advanced reporting and analytics
- Bulk data import/export functionality
