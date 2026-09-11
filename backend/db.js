const mongoose=require('mongoose')
const mongoURI='mongodb://localhost:27017/inotebook'
const connectDB= async ()=>{
    await mongoose.connect(mongoURI)
    console.log("connected to mongoDB")
}
module.exports=connectDB;
