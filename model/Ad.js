var mongoose=require("mongoose")
var schema=new mongoose.Schema({
		name : { type: String,required:true },
        items:[{
        	title:{type: String,required:true},
        	icon:{type: String,required:true},
        	url:{type: String,required:true},
        	tip:{type: String,required:true}
        }]
	},
    {versionKey:false}
)
module.exports=mongoose.model('ad',schema,'ad');