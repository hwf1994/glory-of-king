var mongoose=require("mongoose")
var schema=new mongoose.Schema({
		name : { type: String,required:true }, //用户账号
		avatar:{ type: String,required:true},
		background:{type:String,require:true},
		title:{ type: String,required:false},
		categories:[{type:mongoose.SchemaTypes.ObjectId,ref:"category"}],
		scores:{
			difficult:{type:Number},
			skill:{type:Number},
			attack:{type:Number},
			servive:{type:Number}
		},
		skills:[{
			icon:{type:String},
			name:{type:String},
			description:{type:String},
			tips:{type:String}
		}],
		items1:[{type:mongoose.SchemaTypes.ObjectId,ref:"item"}],
		items2:[{type:mongoose.SchemaTypes.ObjectId,ref:"item"}],
		usageTips:{type:String},
		battleTips:{type:String},
		teamTips:{type:String},
		partner:[{
			hero:{type:mongoose.SchemaTypes.ObjectId,ref:"hero"},
			description:{type:String},
		}]
	},
    {versionKey:false}
)
const model=mongoose.model('hero',schema,'hero');
module.exports=model

