
	const jwt=require("jsonwebtoken")
	const bcrypt = require('bcryptjs')
	const router=require("express").Router({mergeParams:true})
	const verify= require('../../middleware/verifyToken');   //权限验证
	const qiniu=require("qiniu")
	
	//当可以统一使用接口时
	const rest=require("./rest")
	router.use("/rest/:resource",verify(),(req,res,next)=>{
        console.log("通过")
		const MODEL_NAME = require('inflection').classify(req.params.resource)
        req.model=req.models[MODEL_NAME]
        console.log(req.model)
		next()
	},rest())
	
	
	//登陆操作
	router.post("/sign_in",async (req,res,next)=>{
		console.log("走进登陆")
		var {name,password}=req.body
		const user=req.models.User
		const result=await user.findOne({name}).select('password')
		if(result){ 
			const isOk =await bcrypt.compareSync(password,result.password) 
			if(isOk){
				const secret="gloryokings"
				let token=jwt.sign({name},secret, {expiresIn: 60*60*2})
				res.send({code:200,data:{token:token},msg:"登陆成功！"})
			}else{
				res.send({code:201,data:'',msg:"密码错误！"})
			}
		}else{
			res.send({code:201,data:'',msg:"用户不存在！"})
		}
	})
	
	
//	//文件上传
//	const multer = require('multer');
//	
//	const upload=multer({dest:__dirname+"/../../upload"})
//	app.post("/admin/api/upload",verify(),upload.single('file'),(req,res)=>{
//		res.send(req.file)
//	})
	
	//文件上传
	
	router.get("/upload_token",(req,res,next)=>{
		console.log("开始")
		var accessKey = 'PfwRzUYfmgauuZYfVgzrMbxGCUztT1AJVBSJ0sEl';
		var secretKey = 'jCbhIs0zhLeOG47ueAPWQlbQcPey4GbMUR4TT5eB';
		var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
		var options = {
		  scope: "glory-of-king",
		};
		var putPolicy = new qiniu.rs.PutPolicy(options);
		var uploadToken=putPolicy.uploadToken(mac);
		res.json({code:"200",uploadToken:uploadToken})
	})

	//错误拦截
	router.use((err,req,res,next)=>{
		console.log(err)
		res.status(err.status || 500);
		res.json({code:501,msg:"服务错误"})
	})

    module.exports=router
