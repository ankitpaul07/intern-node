const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: { type: String, unique: true, required: true },
    hash: { type: String, required: true },
    age: { type: Number, required: true },
    location: { type: String, required: true },
    email: { type: String, required:true },
    phone:{type:Number,required:true}
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});

module.exports = mongoose.model('User', schema);