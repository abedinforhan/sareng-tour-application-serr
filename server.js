const express = require('express')
const mongoose=require('mongoose')
const dotenv=require('dotenv')
const app = express()

dotenv.config({path:'./config.env'});

const DB=process.env.DATABASE_LOCAL;

mongoose.connect(DB).then(()=>{
    console.log('Connecting to databse is successful');
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})



const port=process.env.PORT || 4000
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})