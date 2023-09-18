require('dotenv').config();
const mongoose = require('mongoose');
const app = require("./app");

mongoose.connect(process.env.DB_URL + process.env.DB_NAME)
.then(()=>{
  console.log('Connected to DB');
})
.catch(()=>{
  console.log('Unable to connect to DB');
})

app.listen(process.env.PORT, () => {
  console.log("Server is in listening state");
});
