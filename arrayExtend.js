/**
 * @author allanma
 * @mail maqh1988@gmail.com
 * array.js
 */
 
 function isArray(obj){
 	return (obj && Object.prototype.toString.call(obj) === "[object Array]");
 }
		var array =  {
			each : function(arr, fn) {
				if(isArray(arr)) {
					for(var i = 0, l = arr.length; i < l; i++) {
						if(fn.call(arr[i], i) === false) {
							break;
						}
					}
				}
			},
			indexOf : function(arr, item) {
				if(isArray(arr)) {
					for(var i = 0, l = arr.length; i < l; i++) {
						if(arr[i] === item) {
							return i;
						}
					}
				}
				return -1;
			},
			contain : function(arr, item) {
				//check if the array contains the item
				if(isArray(arr)) {
					for(var i = 0, l = arr.length; i < l; i++) {
						if(arr[i] === item) {
							return true;
						}
					}
				}
				return false;
			},
			unique:function(arr){
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
		};
	exports.array = array;
