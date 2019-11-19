$(() => {
  $.get('texts/moby-dick.txt', (data) => {
    let words = data.exec('[^" "]+\s');
    let tree = document.createDocumentFragment();
    words.forEach((word, i) => {
      let wordDiv = document.createElement('div');
      wordDiv.id = 'word-'+i;
      wordDiv.className = 'single-word';
      wordDiv.appendChild(document.createTextNode(word));
      tree.appendChild(wordDiv);
    });
    $("#example-text").appendChild(tree);
  })
});

$("#zoom-in").click(() => {
  let curSizeText = $("#example-text").css("font-size");
  let curSize = curSizeText.substr(0, curSizeText.length - 2);
  if (curSize < 48) {
    let newSize = Number(Number(curSize)+4)+'px';
    $("#example-text").css("font-size", newSize);
  } else return
})

$("#zoom-out").click(() => {
  let curSizeText = $("#example-text").css("font-size");
  let curSize = curSizeText.substr(0, curSizeText.length - 2);
  if (curSize > 12) {
    let newSize = Number(Number(curSize)-4)+'px';
    $("#example-text").css("font-size", newSize);
  } else return
})