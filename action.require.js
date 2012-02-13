var actionManager = require("./actionManager").actionManager,
moduleManager = require('./moduleManager').moduleManager,
arrayExtend = require('./arrayExtend').array;

actionManager.register('require',function(request,response){
	var path = require("path"),
	qs = require("querystring"),
	url = require('url'),
	fs = require('fs'),
	query = qs.parse(url.parse(request.url).query);
	if(!query['request']){
		response.writeHead(200,{
			"Content-Type":"text/plain"
		});
	}
	
	var basePath = require('./config').config.basePath,
	_request = query['request']? query['request'].replace('Mallan.',''):'',
	_loaded = query['loaded']? query['loaded'].split(',') : [];
	_request = _request.split(',');
	
	//get the related modules
	var result = [],modules = moduleManager.getModules();
	for(var i=0, l=_request.length;i<l;i++){
		var module = modules[_request[i]] || {};
		result = result.concat(module.rely || []);
	}
	console.log(result)
	response.writeHead(200,{
		"Content-Type":"text/plain"
	});
	
	//response the related module
	for(var i=0,l=result.length;i<l;i++){
		if(!arrayExtend.contain(_loaded,_request[i])){
			//TODO make it acsync
			var realPath = basePath + result[i].replace(/\./g,'/')+".js";
			var content = fs.readFileSync(realPath,"binary");
			response.write(content,'binary');
		}
	}
	
	//response itself
	response.write(fs.readFileSync(realPath,"binary"),'binary');
	
	response.end();
});