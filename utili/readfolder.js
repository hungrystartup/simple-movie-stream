const path = require('path');
const fs = require('fs');
const os = require('os');
const videos = path.join(os.homedir(), 'Desktop', 'uploads');
const readFolder = (req, res) => {
  fs.readdirSync(videos, (error, files) => {
    if (error) {
      throw error;
    }
    res.status(200).send(files);
  });
};
module.exports = readFolder;
