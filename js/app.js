// Selectors
const mainContainer = document.getElementById('content-container');
const filter = document.getElementById('filter');
const cardContainers = mainContainer.children;
// Fetch Function
const fetchUrl = 'https://randomuser.me/api/?results=12'
    

// OLD ONE
fetch(fetchUrl)
    .then(res => res.json())
    .then(data => {
        createCards(data)
        createSearchArray(data)
    })
    .catch(error => console.warn('There was a fetch error', error));


// Test function to test the grid
// for(let i=0; i < 12; i++){
//     const cardContainer = document.createElement('div');
//     cardContainer.className = "card";
//     cardContainer.innerHTML = `<a>card title</a>`;
//     mainContainer.appendChild(cardContainer);
// }

// Loop Create cards Looping through fetch data
function createCards(data){
    //format data
    console.info(data);
    const array = data.results;

    for(let i = 0; i < array.length; i++){
        //Create Card container (grid child)
        const cardContainer = document.createElement('div');
        cardContainer.className = "card";
        //Construct Contents of card
        cardContainer.innerHTML = `
            <div class="img-container">
                <img src="${array[i].picture['medium']}">
            </div>
            <div class="data-container">
                <a>${array[i].name['first']} ${array[i].name['last']}</a>
                <span>${array[i].email}</span>
                <span>${array[i].location['city']}, ${array[i].location['state']}</span>
            </div>
        `;
        // Add card to the Grid Container
        mainContainer.appendChild(cardContainer);
    }
}

// create array of names for the seach function
 function createSearchArray(data){
    const nameArray = [];

    let source = data.results;

    for(let i = 0; i < source.length; i++){
        let name = source[i].name["first"] + source[i].name["last"];
        nameArray.push(name);
    }
    
    console.info('Create Name Array:', nameArray)
    return nameArray;
 } 

//Search function (recieves names from createSearch Array)
function search(){
    const cardArray = mainContainer.children;
    const searchTerm = filter.value;
    for(let i = 0; i < cardArray.length; i++){
        if(cardArray[i].textContent.includes(searchTerm)){
            cardArray[i].style.display = "block";
        }
        else if(searchTerm == ""){
            cardArray[i].style.display = "block";
        }
        else{
            cardArray[i].style.display = "none";
        }
      
    }
    console.log(cardArray[3].textContent);    
}


//create Modal display
function modal(target){
    console.log(target);
    const modalContent = document.getElementById('modal-content');
}


// Event listeners
filter.addEventListener('keyup', search);

mainContainer.addEventListener('click', (e) =>{
    console.log(e.target);
    if(e.target !== mainContainer){
        let card = e.target.closest('.card');
        let cardContent = card.getAttribute();
        console.log(cardContent);
    }    
});