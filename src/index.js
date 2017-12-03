import SSE from './sse';
import http from 'http';

const server = (cb) => {
    const PORT = process.env.PORT || 5555;
    
    const server = http.createServer((req, res) => {
        if (req.url !== '/stream') return res.end();
        
        const client = SSE(req, res);
    
        cb(client);
    });
    
    server.listen(PORT, () => {
        console.log('SSE FAKE SERVER');
        console.log(`Server running, listening at port ${PORT}.`);
    });
};

export default server;