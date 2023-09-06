require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL + process.env.DB_NAME)
.then(()=>{
  console.log('Connected to DB');
})
.catch(()=>{
  console.log('Unable to connect to DB');
})
const app = require("./app");

app.listen(4000, () => {
  console.log("listening at 4000");
});
