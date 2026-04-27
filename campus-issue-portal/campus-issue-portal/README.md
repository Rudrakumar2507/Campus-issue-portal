# 🏫 Campus Issue Reporting Portal

A full-stack web application to report, track, and manage campus infrastructure issues. Students can submit issues while admins can manage and update their status.

## 🚀 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js, React Router, Axios |
| Backend | Spring Boot, Spring Security, JPA |
| Database | MySQL |
| Testing | Postman (API Testing), Manual Testing |

## 📁 Project Structure

```
campus-issue-portal/
├── frontend/          # React.js frontend
│   ├── src/
│   │   ├── api/       # Axios API calls
│   │   ├── components/# Reusable UI components
│   │   ├── context/   # Auth context
│   │   └── pages/     # Student & Admin pages
│   └── package.json
├── backend/           # Spring Boot backend
│   └── src/main/java/com/campus/issueportal/
│       ├── controller/
│       ├── service/
│       ├── repository/
│       ├── model/
│       └── config/
└── README.md
```

## ✨ Features

### Student
- Register and Login
- Submit campus infrastructure issues with title, description, and category
- View status of submitted issues (Open / In Progress / Resolved)

### Admin
- Login to admin dashboard
- View all reported issues
- Update issue status
- Filter issues by status or category

## 🛠️ Setup Instructions

### Backend (Spring Boot)

1. Install Java 17+ and Maven
2. Create a MySQL database:
   ```sql
   CREATE DATABASE campus_issues;
   ```
3. Update `application.properties` with your DB credentials
4. Run the backend:
   ```bash
   cd backend
   mvn spring-boot:run
   ```
   Backend runs on `http://localhost:8080`

### Frontend (React)

1. Install Node.js 18+
2. Install dependencies and start:
   ```bash
   cd frontend
   npm install
   npm start
   ```
   Frontend runs on `http://localhost:3000`

## 🔌 API Endpoints

| Method | Endpoint | Description | Role |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Register new student | Public |
| POST | `/api/auth/login` | Login | Public |
| POST | `/api/issues` | Submit new issue | Student |
| GET | `/api/issues/my` | Get my issues | Student |
| GET | `/api/issues` | Get all issues | Admin |
| PUT | `/api/issues/{id}/status` | Update issue status | Admin |

## 🧪 API Testing (Postman)

Import the collection from `postman/CampusIssuePortal.postman_collection.json` to test all endpoints.

## 👨‍💻 Author

**Rudra Kumar**  
B.Tech Information Technology, NIET  
[GitHub](https://github.com/Rudrakumar2507) | [LinkedIn](https://linkedin.com/in/rudra-kumar-9b9488295)
