
let express = require("express");
let router = express.Router();

let Project = require("../../dataModels/Project.js");



router.get('/get/all', async (req, res, next) => {
    console.log("in Project View List")
    let allProjects = await Project.findAll()
    res.json({
        code: 0,
        message: "Success",
        data: allProjects
    })

})


module.exports = router;