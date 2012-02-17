var server  = require('./server');
var mm = require('./moduleManager').moduleManager;
server.start();
mm.updateDependency();
setTimeout(function(){
	console.log(mm.getModules())
},3000);