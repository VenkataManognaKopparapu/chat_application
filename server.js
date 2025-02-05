// server.js
const express = require('express');
const path = require('path');
const { sessionsRouter } = require('./sessions');
const usersRouter = require('./users');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Routes
app.use(sessionsRouter);
app.use(usersRouter);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
