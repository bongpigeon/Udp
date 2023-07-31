const { spawn } = require('child_process');

let restarts = 0;

function startServer() {
    const server = spawn('node', ['udpserver.js']);

    server.on('exit', (code, signal) => {
        if(code !== 0 && restarts < 3) {
            console.log(`Server exited with error. Restarting... ${++restarts}`);
            startServer();
        } else if(restarts >= 3) {
            console.log('Server exited with error. Maximum restart attempts reached.');
        } else {
            console.log('Server exited normally.');
        }
    });

    server.stdout.on('data', (data) => {
        console.log(`Server: ${data}`);
    });

    server.stderr.on('data', (data) => {
        console.error(`Server Error: ${data}`);
    });
}

startServer();