const express = require("express");
const connect = require("./dbConnect.js");
const user = require("./routes/user.js");

const PORT = 3333;
const app = express();
app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended : false}));


app.get("/", (req, res) => {
  res.status(200).send("Engine Started, Ready to take off!");
});


app.use("/user", user);

connect();

app.listen(PORT, () => console.log("listening in port 3333"));
