const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 5000;
const NEWS_API_KEY = 'YOUR_NEWSAPI_KEY';
const NEWS_API_URL = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${NEWS_API_KEY}`;

app.get('/news/:category', async (req, res) => {
    try {
        const category = req.params.category;
        const response = await axios.get(`${NEWS_API_URL}&category=${category}`);
        res.json(response.data.articles);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch news' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
