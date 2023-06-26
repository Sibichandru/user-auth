require("dotenv").config();
const client = require("../database.js");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  const { username, password } = req.body;
  const checkUser = `SELECT COUNT(*) FROM userDetails WHERE username = $1`;
  const checkPass = `SELECT * FROM userDetails WHERE username = $1`;
  try {
    client.query(checkUser, [username], 
      async (err, result) => {
        if( 1 == await result.rows[0].count ){
          client.query(checkPass,[username],
            async (err,result)=>{
              const hashedPass = await bcrypt.hash(password,10);
              const pass = await result.rows[0].password;
              console.log(pass);
              console.log(hashedPass);
              const passwordMatch = await bcrypt.compare(String(pass), String(hashedPass));
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
