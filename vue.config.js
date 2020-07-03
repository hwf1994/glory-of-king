const path = require("path");
function resolve(dir) {
    return path.join(__dirname, dir);
}
module.exports = {
	lintOnSave: false,  //打包时禁用eslint
    chainWebpack: config => {
        config.resolve.alias
            .set("@", resolve("src"))
            .set("utils", resolve("src/utils"));   
    },
    outputDir: __dirname+'/docs',
//  outputDir: __dirname+'/../server/public/admin',
//	publicPath: process.env.NODE_ENV === 'production'
//	    ? '/docs/'
//	    : '/',
}