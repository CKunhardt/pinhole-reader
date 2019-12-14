// NEW_NOTE_BOX = "
// <div class='single-note' style='position: absolute; left: 5px'>
//   <div style='display: inline-blick; position: relative'>
//     <textarea placeholder='Add Your Comment'> </textarea>
//     <button tyle='button' class='btn btn-success'>Submit</button>
//   </div>
// </div>"
// Forget about button. This is so hard to add...
num_notes = 0;

let removeBox = function(noteID) {
  console.log(noteID);
  $("#"+noteID).remove();
}

$(function() {
  $("#reminder, #note-area, #hover-area").bind('click', function(event) {
    if(event.target != this) return;
    let parentOffset = $(this).parent().offset();
    let x = event.pageX - parentOffset.left;
    let y = event.pageY - parentOffset.top;

    console.log(y);
    //
    // $("note-area")
    let noteDiv = document.createElement('div');
    noteDiv.id = "note-"+num_notes;
    noteDiv.className = "single-note";
    noteDiv.style.position="absolute";
    noteDiv.style.left = 10 + 'px';
    noteDiv.style.top = y + 'px';

    let subDiv = document.createElement('div');
    subDiv.style.position = "relative";
    subDiv.style.display = "inline-block";

    let textArea = document.createElement('textarea');
    textArea.placeholder = "Add Your Comment";
    textArea.width="90%";
    textArea.rows="5";
    textArea.cols="35";
    textArea.style.fontSize = "20px";
    textArea.style.lineHeight = "17px";


    let button = document.createElement('button');
    button.style.fontSize = "15px";
    button.style.position = "absolute";
    button.style.right = "0";
    button.setAttribute("onclick", 'removeBox("' + noteDiv.id + '")');
    button.appendChild(document.createTextNode("×"));

    subDiv.append(button);
    subDiv.appendChild(textArea);
    noteDiv.appendChild(subDiv);

    $("#note-area").append(noteDiv);
    num_notes++;
  });

  $("#hover-area").on("mouseenter", function(event) {
    let parentOffset = $(this).parent().offset();

    let y = event.pageY - parentOffset.top - 75;

    let reminder = document.createElement('div');
    reminder.id = "reminder";
    reminder.style.left = "0px";
    reminder.style.position = "absolute";
    reminder.style.top = y + 'px';
    reminder.style.fontSize = "40px";
    reminder.appendChild(document.createTextNode("+"));
    $("#hover-area").append(reminder);
  });

  $("#hover-area").on("mouseleave", function(event) {
    let element = document.getElementById("reminder");
    element.parentNode.removeChild(element);
    // $("#hover-area").removeChild("reminder");
  })
});

// Add note function (Small Reminder)
