

const mongoose = require("mongoose")

const connectionString = process.env.DATABASE

mongoose.connect(connectionString).then(()=>{
    console.log("mongodb connnected successfully");
    
}).catch((error)=>{
    console.log(`connection failed due to ${error}`);
    
})