const AddButton = document.querySelector('#Add');
const newForm = document.createElement('form');
const firstInput = document.createElement('input');
const secondInput = document.createElement('input');
const thirdInput = document.createElement('input');
const submitter = document.createElement('input');

submitter.setAttribute("type","submit");
AddButton.addEventListener('click',function(event){
    event.preventDefault();
    createForm();
})
function createForm(){ 
    newForm.append(firstInput,secondInput,thirdInput,submitter);
    document.body.append(newForm);
}
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
function CreateDiv(Records){
    Records.forEach(element => {
        const DivCard = document.createElement('div');
        const editButton = document.createElement('button');
        const deleteButton = document.createElement('button');
        deleteButton.addEventListener('click',function(event){
          const elementID = event.currentTarget.parentElement.id;
          DeleteRecord(elementID,DivCard);
        })
        console.log(element);
        DivCard.innerHTML = JSON.stringify(element); 
        DivCard.append(editButton,deleteButton);
        DivCard.setAttribute('id',element.id);
        document.body.append(DivCard)});
}  
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
submitter.addEventListener('click', function(event){
event.preventDefault();
AddPost();
})
GetRecordsOfUser();