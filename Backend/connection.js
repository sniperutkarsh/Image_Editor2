const mongoose = require('mongoose');


const dbName ='imageeditor';
const url =`mongodb+srv://Utkarsh1605:utkarsh1605@cluster0.jy2iw76.mongodb.net/${dbName}?retryWrites=true&w=majority`

// asynchronous function - return promise
mongoose.connect(url)
.then((result) => {
    console.log('database connected');
})
.catch((err) => {
    console.log(err);
});

module.exports =mongoose;