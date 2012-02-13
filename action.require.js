var actionManager = require("./actionManager").actionManager,
moduleManager = require('./moduleManager').moduleManager,
arrayExtend = require('./arrayExtend');

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
	
	var basepath = require('./config').config.basePath,
	_request = query['request']? query['request'].replace('Mallan.',''):'',
	_loaded = query['loaded']? query['loaded'].split(',') : [];
	_request = _request.split(',');
	
	//get the related modules
	var result = [],modules = moduleManager.getModules();
	for(var i=0, l=_request.length;i<l;i++){
		var rely = modules[_request[i]] || {};
		result = result.concat(rely || []);
	}
	
	response.writeHead(200,{
		"Content-Type":"text/plain"
	});
	
	for(var i=0,l=result.length;i<l;i++){
		if(!arrayExtend.contain(_loaded,_request[i])){
			//TODO make it acsync
			var realPath = basePath + _request[i].replace(/\./g,'/')+".js";
			fs.readFileSync(realPath,"binary",function(err,data){
				if(err){
					console.log(err);
					return ;
				}
				response.write(data,'binary');
			});
		}
	}
	response.end();
});