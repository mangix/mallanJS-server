var server;

exports.start = function () {
    var http = require("http");
    var actionConfig = require("./actionConfig").actionConfig;
    var actionManager = require("./actionManager").actionManager;
    var url = require("url");
    var os = require("os");
    //load all actionModule
    for (var o in actionConfig) {
        require(actionConfig[o]);
    }

    var onRequest = function (request, response) {
        console.log('Request comes')
        var actions = actionManager.getActions();
        var path = url.parse(request.url).pathname;
        console.log('Request:' + path);
        path = path.split('/');
        path = path[1];
        if (path) {
            for (var o in actions) {
                if (o == path) {
                    actions[o].call(this, request, response);
                    return;
                }
            }
        }
        response.writeHead(200, {
            "Content-Type":"text/plain"
        });
        response.write("not found");
        response.end();

    };
    var address = os.networkInterfaces().eth0[0].address;
    server = http.createServer();
    server.on('request', onRequest);
    server.listen(8000, address);
    console.log("server start " + address);
}
