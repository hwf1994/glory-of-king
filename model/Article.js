var mongoose=require("mongoose")
var schema=new mongoose.Schema({
		name : { type: String,required:true },
		content:{type: String,required:true},
		createTime: {type: Date,default: Date.now},
        updateTime: {type: Date,default: Date.now},
		categories:[{type:mongoose.SchemaTypes.ObjectId,ref:"category"}]
	},
    {versionKey:false,
    timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }}
)
const model=mongoose.model('article',schema,'article');
module.exports=model