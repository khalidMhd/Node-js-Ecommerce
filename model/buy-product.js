const mongoose = require('mongoose')
var Schema = mongoose.Schema
var conn =mongoose.Collection;

var buySchma =new mongoose.Schema({
    message: {type: String, required:true},
    quantities: [],
    status: {type:String, enum:['Initiated', 'In Progress', 'Delevered', 'Cancel'], default: 'Initiated' },
    created_at: {type: Date, default: Date.now},

    user: [{type:mongoose.Schema.Types.ObjectId, ref:'User Acount'}],

    product: [{type:mongoose.Schema.Types.ObjectId, ref:'product'}]
});

var buyModel = mongoose.model('order', buySchma);
module.exports=buyModel;