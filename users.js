
const express = require('express');
const { checkAuth, users } = require('./sessions');

const usersRouter = express.Router();
const messages = [];  


usersRouter.get('/api/v1/messages', checkAuth, (req, res) => {
    res.json(messages);
});

usersRouter.post('/api/v1/messages', checkAuth, (req, res) => {
    const { text } = req.body;
    const username = req.username;

    
    if (!text || !text.trim()) {
        return res.status(400).json({ error: 'Message cannot be empty' });
    }

    const message = {
        username,
        text: text.trim(),
        timestamp: Date.now()
    };

    messages.push(message);
    res.json(message);
});


usersRouter.get('/api/v1/users', checkAuth, (req, res) => {
    res.json(Array.from(users));
});

module.exports = usersRouter;