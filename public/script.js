

let headlineTracker = {};
let firstCall = true;
let countDown = 120000;
let tag1 = '';
let searchValue = document.getElementById('search-value');
let tagList = document.getElementById('tag-list');
let addTag = document.getElementById('add-tag');
let allTags = [];

const onLoad = () => {
    getNews('noNew');
};

const delTag = (e) => {
    for (let i = 0; i < allTags.length; i++) {
        if (allTags[i] == e.target.value) {
            allTags.splice(i, 1);
        };
    };
    refreshTags(false);
    getNews('noNew');
};

const refreshTags = (addSearchValue) => {
    tagList.innerHTML = '';
    tag1 = '';
    if (addSearchValue){
        if (searchValue.value != '') {
            tag1 = searchValue.value;
            allTags.push(tag1)
        };
    };
    allTags.forEach(element => {
        let item = document.createElement('span')
        let text = document.createTextNode(element + ' x')
        item.appendChild(text)
        item.className = 'search-tag'
        tagList.appendChild(item)
        item.value = element;
        item.addEventListener('click', delTag)
    })
}

addTag.addEventListener('click', () => {
    refreshTags(true);
    countDown = 120000;
    searchValue.value = '';
    searchValue.text = '';
    return getNews('noNew');
})


const getNews = async(isNew)=> {
    let sendAlert = false;
    const data = {tag: allTags};

fetch('/nytimes', {
  method: 'POST', // or 'PUT'
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
})
.then(response => response.json())
.then(data => {
  console.log('Success:', data);
  document.getElementById('article-data').innerHTML = '';
  data.response.docs.forEach(element => {
      let item = document.createElement('div');
      let clock = new Date(element.pub_date)
      let headline = document.createElement('div');
      headline.innerHTML = '<i class="fa fa-arrow-circle-right"></i> ' + element.headline.main;
      if (headlineTracker[element.headline.main]) {
          headline.className = 'headline';
      }
      if (!headlineTracker[element.headline.main]) {
          if (!firstCall && isNew != 'noNew') {
              headlineTracker[element.headline.main] = true;
              headline.className = 'headline new';
              sendAlert = true;
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
      summaryp.innerHTML = element.abstract + `<div><br>Article Link: <a href=${element.web_url} style="color: white" target="_blank">${element.web_url}</a></div>`;
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
  if (sendAlert == true) alert('New article summaries have been delivered.');
  firstCall = false;
  return;

})
.catch((error) => {
  console.error('Error:', error);
});
}

const subtractOne = () => {
    countDown = countDown -1000;
};

window.setInterval(function(){
    if (countDown > 0) {
        return subtractOne();
    } else {
        countDown = 120000;
        return getNews();
    }
}, 1000);

(function loop() {
    var rand = Math.round(Math.random() * (1000 - 500)) + 50;
    setTimeout(function() {
        let liveDot = document.getElementById("live-dot");
        if (liveDot.style.color == "red") {
            liveDot.style.color = "#FFA5A5";
        } else {
            liveDot.style.color = "red";
        }
            loop();  
    }, rand);
}());