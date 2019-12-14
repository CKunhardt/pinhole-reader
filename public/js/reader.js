var selecting = false;

let colorAdd = function(event) {
  if(selecting) $('#'+event.target.id).css('background-color', 'rgba(255, 255, 100, 0.5)');
}

let colorClear = function(event) {
  if(!selecting) $('#'+event.target.id).css('background-color', 'transparent');
}

$(() => {
  $.get('texts/design.txt', (data) => {
  console.log(data);
  let words = data.match(/([^" "]+\s)/g);
  console.log(words);
  let patternStart = new RegExp(/^(\r|\n)/g);
  let patternEnd = new RegExp(/(\r|\n)\s$/g);
  let tree = document.createDocumentFragment();
  words.forEach((word, i) => {
    if(patternStart.test(word)) {
      tree.appendChild(document.createElement('br'));
      tree.appendChild(document.createElement('br'));
      console.log(i);
    }

    let wordDiv = document.createElement('div');
    wordDiv.id = 'pr-word-'+i;
    wordDiv.className = 'pr-single-word';
    wordDiv.appendChild(document.createTextNode(word));
    wordDiv.addEventListener('mouseover', colorAdd);
    wordDiv.addEventListener('click', colorClear);
    tree.appendChild(wordDiv);

    if(patternEnd.test(word)) {
        tree.appendChild(document.createElement('br'));
        tree.appendChild(document.createElement('br'));
    }
    // if() {
    //   console.log(word);
    // }
    // if('/^[\r]?:/g')
    // if(pattern.test(word)) {
    //   let wordDiv = document.createElement('br');
    //   wordDiv.id = 'pr-word-'+i;
    //   wordDiv.className = 'pr-single-word';
    //   tree.appendChild(wordDiv);
    //   tree.appendChild(document.createElement('br'));
    // } else {
    //   let wordDiv = document.createElement('div');
    //   wordDiv.id = 'pr-word-'+i;
    //   wordDiv.className = 'pr-single-word';
    //   wordDiv.appendChild(document.createTextNode(word));
    //   wordDiv.addEventListener('mouseover', colorAdd);
    //   wordDiv.addEventListener('click', colorClear);
    //   tree.appendChild(wordDiv);
    // }

  });
  $("#pr-example-text").append(tree);
});

  $("#reading-area").bind('dblclick', function() {
    selecting = !selecting;
  });

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

// Footer buttons effects
// This is the note
let moveTextLeft = function() {
  // Hide the side blurry areas
  $("#left-col").hide();
  $("#right-col").hide();
  // Move the top and bottom to align the layout
  $("#pr-filter-box-top").css("left", "0");
  $("#pr-filter-box-bottom").css("left", "0");
}

let moveTextRight = function() {
  $("#left-col").show();
  $("#right-col").show();
  $("#pr-filter-box-top").css("left", "16.67%");
  $("#pr-filter-box-bottom").css("left", "16.67%");
}

$("#note-control-btn").click(() => {
  if($("#note-area").is(":hidden")) {
    if($("#side-progress-area").is(":visible")) {
      // wait to fill
      $("#side-progress-area").hide();
      $("#note-area").show();
    } else {
      // When no comments and progress bar
      moveTextLeft();
      $("#note-area").show();
    }
    enableNote();
  } else {
    moveTextRight();
    $("#note-area").hide();
  }
});

$("#progress-control-btn").click(() => {
  if($("#side-progress-area").is(":hidden")) {
    if($("#note-area").is(":visible")) {
      $("#note-area").hide();
      $("#side-progress-area").show();
    } else {
      moveTextLeft();
      $("#side-progress-area").show();
    }
  } else {
    // when no comments(notes) and progress bar
    moveTextRight();
    $("#side-progress-area").hide();
  }
})
