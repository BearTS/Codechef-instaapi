const express = require('express');
const bodyparser = require('body-parser');
const fs = require('fs');
const multer = require('multer');
const sharp = require('sharp');
const { join } = require('path');

const upload = multer({dest : join(__dirname, 'temp')}); 
const { Post, getInfo, deleteMedia, updateProfile } = require('./functions/Instagram');
const app = express();   
  
app.use(bodyparser.urlencoded({extended : true}));  
app.use(express.static(join(__dirname, '../public/')));

app.post('/upload', upload.single('image'), async (req, res)=> {
    fs.rename(join(req.file.path), join(__dirname + '/temp/image.jpg'), (err)=>{
        console.log(err);
    });
    sharp(__dirname + './temp/image.jpg').resize(800,800)
        .jpeg({quality : 100}).toFile(__dirname + '/temp/image_cropped.jpg');
    
    await Post(join(__dirname, 'temp/image_cropped.jpg'), req.body.caption).then(url => {
        return res.json({
            status : 'success',
            url : url
        });
    });
});

app.get('/info', (req, res)=>{
    getInfo(req.query.username).then(info => {
        const { username, full_name, biography, id, is_verified } = info;
        return res.json({
            username,
            full_name,
            biography,
            id,
            is_verified,
        });

    }).catch(err => { res.json(err); });
});

app.delete('/delete', (req, res)=>{
    deleteMedia(req.query.mediaId).then(() => {
        return res.json('Media Deleted Successfully!');
    }).catch(err => { res.json(err); });
});

app.put('/update', (req, res)=>{
    updateProfile(req.body.name, req.body.biography).then(() => {
        return res.json('Profile Updated Successfully!');
    }).catch(err => { res.json(err); });
});

app.get('*', (req, res) => {
    res.status(404).sendFile(join(__dirname, '../public/404.html'));
});

app.listen(process.env.PORT || 3000, ()=>{
    console.log('Server Running!');
});