
// Only characters allowed to use as valid inputs.
//var letters = /^[A-Za-z]+$/;
var letters = /[A-Za-z]/;

var pokerTerms = {
    wins:  0,
    losses:  0,
    livesRemaining: 0,
    displayArray: [],
    lettersUsed: [],
    targetWord: "",
    targetWordArray: [],
    isCorrect: false,
    gameEnded: false,
    termsList: ['straight', 'flush', 'ace in the hole', 'dealer', 'blinds', 'bad beat', 'big blind', 'small blind', 'donkey', 'heads up',
    'pocket rockets', 'raise', 'the nuts', 'royal flush', 'kicker', 'gutshot', 'under the gun', 'short stack', 'side pot', 'straddle'],


    //picks term from the list
    selectTerm: function() {
        this.targetWord = this.selectRandomWord();  // select random word
        this.targetWordArray = this.targetWord.split("");
        console.log(this.targetWordArray);

        // update the blanks on display word
        this.displayArray = [];
        this.updateDisplayArray("_");
        this.lettersUsed = [];
        this.livesRemaining = 10;
        this.gameEnded = false; // reset

        // set initial values
        document.getElementById('wins').innerHTML = this.wins;
        document.getElementById('losses').innerHTML = this.losses;
        document.getElementById('livesRemaining').innerHTML = this.livesRemaining;
        document.getElementById('guess-word').innerHTML = this.displayArray.join(" ");
        document.getElementById('letters-used').innerHTML = this.lettersUsed.join(" ");
        document.getElementById('start-message').innerHTML = "Press a letter key to start";
        document.getElementById('message').innerHTML = "";
    },

    selectRandomWord: function(){
        return this.termsList[Math.floor(Math.random() * this.termsList.length)].toUpperCase();
    },

    updateDisplayArray: function(letter){
        var displayArray = this.displayArray;
        // if underscore is passed, initialize display word with underscores
        if(letter === "_"){
            for (var i = 0; i < this.targetWordArray.length; i++) {
                if(this.targetWordArray[i] === " "){
                    displayArray[i] = " ";
                }
                else{
                    displayArray[i] = "_";
                }
            }
        }
        else {
            for (var j = 0; j < this.targetWordArray.length; j++) {

                if (this.targetWordArray[j] === letter) {
                    displayArray[j] = letter;
                }
            }
        }
        return displayArray;

    },

    validateInput: function(userInput, inputCode){
        // check if need to start a new game
        if(this.gameEnded === true){
            this.selectTerm();
        }
        else{
            if(inputCode > 64 && inputCode < 91){
                // check if it's a valid letter
                if(letters.test(userInput)){
                    // check if letter was already selected
                    userInput = userInput.toUpperCase();
                    if (this.lettersUsed.indexOf(userInput) == -1 ) {
                        // letter was not used. add to list of used letters
                        //this.lettersUsed += userInput;
                        this.lettersUsed.push(userInput);

                        if (this.targetWord.indexOf(userInput) != -1) {
                            // console.log("Correct");
                            this.displayArray = this.updateDisplayArray(userInput);
                            this.isCorrect = true;
                        }
                        else {
                            // console.log("Wrong");
                            this.livesRemaining -= 1;
                            this.isCorrect = false;
                        }

                        this.refreshRound(this.isCorrect);
                    }
                }
            }
        }
    },

    refreshRound: function(isCorrect){
        if (isCorrect) {
            document.getElementById('guess-word').innerHTML = this.displayArray.join(" ");
        }
        else {
            document.getElementById('livesRemaining').innerHTML = this.livesRemaining;
        }

        document.getElementById('letters-used').innerHTML = this.lettersUsed.join(" ");

        if (this.targetWord.split("").toString() === this.displayArray.toString()) {
                this.endRound(true);  // win
        }
        else if (this.livesRemaining == 0) {
                this.endRound(false); // lose
        }
    },

    endRound: function(winlose){
        if(winlose){
            this.wins += 1;
            document.getElementById('message').innerHTML = "YOU WIN!";
        }
        else{
            this.losses += 1;
            document.getElementById('message').innerHTML = "YOU LOSE!";
        }
        this.gameEnded = true;
        document.getElementById('start-message').innerHTML = "Press any key to start";
        document.getElementById('wins').innerHTML = this.wins;
        document.getElementById('losses').innerHTML = this.losses;
        //pokerTerms.startRound();
    }

};

// get new word and start game
pokerTerms.selectTerm();

//var userInput;

document.onkeyup = function (event) {
    console.log(event.key);
    document.getElementById('start-message').innerHTML = "";
    pokerTerms.validateInput(event.key, event.keyCode);
    /*userInput = event.key;
    if(letters.test(userInput)){
        console.log(userInput);
        pokerTerms.validateInput(userInput);
    }*/
};

/*
document.onkeyup = function (event) {
    var userInput = String.fromCharCode(event.key).toUpperCase();
};
*/
/*function startNewGame(){
    window.addEventListener("keydown", function(event) {
        console.log("KEYCODE: " + event.keyCode);
        if(event.keyCode == 13){
            //console.log("Enter key pressed");
            // Pick a random word
            hangman.newWord = hangman.wordbankArray[Math.floor(Math.random() * hangman.wordbankArray.length)];

            // Set up the answer array
            for (var i = 0; i < hangman.newWord.length; i++) {

                hangman.answerArray[i] = "_";
            }

        }
        else{
            var guess = String.fromCharCode(event.keyCode).toUpperCase();
        }
    });

}*/




/*function allLetter(inputtxt)
 {
 var letters = /^[A-Za-z]+$/;
 if(inputtxt.value.match(letters))
 {
 return true;
 }
 else
 {
 alert("message");
 return false;
 }
 }
*/

/*
/ Create an array of words

var words = [

    "straight",

    "flush",

    "royal",

    "fullboat"


];

// Pick a random word

var word = words[Math.floor(Math.random() * words.length)];

// Set up the answer array

var answerArray = [];

for (var i = 0; i < word.length; i++) {

    answerArray[i] = "_";

}

var remainingLetters = word.length;

// The game loop

while (remainingLetters > 0) {

    // Show the player their progress

    alert(answerArray.join(" "));

    // Get a guess from the player

    var guess = prompt("Guess a letter, or click Cancel to stop

    playing.");

    if (guess === null) {

        // Exit the game loop

        break;

    } else if (guess.length !== 1) {

        alert("Please enter a single letter.");

    } else {

        // Update the game state with the guess

        for (var j = 0; j < word.length; j++) {

            if (word[j] === guess) {

                answerArray[j] = guess;

                remainingLetters--;

            }

        }

    }

    // The end of the game loop

}

// Show the answer and congratulate the player

alert(answerArray.join(" "));

alert("Good job! The answer was " + word);
*/