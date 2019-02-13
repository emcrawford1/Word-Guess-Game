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


    //Jet move properties - these properties are specific to making the jet move.

    yCoord: 40, //Top 
    xCoord: 25, //Left
    degShift: 0,
    jet: document.getElementById('freeFloat'),
    degString: "",
    xString: "",
    yString: "",


    //Change background properties - these properties change the background when the jet crashes.
    changeBackGround: 0,
    backDropSwitch: document.getElementById('backDrop'),




    //The mainFunction() will check the user's input to ensure it is a valid char (a-z).  If 
    //not it prompt an alert that notify the user to press the appropriate key.  This function also acts
    //to call other functions and acts as the jumping off point for the entire program as it is called by
    //eventlistener outside of the object and it calls other functions in the program.

    mainFunction: function (event) {

        if(game.remainingGuesses > 0){
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

            //Runs the userGuessAssign function and checks the return value.  If false it runs the compare KeyToWord function.
            if (!game.userGuessAssign()) {

                if (!game.compareKeyToWord()) {

                    game.remainingGuesses--;
                    var guessRemain = document.getElementById('guessesRemaining');
                    guessRemain.textContent = "Guesses Remaining: " + game.remainingGuesses;

                    if (game.remainingGuesses < 1) {
                        game.loseInstructions();
                        game.jetMaster(false);
                        
                    }
                }

                else {
                    if (game.correctTracker === game.guessWord.length) {
                        game.winInstructions();
                        game.jetMaster(true);
                       
                    }
                }

            }

        }
    }

    },


    //This function compares the user's guess to each character in the word.  It is called by the 
    //dataValidation() function.

    compareKeyToWord: function () {

        var wordFlag = false;
        var spanNode = document.querySelectorAll('span.guessChar');

        for (var i = 0; i < this.guessWord.length; i++) {

            if (this.userLetterGuess === this.guessWord[i]) {

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
    //true if the user has already guessed that specific character or false if the user's guess was not 
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

            var parentNode = document.getElementById('letterGuess');
            var newGuess = document.createElement('div');
            newGuess.textContent = this.userLetterGuess + " ";
            newGuess.className = "guessed"
            parentNode.appendChild(newGuess);

        }

        return guessFlag;

    },


    //Delete the old word and create a new word.  All nodes with <span class="guessChar"> will be selected, 
    //deleted, then repopulated with a new word.  The second block of this function deletes the user's 
    //previous guesses.

    replaceNodes: function () {

        var spanDelete = document.querySelectorAll('span.guessChar');

        for (var i = 0; i < spanDelete.length; i++) {
            spanDelete[i].parentNode.removeChild(spanDelete[i]);
        }
        this.generateChildSpan();

        var trackerDelete = document.querySelectorAll('div.guessed');

        for (var i = 0; i < trackerDelete.length; i++) {
            trackerDelete[i].parentNode.removeChild(trackerDelete[i]);
        }

    },


    //This function resets the game so that it can be played again.

    resetGame: function () {
        this.replaceNodes();
        this.lettersGuessed = [];
        this.correctTracker = 0;
        var guessRemain = document.getElementById('guessesRemaining');
        game.remainingGuesses = 5;
        guessRemain.textContent = "Guesses Remaining: " + game.remainingGuesses;
        game.degString = "0";
        game.jet.style.transform = "rotate(" + game.degString + "deg)";
        game.jet.transform = "rotate(0deg)";
        game.jet.style.top = "40px";
        game.jet.style.left = "25px";
        game.backDropSwitch.style.backgroundColor = "rgba(16, 189, 233, 0.986)";
        game.changeBackGround = 0;
        game.yCoord = 40;  
        game.xCoord = 25;
        game.degShift = 0;
        game.degString = "";
        game.xString = "";
        game.yString = "";
        game.remainingGuesses = 5;
    },


    //Changes heading when a key is pressed to indicate that the user should press a key from A-Z.

    gameInstructions: function () {
        var instructionHeading = document.getElementById('headerInstructions');
        instructionHeading.textContent = "Press a key (A-Z) to play (other keys are not allowed)";
    },


    //Changes the heading to let the user know they lost and updates losses on page.

    loseInstructions: function () {
        game.lossCounter++;
        var instructionHeading = document.getElementById('headerInstructions');
        instructionHeading.textContent = "You lost.  Press any key to play again)";
        var loss = document.getElementById('losses');
        loss.textContent = "Losses: " + game.lossCounter;


    },


    //Changes heading to let the user know they won and updates wins on page.
    winInstructions: function () {
        this.winCounter++;
        var instructionHeading = document.getElementById('headerInstructions');
        instructionHeading.textContent = "You win!!  Press any key to play again)";

        var winner = document.getElementById('wins');
        winner.textContent = "Wins: " + game.winCounter;

    },



    //Master jet function.  This function simply calls the appropriate jet function depending on
    //if the user won the game.

    jetMaster: function (win) {

        if (win) {
            game.moveJetWin();
        }

        if (!win) {
            game.moveJetLost();
        }

    },


    //If the player wins the jet flies off into the sunset (i.e. blue noon sky).  This function
    //iterates the jet's coordinates (the jet is positioned absolutel on the page by a specified  
    //amount and uses the setTimeOut to recursivelycall the function and slow down the calls.  
    //This way you can see the jet move across the screen.

    moveJetWin: function () {

        xString = game.xCoord.toString();

        xString += "px";

        game.jet.style.left = xString;

        game.xCoord = game.xCoord + 5;

        if (game.xCoord < 1800) {

            timeOut = setTimeout(game.moveJetWin, 5);
        }

        else{
            game.resetGame();
        }

    },


    //If the player loses crash the jet into the ground.  Like the moveJetWin() function above,
    //this function uses a recursive call from the setTimeOut function to slow the loop so that 
    //the user can "see" the jet fly across the screen.

    moveJetLost: function () {

        game.yString = game.yCoord.toString();
        game.xString = game.xCoord.toString();
        game.degString = game.degShift.toString();

        game.yString += "px";
        game.xString += "px";

        game.jet.style.left = game.xString;
        game.jet.style.top = game.yString;
        game.jet.style.transform = "rotate(" + game.degString + "deg)";

        if (game.xCoord < 750) {
            game.xCoord = game.xCoord + 5;
        }

        //This is the point in the function where the jet needs to make a 90 degree turn
        //and crash into the ground.  This portion of the function runs after the jet has
        //passed the 700 x-coordinate point.

        if (game.xCoord >= 700) {

            //This portion of the function orients the jet so that it will begin moving 
            //downward and crash into the ground.  It also shift the jets orientation so
            //that it is now facing downward (degShift)

            if (game.yCoord < 300 && game.degShift < 90) {
                game.yCoord = game.yCoord + 5;
                game.xCoord = game.xCoord + 5;
                game.degShift = game.degShift + 5;
            }
            else {
                game.yCoord += 5;

            }
        }

        //Recursive call to function with setTimeOut
        if (game.yCoord < 700) {

            timeOut = setTimeout(game.moveJetLost, 5);
        }

        //Runs after all recursive calls have been made
        else {
            //Calls the backGroundChange function which will change the background when the 
            //jet crashes.
            game.backGroundChange();
        }

    },

   
    
    //If the user loses, this function causes the background to flicker black and red to simulate
    //the jet crashing.  As with the other animation functions this function uses a recursive call
    //with the setTimeOut function to allow the user to see the flicker.

    backGroundChange: function(){

        if(game.changeBackGround % 2 === 0){
        game.backDropSwitch.style.backgroundColor = "red";
    }

        else{
            game.backDropSwitch.style.backgroundColor = "black";
        }
        
        game.changeBackGround++;

        if(game.changeBackGround < 50){
            var timeOut = setTimeout(game.backGroundChange, 30);
        }
        
        else{
            game.resetGame();
        }

     
    }


}

game.generateChildSpan();

document.addEventListener('keyup', game.mainFunction);