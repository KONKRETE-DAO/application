module.exports = app => {
    const codes = require("../controllers/code.controller.js");
    var router = require("express").Router();

    router.get("/", codes.findAll);
    router.get("/:value", codes.findOne);
    router.get("/seed", codes.seed);
    router.post("/", codes.create);
    // Retrieve all published Codes
    // router.get("/published", codes.findAllPublished);
    // Retrieve a single Code with id
    // router.get("/:id", codes.findOne);
    // Update a Code with id
    // router.put("/:id", codes.update);
    // Delete a Code with id
    // router.delete("/:id", codes.delete);
    // Create a new Code
    // router.delete("/", codes.deleteAll);
    app.use('/codes', router);
};