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
let placeholder;
submitter2.setAttribute('type','submit');
submitter.setAttribute("type","submit");
//button click that shows a form to submit for posting to database
AddButton.addEventListener('click',function(event){
    event.preventDefault();
    createForm(submitter);
})
//creates form for Add button
function createForm(submit){ 
    newForm.append(firstInput,secondInput,thirdInput,submit);
    document.body.append(newForm);
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
      .then((result) =>{
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
              let it = result.data.filter(({type}) => type === 'Jamaica' )||[];
              CreateDiv(it);
        })
       }  
//creates Div cards
function CreateDiv(Records){
    Records.forEach(element => {
        const DivCard = document.createElement('div');
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
        DivCard.innerHTML = JSON.stringify(element); 
        DivCard.append(editButton,deleteButton);
        DivCard.setAttribute('id',element.id);
        document.body.append(DivCard)});
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
    DivCard.innerHTML = "";
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
      'endDate' : sthirdInput.value
    })
  })
  if(editing){
    document.body.innerHTML = "";
    GetRecordsOfUser();
  }
}

GetRecordsOfUser();
//Editing form for input
function EditFields(){
snewForm.append(sfirstInput,ssecondInput,sthirdInput,submitter2);
document.body.append(snewForm);
}
