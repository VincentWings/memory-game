/*
 * Create a list that holds all the cards
 */

/* Create the icons */
const icons = [
    'fa-diamond','fa-diamond',
    'fa-plane','fa-plane',
    'fa-anchor','fa-anchor',
    'fa-bolt','fa-bolt',
    'fa-car','fa-car',
    'fa-motorcycle','fa-motorcycle',
    'fa-bicycle','fa-bicycle',
    'fa-star','fa-star',
];


/* Cards Container : Deck */
const deck = document.querySelector('.deck');

/* OpenedCards container */
let openedCards = [];

/* MatchedCards container */
let matchedCards = [];


/*
 * Create the Timer
 */

let gameTimer = document.querySelector('.gametimer');
let hour = 0;
let min = 0;
let sec = 0;
let interval;

// Start the timer
function startTimer () {
    interval = setInterval(() => {
        gameTimer.innerHTML = `${hour}h ${min}min ${sec}sec`;
        sec++;
        if(sec == 60) {
            min++;
            sec = 0;
        }
        if(min == 60) {
            hour++;
            min = 0;
        }
        console.log(gameTimer);
    },1000);
}


/*
 * Initialize the game
 */

function initGame() {

    // Mix the cards
    shuffle(icons);

    // Create the cards
    for(let i = 0; i < icons.length; i++) {
        const card = document.createElement('li');
        card.classList.add('card');
        card.innerHTML = `<i class="fa ${icons[i]}"></i>`;
        deck.appendChild(card);
    
        // Call the click function for each cards
        click(card);
    }

    // Reset the timer
    gameTimer.innerHTML = "0h 0min 0sec";
    clearInterval(interval);

}


/*
 * Restart the game
 */

function restartTheGame() {

    // Remove all cards from the deck
    deck.innerHTML = '';

    // Reset the game
    initGame();

    // Empty all variables
    openedCards = [];
    matchedCards = [];

    // Reset moves and moves container to 0
    moves = 0;
    movesContainer.innerHTML = 0;

    // Reset the starContainer
    starsContainer.innerHTML = starYellow + starYellow + starYellow;
    popupStars.innerHTML = starsContainer;

}


/*
 * Click event function to test if cards are matching
 */

function click(card) {

    /* If a card is clicked */
    card.addEventListener('click', function() {

        // Current card
        const currentCard = this;
        // Previous card
        const previousCard = openedCards[0];

        // If there is one opened card
        if(openedCards.length === 1) {

            // Send the card to the opened card container
            openedCards.push(currentCard);
    
            // Add the class open and show to the card
            card.classList.add('open','show','disable');

            // Check if the two cards are matching
            isMatching(currentCard,previousCard);

        // If there isn't any card
        } else {
            currentCard.classList.add('open','show','disable');
            openedCards.push(this);
        }

    });
}


/*
 * Shuffle function
 */

/* Shuffle function from http://stackoverflow.com/a/2450976 */
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * Start the game
 */

initGame();


/*
 * Check if the two cards are matching
 */

function isMatching(currentCard,previousCard) {

    // Add 1 move
    addMove();
    
    // Compare the two opened cards
    if(currentCard.innerHTML === previousCard.innerHTML) {

        // add the class match to the cards
        currentCard.classList.add('match');
        previousCard.classList.add('match');

        // add the cards in the matched container
        matchedCards.push(currentCard, previousCard);

        // Empty the openedCards container
        openedCards = [];

        // Check if the game is the game is finished
        isOver();


    } else {

        // Add delay and...
        setTimeout(() => {

            // Remove the class open and show to the cards
            currentCard.classList.remove('open','show','disable');
            previousCard.classList.remove('open','show','disable');
            
        }, 500);

        // Empty the openedCards container
        openedCards = [];

    }

}

/*
 * Add moves
 */

// Moves container
const movesContainer = document.querySelector('.moves');
movesContainer.innerHTML = 0;

// Number of moves
let moves = 0;

// Add moves
function addMove() {

    /* Add 1 move */
    moves++;
    movesContainer.innerHTML = moves;

    // Start the timer on the first move
    if(moves == 1) {
        hour = 0;
        min = 0;
        sec = 0;
        startTimer();
    }

    // Set the rating
    rating();

}

/*
 * Score
 */

// Stars container
const starsContainer = document.querySelector('.stars');

// Star
const starBlack = '<i class="fa fa-star fa-star-black"></i>';
const starYellow = '<i class="fa fa-star fa-star-yellow"></i>';

function rating() {

    if (moves <= 8) {
        starsContainer.innerHTML = starYellow + starYellow + starYellow;
    } else if (moves > 8 && moves <= 12 ) {
        starsContainer.innerHTML = starYellow + starYellow + starBlack;
    } else {
        starsContainer.innerHTML = starYellow + starBlack + starBlack;
    }

}


/*
 * Restart the game
 */

// Restart button
const restart = document.querySelector('.restart');

// When the Restart button is clicked
restart.addEventListener('click', function() {
    restartTheGame ();
});


/*
 * Create the popup
 */

const popup = document.querySelector('.popup');
const popupClose = document.querySelector('.close');
const popupText = document.querySelector('.popup__text');
const popupBtn = document.querySelector('.popup__btn');

const popupStars = document.querySelector('.popup .stars')

/* When the close button is clicked */
popupClose.addEventListener('click', function() {
    /* Hide the popup */
    popup.classList.add('hide');
});

/* When the "Try again" button is clicked */
popupBtn.addEventListener('click', function() {
    /* Hide the popup */
    popup.classList.add('hide');
    /* Restart the game*/
    restartTheGame ();
});


/*
 * End the game
 */

function isOver() {
    if (icons.length === matchedCards.length) {

        // Clear the timer
        clearInterval(interval);

        // Congratulations message
        popupText.innerHTML = `
        <p>Congratulations!</p>
        <p>You made ${moves} moves in ${gameTimer.innerHTML}!</p>
        <p>Would you like to play again?</p>
        `;

        popupStars.innerHTML = starsContainer.innerHTML;
        popup.classList.remove('hide');

    }
}

