const db = require("../models");
const Code = db.codes;

// Create and Save a new Code
exports.create = (req, res) => {
    const referralCode = req.body.code;
    const email = req.body.email;
    const newReferralCode = (Math.floor(Math.random() * (999999))).toString().padStart(6, '0');

    const newCode = new Code({ value: newReferralCode, email: email, usageCount: 0 });
    newCode.save().then(data => {
        console.log(data)
        if (!data) {
            res.status(404).send({ message: "Code not registered with value " + value });
        } else {

            Code.updateOne({ 'value': referralCode }, { $inc: { usageCount: 1 } }).then(data => {
                console.log('incremented !!!')
                res.send({ message: "Success" });
            })
                .catch(err => {
                    res
                        .status(500)
                        .send({ message: "Error" });
                });
        }
    })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error registering Code with value = " + value });
        });

    // Code.save({
    //     'value': value,
    //     'usageCount': 0
    // })
    //     .then(data => {
    //         if (!data)
    //             res.status(404).send({ message: "Not found Code with value " + value });
    //         else res.send(data);
    //     })
    //     .catch(err => {
    //         res
    //             .status(500)
    //             .send({ message: "Error retrieving Code with value = " + value });
    //     });
};

// Retrieve all Codes from the database.
exports.findAll = (req, res) => {
    Code.find({})
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Code with value " + value });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Code with value=" + value });
        });
};

// Find a single Code with an id
exports.findOne = (req, res) => {
    const value = req.params.value;
    Code.findOne({ 'value': value })
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Code with value " + value });
            else res.send({ message: "Success" });
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Code with value=" + value });
        });
};

// Update a Code by the id in the request
exports.update = (req, res) => {

};

// Delete a Code with the specified id in the request
exports.delete = (req, res) => {

};

// Delete all Codes from the database.
exports.deleteAll = (req, res) => {

};

// Find all published Codes
exports.findAllPublished = (req, res) => {

};


// Seed 200 codes
exports.seed = async (req, res) => {
    // const value = req.params.value;

    // for (let i = 0; i < 200; i++) {
    //     const num = (Math.floor(Math.random() * (999999))).toString().padStart(6, '0');
    //     console.log(num);
    //     const code = new Code({ value: num, usageCount: 0 });
    //     const data = await code.save({
    //         'value': code,
    //         'usageCount': 0
    //     })
    //     // .then(data => {
    //     //     // if (!data)
    //     //     //     res.status(404).send({ message: "Not found Code with value " + value });
    //     //     // else
    //     //     res.send(data);
    //     // })
    //     // .catch(err => {
    //     //     res
    //     //         .status(500)
    //     //         .send({ message: "Error retrieving Code with value = " + value });
    //     // });
    // }
};