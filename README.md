# SSE-Fake-Server
Simple ["Server Sent Events"](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events) fake server for testing your code with dynamic data.

## Install
Install, using NPM:
```sh
$ npm install sse-fake-server
```

## How to Use

### Server
Just create "fakeServer.js" file:
```javascript
const SSEServer = require('sse-fake-server');

// Pass callback to SSEServer
SSEServer(client => {
    // Every 2 seconds send data to client
    setInterval(() => {
        client.send('Stream Hello!')
    }, 2000);
});
```
Run it:
```sh
$ node fakeServer.js
```
Now fake server listen on http://localhost:5555/stream.
### Client
Simple SSE usage:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>SSE Client</title>
</head>
<body>
    <script>
        // Create SSE object
        var es = new EventSource("http://localhost:5555/stream");

        // Listen for message events from server
        es.addEventListener('message', function(event) {
            console.log(event.data);
        });
    </script>
</body>
</html>
```

## License
MIT. © 2017 Taras Batenkov