# Memory Card Game  

[Play the Game](https://vincentwings.github.io/memory-game/)  

This project is a digital **Memory Card Game** developed in JavaScript, where the player is tasked with matching pairs of cards by flipping them over. The game includes a shuffle feature and provides real-time feedback as the player progresses.

## Features  

- **Card Shuffling**: The game board is dynamically created by shuffling the cards in the `cardsArray` array.  
- **Interactive Gameplay**: Cards are displayed as `div` elements, with each card having a unique id that corresponds to its position in the array.  
- **Card Flipping Logic**: Players can click on cards to flip them, triggering the `flipCard` function and comparing them for matching pairs.  
- **Matching and Resetting**: If two flipped cards match, they are added to the `cardsMatching` array; otherwise, they are reset.  
- **Game Completion**: Once all pairs are matched, a congratulatory message is displayed, showing the number of moves taken to win and awarding stars based on performance.  
- **Dynamic UI Updates**: Cards are flipped by toggling classes and changing colors. The `cardsChosenName` and `cardsChosenID` arrays are updated, and the game checks for matches after each flip.  

## Technologies Used  

- **HTML5**: Page structure and layout of the game board.  
- **CSS3**: Styling and visual effects for the cards and game UI.  
- **JavaScript (Vanilla)**: Implements game logic including card flipping, shuffling, matching, and tracking the number of moves.  

## How It Works  

1. The game starts by creating a shuffled set of cards based on the `cardsArray` array and displaying them on the game board.  
2. Each card is assigned an id that allows it to be tracked and manipulated during the game.  
3. When a player clicks a card, the `flipCard` function is triggered, revealing the card and adding it to the `cardsChosenName` and `cardsChosenID` arrays.  
4. The game compares the flipped cards to check if they match. If they do, they are added to the `cardsMatching` array; otherwise, they are flipped back.  
5. When all cards are matched, a congratulations message is displayed along with a star rating based on the number of moves taken to win.  
6. The game resets flipped cards and continues the process until all pairs are matched.  

## Skills Demonstrated  

- **JavaScript Logic**: Handling arrays, functions, and conditional statements to manage the game flow.  
- **Event Handling**: Using event listeners to trigger actions based on user input (card clicks).  
- **UI/UX**: Providing real-time visual feedback and updates to enhance user experience.  

This project demonstrates how to build an interactive and engaging memory game using vanilla JavaScript, with a focus on logic, functionality, and user interface design. 🎮
