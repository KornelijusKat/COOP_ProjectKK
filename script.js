// Login form shell

// Get the modal
var modal = document.getElementById('logindiv');

// let loginButton = document.querySelector("#loginbtn");  loginButton.style.position = "absolute";
// loginButton.style.left = "47%";
// loginButton.style.transform = "translateX(-50%)";

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Registration form shell

// Get the modal
var modal2 = document.getElementById('regdiv');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal2) {
    modal2.style.display = "none";
  }
}

// let registrationButton = document.querySelector("#signupbtn");  registrationButton.style.position = "absolute";
// registrationButton.style.left = "53%";
// registrationButton.style.transform = "translateX(-50%)";
function saveData()
{
let email,name,psw;

email = document.getElementById("email").value;
name = document.getElementById("name").value;
psw = document.getElementById("psw").value;

let user_records=new Array();
user_records=JSON.parse(localStorage.getItem("users"))?JSON.parse(localStorage.getItem("users")):[]
if (user_records.some((v) => {return v.email==email}))
{
  alert("duplicate data");
}
else
{
  user_records.push({
  "email":email,
  "name":name,
  "psw":psw
})
localStorage.setItem("users",JSON.stringify(user_records));
}
}