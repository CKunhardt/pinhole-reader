// NEW_NOTE_BOX = "
// <div class='single-note' style='position: absolute; left: 5px'>
//   <div style='display: inline-blick; position: relative'>
//     <textarea placeholder='Add Your Comment'> </textarea>
//     <button tyle='button' class='btn btn-success'>Submit</button>
//   </div>
// </div>"


num_notes = 0;
let removeBox = function(boxID) {
  alert(boxID);
}

$(function() {
  $("#note-area").bind('click', function(event) {
    if(event.target != this) return;
    let parentOffset = $(this).parent().offset();
    let x = event.pageX - parentOffset.left;
    let y = event.pageY - parentOffset.top;
    //
    // $("note-area")
    let noteDiv = document.createElement('div');
    noteDiv.id = "note-"+num_notes;
    noteDiv.className = "single-note";
    noteDiv.style.position="absolute";
    noteDiv.style.left = 5 + 'px';
    noteDiv.style.top = y + 'px';


    let subDiv = document.createElement('div');
    subDiv.style.position = "relative";
    subDiv.style.display = "inline-block";


    let textArea = document.createElement('textarea');
    textArea.placeholder = "Add Your Comment"
    textArea.cols="20";
    textArea.rows="5";

    let button = document.createElement('button');
    button.className="btn btn-success";
    button.id="note-button-"+num_notes;
    button.style.position = "absolute";
    button.style.bottom = "10px";
    button.style.right = "8px";
    button.setAttribute("onclick", "removeBox(" + noteDiv.id + ")");

    alert(noteDiv.id);
    // document.getElementById(noteDiv.id).addEventListener("click", function(e) {
    //   alert("Hi");
    // })
    // button.onclick = function() {
    //   this.parentElement.removeChild(this);
    // }
    // button.className = "btn btn-success";
    button.appendChild(document.createTextNode("Submit"));
    subDiv.appendChild(textArea);
    subDiv.appendChild(button);
    noteDiv.appendChild(subDiv);


    $("#note-area").append(noteDiv);
    num_notes++;
  })
})
