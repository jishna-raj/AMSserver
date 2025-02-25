//import dotenv files to load the enviornment variables

require("dotenv").config()
const express = require("express")
const cors=require("cors")

const router=require('./routes')
require('./connection')






const AMSServer=express()

AMSServer.use(cors())
AMSServer.use(express.json())

AMSServer.use(router)






const PORT = 4000||PORT.env.process

AMSServer.listen(PORT,()=>{
console.log(`The server is running successfully at port no ${PORT}`);

})
