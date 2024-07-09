const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const auth = require('./middlewares/authmiddlewar');
const userController = require('./controllers/authentifcont');
const formController = require('./controllers/formcotroller');
const errorHandler = require('./middlewares/errorhandler');
const { WebSocketServer } = require('ws');

const app = express();

app.use(express.json());
app.use(express.static('public'));

mongoose.connect('mongodb://localhost:27017/traitor_lord', { useNewUrlParser: true, useUnifiedTopology: true });

const port = 3000;

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.post("/register", userController.register);
app.post("/login", userController.login);

app.post("/forms", auth, formController.createForm);
app.post("/forms/:id/responses", auth, formController.submitResponse);
app.get("/forms", auth, formController.getForms);

app.use(errorHandler);

const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

// bonus 
const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
    console.log('Client connected');

    ws.on('message', (message) => {
        console.log('Received:', message);
        // Broadcast the message to all clients
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});
