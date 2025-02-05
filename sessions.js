
const express = require('express');
const cookieParser = require('cookie-parser');

const sessionsRouter = express.Router();
const sessions = {};  
const users = new Set();  


const generateSid = () => Math.random().toString(36).substring(2);
const isValidUsername = (username) => /^[a-zA-Z0-9_-]{1,20}$/.test(username);


sessionsRouter.use(cookieParser());


sessionsRouter.post('/api/v1/session', (req, res) => {
    const { username } = req.body;

    if (!username || !username.trim()) {
        return res.status(400).json({ error: 'Username cannot be empty' });
    }
    if (!isValidUsername(username)) {
        return res.status(400).json({ error: 'Invalid username' });
    }
    if (username === 'dog') {
        return res.status(403).json({ error: 'Username not allowed' });
    }

    const sid = generateSid();
    sessions[sid] = username;
    users.add(username);

    res.cookie('sid', sid);
    res.json({ username });
});

sessionsRouter.get('/api/v1/session', (req, res) => {
    const sid = req.cookies.sid;
    const username = sessions[sid];

    if (!sid || !username) {
        return res.status(401).json({ error: 'No valid session' });
    }

    res.json({ username });
});

sessionsRouter.delete('/api/v1/session', (req, res) => {
    const sid = req.cookies.sid;
    const username = sessions[sid];

    if (sid && username) {
        const hasOtherSessions = Object.values(sessions).some(
            u => u === username && sessions[sid] !== username
        );
        
        if (!hasOtherSessions) {
            users.delete(username);
        }
        
        delete sessions[sid];
    }

    res.clearCookie('sid');
    res.sendStatus(200);
});


function checkAuth(req, res, next) {
    const sid = req.cookies.sid;
    const username = sessions[sid];

    if (!sid || !username) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    req.username = username;
    next();
}

module.exports = { sessionsRouter, checkAuth, users, sessions };
