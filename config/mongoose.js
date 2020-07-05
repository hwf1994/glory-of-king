module.exports = app=>{
	const mongoose = require('mongoose');
	mongoose.connect('mongodb://localhost:27017/GloryOfKings',{
		useNewUrlParser: true,
	    useUnifiedTopology: true,
	    useCreateIndex: true
	}); /** * 连接成功 */
	
	mongoose.connection.once("open", () => {
	    console.log('数据库链接成功')
	})
}
