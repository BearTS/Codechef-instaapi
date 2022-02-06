require('dotenv').config();
const Instagram = require('instagram-web-api');
const client = new Instagram({
    username: process.env.INSTAGRAM_USERNAME,
    password: process.env.INSTAGRAM_PASSWORD
});

try {
    (async () => {
        await client.login();
    })();
} catch (err) {
    console.log(err);
}

async function Post(url, caption) { // upload/create
    try { 
        const photo = url;
        const { media } = await client.uploadPhoto({ photo: photo, caption: caption, post: 'feed' });
        const uri = `https://www.instagram.com/p/${media.code}/`;
        return uri;
    } catch (err) {
        return err;
    }
}

async function getInfo(username){ //retrieve 
    try {
        const info = await client.getUserByUsername({ username: username });
        return info;
    } catch (err) {
        return err;
    }
}


async function updateProfile(name, biography) { // update 
    try {
        const user = getInfo(process.env.INSTAGRAM_USERNAME);
        name = name || user.full_name;
        biography = biography || user.biography;
        await client.editProfile({ name: name, biography: biography });   
        return;
    } catch (err) {
        return err;
    }
}


async function deleteMedia(mediaId) { // delete
    try {
        await client.deleteMedia({ mediaId: mediaId });
        return;
    } catch (err) {
        return err;
    }
}




module.exports = {
    Post,
    getInfo,
    updateProfile,
    deleteMedia
};