
// lastname inputo value
let lastnames;
// get response data laiko
let getData;
  // namer bus is login inputo vardas pasiimtas
let namer;
  // cia array storinti filtra;
let it;
// Get the modal of login
var modal = document.getElementById('logindiv');

// When the user clicks anywhere outside of the modal, closes it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Get the modal of registration
var modal2 = document.getElementById('regdiv');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal2) {
    modal2.style.display = "none";
  }
}

const addReg = document.querySelector('#signUpBtn');
const getReg = document.querySelector('#loginBtn');
const emailInput = document.querySelector('#email');
const nameInput = document.querySelector('#regName');
const pswInput = document.querySelector('#regLastname');
//login inputo naujas pavadinimas(kazkodel neisejo man perduoti ta pati query, kad veiktu visi input)
const pswInputs = document.querySelector('#loginLastname');
// tas pats kas virsuj
const nameInputs = document.querySelector('#loginName');
// Click event that sends input values to Database
addReg.addEventListener('click', function(event){
    event.preventDefault();
    namer = nameInput.value;
    pswd = pswInput.value
    AddReg(namer,pswd);
    })

function AddReg(namer,pswd){
  getUsers();
  let passFiltered
  getData.then(result => {
      
       it = result.data.filter(({name}) => name === namer);
       console.log(JSON.stringify(it)||[]);
  //poto isfiltruoja visus is array visus kurie atitinka ir passworda(jeigu butu du tie patys vardai)
  passFiltered = it.filter(({lastname}) => lastname === pswd);
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
          lastname: pswInput.value 
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
          array1.push(result);
          localStorage.setItem('User', JSON.stringify(array1)||[]);
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
  .catch((error) => {
    console.log(error);  
})  
}

// Click event that gets values from Database
getReg.addEventListener('click', function(e){
  e.preventDefault(); 
  namer = nameInputs.value;
  lastnames = pswInputs.value;
  FilterUserLogIn(namer,lastnames);
  })

  function FilterUserLogIn(theName, thePsw){
    getUsers();
    getData.then(result =>{
        it = result.data.filter(({name}) => name === theName);
        let passFiltered = it.filter(({lastname}) => lastname === thePsw);
        if(passFiltered == undefined || passFiltered.length === 0) {
          alert("Your user doesn't exist");
        }
        else{
        localStorage.setItem('User', JSON.stringify(passFiltered)||[]);
        window.location.href = "./DoItApp/DoItHtml.html";
        }
    })
  } 
  function validEmail()
{
var mail = document.getElementById('email').value;
var email = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;

  if (!(mail.match(email)))
  {
      alert("Wrong email!");
      window.location.reload();
  } 
} 