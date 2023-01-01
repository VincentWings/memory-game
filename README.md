# Memory Card Game

This is a JavaScript app that creates a memory card game. The app includes the following features:

- Creates a game board by shuffling and displaying the cards contained in the cardsArray array.
- Displays the cards as div elements with the card class and an id attribute corresponding to their index in the array.
- Calls the flipCard function with the card's id as an argument when a card is clicked.
- Hides and adds matching cards to the cardsMatching array.
- Resets flipped cards if they do not match.
- Calls the finalMessage function if the length of the cardsMatching array is equal to the length of the cardsArray array.
- Displays a congratulations message along with a number of stars based on the number of moves taken to win the game.
- Flips over any flipped cards and resets the cardsChosenName and cardsChosenID arrays.
- Compares the names of the two flipped cards and calls the appropriate functions based on whether or not they match.
- Flips the card with the specified id by toggling the fa-question and fa- class and changing the card's color. It also updates the cardsChosenName and cardsChosenID arrays and calls the checkCards function.
