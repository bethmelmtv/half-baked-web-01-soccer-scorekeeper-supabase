import { 
    logout, 
    checkAuth,
    getGames,
    createGame,
} from '../fetch-utils.js';

import { renderGame } from '../render-utils.js';

const currentGameEl = document.getElementById('current-game-container');
const pastGamesEl = document.getElementById('past-games-container');
const logoutButton = document.getElementById('logout');

const nameForm = document.getElementById('name-form');
const teamOneAddButton = document.getElementById('team-one-add-button');
const teamTwoAddButton = document.getElementById('team-two-add-button');
const teamOneSubtractButton = document.getElementById('team-one-subtract-button');
const teamTwoSubtractButton = document.getElementById('team-two-subtract-button');
const finishGameButton = document.getElementById('finish-game-button');
const teamOneLabel = document.getElementById('team-one-name');
const teamTwoLabel = document.getElementById('team-two-name');

checkAuth();



let name1 = '';
let name2 = '';
let score1 = 0;
let score2 = 0;



nameForm.addEventListener('submit', (e) => {
    e.preventDefault();
     // get the name data from the form
    const formData = new FormData(nameForm);

    // get the name data from the form
    const nameInputOne = formData.get('team-one');
    const nameInputTwo = formData.get('team-two');

 // set the state to this data from the form
    name1 = nameInputOne;
    name2 = nameInputTwo;

    // reset the form values
    nameForm.reset();

    displayCurrentGameEl();
});




teamOneAddButton.addEventListener('click', () => {
    // increment the current state for team one's score
    score1++;
    displayCurrentGameEl();
});

teamTwoAddButton.addEventListener('click', () => {
    // increment the current state for team two's score
    score2++;
    displayCurrentGameEl();
});

teamOneSubtractButton.addEventListener('click', () => {
    // decrement the current state for team one's score
    score1--;

    displayCurrentGameEl();
});

teamTwoSubtractButton.addEventListener('click', () => {
    // decrement the current state for team two's score
    score2--;
    displayCurrentGameEl();
});




finishGameButton.addEventListener('click', async() => {
    // create a new game using the current game state
    
    // after creating this new game, re-fetch the games to get the updated state and display them (hint: call displayAllGames())
            
    name1 = '';
    name2 = '';
    score1 = 0;
    score2 = 0;

    displayCurrentGameEl();
});



logoutButton.addEventListener('click', () => {
    logout();
});




 // on load . . .
window.addEventListener('load', async() => {
    // display all past games (hint: call displayAllGames())
    displayAllGames();
});


function displayCurrentGameEl() {
    // clear out the current game div
    currentGameEl.textContent = '';
    // change the label to show team one's name;
    // change the label to show team two's name;
    teamOneLabel.textContent = name1;
    teamTwoLabel.textContent = name2; 

    const newGame = {
        name1: name1, 
        name2: name2,
        score1: score1,
        score2: score2,
        //first name1 is referring from the table, second name1 is referring to 
    };
    // call the render game function to create a game element
    const gameEl = renderGame(newGame);
    // append the element to the cleared out current game div
    currentGameEl.append(gameEl);
}



async function displayAllGames() {
    // clear out the past games list in the DOM
    pastGamesEl.textContent = '';
    // FETCH ALL GAMES from supabase
    const pastGamesArray = await getGames();
    // loop through the past games 
    console.log(pastGamesArray);
    for (let x of pastGamesArray) {
        const pastGameEl = renderGame(x);
        pastGamesEl.append(pastGameEl);
    }
    return pastGamesEl;
    // render and append a past game for each past game in state
}
displayAllGames();
displayCurrentGameEl();
