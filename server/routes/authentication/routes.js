var express = require('express');
var router = express.Router();
const Chance = require('chance');
const chance = new Chance();

const LOGIN_USER_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';


router.post('/login/userlogin', function (req, res, next) {
    console.log('handling request');
    console.log(JSON.stringify(req.body))
    if ((req.body?.userName === "Anand.Gupta@gmail.com" || req.body?.userName === "ET44508") && req.body?.password === "password123") {
        console.log('sending response')
        res.json({
            "token": `${LOGIN_USER_TOKEN}`,
            "type": "Bearer",
            "userId": "1",
            "employeeId": "ET44508",
            "firstName": "Anand",
            "lastName": "Gupta",
            "email": "Anand.Gupta@gmail.com",
            "roles": "Employee",
        })



    } else {
        res.status(401).json({
            "status": "fail",
            "message": "User name password mismatch"
        })
    }

});

module.exports = router;
