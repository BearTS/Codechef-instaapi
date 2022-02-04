require('dotenv').config();
const Instagram = require('instagram-web-api');
const client = new Instagram({
    username: process.env.INSTAGRAM_USERNAME,
    password: process.env.INSTAGRAM_PASSWORD
});

(async () => {
    await client.login();
})();

async function Post(url, caption) { // upload/create
    const photo = url;
    const { media } = await client.uploadPhoto({ photo: photo, caption: caption, post: 'feed' });
    const uri = `https://www.instagram.com/p/${media.code}/`;
    return uri;
}

async function getInfo(username){ //retrieve 
    const info = await client.getUserByUsername({ username: username });
    return info;
}


async function updateProfile(name, biography) { // update 
    const user = getInfo(process.env.INSTAGRAM_USERNAME);
    name = name || user.full_name;
    biography = biography || user.biography;
    await client.editProfile({ name: name, biography: biography });   
    return;
}


async function deleteMedia(mediaId) { // delete
    await client.deleteMedia({ mediaId: mediaId });
    return;
}




module.exports = {
    Post,
    getInfo,
    updateProfile,
    deleteMedia
};