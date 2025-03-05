//import

const multer = require('multer')

const storage = multer.diskStorage({
    destination:(req,file,callback) => {

        callback(null,'./uploads')
    },

filename:(req,file,callback) => {
    const filename = `image-${Date.now()}-${file.originalname}`
    callback(null,filename)
}


})

//filter

const filefilter  = (req,file,callback) =>{

    if(file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg' ) {
        callback(null,true)
    }

    else{
        callback(null,false)
        return callback(new Error ("Only allows png,jpg,jpeg files"))
    }
}


const multerConfig = multer({

    storage,
    fileFilter:filefilter


})

module.exports = multerConfig