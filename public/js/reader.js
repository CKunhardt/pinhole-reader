var selecting = false;

let colorAdd = function(event) {
  if(selecting) $('#'+event.target.id).css('background-color', 'rgba(255, 255, 100, 0.5)');
}

let colorClear = function(event) {
  if(!selecting) $('#'+event.target.id).css('background-color', 'transparent');
}

$(() => {
  $.get('texts/map.txt', (data) => {
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


$("#pr-button-sidebar").click(() => {
  if(!$("#pr-sidebar-completion").hasClass('pr-display-none')) {
    $("#pr-sidebar-completion").addClass('pr-display-none');
    prToggleContentWidth('fw');
  } else if(!$("#pr-sidebar-comments").hasClass('pr-display-none')) {
    $("#pr-sidebar-comments").addClass('pr-display-none');
    prToggleContentWidth('fw');
  } else {
    $('#pr-sidebar-comments').removeClass('pr-display-none');
    prToggleContentWidth('tqw');

  }
})

$("#pr-sidebar-tab-completion-1").click(() => {
  $('#pr-sidebar-comments').addClass('pr-display-none');
  $('#pr-sidebar-completion').removeClass('pr-display-none');
})

$("#pr-sidebar-tab-comments-2").click(() => {
  $('#pr-sidebar-completion').addClass('pr-display-none');
  $('#pr-sidebar-comments').removeClass('pr-display-none');

})


let prToggleContentWidth = (size) => {
  let sizes = ['fw', 'tqw'];
  if (sizes.indexOf(size) == -1) return;
  let prevSize = sizes[(sizes.indexOf(size) + 1) % 2];

  if (size == 'fw') $("#pr-container-text").css('width', ($(window).width() * (3/4))+'px');
  else if (size == 'tqw') $("#pr-container-text").css('width', ($(window).width() * (1/2))+'px');


  $('#pr-filter-box-top').removeClass(`pr-filter-box-${prevSize}`);
  $('#pr-filter-box-bottom').removeClass(`pr-filter-box-${prevSize}`);
  $('#pr-filter-box-right').removeClass(`pr-filter-box-right-${prevSize}`);

  $('#pr-filter-box-top').addClass(`pr-filter-box-${size}`);
  $('#pr-filter-box-bottom').addClass(`pr-filter-box-${size}`);
  $('#pr-filter-box-right').addClass(`pr-filter-box-right-${size}`);
}
