var fs = require("fs");
var path = require("path");
var basePath = require('./config').config.basePath;

function unique(arr){
	//delete the repeated items
	for(var i=0,l = arr.length;i<l;i++){
		var item = arr[i];
		for(var j=i+1,len = arr.length;j<len;j++){
			if(item===arr[j]){
			arr.splice(j,1);
			j--;
			len--;
			l--;
			}
		}
	}
}

function getDependencyInFile(path){
	//path is the ralative path to the basePath : dom.element.js or dom/element.js
	var content ,reg ,res, arr = [];
	content = fs.readFileSync(basePath + path.replace('.js','').replace(/\./g,'/') +'.js').toString();
	reg = /\/\/\s*@require\s+([^\s]+)(?:[\r\s\b]*)/g;
	while(res = reg.exec(content)){
		var rely = res[1];
		arr = arr.concat(getDependencyInFile(rely).concat([rely]));
	}
	unique(arr);
	return arr;
}

var modules = {};

exports.moduleManager = {
	updateDependency:function(fullPath){
		var self = this;
		if(fullPath===undefined || path.extname(fullPath)===""){
			//basePath or dir
			fullPath = fullPath? (fullPath+'/') : basePath;
			fs.readdir(fullPath,function(err,files){
				if(err){
					//console.log(err);
					return ;
				}else{
					for(var i=0,l=files.length;i<l;i++){
						self.updateDependency(fullPath+files[i]);
					}		
				}
			});
		}
		else if(path.extname(fullPath)===".js"){
			// javascript file
			var relativePath = path.relative(basePath,fullPath).replace(/(\.\/|\.\.\/)/,'');
			var dependency = getDependencyInFile(relativePath);
			//convert the filepath to the module name : /home/mangix/mygit/mallanJS/dom/element.js -->dom.element
			var module = relativePath.replace(/.js/,'').replace(/\//g,'.');
			modules[module] = {
				rely:dependency
			};
		}
	},
	getDependencyInFile:getDependencyInFile,
	getModules:function(){
		return modules;
	}
}
