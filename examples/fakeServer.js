const https = require('https');
const SSEServer = require('../dist/index.cjs');

// Pass callback to SSEServer
// Send dynamic data to client using "client" object 
SSEServer((client) => {
    getData(5, (data) => {
        client.send(data);
    });
    
    setInterval(() => {
        getData(1, (data) => {
            client.send(data);
        });
    }, 3000);
});

// Get fake data from "randomuser.me"
function getData(num, cb) {
    https.get('https://randomuser.me/api/?results=' + num + '&inc=name,picture', (resp) => {
        let data = '';
       
        resp.on('data', (chunk) => {
            data += chunk;
        });
       
        resp.on('end', () => {
            cb(data);
        });
       
    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
}
