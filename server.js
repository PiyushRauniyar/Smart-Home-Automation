const express = require('express');
const http = require('http');
const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline'); // Correct import of ReadlineParser
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
app.get('/favicon.ico', (req, res) => res.status(204).end());

// Update this with your actual Arduino serial port
const port = new SerialPort({ path: 'COM8', baudRate: 9600 }, function (err) {
    if (err) {
      return console.log('Error: ', err.message);
    }
  });

// Use the correct constructor for the Readline parser
const parser = port.pipe(new ReadlineParser({ delimiter: '\n' }));

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('Client connected');

    parser.on('data', (data) => {
        console.log(`Received data: ${data}`);
        socket.emit('sensorData', data);
    });

    socket.on('setThreshold', (thresholdData) => {
        console.log(`Threshold adjustment received: ${thresholdData}`);
        port.write(thresholdData + '\n');
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

server.listen(3000, () => {
    console.log('Server listening on port 3000');
});
