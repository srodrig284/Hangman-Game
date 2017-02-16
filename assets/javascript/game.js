
// Only characters allowed to use as valid inputs.
var letters = /^[A-Za-z]+$/;

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
    stickImages: ['assets/images/hangman10.png',
                  'assets/images/hangman8.png',
                  'assets/images/hangman7.png',
                  'assets/images/hangman6.png',
                  'assets/images/hangman5.png',
                  'assets/images/hangman4.png',
                  'assets/images/hangman3.png',
                  'assets/images/hangman2.png',
                  'assets/images/hangman1.png',
                  'assets/images/hangman0.png'],


    //$("#picture").attr("src", "assets/images/eighty.png");
    //<img class="img-responsive center-block" src="assets/images/eighty.png" id="picture">

    //picks term from the list
    selectTerm: function() {
        this.targetWordArray = [];
        this.targetWord = this.selectRandomWord();  // select random word
        this.targetWordArray = this.targetWord.split("");
        console.log(this.targetWordArray);

        // reset all the fields
        this.displayArray = [];
        this.lettersUsed = [];
        this.livesRemaining = 10;
        this.gameEnded = false; // reset
        //update the blanks on display word
        this.displayArray = this.updateDisplayArray("_");

        // set initial values
        $("#wins").html(this.wins);
        $("#losses").html(this.losses);
        $("#livesRemaining").html(this.livesRemaining);
        $("#guess-word").html(this.displayArray.join(" ").replace(/\^/gi, "&nbsp" ));
        $("#letters-used").html(this.lettersUsed.join(" "));
        $("#start-message").show();
        $("#start-message").text("Press a letter key to start");
        //$("#message").html("");
        $("#message").hide();
        $("#hangman_images").attr("src", "");
    },

    selectRandomWord: function(){
        return this.termsList[Math.floor(Math.random() * this.termsList.length)].toUpperCase();
    },

    updateDisplayArray: function(letter){
        var displayArray = this.displayArray;
        // if underscore is passed, initialize display word with underscores
        if(letter === "_"){
            $.each(this.targetWordArray, function(index, value) {
                if (value !== " ") {
                    displayArray.push("_");
                }  else {
                    displayArray.push("^");
                }
            });
        }
        else {
            $.each(this.targetWordArray, function(index, value){
                if (value === letter){
                    displayArray[index] = letter;
                }
            });
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
            $("#guess-word").html(this.displayArray.join(" ").replace(/\^/gi, "&nbsp" ));
        }
        else {
            $("#livesRemaining").html(this.livesRemaining);
            $("#hangman_images").attr("src", this.stickImages[this.livesRemaining]);
        }

        $("#letters-used").html(this.lettersUsed.join(" "));

        // check if the word was guessed
        var a = this.displayArray.indexOf("_");
        if (a < 0){
                this.endRound(true);
        }
        else if (this.livesRemaining == 0) {
                this.endRound(false);
        }
    },


    endRound: function(winlose){
        $("#message").show();
        if(winlose){
            this.wins += 1;
            $("#message").html("YOU WIN!");
        }
        else{
            this.losses += 1;
            $("#message").html("YOU LOSE!");
        }
        this.gameEnded = true;
        $("#start-message").show();
        $("#start-message").text("Press any key to start");
        $("#WINS").html(this.wins);
        $("#losses").html(this.losses);
    }

};

// get new word and start game
pokerTerms.selectTerm();

document.onkeyup = function (event) {
    console.log(event.key);
    $("#start-message").hide();
    pokerTerms.validateInput(event.key, event.keyCode);
};