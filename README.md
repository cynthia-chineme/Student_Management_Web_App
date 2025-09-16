# Student Management Web App

## Overview

A modern, full-featured web application for managing students, teaching assistants, and courses. Built with Node.js, Express, and EJS, this app demonstrates professional web development best practices, dynamic data handling, and a clean, responsive UI. Ideal for portfolio demonstration and real-world use.

## Features
- Add, view, and manage students and teaching assistants (TAs)
- Browse and manage course offerings
- Correlate students, TAs, and courses for rich data insights
- Professional, portfolio-ready code and design
- Built for extensibility and real-world use

## Core Technologies
- **Node.js & Express.js**: Robust server and routing
- **EJS Templates**: Dynamic HTML rendering with partials for header/footer
- **Bootstrap & Custom CSS**: Responsive, modern UI
- **JSON**: Data storage for students and courses

## Key Routes & Functionality
- `/` – Home page with app details and live data snippets
- `/students` – List all students (with course names)
- `/tas` – List all teaching assistants (with course names)
- `/courses` – List all courses, with student/TA counts per course
- `/students/add` – Add a new student (form)
- `/tas/add` – Add a new teaching assistant (form)
- `/student/:num` – Get details for a specific student (JSON)

## Project Structure
- `server.js` – Main Express server, all routes use EJS templates
- `modules/collegeData.js` – Data access and logic
- `views/` – EJS templates (no legacy HTML files)
  - `partials/` – Header and footer partials
- `data/` – JSON data files for students and courses
- `Public/CSS/` – Custom theme and Bootstrap overrides

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

## Notes
- All legacy `.html` files have been removed. The app uses only `.ejs` templates for rendering.
- The navigation bar is unified for easy access to all features.
- The Courses page displays student and TA counts per course.
- The home page provides a live preview of students, TAs, and courses.

## Technologies Used
- Node.js
- Express.js
- EJS
- HTML5, CSS3, Bootstrap
- JavaScript (ES6)
- JSON for data storage

---

**Author:** Cynthia Chineme

For questions or contributions, please open an issue or submit a pull request.


