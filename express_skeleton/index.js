var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express();

// CORS
app.use(cors());
app.options('*', cors());

app.use(bodyParser.json()); 

var auth = {login: null, isAuth: false };
var courses = getJson('json/courses.json');
courses = courses.response;

app.get('/courses', function (req, res) {
    var page = +req.query.page;
    var updateWholeList = +req.query.update;
    var searchParam = req.query.search;
    var perPage = 3;
    var result = [];
    var i;
    if (updateWholeList) {
        i = 0;
    } else {
        i = (page - 1) * perPage;
    }
    for (; i <= page * perPage - 1; i++) {
        if (i >= courses.length){
            break;
        } else {
            if (searchParam && courses[i].title.indexOf(searchParam) > -1) {
                result.push(courses[i]);
            } else if (!searchParam) {
                result.push(courses[i]);
            }
        }
    }
    res.header('Content-Type', 'application/json;charset=UTF-8');
    res.send(result);
});

app.get('/course', function (req, res) {
    var courseId = req.query.id;
    var result = {};
    for (var i = 0; i <= courses.length - 1; i++) {
        if (courses[i].id == courseId) {
            result = courses[i];
        }
    }
    res.header('Content-Type', 'application/json;charset=UTF-8');
    res.send(result);
});

app.delete('/courses', function (req, res) {
    var courseId = req.query.courseId;
    var courseIndex;
    for (var i = 0; i < courses.length; i++){
        if (courses[i].id == courseId){
            courseIndex = i;
            courses.splice(courseIndex, 1);
        }
    }
    res.header('Content-Type', 'application/json;charset=UTF-8');
    res.status(200);
    res.send();
});

app.post('/login', function (req, res) {
    auth.login = req.body.login;
    auth.isAuth = true;
    res.status(200);
    res.send();
});

app.post('/updatecourse', function(req, res) {
    var isCourse = false;
    for (var i = 0; i < courses.length; i++){
        if (courses[i].id == req.body.id){
            courses[i] = Object.assign({}, req.body);
            isCourse = true;
        }
    }
    if (!isCourse) {
        var newCourse = req.body;
        newCourse.id = String((Math.random()*10000).toFixed(0));
        courses.push(newCourse);
        console.log(newCourse);
    }
    res.status(200);
    res.send();
});

app.post('/logout', function (req, res) {
    auth.login = null;
    auth.isAuth = false;
    res.status(200);
    res.send();
});

app.get('/isauth', function (req, res) {
    res.header('Content-Type', 'application/json;charset=UTF-8');
    var result = {"isAuth": auth.isAuth};
    res.send(result);
});

app.get('/userinfo', function (req, res) {
    var result = {"login": auth.login};
    res.send(result);
});

app.get('/authors', function (req, res) {
    var result = ["Author 1","Author 2","Author 3"];
    res.send(result);
});

function getJson(path) {
    var json;
    var path = './' + path;
    json = require(path);
    return json;
};

app.listen(3000, function () {
    console.log('Server started on port 3000!');
});
