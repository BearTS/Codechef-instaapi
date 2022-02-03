const express = require('express');
const bodyparser = require('body-parser');
const fs = require('fs');
const multer = require('multer');
const sharp = require('sharp');
const { join } = require('path');

const upload = multer({dest : join(__dirname, 'temp')}); 
const { Post } = require('./functions/Instagram');
const app = express();   
  
app.use(bodyparser.urlencoded({extended : true}));  
  
app.post('/upload', upload.single('image'), async (req, res)=> {
    fs.rename(join(req.file.path), join(__dirname + '/temp/image.jpg'), (err)=>{
        console.log(err);
    });
    sharp(__dirname + './temp/image.jpg').resize(800,800)
        .jpeg({quality : 100}).toFile(__dirname + '/temp/image_cropped.jpg');
    
    // await Post(join(__dirname, 'temp/image_cropped.jpg'), req.body.caption);
    return res.json('File Uploaded Successfully!');
});

  
app.listen(3000, ()=>{
    console.log('Server Running!');
});