
const {Schema,model} = require('../connection');

// structure of model
const myschema=new Schema({
name :String,
email :String,
password :String
})

// name of collection
module.exports=model('users',myschema);