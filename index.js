var express =require("express")
var http = require('http');
var app=express();
const requireAll=require('require-all');
const router=require('./router')
const history = require('connect-history-api-fallback');

app.use(require('cors')())
app.use(express.json())
app.use("/upload",express.static(__dirname+'/upload'))
app.use("/admin",history(),express.static(__dirname+'/public/admin'))
app.use("/web",history(),express.static(__dirname+'/public/web'))

require("./config/mongoose")(app)
const models=requireAll({
  dirname: __dirname + '/model',
});
app.use((req,res,next)=>{
	req.models=models
	next()
},router)


var server = http.createServer(app);
server.listen('3000');
