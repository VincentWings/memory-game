// Initialize variables
// moves is a counter for the number of moves taken
let moves = 0;
// result is a DOM element with the id "result"
let result = document.querySelector('#result');

// cardsArray is an array of objects representing the cards in the game
// each object has a name and color property
const cardsArray = [{
        name: 'star',
        color: '#ffd166'
    },
    {
        name: 'star',
        color: '#ffd166'
    },
    {
        name: 'car',
        color: '#92140c'
    },
    {
        name: 'car',
        color: '#92140c'
    },
    {
        name: 'bicycle',
        color: '#679436'
    },
    {
        name: 'bicycle',
        color: '#679436'
    },
    {
        name: 'sailboat',
        color: '#607d8b'
    },
    {
        name: 'sailboat',
        color: '#607d8b'
    },
    {
        name: 'key',
        color: '#e07a5f'
    },
    {
        name: 'key',
        color: '#e07a5f'
    },
    {
        name: 'fish',
        color: '#118ab2'
    },
    {
        name: 'fish',
        color: '#118ab2'
    }
]

// boardDisplay is a DOM element with the class "board"
let boardDisplay = document.querySelector('.board');

// flippedCard is an array with the same length as cardsArray, initialized with all values set to false
let flippedCard = new Array(cardsArray.length).fill(false);
// cardsChosenName is an empty array to store the names of flipped cards
let cardsChosenName = [];
// cardsChosenID is an empty array to store the ids of flipped cards
let cardsChosenID = [];
// cardsMatching is an empty array to store matching card ids
let cardsMatching = [];

// createBoard is a function that creates and displays a card for a given card object and id
function createBoard(card, id) {
    // create a div element to represent the card
    const card_div = document.createElement('div');
    // add the card, fa-solid, and fa-question classes to the div element
    card_div.classList.add('card', 'fa-solid', 'fa-question');
    // set the id attribute of the div element to the given id
    card_div.setAttribute('id', id);
    // append the div element to the boardDisplay element
    boardDisplay.appendChild(card_div);

    // add a click event listener to the card_div element that calls the flipCard function with the card's id as an argument
    card_div.addEventListener('click', () => flipCard(card_div.id));
}

// shuffle the cardsArray and create a game board with the shuffled cards
cardsArray.sort(() => 0.5 - Math.random());
cardsArray.forEach((card, index) => createBoard(card, index));

// cards is a NodeList of all elements with the class "card"
const cards = document.querySelectorAll('.card');

// addStar is a function that returns a string of star characters based on the number of moves taken
function addStar() {
    let numberOfStars = 0;
    
    // if the number of moves is less than 30, return 3 stars
    if (moves < 30) {
        numberOfStars = '⭐ ⭐ ⭐';
    } 
    // if the number of moves is less than 40, return 2 stars
    else if (moves < 40) {
        numberOfStars = '⭐ ⭐';
    } 
    // if the number of moves is equal to or greater than 40, return 1 star
    else {
        numberOfStars = '⭐';
    }

    // return the number of stars as a string
    return numberOfStars;
}

// finalMessage is a function that displays a message when all cards have been matched
function finalMessage() {
    // create a string with a congratulations message and the number of stars returned by the addStar function
    let resultMessage_p = `
        <span class="congratulations">Congratulations!</span>
        <span class="stars">${addStar()}</span>`
    ;
    // set the innerHTML of the boardDisplay element to the resultMessage_p string
    boardDisplay.innerHTML = resultMessage_p;
}

// resetCards is a function that resets the state of flipped cards
function resetCards() {
    // loop through each card id in the cardsChosenID array
    cardsChosenID.forEach(cardID => {
        // get the element with the matching id
        const cardEl = document.getElementById(cardID);
        // toggle the fa-question and fa-name classes for the card element
        cardEl.classList.toggle('fa-question');
        cardEl.classList.toggle(`fa-${cardsArray[cardID].name}`);
        // remove the style attribute from the card element
        cardEl.removeAttribute('style');
        // set the corresponding index of the flippedCard array to false
        flippedCard[cardID] = false;
    });

    // reset the cardsChosenID and cardsChosenName arrays to empty
    cardsChosenID = [];
    cardsChosenName = [];
}

// checkCards is a function that checks if the two flipped cards match
function checkCards() {
    // if the names of the two flipped cards match
    if (cardsChosenName[0] == cardsChosenName[1]) {
        // add the "hide" class to the two flipped cards to hide them
        cards[cardsChosenID[0]].classList.add('hide');
        cards[cardsChosenID[1]].classList.add('hide');
        // remove the click event listener from the two flipped cards to prevent them from being clicked again
        cards[cardsChosenID[0]].removeEventListener('click', flipCard);
        cards[cardsChosenID[1]].removeEventListener('click', flipCard);

        // add the card id's to the cardsMatching array
        cardsMatching.push(cardsChosenID[0]);
        cardsMatching.push(cardsChosenID[1]);

        // reset the cardsChosenName and cardsChosenID arrays to empty
        cardsChosenName = [];
        cardsChosenID = [];
    } 
    // if the two flipped cards do not match
    else {
        // wait 500ms before calling the resetCards function
        setTimeout(resetCards, 500);
    }

    // if all cards have been matched
    if (cardsMatching.length === cardsArray.length) {
        // call the finalMessage function
        finalMessage();
    }
}

// flipCard is a function that flips a card and updates the game state
function flipCard(cardID) {
    // if the card is already matched, or if there are already two flipped cards, or if the card was just flipped
    if (cardsMatching.includes(cardID) || cardsChosenID.length >= 2 || cardsChosenID.includes(cardID)) {
        // return immediately to exit the function
        return;
    }

    // increment the number of moves by 1
    moves += 1;
    // update the number of moves displayed on the page
    result.innerHTML = moves;

    // get the card element with the given id
    const cardEl = document.getElementById(cardID);
    // get the card object with the given id
    const cardObject = cardsArray[cardID];

    // toggle the fa-question and fa-name classes on the card element
    cardEl.classList.toggle('fa-question');
    cardEl.classList.toggle(`fa-${cardObject.name}`);
    // set the background color of the card element to the color of the card object
    cardEl.style.backgroundColor = `${cardObject.color}`;

    // if the card is already flipped
    if (flippedCard[cardID]) {
        // remove the background color from the card element
        cardEl.removeAttribute('style');
        // update the flippedCard array to indicate that the card is not flipped
        flippedCard[cardID] = false;
    } 
    // if the card is not already flipped
    else {
        // set the background color of the card element to the color of the card object
        cardEl.style.backgroundColor = `${cardObject.color}`;
        // update the flippedCard array to indicate that the card is flipped
        flippedCard[cardID] = true;
    }

    // add the id of the card to the cardsChosenID array
    cardsChosenID.push(cardID);
    // add the name of the card to the cardsChosenName array
    cardsChosenName.push(cardObject.name);

    // if two cards have been flipped
    if (cardsChosenName.length === 2) {
        // wait 500ms before calling the checkCards function
        setTimeout(checkCards, 500);
    }
}
