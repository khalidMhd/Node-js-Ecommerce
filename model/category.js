const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Mobile', {useNewUrlParser: true, useUnifiedTopology: true});
var conn =mongoose.Collection;
var Schema = mongoose.Schema

var categorySchema =new mongoose.Schema({
	name: String,
	details: String,
	image:String,
	created_at: {type:Date, required:true, default:Date.now}
});

var categoryModel = mongoose.model('category', categorySchema);
module.exports=categoryModel;