const router = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const argon2 = require('argon2');

//Register
router.post("/register", async (req, res) => {
    try{
        const salt = await bcrypt.genSalt(0)
        const bycrptPassword = await bcrypt.hash(req.body.password, salt)
        const argonPassword = await argon2.hash(req.body.password, salt)
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            bycrptPassword,
            argonPassword
        })
        const user = await newUser.save()
        res.status(200).json(user)
    }
    catch (err){
        res.status(500).json(err)
    } 
})
//Login
router.post('/login', async (req, res) => {
    try{
        const user = await User.findOne({
            username: req.body.username,
            password: req.body.password
        })
        if(!user) return res.status(400).json("Wrong Credentials")

        const {password, ...others} = user._doc

        res.status(200).json(others);
    }
    catch (err){
        res.status(500).json(err)
    }
})

module.exports = router;