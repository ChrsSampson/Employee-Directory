// Selectors
const contentContainer = document.getElementById('content-container');
const filter = document.getElementById('filter');
const cardContainers = contentContainer.children;

const modalContent = document.getElementById('modal-content');
const modalContainer = document.getElementById('modal-container');

const rightArrow = document.getElementById('next')
const leftArrow = document.getElementById('previous')

// Global Variables
let employees = [];

// Fetch Function
const fetchUrl = 'https://randomuser.me/api/?results=12&&nat=us'
    

// OLD ONE
fetch(fetchUrl)
    .then(res => res.json())
    .then(res => res.results)
    .then(displayEmployees)
    // .then(data => {
    //     createEmployeeObj(data)
    //     createSearchArray(data)
    // })
    .catch(error => console.warn('There was a fetch error', error));


function displayEmployees(employeeData){

    employees = employeeData;
    let employeeHTML = '';

    employees.forEach( (employee, index) => {
       let name = employee.name;
       let email = employee.email;
       let city = employee.location.city;
       let picture = employee.picture;

       employeeHTML = `
            <div class="card" data-index="${index}">
                <img class="profile-img" src="${picture.large}" />
                <div class="data-container">
                    <h2 class="name">${name.first} ${name.last}</h2>
                    <p class="email">${email}</p>
                    <p class="adress">${city}</p>
                </div>
            <div>
       `
       contentContainer.innerHTML += employeeHTML;
    });

    
}

// create array of names for the seach function
 function createSearchArray(data){
    const nameArray = [];

    let source = data.results;

    for(let i = 0; i < source.length; i++){
        let name = source[i].name["first"] + source[i].name["last"];
        nameArray.push(name);
    }
    
    console.info('CreateSearchArray Output:', nameArray)
    return nameArray;
 } 

//Search function (recieves names from createSearch Array)
function search(){
    const cardArray = contentContainer.children;
    const searchTerm = filter.value;
    for(let i = 0; i < cardArray.length; i++){
        if(cardArray[i].textContent.includes(searchTerm)){
            cardArray[i].style.display = "flex";
        }
        else if(searchTerm == ""){
            cardArray[i].style.display = "flex";
        }
        else{
            cardArray[i].style.display = "none";
        }
      
    }
    console.log(cardArray[3].textContent);    
};


//create Modal display
function displayModal(index){
  
    let {name, dob, phone, email, location: {city, street, state, postcode}, picture} = employees[index];
    let date = new Date(dob.date);
    const modalHTML = `
        <img class="modal-img" src="${picture.large}" />
        <div class="text-container">
            <h2 class="name">${name.first} ${name.last}</h2>
            <p class="email">${email}</p>
            <p class="address">${city}</p>
            <hr />
            <p>${phone}</p>
            <p class="address">${street['name']}, ${state} ${postcode}</p>
            <p>Birthday: ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
        </div>
    `;


    modalContainer.style.display = "grid";
    modalContent.innerHTML = modalHTML;
};
// Event listeners

// filter event listenter
filter.addEventListener('keyup', search);

//Used for next and precious events
 let currentIndex ='';
// modal Event listener
contentContainer.addEventListener('click', (e) =>{
    const next = document.getElementById('next');
    const previous = document.getElementById('previous');
    
    if(e.target !== contentContainer){
        let card = e.target.closest('.card');
        let index = card.getAttribute('data-index');
        currentIndex = index;
        displayModal(index);
    }

    hideBtn(currentIndex, 0, 11);
     
});


// modal close event listener
const modalClose = document.getElementById('close');

modalClose.addEventListener('click', (e)=>{
    modalContainer.style.display = "none";
});


// hide modal buttons when index is max
function hideBtn(i, min, max){
    
    if(i >= max){
        rightArrow.style.display = 'none'
    }
    else if (i == min){
        leftArrow.style.display = 'none'
    }
    else{
        rightArrow.style.display = 'block'
        leftArrow.style.display = 'block'
    }    

}



//modal next and previous
const navContainer = document.getElementById('modal-nav')

navContainer.addEventListener('click', (e)=>{
    if(e.target.id == 'right-arrow'){
        currentIndex++
        displayModal(currentIndex)
    }
   
    if(e.target.id == 'left-arrow'){
        currentIndex--
        displayModal(currentIndex)
            
    }
    
    hideBtn(currentIndex, 0, 11);

});