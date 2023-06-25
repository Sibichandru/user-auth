const client = require("./database.js");
const createQuery = require('./model/user.model.js')
require("dotenv").config();


const connectToDb = async function () {

  try {
    await client.connect();
    await client.query(createQuery);
    console.log('Connected and Created successfully');    
  } catch (error) {
    console.log(error);
  }
}

module.exports = connectToDb;
