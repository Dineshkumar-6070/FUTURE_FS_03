const express = require('express');
const mongoose = require('mongoose');

const shortid = require('shortid');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/urlShortener')
    .then(()=>console.log("mongoDB connected"))
    .catch(err=>console.log("mongoDB connection Error:",err));

// Define URL Schema
const UrlSchema = new mongoose.Schema({
    longUrl: String,
    shortUrl: String
});

const Url = mongoose.model('Url', UrlSchema);

// API to shorten URL
app.post('/shorten', async (req, res) => {
    const { url } = req.body;
    const shortUrl = shortid.generate();
    
    const newUrl = new Url({ longUrl: url, shortUrl });
    await newUrl.save();

    res.json({ shortUrl: `http://localhost:5000/${shortUrl}` });
});

// Redirect to original URL
app.get('/:shortUrl', async (req, res) => {
    const shortUrl = req.params.shortUrl;
    const urlData = await Url.findOne({ shortUrl });

    if (urlData) {
        res.redirect(urlData.longUrl);
    } else {
        res.status(404).json({ message: "URL not found" });
    }
});

// Start server
app.listen(5000, () => console.log("Server running on port 5000"));