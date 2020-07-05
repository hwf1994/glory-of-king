var mongoose=require("mongoose")
var schema=new mongoose.Schema({
		name : { type: String,required:true },
		icon:{type: String,required:false}
	},
    {versionKey:false}
)
const model=mongoose.model('item',schema,'item');
module.exports=model