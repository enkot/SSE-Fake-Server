let itAlive = null;

const SSE = (req, res) => {
    const aliveInterval = 60000;

    req.socket.setNoDelay(true);

    res.writeHead(200, {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
    });

    itAlive = setInterval(() => {
        res.write(':ping\n\n');
    }, aliveInterval);
  
    return {
        send: (data) => {
            res.write('data: ' + data + '\n\n');
        },
        close: (callback) => {
            res.on('close', () => {
                if (itAlive) clearInterval(itAlive);
                if (callback) callback();
            });
        }
    };
};

export default SSE;