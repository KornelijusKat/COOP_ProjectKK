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
submitter.addEventListener('click', function(event){
event.preventDefault();
AddPost();
})