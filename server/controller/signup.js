const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const client = require("../database.js");

const signup = async (req, res) => {
  const { name, username, password, passwordConf, email } = req.body;
  console.log(name, username, password, passwordConf, email);

  let hashedPassword = await bcrypt.hash(password, 10);
  

  client.query(
    `SELECT * FROM userDetails WHERE username = $1`,
    [username],
    (err, result) => {
      if (err) {
        throw err;
      } else {
        if (1 != result.rows.length) {
          res.render("login");
        } else {
          res.render("landingpage");
        }
      }
    }
  );
};
module.exports = signup;
