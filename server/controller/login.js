require("dotenv").config();
const client = require("../database.js");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  const { username, password } = req.body;
  const checkUser = `SELECT COUNT(*) FROM userDetails WHERE username = $1`;
  const checkPass = `SELECT * FROM userDetails WHERE username = $1`;
  const hashedPass = bcrypt.hash(password,10);
  try {
    client.query(checkUser, [username], 
      (err, result) => {
        if( 1 == result.rows[0].count ){
          client.query(checkPass,[username],
            (err,result)=>{
              const pass = result.rows[0].password;
              const passwordMatch = bcrypt.compare(String(pass), String(hashedPass));
              if(passwordMatch){
                console.log(passwordMatch);
                return res.render('landingpage');
              }else{
                console.log(passwordMatch);
                return res.render('login');
              }
            });
        }else{
          console.log('new user need to register');
        }
      });    
  } catch (error) {
    console.log(error);
  }
};

module.exports = login;
