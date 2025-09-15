const express = require('express');
const path = require('path');
const { ip } = require('./utili/wifi.js');
const qr = require('qrcode');
const app = express();
const videoStreams = require('./routes/streamvideo.js');
require('dotenv').config();
const PORT = process.env.PORT;
// ====Serving static file====
app.use(express.static(path.join(__dirname, 'public')));
// ====Adding Video streaming route====
app.use('/', videoStreams);
// ====Listen for incoming connection====
app.listen(PORT, () => {
  console.log(`server started: http://${ip}:${PORT}`);
  // ====Generate a QR Code for easy connection====
  qr.toString(ip, { type: 'terminal', small: true }, (err, url) => {
    // ====The real wonder where the qr would be displayed on terminal====
    console.log(url);
  });
});
