const express = require('express');
// ==== creating express router====
const router = express.Router();
// ====importing the module stream video====
const streamVideo = require('../utili/stream.js');
router.use('/video', streamVideo);
// ====Exporting the router====
module.exports = router;
