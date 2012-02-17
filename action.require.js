var actionManager = require("./actionManager").actionManager, 
moduleManager = require('./moduleManager').moduleManager, 
arrayExtend = require('./arrayExtend').array;

actionManager.register('require', function(request, response) {
    var path = require("path"), 
    qs = require("querystring"), 
    url = require('url'), 
    fs = require('fs'), 
    query = qs.parse(url.parse(request.url).query);
    if (!query['request']) {
        response.writeHead(200, {
            "Content-Type" : "text/plain"
        });
    }

    var basePath = require('./config').config.basePath, 
    _request = query['request'] ? decodeURIComponent(query['request']).replace('Mallan.', '') : '';
    _request = _request.split(',');

    response.writeHead(200, {
        "Content-Type" : "text/plain"
    });
      //response the related module
        for ( var i = 0, l = _request.length; i < l; i++) {
            //TODO make it acsync
            var realPath = basePath + _request[i].replace(/\./g, '/') + ".js";
            var content = fs.readFileSync(realPath, "binary");
            response.write(content, 'binary');
        }
        response.end();
});