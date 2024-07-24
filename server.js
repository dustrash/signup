const express = require('express');
const bodyParser = require('body-parser');
const { initializeApp } = require('firebase/app');
const { getDatabase, ref, set } = require('firebase/database');

const firebaseConfig = {
    apiKey: "AIzaSyD4v6uqawpVn62-6F-WSZF7xLmDnuy5a3M",
    authDomain: "sign-28585.firebaseapp.com",
    databaseURL: "https://sign-28585-default-rtdb.firebaseio.com",
    projectId: "sign-28585",
    storageBucket: "sign-28585.appspot.com",
    messagingSenderId: "383048873001",
    appId: "1:383048873001:web:9ac19ad3c45d6fbbeed838",
    measurementId: "G-QYHYKZDC89"
  };

const app = express();
const port = 3000;
const hostname = '127.0.0.1';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Firebase 초기화
initializeApp(firebaseConfig);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/submit', (req, res) => {
    const { nickname, id, password } = req.body;

    const db = getDatabase();
    set(ref(db, `users/${id}/`), {
        nickname: nickname,
        id: id,
        password: password,
    }).then(() => {
        res.send('등록 완료');
    }).catch((error) => {
        console.error('Error writing to database', error);
        res.status(500).send('Internal Server Error');
    });
});

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

/**
 * 
 * $ node server.js
 * 127.0.0.1:3000/
 */