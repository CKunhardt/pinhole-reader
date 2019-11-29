var selecting = false;

let colorAdd = function(event) {
  if(selecting) $('#'+event.target.id).css('background-color', 'rgba(255, 255, 100, 0.5)');
}

let colorClear = function(event) {
  if(!selecting) $('#'+event.target.id).css('background-color', 'transparent');
}

$(() => {
  $.get('texts/moby-dick.txt', (data) => {
    console.log(data);
    let words = data.match(/[^" "]+\s/g);
    console.log(words);
    let tree = document.createDocumentFragment();
    words.forEach((word, i) => {
      let wordDiv = document.createElement('div');
      wordDiv.id = 'pr-word-'+i;
      wordDiv.className = 'pr-single-word';
      wordDiv.appendChild(document.createTextNode(word));
      wordDiv.addEventListener('mouseover', colorAdd);
      wordDiv.addEventListener('click', colorClear);
      tree.appendChild(wordDiv);
    });
    $("#pr-example-text").append(tree);
  });

  document.addEventListener('dblclick', function() {selecting = !selecting; });
});

$("#pr-zoom-in").click(() => {
  let curSizeText = $("#pr-example-text").css("font-size");
  let curSize = curSizeText.substr(0, curSizeText.length - 2);
  if (curSize < 48) {
    let newSize = Number(Number(curSize)+4)+'px';
    $("#pr-example-text").css("font-size", newSize);
  } else return
})

$("#pr-zoom-out").click(() => {
  let curSizeText = $("#pr-example-text").css("font-size");
  let curSize = curSizeText.substr(0, curSizeText.length - 2);
  if (curSize > 12) {
    let newSize = Number(Number(curSize)-4)+'px';
    $("#pr-example-text").css("font-size", newSize);
  } else return
})


$("#pr-btn").click(() => {
  if($("#mySidenav").is(":hidden")) {
    $("#note-area").fadeOut();
    $("#mySidenav").fadeIn();
  } else {
    $("#mySidenav").fadeOut();
    $("#note-area").fadeIn();
  }
})
