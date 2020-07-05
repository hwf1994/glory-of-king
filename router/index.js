
	const router=require("express").Router()
	
	//分流到后台
	router.use("/admin/api",require("./admin"))
	
	//分流到前台
	router.use("/web/api",require("./web"))

    module.exports=router
