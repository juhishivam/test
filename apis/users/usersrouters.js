const {createUsers,getUSers,getUserById,updateUser,deleteUser,login} = require("./usercontrole");
const multer  = require("multer")
const path = require("path")
const express = require('express')
const bodyParser = require('body-parser');
const router = require("express").Router();
const {checkToken} = require("../../auth/token_validation")
var app= express();
app.use('/image',express.static('uploads/image'))

const imageFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb("Please upload only images.", false);
    }
  };

var storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'./uploads/image')
    },
    filename: function(req,file,cb){
        cb(null, `${file.fieldname }_${Date.now()}${path.extname(file.originalname)}`)
    }
})
var upload = multer({storage:storage,fileFilter: imageFilter})

router.post("/",checkToken,upload.single('image'),createUsers);
router.get("/",checkToken,getUSers);
router.get("/:id",checkToken,getUserById);
router.put("/",checkToken,upload.single('image'),updateUser);
router.delete("/",checkToken,deleteUser);
router.post("/login",login)


module.exports = router