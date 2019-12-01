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
  $("#pr-area-note, #pr-area-hover").bind('click', function(event) {
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
    textArea.width="60%";
    textArea.rows="3";

    let button = document.createElement('button');
    button.style.fontSize = "15px";
    button.style.position = "absolute";
    button.style.right = "0";
    button.setAttribute("onclick", 'removeBox("' + noteDiv.id + '")');
    button.appendChild(document.createTextNode("×"));

    subDiv.append(button);
    subDiv.appendChild(textArea);
    noteDiv.appendChild(subDiv);


    $("#pr-area-note").append(noteDiv);
    num_notes++;
  });

  $("#pr-area-hover").on("mouseenter", function(event) {
    let parentOffset = $(this).parent().offset();
    let y = event.pageY - parentOffset.top - $("h3").height();

    let reminder = document.createElement('div');
    reminder.id = "reminder";
    reminder.style.left = "0px";
    reminder.style.position = "absolute";
    reminder.style.top = y + 'px';
    reminder.style.fontSize = "30px";
    reminder.appendChild(document.createTextNode("+"));
    $("#pr-area-hover").append(reminder);
  })

  $("#pr-area-hover").on("mouseleave", function(event) {
    let element = document.getElementById("reminder");
    element.parentNode.removeChild(element);
    // $("#hover-area").removeChild("reminder");
  })
});

// Add note function (Small Reminder)
