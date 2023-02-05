const express = require('express');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

const User = require('../models/Users');
const fetchuser = require('../middleware/fetchUser')
const { findOne } = require('../models/Users');

const router = express.Router();
const JWT_String = 'MyNameIsNakul@1';

//ROUTE 1 :- creating a user using POST "/api/auth/createuser".
router.post('/createuser', [
    body('name', 'enter a valid name').isLength({ min: 3 }),
    body('email', 'enter a valid email').isEmail(),
    body('password', 'enter a valid password').isLength({ min: 5 }),
], async (req, res) => {
    let success=false;
    //check for error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success,errors: errors.array() });
    }
    //check for user with same email
    try {
        let user = await User.findOne({ email: req.body.email })
        console.log(user);
        if (user) {
            return res.status(400).json({success, error: "user already exist" })
            //console.log()
        }
        //create user
        const salt = await bcrypt.genSalt(10);
        const secPassword = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
            name: req.body.name,
            password: secPassword,
            email: req.body.email,
        })
        //.then(user => res.json(user));
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_String)
        //res.json(user);
        //console.log(authToken);
        success=true;
        res.json({ success,authToken });

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }
})

//ROUTE 2 :- authenticating a user using POST /api/post/login . 
router.post('/login', [
    body('email', 'enter a valid email').isEmail(),
    body('password', 'enter a valid email').exists(),
], async (req, res) => {
    let success=false;
    //check for error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {email,password} = req.body;
    try {
        let user =await User.findOne({email});
        if(!user){
            success= false;
            return res.status(400).json({error:"Login with correct credentials"});
        }
        const passwordCompare =await bcrypt.compare(password,user.password);
        if(!passwordCompare){
            success= false;
            return res.status(400).json({success, error:"Login with correct credentials"});
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_String)
        success=true;
        res.json({success, authToken });

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }
})

//ROUTE 3 :- authenticating a user using POST /api/auth/getuser . 
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        userId= req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }
})
module.exports = router 