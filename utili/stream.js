const fs = require('fs');
const path = require('path');
const os = require('os');

const streamVideo = (req, res) => {
  // ====This gets a particular video from my pc, desktop in the uploads folder... you can change this to fit yours, ir upgrade to code to read a folder and select the videos to watch. I'll create another repo for that.====
  const videoPath = path.join(
    os.homedir(),
    'Desktop',
    'uploads',
    'tiktokio.com_qG0IB6h8Ue2g0Uvn2ity.mp4' // ====Change to the video you want to stream====
  );
  // ====Get the total video size====
  const videoSize = fs.statSync(videoPath).size;
  const range = req.headers.range;
  // ====Check if the range isn't empty====
  if (!range) {
    res.status(400).send('Requires Range Header');
    return;
  }
  // ====This is setting the chunk size to 1mb i.e 1,000,000 or 10 ** 6 ====
  const chunk_size = 10 ** 6;
  // ====Removes non digit from the range sent by client====
  const start = Number(range.replace(/\D/g, ''));
  // ====Get the minimum number====
  const end = Math.min(start + chunk_size - 1, videoSize - 1);
  // ====Get the contentLength====
  const contentLength = end - start + 1;
  // ====Headers sent to the browser,helps in the stream process by giving infomations to the browser====
  const headers = {
    'Content-Range': `bytes ${start}-${end}/${videoSize}`,
    'Accept-Ranges': 'bytes',
    'Content-Length': contentLength,
    'Content-Type': 'video.mp4',
  };
  // ====This is the most important part of this code, as it tells the browser that what is sent is a partial content and it should continue to request more====
  res.writeHead(206, headers);
  // ====Creating a video stream====
  const videoStream = fs.createReadStream(videoPath, { start, end });
  // ==== sending the video chunks====
  videoStream.pipe(res);
};

// ====Exporting this as a module====
module.exports = streamVideo;

// ====Feel free to point out where the code can be improved. This is the second month i learnt node.js if there's room for improvement please let me know. thanks====
