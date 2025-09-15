// Set up required modules and constants
var HTTP_PORT = process.env.PORT || 8080; // Port for server
var path = require("path"); // Path utility
var express = require("express"); // Express framework
var app = express(); // Express app instance
var collegeStudentData = require('./modules/collegeData'); // Data module


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
app.get("/students", (req, res) => {
    var courseNum = req.query.course;
    if (courseNum == undefined) {
        // Return all students
        collegeStudentData.getAllStudents()
            .then((resolve_response) => { res.json(resolve_response) })
            .catch(() => {
                res.json({ 'message': 'no results' });
            });
    }
    else {
        // Return students by course
        collegeStudentData.getStudentsByCourse(courseNum)
            .then((resolve_response) => { res.json(resolve_response) })
            .catch(() => {
                res.json({ 'message': 'no results' });
            });
    }
});
// Route: Get all teaching assistants
app.get("/tas", (req, res) => {
    collegeStudentData.getTAs()
        .then((resolve_response) => { res.json(resolve_response) })
        .catch(() => {
            res.json({ 'message': 'no results' });
        })
});
// Route: Get all courses
app.get("/courses", (req, res) => {
    collegeStudentData.getCourses()
        .then((resolve_response) => { res.json(resolve_response) })
        .catch(() => {
            res.json({ 'message': 'no results' });
        })
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
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/home.html"))
});
app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/about.html"));
});
app.get("/htmlDemo", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/htmlDemo.html"));
});
app.get("/students/add", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/addstudent.html"));
});
// Route: Add a new student via form submission
app.post("/students/add", (req, res) => {
    collegeStudentData.addStudent(req.body)
        .then(() => res.redirect('/students'))
});

// Catch-all route for 404 errors
app.use((req, res) => {
    res.sendFile(path.join(__dirname, "/views/404.html"));
});

// Initialize data and start server
collegeStudentData.initialize()
    .then(() => (
        app.listen(HTTP_PORT, () => { console.log("server listening on port: " + HTTP_PORT) })
    ))
    .catch((err) => {
        console.log(err)
    })