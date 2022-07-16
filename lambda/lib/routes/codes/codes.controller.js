const express = require('express')
const codesController = express.Router()
const Code = require('./code')
const utils = require("../../utils");

codesController
    .post('/', async (req, res, next) => {
        const referralCodeValue = req.body.code;
        const email = req.body.email;
        const name = req.body.name;

        const referralCode = await Code.findOne({ 'value': referralCodeValue })
        if (!referralCode) {
            res.status(404).send({ message: "Error referral code not found with value=" + referralCodeValue });
            return
        }

        let newReferralCode;
        let alreadyRegistered = false;
        while (true) {
            newReferralCode = utils.generateRandomCode(6)
            const code = new Code({ value: newReferralCode, referralCode: referralCode, name: name, email: email, usageCount: 0 });
            try {
                const ret = await code.save()
                if (ret) {
                    break;
                }
            } catch (err) {
                if (err.code == 11000) {
                    if (err.keyPattern.email) {
                        res.send({ message: "Success" });
                        return;
                    } else if (!err.keyPattern.value) {
                        res
                            .status(400)
                            .send({ message: "Error registering new code with value = " + newReferralCode });
                        return;
                    }
                } else {
                    res
                        .status(400)
                        .send({ message: "Error registering new code with value = " + newReferralCode });
                    return;
                }
            }
        }

        let ret = await referralCode.updateOne({ $inc: { usageCount: 1 } })
        res.send({ message: "Success" });
    })

codesController
    .get('/', async (req, res, next) => {
        if (req.headers['x-api-key'] !== process.env.API_KEY) {
            res.status(403).send({ message: "Forbidden" });
            return;
        }
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
    })

codesController
    .get('/:value', async (req, res, next) => {
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
    })

codesController
    .post('/:number', async (req, res, next) => {
        if (req.headers['x-api-key'] !== process.env.API_KEY) {
            res.status(403).send({ message: "Forbidden" });
            return;
        }
        const len = Math.max(0, req.params.number);
        for (let i = 0; i < len; i++) {
            let codeIsDup = true;
            while (codeIsDup) {
                const num = utils.generateRandomCode(6)
                const code = new Code({ value: num, usageCount: 0 });
                await code.save().then(data => {
                    codeIsDup = false
                }).catch(err => {
                    if (err.code != 11000 || !err.keyPattern.value) {
                        codeIsDup = false;
                    }
                })
            }
        }
        res.send({ message: "Success: generated " + len + " new codes" });
    })
module.exports = codesController