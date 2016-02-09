
var _ = require('lodash');

exports.load = function(server, boatData, settings) {


    // look for tacks
    // after a tack, wait 60 secs
    // get last n secs data
    // run tack algorithm
    // push tack.


    // UI to show new tacks

    var currentTack,
    boatData.on('data', function(res) {

    });

    setTimeout(function() {

    }, 60000);

    //returns current set of data for boat
    server.get('/tacks', function(req, res) {
        res.send('hello');
    });


    //TODO: ES library
    var streamConnections = [];
    //on data, send to client
    // boatData.on('data', function streamOnData(data) {
    //     _.each(streamConnections, function(res) {
    //         res.write('id: ' + (new Date().getTime()) + '\n');
    //         res.write('data: ' + JSON.stringify(data) + '\n\n');
    //     });
    // });

    //returns json package for each new piece of data on channel
    server.get('/stream/tacks', function(req, res) {
        //let request last forever
        // req.socket.setTimeout(Infinity);

        //set response type to SSE
        res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive'
        });
        res.write('\n');

        streamConnections.push(res);

        //on connection close, remove from list of active streams
        req.on('close', function() {
            streamConnections = _.without(streamConnections, res);
        });
    });
};
