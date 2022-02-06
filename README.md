# Instagram API
Quick and Simple Instagram API made in NodeJS 

## Features 
- Beginner friendly
- Easy to Use

## Functions 

| URL     | Description                                                                 | Method | Body/Query                                      |
|---------|-----------------------------------------------------------------------------|--------|-------------------------------------------|
| /upload | Upload a picture to instagram with captions [Returns the link to the media] | POST - Body   | image= [file(image)] caption= [text]      |
| /info   | Get info on the user [Returns username,full_name,biography,id,is_verified]  | GET - Query  | username=[username of the user]           |
| /delete | Delete an image using its mediaId                                           | DELETE - Query | mediaID=[id of the media]                 |
| /update | Update your profile name and biography                                      | PUT - Body    | name=[New Name] Biography=[new Biography] |

## To DO
- [ ] Create a frontend website for documentation
- [ ] Adding Rate Limitations
- [ ] Authentication
- [ ] Better Implementation (Returning Status code and handling errors)
- [ ] Make Better Documentation
- [x] Addition Of Docker
- [x] Create Basic Functions

