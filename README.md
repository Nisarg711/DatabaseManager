<div align="center">
  <img src="https://www.daiict.ac.in/sites/default/files/inline-images/20250107DAUfinalIDcol_SK-01_0.png" alt="University Logo" width="300">
</div>

<div align="center">

# DBuddy - No-Code PostgreSQL Management Platform

**Modern, AI-Powered Database Management for Everyone**

[![Next.js](https://img.shields.io/badge/Next.js-15.5.7-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://reactjs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue?logo=postgresql)](https://www.postgresql.org/)
[![Jest](https://img.shields.io/badge/Tested_with-Jest-C21325?logo=jest)](https://jestjs.io/)

### Course: IT314 - SOFTWARE ENGINEERING (Winter 2024)
### University: Dhirubhai Ambani Institute of Information and Communication Technology

</div>

---

<div align="center">

## Group-14 Members

| Student ID         | Name             | GitHub |
| :----------------- | :--------------- | :----- |
| 202301143 (Leader) | Pranshu Patel    | <a href="https://github.com/pranshu05"><img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" width="22"/></a> |
| 202301187          | Nisarg Bhatia    | <a href="https://github.com/nisarg711"><img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" width="22"/></a> |
| 202301159          | Dipkumar Zadafiya| <a href="https://github.com/202301159"><img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" width="22"/></a> |
| 202301192          | Harsh Patel      | <a href="https://github.com/Harsh97120"><img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" width="22"/></a> |
| 202301157          | Parv Khetawat    | <a href="https://github.com/202301157"><img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" width="22"/></a> |
| 202301139          | Smit Limbasiya   | <a href="https://github.com/202301139"><img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" width="22"/></a> |
| 202301181          | Prexa Patel      | <a href="https://github.com/202301181-PrexaPatel"><img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" width="22"/></a> |
| 202301133          | Kathan Parikh    | <a href="https://github.com/KathanParikh"><img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" width="22"/></a> |
| 202301183          | Raj Makavana     | <a href="https://github.com/202301183"><img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" width="22"/></a> |
| 202301199          | Vishal Joliya    | <a href="https://github.com/202301199"><img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" width="22"/></a> |

</div>

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#️-tech-stack)
- [Installation](#-installation)
- [Usage](#-usage)
- [Architecture](#️-architecture)
- [API Reference](#-api-reference)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Known Issues](#-known-issues)
- [Contributing](#-contributing)

---

## 📖 Overview

**DBuddy** is a revolutionary no-code platform that democratizes PostgreSQL database management. Built with modern web technologies and powered by AI, DBuddy enables users to create, manage, and query databases using natural language—no SQL knowledge required.

### 🎯 Key Highlights

- 🤖 **AI-Powered Queries**: Write queries in plain English using LangChain + Groq (Llama 3.3 70B)
- 🎨 **Schema Visualization**: Interactive UML diagrams with PlantUML integration
- 🧪 **Smart Mock Data**: AI-generated realistic test data with foreign key awareness
- 🔐 **Enterprise Auth**: NextAuth with JWT, OAuth (Google/GitHub), and credential-based login
- 📊 **Export Anywhere**: Download query results in CSV/JSON formats
- 🧪 **100% Test Coverage**: Comprehensive Jest testing with 30+ test suites

---

## ✨ Features

### 🔑 Authentication & User Management
- **Multi-Strategy Authentication**: Email/password, Google OAuth, GitHub OAuth
- **JWT Token System**: Stateless session management with secure token handling
- **Profile Management**: Update contact info, password, and generate API tokens
- **Email Verification**: OTP-based email verification system

### 🗄️ Database Operations
- **Natural Language Queries**: Ask your database in plain English
  - "Show all users who signed up last month"
  - "Find the top 5 products by revenue"
  - "Update inactive users to archived status"
- **CRUD Operations**: Create, read, update, delete with type-safe validation
- **Bulk Operations**: Execute multiple updates/deletes efficiently
- **Query History**: Track all queries with metadata (type, duration, status)

### 🎨 Schema Management
- **Visual Schema Designer**: Interactive UML diagrams for database structure
- **AI Schema Inference**: Describe your project; AI generates the database schema
- **Table Inspector**: View columns, types, constraints, and relationships
- **Schema Export**: Download schema definitions in JSON format

### 🧪 Mock Data Generation
- **AI-Powered Generation**: LangGraph state machine with ChatGroq (Llama 3.3 70B)
- **Schema-Aware**: Respects foreign keys, constraints, and data types
- **Batch Processing**: Efficient generation in configurable batches (default: 10 records)
- **Template Library**: Pre-built templates (e-commerce, blog, CRM, etc.)
- **Preview Mode**: Review data before insertion

### 📊 Data Export
- **Multiple Formats**: CSV and JSON export
- **Single/Multi-Table Export**: Export specific tables or entire database
- **Frontend Integration**: One-click export from query results

### 🔍 Database Optimization
- **AI Suggestions**: Get index recommendations and query optimizations
- **Performance Monitoring**: Track query execution times
- **Error Parsing**: Human-readable database error messages

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15.5.7 (App Router with React Server Components)
- **UI Library**: React 19
- **Styling**: Tailwind CSS with custom design system
- **Components**: Radix UI primitives (Dialog, Dropdown, Tabs, etc.)
- **Animations**: Lottie via @lottiefiles/dotlottie-react

### Backend
- **Runtime**: Node.js with Next.js API Routes
- **Database**: PostgreSQL 16
- **ORM**: Raw SQL with parameterized queries (node-postgres)
- **Authentication**: NextAuth 4.24.13 with JWT + OAuth
- **Session Management**: Stateless JWT cookies

### AI & Machine Learning
- **LLM Provider**: Groq Cloud (Llama 3.3 70B Versatile)
- **AI Framework**: LangChain 1.1.1 + @langchain/groq
- **Orchestration**: LangGraph for mock data generation state machine
- **Output Parsing**: JsonOutputParser for structured responses

### Testing
- **Framework**: Jest 29.7.0
- **React Testing**: @testing-library/react + @testing-library/user-event
- **Coverage**: 100% for critical paths (auth, CRUD, export)

---

## 🚀 Installation

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **PostgreSQL**: v14.0 or higher
- **npm**: v9.0.0 or higher

### 1. Clone Repository
```bash
git clone https://github.com/NisargBhatia/IT314_project_14.git
cd IT314_project_14/BackendManager
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env.local` file in the root directory:

```env
# Database Configuration
DATABASE_URL=postgresql://username:password@localhost:5432/dbuddy_main

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# OAuth Providers (Optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_ID=your-github-client-id
GITHUB_SECRET=your-github-client-secret

# AI Configuration
GROQ_API_KEY=your-groq-api-key

# JWT Configuration
JWT_SECRET=your-jwt-secret-key
JWT_EXPIRES_IN=7d
```

### 4. Database Setup
```bash
# Create main database
psql -U postgres -c "CREATE DATABASE dbuddy_main;"
```

### 5. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📚 Usage

### Creating Your First Project

1. **Sign Up**: Register with email or OAuth provider
2. **Create Project**: Describe your database in natural language
   - Example: "A blog platform with users, posts, and comments"
3. **Review Schema**: DBuddy generates tables with relationships
4. **Confirm**: Your database is created and ready to use!

### Querying Your Database

```plaintext
Natural Language Input:
"Show all posts published in the last 7 days with author names"

Generated SQL:
SELECT p.*, u.name as author_name 
FROM posts p 
JOIN users u ON p.author_id = u.id 
WHERE p.published_at >= NOW() - INTERVAL '7 days'
ORDER BY p.published_at DESC;
```

### Generating Mock Data

1. Navigate to your project dashboard
2. Click **"Generate Mock Data"**
3. Select a template or configure custom counts
4. Preview generated data
5. Confirm to insert into database

---

## 🏗️ Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                      Client Layer                           │
│  (Next.js App Router + React Server Components)            │
└─────────────────────┬───────────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────────┐
│                   API Route Layer                           │
│  /api/auth/*      │  /api/projects/*  │  /api/ai/*         │
│  Authentication   │  CRUD Operations  │  AI Features       │
└─────────────────────┬───────────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────────┐
│                  Service Layer                              │
│  auth.js  │  db.js  │  ai.js  │  mock-data-generator.js   │
└─────────────────────┬───────────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────────┐
│               External Services                             │
│  PostgreSQL  │  Groq Cloud  │  NextAuth Providers          │
└─────────────────────────────────────────────────────────────┘
```

### Key Components

#### Mock Data Generator (`src/lib/mock-data-generator.js`)
```
LangGraph State Machine:
┌─────────┐     ┌──────────┐     ┌────────┐
│ Generate│────>│ Validate │────>│ Insert │
└─────────┘     └──────────┘     └────────┘
     ▲               │                 │
     └───────────────┘                 ▼
         (Retry)                    (Success)

Features:
- Batch processing (10 records/batch)
- Foreign key context awareness
- Topological sorting for dependencies
- Template library for common scenarios
```

---

## 🔧 API Reference

### Authentication

#### `POST /api/auth/register`
Register a new user with email/password.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "name": "John Doe"
}
```

### Projects

#### `GET /api/projects`
List all projects for authenticated user.

#### `POST /api/projects`
Create a new project from natural language.

**Request:**
```json
{
  "naturalLanguageInput": "An e-commerce store with products, orders, and customers"
}
```

#### `GET /api/projects/[projectId]/export`
Export table data in CSV or JSON format.

**Query Parameters:**
- `format`: `csv` | `json` (default: `json`)
- `table`: Specific table name (optional, exports all if omitted)

### AI Features

#### `GET /api/ai/query-suggestions/[projectId]`
Get AI-generated query suggestions based on schema.

#### `POST /api/projects/[projectId]/mock-data`
Generate mock data for database tables.

**Request:**
```json
{
  "config": {
    "users": { "count": 50 },
    "posts": { "count": 200 }
  },
  "preview": true,
  "template": "blog"
}
```

---

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run specific test suite
npm test -- delete.test.js
```

### Test Coverage

DBuddy maintains **100% coverage** for critical paths:

| Module | Files | Coverage |
|--------|-------|----------|
| API Routes | 15 | 100% |
| Authentication | 3 | 100% |
| Database Operations | 4 | 100% |
| AI Integration | 2 | 100% |

### Test Structure

```
__tests__/
├── unit-tests/
│   ├── app/api/               # API route tests
│   ├── lib/                   # Service layer tests
│   └── components/            # Component tests
```

---

## 🚀 Deployment

### Production Build

```bash
npm run build
npm run start
```

### Recommended Platforms
- **Vercel**: Native Next.js support (recommended)
- **Railway**: Easy PostgreSQL + app deployment
- **Heroku**: Requires Procfile configuration

---

## 🐛 Known Issues

1. **XLSX Export Bug**: Frontend offers XLSX export, but backend only supports CSV/JSON. XLSX downloads are actually JSON files with `.xlsx` extension. 
   - **Fix**: Either remove XLSX option from frontend or add `xlsx` library to backend.

2. **Session Timeout**: JWT tokens expire after 7 days by default. Users must re-authenticate after expiry.

---

## 🤝 Contributing

We welcome contributions! This project was developed as part of an academic course.

### Development Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Write/update tests: `npm test`
5. Commit: `git commit -m 'Add amazing feature'`
6. Push and open a Pull Request

---

## 📜 License

This project is licensed under the **MIT License**.

---

## 🙏 Acknowledgments

- **DA-IICT Faculty**: For guidance throughout the Software Engineering course
- **Groq**: For providing fast LLM inference
- **Vercel**: For Next.js framework
- **Open Source Community**: For the amazing libraries

---

<div align="center">

**Made with ❤️ by Group 14 @ DA-IICT**

[⬆ Back to Top](#dbuddy---no-code-postgresql-management-platform)

</div>
