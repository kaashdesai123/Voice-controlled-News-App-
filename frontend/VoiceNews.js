import React, { useState } from 'react';
import axios from 'axios';

const VoiceNews = () => {
    const [news, setNews] = useState([]);

    const getNews = async (category) => {
        try {
            const response = await axios.get(`http://localhost:5000/news/${category}`);
            setNews(response.data);
            readNews(response.data);
        } catch (error) {
            console.error("Error fetching news:", error);
        }
    }

    const readNews = (articles) => {
        const synth = window.speechSynthesis;
        const topArticle = articles[0];
        const newsSnippet = `${topArticle.title}. ${topArticle.description}`;
        const utterance = new SpeechSynthesisUtterance(newsSnippet);
        synth.speak(utterance);
    }

    const handleVoiceCommand = () => {
        const recognition = new window.webkitSpeechRecognition();
        recognition.onresult = (event) => {
            const speechResult = event.results[0][0].transcript.toLowerCase();
            if (speechResult.includes("read news about")) {
                const category = speechResult.split("read news about")[1].trim();
                getNews(category);
            }
        };
        recognition.start();
    }

    return (
        <div>
            <button onClick={handleVoiceCommand}>Speak Command</button>
            {/* Render news articles as desired */}
        </div>
    );
}

export default VoiceNews;
