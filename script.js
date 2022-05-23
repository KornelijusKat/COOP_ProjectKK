// Get the modal
var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
    let myButton = document.querySelector("#loginbtn");  myButton.style.position = "absolute";
myButton.style.left = "50%";
myButton.style.transform = "translateX(-50%)";
}