module.exports=()=>{
	const jwt=require("jsonwebtoken")
    const assert=require("http-assert")
	return async (req,res,next)=>{
		console.log("开启沿海呢")
		try{
			const verify=await jwt.verify(req.headers.token,'gloryokings')
			req.user=verify
			next()
		}catch(e){
			res.send({code:202,data:{},msg:"请重新登陆！"})
		}
	}
}
