var actions = {};
var actionManager = {
	register:function(act,fn){
		actions[act] = fn;
	},
	unRegister:function(act,fn){
		delete actions[act];
	},
	getActions:function(){
		return actions;
	}
}

exports.actionManager = actionManager;
