const validator = require('validator');

const Url = require(`./../models/url-model`);
const { customAlphabet } = require('nanoid');

const root = '127.0.0.1:5000'



const generateUniqueId = (length) => {
    let generatedId = '';
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let counter = 0;
    while (counter < length) {
        generatedId += characters.charAt(Math.floor(Math.random() * characters.length));
        counter += 1;
    }
    return generatedId;
}

exports.renderHome = (req, res, next) => {
    res.status(200).render('home');
}

exports.generateShortUrl = async (req, res, next) => {

    // getting original/long url from user
    const originalUrl = req.body.longUrl
        .replace('http://', '')
        .replace('https://', '');

    let generatedUrl;

    // invalid url entered
    if (!validator.isURL(originalUrl)) {
        return res.status(400).render('home', {
            longUrl: 'Enter a Valid URL'
        });
    }

    // finding if it already exists in database
    let urlDoc = await Url.findOne({ originalUrl });

    // if exists then return that one
    if (urlDoc) {
        generatedUrl = `${root}/url/${urlDoc.generatedId}`;
    } else {
        // else create new one
        generatedId = generateUniqueId(7);

        // new url id
        generatedUrl = `${root}/url/${generatedId}`;

        // creating new url document
        urlDoc = await Url.create({ originalUrl, generatedId });
    }

    res.status(200).render('home', {
        display: true,
        url: generatedUrl,
        longUrl: originalUrl,
        protocol: req.protocol
    });
}

exports.redirectOriginalurl = async (req, res, next) => {

    let { generatedId } = req.params;

    const url = await Url.findOne({ generatedId });

    if (url)
        res.status(200).redirect(`${req.protocol}://${url.originalUrl}`);
    else
        res.status(200).render('error');
}