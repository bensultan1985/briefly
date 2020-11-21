// const script = document.createElement("script");
// script.src = "https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js";
// document.head.appendChild(script)

$(() => {
  $(document).on("click", ".headline", (e) => {
    $(e.target.nextSibling).slideToggle(300);
    countDown = 120000;
    if (e.target.className == 'headline new') e.target.className = 'headline';
    if (e.target.firstChild.className == 'fa fa-arrow-circle-right') {
      e.target.firstChild.className = 'fa fa-arrow-circle-down';
    } else {
      e.target.firstChild.className = 'fa fa-arrow-circle-right'
    };
    // $(e.target.nextSibling)
    // $(e.target.nextSibling).slideToggle();<i class="fa fa-arrow-circle-down"></i>
    })
  });