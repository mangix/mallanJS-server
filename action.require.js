var actionManager = require("./actionManager").actionManager;

actionManager.register('require',function(request,response){
	var path = require("path");
	var qs = require("querystring");
	var url = require('url');
	var query = qs.parse(url.parse(request.url).query);
	if(!query['request']){
		response.writeHead(200,{
			"Content-Type":"text/plain"
		});
		response.end();	
	}
	var fs = require('fs');
	var basepath = '/home/mangix/mygit/mallanJS/';
	var realPath = basepath+query['request'];
	path.exists(realPath,function(exist){
		if(!exist){
			response.writeHead(200,{
				"Content-Type":"text/plain"
			});
			response.end();
		}else{
			fs.readFile(realPath,"binary",function(err,data){
				if(err){
					console.log(err);
				}
				request.setEncoding('utf-8')
				response.writeHead(200,{
					"Content-Type":"text/plain"
				});
				response.write(data,'binary');
				response.end();
			});
		}
	});
	
});