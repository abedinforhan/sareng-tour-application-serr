const mongoose = require("mongoose");
const dotenv = require("dotenv");
const fs=require('fs')
const Tour=require('../model/tourModel')

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE_LOCAL;

mongoose.connect(DB).then(() => {
  console.log("Connecting to databse is successful");
});

const tours=fs.readFileSync(`${__dirname}/tours-simple.json`,'utf8')
console.log(tours);
//IMPORT ALL DATA DB
// const importToDB=async ()=>{
//    try{
//     const newTour=new Tour(tours)
//     await newTour.save(tours);
//     console.log('Data loaded successflly !!');
//    }catch(err){
//     console.log(err);
//    }
//    process.exit()
// }

// //DELETE ALL DATA FROM DB
// const deleteFromDB =async(req,res)=>{
//   try{
//     await Tour.deleteMany();
//     console.log('Data deleted successfully');
//   }catch(err){
//     console.log(err);
//   }
//   process.exit()
// }

// if(process.argv[2]==='--import'){
//   importToDB();
// }else if(process.argv[2]==='--delete'){
//   deleteFromDB();
// }
console.log(process.argv);