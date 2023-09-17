const express = require('express');
const urlController = require(`${__dirname}/../controllers/url-controller`);

const router = express.Router();


router.get('/', urlController.renderHome);
router.post('/', urlController.generateShortUrl);
router.get('/url/:generatedId', urlController.redirectOriginalurl);

module.exports = router;