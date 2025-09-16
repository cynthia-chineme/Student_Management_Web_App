// Set up required modules and constants
var HTTP_PORT = process.env.PORT || 8080; // Port for server
var path = require("path"); // Path utility
var express = require("express"); // Express framework
var app = express(); // Express app instance
var collegeStudentData = require('./modules/collegeData'); // Data module

// Add TA form
app.get("/tas/add", (req, res) => {
    res.render("addta");
});

// Add TA POST
app.post("/tas/add", (req, res) => {
    // Force TA to true
    req.body.TA = true;
    collegeStudentData.addStudent(req.body)
        .then(() => res.redirect('/tas'));
});

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// setup a 'route' to listen on the default url path
/*
app.get("/", (req, res) => {
    res.send("Hello World!");
});
*/
// Middleware for serving static files and parsing form data
app.use(express.static("Public"));
app.use(express.urlencoded({ extended: true }));
// Route: Get all students or filter by course
// Route: Get all students or filter by course, render EJS with course names
app.get("/students", async (req, res) => {
    try {
        const courseNum = req.query.course;
        const courses = await collegeStudentData.getCourses().catch(() => []);
        let students = [];
        if (courseNum == undefined) {
            students = await collegeStudentData.getAllStudents().catch(() => []);
        } else {
            students = await collegeStudentData.getStudentsByCourse(courseNum).catch(() => []);
        }
        res.render("students", { students, courses });
    } catch (e) {
        res.render("students", { students: [], courses: [] });
    }
});
// Route: Get all teaching assistants, render EJS with course names
app.get("/tas", async (req, res) => {
    try {
        const courses = await collegeStudentData.getCourses().catch(() => []);
        const tas = await collegeStudentData.getTAs().catch(() => []);
        res.render("tas", { tas, courses });
    } catch (e) {
        res.render("tas", { tas: [], courses: [] });
    }
});
// Route: Get all courses, render EJS with student/TA correlation
app.get("/courses", async (req, res) => {
    try {
        const courses = await collegeStudentData.getCourses().catch(() => []);
        const students = await collegeStudentData.getAllStudents().catch(() => []);
        const tas = await collegeStudentData.getTAs().catch(() => []);
        res.render("courses", { courses, students, tas });
    } catch (e) {
        res.render("courses", { courses: [], students: [], tas: [] });
    }
});
// Route: Get a single student by student number
app.get("/student/:num", (req, res) => {
        var studentNo = req.params.num;
        collegeStudentData.getStudentByNum(studentNo)
                .then((resolve_response) => { res.json(resolve_response) })
                .catch(() => {
                        res.json({ 'message': 'no results' });
                })
});
// Static view routes
app.get("/", async (req, res) => {
    try {
        const students = await collegeStudentData.getAllStudents().catch(() => []);
        const tas = await collegeStudentData.getTAs().catch(() => []);
        const courses = await collegeStudentData.getCourses().catch(() => []);
        res.render("home", { students, tas, courses });
    } catch (e) {
        res.render("home", { students: [], tas: [], courses: [] });
    }
});
// Removed about and htmlDemo routes
app.get("/students/add", (req, res) => {
    res.render("addstudent");
});
// Route: Add a new student via form submission
app.post("/students/add", (req, res) => {
    collegeStudentData.addStudent(req.body)
        .then(() => res.redirect('/students'))
});

// Catch-all route for 404 errors
app.use((req, res) => {
    res.status(404).render("404");
});

// Initialize data and start server
collegeStudentData.initialize()
    .then(() => (
        app.listen(HTTP_PORT, () => { console.log("server listening on port: " + HTTP_PORT) })
    ))
    .catch((err) => {
        console.log(err)
    })