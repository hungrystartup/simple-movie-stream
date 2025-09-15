const express = require('express');
const router = express.Router();
const readFolder = require('../utili/readfolder.js');

router.get('/files', readFolder);
