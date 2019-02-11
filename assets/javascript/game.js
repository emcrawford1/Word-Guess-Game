//Guessing game javascript code

//Creating a game object that will store the properties and functions that will be called during 
//the game.

var game = {
    wordList: ['JET', 'HELICOPTER', 'PLANE', 'GLIDER', 'SAILPLANE'],
    ranNumber: 0,
    guessWord: "",
    userLetterGuess: "",
    correctTracker: 0,
    winCounter: 0,
    lossCounter: 0,
    remainingGuesses: 5,
    lettersGuessed: [],
    alphabet: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
        'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],


    //Data validation function that will check the user's input to ensure it is a valid char (a-z).  If 
    //not it prompt an alert that notify the user to press the appropriate key.  This function also acts
    //to call other functions and acts as the jumping off point for the entire program as it is called by
    //eventlistener outside of the object and it calls other functions in the program.

    mainFunction: function (event) {

        game.gameInstructions();

        var charTest = event.key.toUpperCase();
        var letterFlag = false;

        for (var i = 0; i < game.alphabet.length; i++) {
            if (charTest === game.alphabet[i]) {
                letterFlag = true;
            }
        }

        if (letterFlag === false) {
            alert("Please select a letter (a-z)");
        }
        else {

            game.userLetterGuess = charTest;

            if (!game.userGuessAssign()) {

                if(!game.compareKeyToWord()){

                    game.remainingGuesses--;

                    if(game.remainingGuesses < 1){
                        game.loseInstructions();
                        game.resetGame();
                    }
                }

                else{
                    if(game.correctTracker === game.guessWord.length){
                        game.winInstructions();
                        game.resetGame();
                    }
                }

            }
            
        }

    },


    //This function compares the user's guess to each character in the word.  It is called by the 
    //dataValidation() function.

    compareKeyToWord: function(){

        var wordFlag = false;
        var spanNode = document.querySelectorAll('span.guessChar');

        for(var i = 0; i < this.guessWord.length; i++){

            if(this.userLetterGuess === this.guessWord[i]){

                wordFlag = true;
                this.correctTracker++;
                spanNode[i].textContent = this.userLetterGuess;

            }

        }

        return wordFlag;

    },


    //Create the HTML/CSS elements (<span>) that will display the user's guess.  This function calls the 
    //generateRandomWord() function to get the number of HTML elements needed.

    generateChildSpan: function () {

        var parent = document.getElementById('guessingBlock');
        this.generateRandomWord();

        for (var i = 0; i < this.guessWord.length; i++) {
            var newElement = document.createElement('span');
            newElement.textContent = "_";
            newElement.className = "guessChar";
            parent.appendChild(newElement);

        }

    },
    

    //Generate a random number to determine which word will be selected that the user will try to guess.  
    //This number is assigned to the index of the wordList to select a random word.  This word is
    //assigned to the guessWord property.

    generateRandomWord: function () {

        this.ranNumber = Math.floor(Math.random() * (this.wordList.length));

        this.guessWord = this.wordList[this.ranNumber];


    },


    //Assign the user's guess to an array of characters to be displayed on the screen.  Return a flag of 
    //true if the user has already guessed that specific character or false f the user's guess was not 
    //previously guessed.  

    userGuessAssign: function () {

        var guessFlag = false;

        for (var i = 0; i < game.lettersGuessed.length; i++) {
            if (this.userLetterGuess === this.lettersGuessed[i]) {

                guessFlag = true;
                
            }
        }

        if (guessFlag === false) {
            this.lettersGuessed.push(this.userLetterGuess);
        }

        return guessFlag;

    },


    //Delete the old word and create a new word.  All nodeswith <span class="guessChar"> will be selected, 
    //deleted, then repopulated with a new word.

    replaceNodes: function () {

        var spanDelete = document.querySelectorAll('span.guessChar');

        for (var i = 0; i < spanDelete.length; i++) {
            spanDelete[i].parentNode.removeChild(spanDelete[i]);
        }
        this.generateChildSpan();
    },


    //This function resets the game so that it can be played again.

    resetGame: function () {
        this.replaceNodes();
        this.lettersGuessed = [];
        this.remainingGuesses = 5;
        this.correctTracker = 0;
    },


    //Changes heading when a key is pressed to indicate that the user should press a key from A-Z.

    gameInstructions: function() {
        var instructionHeading = document.getElementById('headerInstructions');
        instructionHeading.textContent = "Press a key (A-Z) to play (other keys are not allowed)"; 
    },


    //Changes the heading to let the user know they lost and updates losses on page.

    loseInstructions: function() {
        game.lossCounter++;
        var instructionHeading = document.getElementById('headerInstructions');
        instructionHeading.textContent = "You lost.  Press any key to play again)";
        var loss = document.getElementById('losses');
        loss.textContent = "Losses: " + game.lossCounter;
        
        
    },


    //Changes heading to let the user know they won and updates wins on page.
    winInstructions: function(){
        this.winCounter++;
        var instructionHeading = document.getElementById('headerInstructions');
        instructionHeading.textContent = "You win!!  Press any key to play again)"; 
        
        var winner = document.getElementById('wins');
        winner.textContent = "Wins: " + game.winCounter;

    },


}

game.generateChildSpan();
document.addEventListener('keyup', game.mainFunction);

