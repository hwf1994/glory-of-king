module.exports=	()=>{
	const router=require("express").Router()
	router.post('/',async function(req, res, next) {
		try {
			console.log("我娘吗")
			const model=req.model
	        var result=await model.create(req.body)
		    res.json(result)
	    }catch (e) {
	        next(e)
	    } 
	});
	router.get('/',async function(req, res, next) {
		try {
			const queryOption={}
	        const findOption={}
			if(req.model.modelName=='category'){
				queryOption.populate='parent';
			}
			if(req.query.type=='hero'){
				findOption.parent='5ee4f0fde8811b27b8f660c3'
			}
			if(req.query.type=='news'){
				findOption.parent='5ee4ec9e526e0525c4538c9f'
			}
	        var result=await req.model.find(findOption).setOptions(queryOption).limit(req.query.size).skip(parseInt(req.query.page)-1).exec()
		    res.json(result)
	    }catch (e) {
	        next(e)
	    } 
	});
	router.get('/:id',async function(req, res, next) {
		try {
			console.log("怎么进来的")
			console.log(req.params.id)
			const model=req.model
	        var result=await req.model.findById(req.params.id)
		    res.json(result)
	    }catch (e) {
	        next(e)
	    } 
	});
	router.put('/:id',async function(req, res, next) {
		try {
			const model=req.model
	        var result=await req.model.findByIdAndUpdate(req.params.id,req.body)
		    res.json(result)
	    }catch (e) {
	        next(e)
	    } 
	});
	router.delete('/:id',async function(req, res, next) {
		try {
			const model=req.model
	        var result=await req.model.findByIdAndDelete(req.params.id)
		    res.json({result:'ok'})
	    }catch (e) {
	        next(e)
	    } 
	});
	return router
}
	


