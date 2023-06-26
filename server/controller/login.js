require("dotenv").config();
const client = require("../database.js");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  const { username, password } = req.body;

  client.query(
    `SELECT COUNT(*) FROM userDetails WHERE username = $1`,
    [username],
    (err, result) => {
      if (err) {
        throw err;
      } else {
        // console.log(result.rows[0].count);
        if (1 == result.rows[0].count) {
          client.query(`SELECT * FROM userDetails WHERE username = $1`,
          [username],
          async (err,passwordResult)=>{
            const passRetrived = passwordResult.rows[0].password;
            const flag = await bcrypt.compare(password,passRetrived);
            if(flag){
              res.render('landingpage');
            }else{
              res.render('login');
            }
          }
          );
        }else{
          res.render('signup');
        }
      }
    }
  );
};
module.exports = login;
