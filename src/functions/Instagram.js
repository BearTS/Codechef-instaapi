const { join } = require('path');
// const fs = require('fs');
require('dotenv').config();
// const axios = require('axios');
// const Jimp = require('jimp');
const Instagram = require('instagram-web-api');
const client = new Instagram({
    username: process.env.INSTAGRAM_USERNAME,
    password: process.env.INSTAGRAM_PASSWORD
});

(async () => {
    await client.login();
})();

async function Post(url, caption) {
    // await changeToJpg(url);
    const photo = join(__dirname, '..', 'temp', 'image_cropped.jpg');
    // const photo = "https://i.ytimg.com/vi/w6-1O0WCdGM/maxresdefault.jpg"; for trying 
    const { media } = await client.uploadPhoto({ photo: photo, caption: caption, post: 'feed' });
    console.log(`https://www.instagram.com/p/${media.code}/`);
}

// async function changeToJpg(url) {
//     await Jimp.read(join(__dirname, '..', '..', 'image', 'image.png'), function (err, image) {
//         if (err) {
//             console.log(err);
//             return;
//         }
//         image.write(join(__dirname, '..', '..', 'image', 'image.jpg'));
//     });
//     fs.unlinkSync(join(__dirname, '..', '..', 'image', 'image.png'));
// }

module.exports = {
    Post
};