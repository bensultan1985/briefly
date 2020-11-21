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
app.post('/nytimes', async (req, res) => {
    count++
    console.log(req.body.tag)
    let term = '';
    req.body.tag.forEach(element => {
        term += `"${element}" `
    })
    console.log(term, 'term')
    let query = '';
    req.body.tag == '' ? query = req.body.tag: query = `&fq=body:(${term})`;
    console.log(query)
    let response = await fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?${query}&sort=newest&api-key=VAsImL2HhJlN3C5QJmDi1RmP1M4nh2Ko`).then(res => res.json());
    let response2 = await fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?${query}&sort=newest&page=2&api-key=VAsImL2HhJlN3C5QJmDi1RmP1M4nh2Ko`).then(res => res.json());
        // let response = await fetch(`https://api.nytimes.com/svc/news/v3/content/all/all.json?&qs=${term}&api-key=VAsImL2HhJlN3C5QJmDi1RmP1M4nh2Ko`).then(res => res.json());
    let completeList = [];
    response2.response.docs.forEach(doc => response.response.docs.push(doc))
    res.send(response);
    console.log(count);
    })