const http = require('http');
const path = require('path');
const fs = require('fs');
const fetch = require("node-fetch");


const express = require('express');

const app = express()

app.use(express.static(path.join(__dirname, 'public')))


const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));



let count = 0
app.get('/nytimes', async (req, res) => {
    count++
    let response = await fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?&api-key=VAsImL2HhJlN3C5QJmDi1RmP1M4nh2Ko`).then(res => res.json());
    console.log(response);
    res.send(response);
    console.log(count);
    })