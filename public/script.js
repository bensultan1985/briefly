let headlineTracker = {};
firstCall = true;
let countDown = 120000;

const getNews = async()=> {
    const rawResponse = await fetch('/nytimes');
    console.log(rawResponse)
    data = await rawResponse.json();
    console.log(data)
    document.getElementById('article-data').innerHTML = '';
    data.response.docs.forEach(element => {
        let item = document.createElement('div');
        let headline = document.createElement('div');
        headline.innerHTML = '<i class="fa fa-arrow-circle-right"></i> ' + element.headline.main;
        if (headlineTracker[element.headline.main]) {
            headline.className = 'headline';
        }
        if (!headlineTracker[element.headline.main]) {
            if (!firstCall) {
                headlineTracker[element.headline.main] = true;
                headline.className = 'headline new';
            } else {
            headlineTracker[element.headline.main] = true;
            headline.className = 'headline';
            }
        }
        let summary = document.createElement('div');
        summary.style.display = 'none';
        let summaryp = document.createElement('p');
        let photo = document.createElement('img')
        photo.className = 'photo'
        if (element.multimedia[0] != null) photo.src = 'http://www.nytimes.com/' + element.multimedia[0].url;
        summaryp.innerHTML = element.abstract + `<div><br>Article Link: <a href=${element.web_url} style="color: white">${element.web_url}</a></div>`;
        if (summaryp.innerHTML == '') summaryp.innerHTML = 'no additional information';
        summary.appendChild(photo)
        summary.appendChild(summaryp);
        summaryp.className = 'summaryp';
        summary.className = 'summary';
        item.appendChild(headline);
        item.appendChild(summary);
        document.getElementById('article-data').appendChild(item);
        if (headline.className == 'headline new') setTimeout(() => {
            headline.className = 'headline';
        }, 118000)
    });
    firstCall = false;
};

getNews();

const subtractOne = () => {
    countDown = countDown -1000;
}

window.setInterval(function(){
    if (countDown > 0) {
        console.log(count, 'subtract')
        return subtractOne();
    } else {
        count = 120000;
        console.log(count, 'CALL')
        return getNews();
    }
  }, 1000);