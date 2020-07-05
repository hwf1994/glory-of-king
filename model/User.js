var mongoose=require("mongoose")
var bcrypt = require('bcryptjs')
var schema=new mongoose.Schema({
		name : { type: String,required:true },
		password:{
			type: String,
			set:(val)=>{
				const salt = bcrypt.genSaltSync(10)
				// 对明文加密
				val = bcrypt.hashSync(val, salt)
				return val
			},
			select:false
		}
	},
    {versionKey:false}
)
module.exports=mongoose.model('user',schema,'user');
