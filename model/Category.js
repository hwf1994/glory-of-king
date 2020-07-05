var mongoose=require("mongoose")
var schema=new mongoose.Schema({
		name : { type: String,required:true }, //用户账号
		parent:{type:mongoose.SchemaTypes.ObjectId,ref:"category"}
	},
    {versionKey:false}
)

schema.virtual('newslist', {
  ref: 'article', // The model to use
  localField: '_id', // Find people where `localField`
  foreignField: 'categories', // is equal to `foreignField`
  // If `justOne` is true, 'members' will be a single doc as opposed to
  // an array. `justOne` is false by default.
  justOne: false
});

//schema.set('toJSON', { virtuals: true })

const model=mongoose.model('category',schema,'category');

module.exports=model