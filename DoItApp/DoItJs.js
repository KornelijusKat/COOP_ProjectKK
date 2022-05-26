const AddButton = document.querySelector('#Add');
const newForm = document.createElement('form');
const firstInput = document.createElement('input');
const secondInput = document.createElement('input');
const thirdInput = document.createElement('input');
const submitter = document.createElement('input');
const submitter2 = document.createElement('input');
const snewForm = document.createElement('form');
const sfirstInput = document.createElement('input');
const ssecondInput = document.createElement('input');
const sthirdInput = document.createElement('input');
const container = document.querySelector('.container');
const addformlocation = document.querySelector('#Form')
let placeholder;
submitter2.setAttribute('type','submit');
submitter.setAttribute("type","submit");
//button click that shows a form to submit for posting to database
AddButton.addEventListener('click',function(event){
    createForm(submitter);
})
//creates form for Add button
function createForm(submit){ 
    newForm.append(firstInput,secondInput,thirdInput,submit);
    addformlocation.append(newForm);
}
//Adds new record to users account ps(insert user value into body when localhost thing is finished)
function AddPost(){
    const apiPost = fetch('https://testapi.io/api/KornelKat/resource/SecondDatabase', {
        method: 'POST',
        headers: {
         'Content-type': 'application/json'
        },
       body: JSON.stringify({
          type: firstInput.value,
          content: secondInput.value,
          endDate: thirdInput.value, 
          User: localStorage.getItem('name','Jeff')
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
          console.log(result);
      })
      .then((result) => {
        addformlocation.innerHTML = "";
        container.innerHTML = "";
        GetRecordsOfUser()
     })
      .catch((err) => {
        console.log(err);  
    })  
}
//returns all records by user(ps.change filter to user)
function GetRecordsOfUser(){
    fetch('https://testapi.io/api/KornelKat/resource/SecondDatabase')
        .then((res) => {
            if(res.ok){
              return res.json();
            }
          })
          .then(result => { 
              let it = result.data.filter(({User}) => User === GetUser() )||[];
              container.innerHTML = "";
              addformlocation.innerHTML = "";
              CreateDiv(it);
        })
       }  
//creates Div cards
function CreateDiv(Records){
    Records.forEach(element => {
        const DivCard = document.createElement('div');
        const buttondiv = document.createElement('div');
        buttondiv.className = 'cardbuttondiv';
        DivCard.className = 'card';
        const editButton = document.createElement('button');
        const deleteButton = document.createElement('button');
        deleteButton.addEventListener('click',function(event){
          const elementID = event.currentTarget.parentElement.id;
          DeleteRecord(elementID,DivCard);
        });
        editButton.addEventListener('click',function(event){
          event.preventDefault();
          const elementID = event.currentTarget.parentElement.id;
          placeholder = elementID;
          EditFields();
          submitter2.addEventListener('click',function(event){
            event.preventDefault();
            console.log(placeholder);
            EditRecord(placeholder);
          })
        })
        console.log(element);
        const myobjarr = JSON.stringify(element); 
        DivCard.innerHTML = JSON.stringify(element).replaceAll(',','<br />').replaceAll('}','<br />').replaceAll('{','');
        editButton.className = 'recordbtn';
        editButton.innerHTML = "Edit";
        deleteButton.className = 'recordbtn2';
        deleteButton.innerHTML = 'Delete';
        
        DivCard.append(buttondiv,editButton,deleteButton);
        DivCard.setAttribute('id',element.id);
        
        container.append(DivCard)});
}  
//Deletes selected div card
async function DeleteRecord(RecordID,DivCard){
  const deleter = await fetch(`https://testapi.io/api/KornelKat/resource/SecondDatabase/${RecordID}`,{
    method:'DELETE',
    headers:{
      'content-type': 'application/json'
    },
  })
  if(deleter){
    // DivCard.innerHTML ="";
    // DivCard.style.border ="none";
    GetRecordsOfUser();
  }
}      
// Click event that sends input values to Database
submitter.addEventListener('click', function(event){
event.preventDefault();
AddPost();
})
//Changes the selected record of user, ps(need to change the inner html part to a new created main or section maybe)
async function EditRecord(Userid){
 const editing =  await fetch(`https://testapi.io/api/KornelKat/resource/SecondDatabase/` + Userid, {
    method: 'PUT',
    headers:{
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      'type': sfirstInput.value,
      'content': ssecondInput.value,
      'endDate' : sthirdInput.value,
      'User' : localStorage.getItem('name')
    })
  })
  if(editing){
   
    GetRecordsOfUser();
  }
}
GetRecordsOfUser()
//Editing form for input
function EditFields(){
snewForm.append(sfirstInput,ssecondInput,sthirdInput,submitter2);
addformlocation.append(snewForm);
}
//returns user from localstorage(also maybe need to change name part if doesnt get localstorage item)
function GetUser(){
  const getName = localStorage.getItem('name');
  return getName;
}
//uncomment this one if you want to test but no item localstorage
localStorage.setItem('name','Jeff');