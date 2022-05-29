// Login form shell
// psw inputo value
let passwords;
// get response data laiko
let getData;
  // namer bus is login inputo vardas pasiimtas
let namer;
  // cia array bus, storinti filtra;
let it;
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

const addReg = document.querySelector('#signupbtnZ');
const getReg = document.querySelector('#loginbtn');
const emailInput = document.querySelector('#email');
const nameInput = document.querySelector('#name');
const pswInput = document.querySelector('#psw');
//login inputo naujas pavadinimas(kazkodel neisejo man perduoti ta pati query, kad veiktu visi input)
const pswInputs = document.querySelector('#pasz');
// tas pats kas virsuj
const nameInputs = document.querySelector('#namez');
// Click event that sends input values to Database
addReg.addEventListener('click', function(event){
    event.preventDefault();
    namer = nameInput.value;
    pswd = pswInput.value
    AddReg(namer,pswd);
    })
//Pasitikrink, nes gali buti kad daug du kartus suveikia funckija kazkodel
function AddReg(namer,pswd){
  getUsers();
  let passFiltered
  getData.then(result => {
      
       it = result.data.filter(({name}) => name === namer);
       console.log(JSON.stringify(it)||[]);
  //poto isfiltruoja visus is array visus kurie atitinka ir passworda(jeigu butu du tie patys vardai)
  passFiltered = it.filter(({password}) => password === pswd);
  console.log(JSON.stringify(passFiltered)||[]);
})  
  if(passFiltered == null){

   
    const apiPost = fetch('https://testapi.io/api/Donciavas/resource/registration', {
        method: 'POST',
        headers: {
         'Content-type': 'application/json'
        },
       body: JSON.stringify({
          email: emailInput.value,
          name: nameInput.value,
          password: pswInput.value 
        })
      })
        .then((response) => {
          if (response.ok) {
            console.log('ok');
            return response.json();
         } else {
            console.log('not okay');
          }
        })  .then((result) => {
          let array1 = [];
          // json I array idedu nes savoj pusei isiemu per array
          array1.push(result);
          localStorage.setItem('User', JSON.stringify(array1)||[]);
          // reikejo pakeisti kad pirma i folderi eina ir tada i doithtml
            window.location.href = "./DoItApp/DoItHtml.html";
      })
      .catch((err) => {
        console.log(err);  
    })  
  }
  else{
    alert("duplicate");
  }
}

function getUsers() {

  getData = fetch('https://testapi.io/api/Donciavas/resource/registration')
  .then((response) => {
    if (response.ok) {
      console.log('ok');
      return response.json();
    } else {
      console.log('not okay');
    }
  })
  
    
        //let it = result.data.filter(({User}) => User.name === nameInput.value && User.password === pswInput.value)||[];
        //localStorage.setItem('User', JSON.stringify(it)||[]);
        // window.location.href("DoItHtml.html");
      // window.location.href = "DoItHtml.html";
      // window.location.assign("DoItHtml.html");
  

  // .then(res => render(res.data)) 
  // .then(render(users));
  .catch((error) => {
    console.log(error);  
})  
}

// Click event that gets values from Database
getReg.addEventListener('click', function(e){
  e.preventDefault();
  //paduodam musu variable 
  namer = nameInputs.value;
  passwords = pswInputs.value;
  FilterUserLogIn(namer,passwords);
  })

function render(users) {
  users.forEach(user => {
    saveData()
    })
  }
  function FilterUserLogIn(theName, thePsw){
    getUsers();
   
    getData.then(result =>{
        //render(result.data)
      
        //NAUJA, i array ideda isfiltruota name skilti is duombazes pagal logine padaryta input
        it = result.data.filter(({name}) => name === theName);
        //poto isfiltruoja visus is array visus kurie atitinka ir passworda(jeigu butu du tie patys vardai)
        let passFiltered = it.filter(({password}) => password === thePsw);
        //console.log(passFiltered);
        localStorage.setItem('User', JSON.stringify(passFiltered)||[]);
        // reikejo pakeisti kad pirma i folderi eina ir tada i doithtml
          window.location.href = "./DoItApp/DoItHtml.html";
    })
  }  