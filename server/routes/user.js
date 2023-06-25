const express = require('express');
const router = express.Router();
const signup = require('../controller/signup.js');
const login = require('../controller/login.js')

router.get("/signup",(req,res)=>{
  res.render('signup');
});

router.post('/signup', signup);

router.get('/login',(req,res)=>{
  res.render('login');
})

router.post('/login',login);

module.exports = router;