const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');

router.post('/update_profile',(req,res)=>{
    const { firstName,lastName,designation,myWebsite,gender,DOB,city,state,zipCode } = req.body;
    const updateuser = new User({
        firstName,
        lastName,
        designation,
        myWebsite,
        gender,
        DOB,
        city,
        state,
        zipCode
    })
    updateuser.save().then(result=>{
        res.json({updateuser: result})
    })
    .catch(err=>{
        console.log(err);
    })
});


module.exports = router;


