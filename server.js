const express = require('express');
const WebSocket = require('ws');
const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');

const app = express();
const server = require('http').createServer(app);
const wss = new WebSocket.Server({ server });

const serialPort = new SerialPort({ path: 'COM8', baudRate: 9600 });
const parser = serialPort.pipe(new ReadlineParser({ delimiter: '\n' }));

app.use(express.static('public')); // Serve static files from 'public' directory

parser.on('data', data => {
  // Broadcast the data to all connected WebSocket clients
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
});

const PORT = 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
