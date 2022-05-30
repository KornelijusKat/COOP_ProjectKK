const AddButton = document.querySelector('#Add');
const newForm = document.createElement('form');
const firstInput = document.createElement('input');
const secondInput = document.createElement('input');
const thirdInput = document.createElement('input');
const submitter = document.createElement('input');
const submitter2 = document.createElement('input');
const editForm = document.createElement('form');
const editInput1 = document.createElement('input');
const editInput2 = document.createElement('input');
const editInput3 = document.createElement('input');
const container = document.querySelector('.container');
const addformlocation = document.querySelector('#Form');
const userhead3 = document.querySelector('#ShowUser');
const logout = document.querySelector('#Logout');
let placeholder;
submitter2.setAttribute('type','submit');
submitter.setAttribute("type","submit");
//button click that shows a form to submit for posting to database
AddButton.addEventListener('click',function(event){
    addformlocation.innerHTML = "";
    createForm(submitter);
    newForm.reset();
})
logout.addEventListener('click',function(event){
  localStorage.clear();
  history.back();
})
//creates form for Add button
function createForm(submit){ 
    firstInput.placeholder = "type";
    secondInput.placeholder = "content";
    thirdInput.placeholder = "endDate";
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
          User: JSON.stringify(art[0]['name']).replaceAll('"',"") + JSON.stringify(art[0]['lastname']).replaceAll('"',"")
        })
      })
        .then((response) => {
          if (response.ok) {
            console.log('ok');
            return response.json();
         } else {
            console.log('not okay');
            alert("not all inputs have been filled entirely/correctly")
          }
        })  .then((result) => {
          console.log(result);
      })
      .then((result) => {
        addformlocation.innerHTML = "";
        container.innerHTML = "";
        ShowRecords();
     })
      .catch((err) => {
        console.log(err);  
    })  
}
//returns all records by user(ps.change filter to user)
let recordfetch;
 function GetRecordsOfUser(){
   recordfetch = fetch('https://testapi.io/api/KornelKat/resource/SecondDatabase')
        .then((res) => {
            if(res.ok){
              return res.json();
            }
          }).catch((error) => console.log(error));
        }  
//Gets Data and Shows it
function ShowRecords(){
  GetRecordsOfUser();
  recordfetch.then(result => { 
    let it = result.data.filter(({User}) => User === (JSON.stringify(art[0]['name']).replaceAll('"',"") + JSON.stringify(art[0]['lastname']).replaceAll('"',"")));
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
        const paragraph = document.createElement('p');
        buttondiv.className = 'cardbuttondiv';
        DivCard.className = 'card';
        const editButton = document.createElement('button');
        const deleteButton = document.createElement('button');
        deleteButton.addEventListener('click',function(event){
          const elementID =  this.parentNode.parentElement.id;;
          DeleteRecord(elementID,DivCard);
        });
        editButton.addEventListener('click',function(event){
          event.preventDefault();
          addformlocation.innerHTML = "";
          //const elementID = event.currentTarget.parentElement.id;
          placeholder = this.parentNode.parentElement.id;
          EditFields(placeholder);        
          submitter2.addEventListener('click',function(event){
            event.preventDefault();
            EditRecord(placeholder);
          })
        })
        console.log(element);
        paragraph.innerHTML = JSON.stringify(element)
        .replaceAll(',','<br />')
          .replaceAll('}','<br />')
            .replaceAll('{','')
              .replaceAll('[','')
                .replaceAll(']','')
                  .replaceAll('"',' ');
        editButton.className = 'recordbtn';
        editButton.innerHTML = "Edit";
        deleteButton.className = 'recordbtn2';
        deleteButton.innerHTML = 'Delete';
        buttondiv.append(editButton,deleteButton);
        DivCard.append(paragraph,buttondiv);
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
   ShowRecords();
  }
}      
// Click event that sends input values to Database
submitter.addEventListener('click', function(event){
event.preventDefault();
AddPost();
})
//Changes the selected record of user, ps(need to change the inner html part to a new created main or section maybe)
async function EditRecord(Userid){
 const editing =  await fetch(`https://testapi.io/api/KornelKat/resource/SecondDatabase/${Userid}`, {
    method: 'PUT',
    headers:{
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      'type': editInput1.value,
      'content': editInput2.value,
      'endDate' : editInput3.value,
      'User' :  (JSON.stringify(art[0]['name']).replaceAll('"',"") + JSON.stringify(art[0]['lastname']).replaceAll('"',""))
    })
  })
    if(editing){
    ShowRecords();
    }
}
ShowRecords()
//Editing form for input
function EditFields(placeholder){
cardcontent(placeholder);
editForm.append(editInput1,editInput2,editInput3,submitter2);
addformlocation.append(editForm);
}
let art = JSON.parse(localStorage.getItem("User"));
userhead3.innerHTML +=  JSON.stringify(art[0]['name']+ " " + JSON.stringify(art[0]['lastname'])).replaceAll("\\","").replaceAll('"','');
function cardcontent(eleId){ 
  GetRecordsOfUser();
  recordfetch.then(result => {
  let editingobj = result.data.filter(({id}) => id === Number(eleId)) 
  let objarray = Object.values(editingobj);
  editInput1.value = objarray[0]['type'];
  editInput2.value = objarray[0]['content'];
  editInput3.value = objarray[0]['endDate'];
  }
)}