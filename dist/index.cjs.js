#!/usr/bin/env node
'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var http = _interopDefault(require('http'));

var itAlive = null;

var SSE = function SSE(req, res) {
    var aliveInterval = 60000;

    req.socket.setNoDelay(true);

    res.writeHead(200, {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
    });

    itAlive = setInterval(function () {
        res.write(':ping\n\n');
    }, aliveInterval);

    return {
        send: function send(data) {
            res.write('data: ' + data + '\n\n');
        },
        close: function close(callback) {
            res.on('close', function () {
                if (itAlive) clearInterval(itAlive);
                if (callback) callback();
            });
        }
    };
};

var server = function server(cb) {
    var PORT = process.env.PORT || 5555;

    var server = http.createServer(function (req, res) {
        if (req.url !== '/stream') return res.end();

        var client = SSE(req, res);

        cb(client);
    });

    server.listen(PORT, function () {
        console.log('SSE FAKE SERVER');
        console.log('Server running, listening at port ' + PORT + '.');
    });
};

module.exports = server;
