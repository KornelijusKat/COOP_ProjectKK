// Login form shell

// Get the modal
var modal = document.getElementById('id01');

let myloginButton = document.querySelector("#loginbtn");  myloginButton.style.position = "absolute";
myloginButton.style.left = "47%";
myloginButton.style.transform = "translateX(-50%)";

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Registration from shell

// Get the modal
var modal2 = document.getElementById('id02');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal2) {
    modal2.style.display = "none";
  }
}

let registrationButton = document.querySelector("#signupbtn");  registrationButton.style.position = "absolute";
registrationButton.style.left = "53%";
registrationButton.style.transform = "translateX(-50%)";
