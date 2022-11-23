
const {Schema,model, Types} = require('../connection');

// structure of model
const myschema=new Schema({
    name: String,
    image: String,
    values: Object,
    createdBy: {type: Types.ObjectId, ref : 'users' },
    createdAt: Date,
})

// name of collection
module.exports=model('filters',myschema);