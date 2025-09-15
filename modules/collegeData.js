const fs = require("fs");

// Data class holds collections of students and courses loaded from JSON files

class Data {
    /**
     * @param {Array} students - Array of student objects
     * @param {Array} courses - Array of course objects
     */
    constructor(students, courses) {
        this.students = students;
        this.courses = courses;
    }
}

// dataCollection stores the loaded Data instance
let dataCollection = null;

/**
 * Initialize the data collection by loading students and courses from JSON files
 * @returns {Promise<void>}
 */
module.exports.initialize = function () {
    return new Promise((resolve, reject) => {
        fs.readFile('./data/courses.json', 'utf8', (err, courseData) => {
            if (err) {
                reject("unable to load courses"); return;
            }
            fs.readFile('./data/students.json', 'utf8', (err, studentData) => {
                if (err) {
                    reject("unable to load students"); return;
                }
                dataCollection = new Data(JSON.parse(studentData), JSON.parse(courseData));
                resolve();
            });
        });
    });
}

/**
 * Get all students in the data collection
 * @returns {Promise<Array>} Array of student objects
 */
module.exports.getAllStudents = function () {
    return new Promise((resolve, reject) => {
        if (dataCollection.students.length == 0) {
            reject("query returned 0 results"); return;
        }
        resolve(dataCollection.students);
    })
}

/**
 * Get all students who are Teaching Assistants (TA)
 * @returns {Promise<Array>} Array of TA student objects
 */
module.exports.getTAs = function () {
    return new Promise(function (resolve, reject) {
        var filteredStudents = [];
        for (let i = 0; i < dataCollection.students.length; i++) {
            if (dataCollection.students[i].TA == true) {
                filteredStudents.push(dataCollection.students[i]);
            }
        }
        if (filteredStudents.length == 0) {
            reject("query returned 0 results"); return;
        }
        resolve(filteredStudents);
    });
};

/**
 * Get all courses in the data collection
 * @returns {Promise<Array>} Array of course objects
 */
module.exports.getCourses = function () {
    return new Promise((resolve, reject) => {
        if (dataCollection.courses.length == 0) {
            reject("query returned 0 results"); return;
        }
        resolve(dataCollection.courses);
    });
};

/**
 * Get a student by their student number
 * @param {number} num - Student number
 * @returns {Promise<Object>} Student object
 */
module.exports.getStudentByNum = function (num) {
    return new Promise(function (resolve, reject) {
        var foundStudent = null;
        for (let i = 0; i < dataCollection.students.length; i++) {
            if (dataCollection.students[i].studentNum == num) {
                foundStudent = dataCollection.students[i];
            }
        }
        if (!foundStudent) {
            reject("query returned 0 results"); return;
        }
        resolve(foundStudent);
    });
};

/**
 * Get all students enrolled in a specific course
 * @param {number} course - Course ID
 * @returns {Promise<Array>} Array of student objects
 */
module.exports.getStudentsByCourse = function (course) {
    return new Promise(function (resolve, reject) {
        var filteredStudents = [];
        for (let i = 0; i < dataCollection.students.length; i++) {
            if (dataCollection.students[i].course == course) {
                filteredStudents.push(dataCollection.students[i]);
            }
        }
        if (filteredStudents.length == 0) {
            reject("query returned 0 results"); return;
        }
        resolve(filteredStudents);
    });
};

/**
 * Add a new student to the data collection
 * @param {Object} studentData - Student data object
 * @returns {Promise<void>}
 */
module.exports.addStudent = function (studentData) {
    return new Promise(function (resolve, reject) {
        studentData.TA = (studentData.TA !== undefined) ? true : false;
        studentData.studentNum = 1 + dataCollection.students.length;
        dataCollection.students.push(studentData);
        resolve();
        return;
    });
}
}

