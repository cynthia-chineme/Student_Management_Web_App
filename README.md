# Student & Course Management App

## Overview

This repository demonstrates key competencies in full-stack web development, focusing on building a RESTful API and dynamic web application for managing students and courses. The project is designed for educational purposes and showcases proficiency in Node.js, Express, data handling, and front-end integration.

## Core Frameworks

### 1. **Node.js & Express Server Development**
- Built a robust Express.js server (`server.js`) to handle HTTP requests and serve static and dynamic content.
- Implemented RESTful API endpoints for CRUD operations on student and course data.
- Utilized middleware for static file serving and form data parsing.

### 2. **Data Management & Asynchronous Programming**
- Designed a modular data layer (`modules/collegeData.js`) using Promises for asynchronous file I/O.
- Managed student and course data with JSON files (`data/students.json`, `data/courses.json`).
- Implemented functions to:
  - Retrieve all students, TAs, and courses
  - Filter students by course
  - Add new students
  - Fetch individual student records

### 3. **Front-End Integration & Routing**
- Developed multiple HTML views (`views/`) for Home, About, Add Student, and Demo pages.
- Integrated Bootstrap for responsive UI and custom CSS for theming.
- Connected front-end forms to back-end routes for dynamic data submission and retrieval.

### 4. **RESTful API Design**
- `/students` – List all students or filter by course
- `/student/:num` – Get details for a specific student
- `/tas` – List all teaching assistants
- `/courses` – List all courses
- `/students/add` – Add a new student (form submission)

### 5. **Error Handling & User Experience**
- Implemented graceful error handling for missing data and invalid routes (custom 404 page).
- Provided clear user feedback for empty results and form submissions.

### 6. **Project Structure & Best Practices**
- Organized code into logical modules and folders for scalability and maintainability.
- Used environment variables for port configuration.
- Documented code and included author information for academic integrity.

## How to Run
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the server:
   ```bash
   node server.js
   ```
3. Open your browser at `http://localhost:8080` (or the port specified in your environment).

## Technologies Used
- Node.js
- Express.js
- HTML5, CSS3, Bootstrap
- JavaScript (ES6)
- JSON for data storage


