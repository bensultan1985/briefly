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


app.post('/server', async (req, res) => {
userSubmissions.push(req.body)
console.log(userSubmissions, 'This function simulates a post to the API by using an array to store data')
res.send('200');
console.log('request made successfully');
})

app.get('/events', async (req, res) => {
    res.send(scheduleArray);
    console.log('events sent')
})


app.get('/nytimes', async (req, res) => {
    let response = await fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?&api-key=9hF6uiZFm8pPLDGLCGZoP3MhhVsHiMsL`).then(res => res.json());
    console.log(response)
    res.send(response);
    console.log('request made successfully');
    //
    })