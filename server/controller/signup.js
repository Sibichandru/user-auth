const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const client = require("../database.js");

const signup = async (req, res) => {
  const { name, username, password, passwordConf, email } = req.body;
  // console.log(name, username, password, passwordConf, email);

  const signupQuery = `INSERT INTO userDetails(username, password, name, email) VALUES($1,$2,$3,$4)`;
  let hashedPassword = await bcrypt.hash(password, 10);
  const insertValues = [username, hashedPassword, name, email];
  // checking for the existing user by the unique username
  client.query(
    `SELECT COUNT(*) FROM userDetails WHERE username = $1`,
    [username],
    (err, result) => {
      if (err) {
        throw err;
      } else {
        // console.log(result.rows[0].count);
        if (1 == result.rows[0].count) {
          console.log("exists");
          return res.render("login");
        } else {
          try {
            client.query(signupQuery, insertValues);
            return res.render("landingpage");
          } catch (error) {
            return res.render("signup");
          }
        }
      }
    }
  );
};
module.exports = signup;
