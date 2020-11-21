let headlineTracker = {};
firstCall = true;
let countDown = 120000;
let tag1 = '';
let searchValue = document.getElementById('search-value');
let tagList = document.getElementById('tag-list');
let addTag = document.getElementById('add-tag');

addTag.addEventListener('click', () => {
    tagList.innerHTML = '';
    tag1 = searchValue.value;
    let text = document.createTextNode(searchValue.value)
    tagList.appendChild(text)
    countDown = 120000;
    console.log(countDown, 'CALL')
    return getNews('noNew');
})


const getNews = async(isNew)=> {
    let sendAlert = false;
    const data = {tag: tag1};

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
  data.results.forEach(element => {
      let item = document.createElement('div');
      let headline = document.createElement('div');
      headline.innerHTML = '<i class="fa fa-arrow-circle-right"></i> ' + element.title;
      if (headlineTracker[element.title]) {
          headline.className = 'headline';
      }
      if (!headlineTracker[element.title]) {
          if (!firstCall && isNew != 'noNew') {
              headlineTracker[element.title] = true;
              headline.className = 'headline new';
              sendAlert = true;
          } else {
          headlineTracker[element.title] = true;
          headline.className = 'headline';
          }
      }
      let summary = document.createElement('div');
      summary.style.display = 'none';
      let summaryp = document.createElement('p');
      let photo = document.createElement('img')
      photo.className = 'photo'
      if (element.multimedia != null) photo.src = element.multimedia[0].url;
      summaryp.innerHTML = element.abstract + `<div><br>Article Link: <a href=${element.url} style="color: white">${element.url}</a></div>`;
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

getNews('noNew');

const subtractOne = () => {
    countDown = countDown -1000;
}

window.setInterval(function(){
    if (countDown > 0) {
        console.log(countDown, 'subtract')
        return subtractOne();
    } else {
        countDown = 120000;
        console.log(countDown, 'CALL')
        return getNews('noNew');
    }
  }, 1000);