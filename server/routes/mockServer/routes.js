

let express = require('express');
let router = express.Router();


let localDb = require("../../dataModels/setupDatabase");



router.post("/setupDataBase", async function (req, res, next) {


    try {
        await localDb.setupDatabase();
        res.send("Database has been setup");
    } catch (e) {
        console.log()
        res.send("There was an error while setting up database");
    }



});


module.exports = router;