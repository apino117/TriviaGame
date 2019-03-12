// 1) Start screen, instructions and start button 
// 2) Player hits start, game begins 
// 3) When game begins, 30 second timer starts to count down, question is displayed
// 4) While the timer is running the player may make a selection by clicking on one of the answers. If the timer runs out the question is marked as unanswered. 
// 5) When the player makes a selection the screen changes and displays accordingly "right" or "wrong." With an image that matches the correct answer. 
// 6) After five seconds of that screen we load another question and repeat the process. 
// 7) After the requisite amount of questions are answered we go to the end screen. 
// 8) The end screen displays the results: correct answers, incorrect and the unanswered. There's also a button to play again.
// 9) On the end screen our timer is stopped, the screen wont change unless the player clicks the "play again" button.
// 10) If the player clicks the "play again" button the game re-initializes, it DOES NOT reset.

// Start Screen Variables
$("#question-container").hide();
$("#timer-container").hide();
$("#results-container").hide();
var gameisStarted = false;

// Timer Variables
var clockRunning = false;
var time = 31;

// Answers go in as objects within an array
var questionArray = [
    question1 = {
        prompt: "The color _____ is named after a battle fought in Italy in the 1800's",
        wrongAnswer: ["• Fuchsia", "• Capri", "• Olivine"],
        rightAnswer: "• Magenta",
        // image: url("assets/images/rainbowq.jpg")

    },
    question2 = {
        prompt: "Mozart once wrote a song for his mother which translates approximately to _____",
        rightAnswer: "• Lick me in the arse",
        wrongAnswer: ["• I've got a dirty surprise for you", 
        "• The wench who pleased herself", 
        "• A fine country setting"],
    },
    question3 = {
        prompt: "In Australia's history there's an event reffered to as The Great Emu War which was ________",
        rightAnswer: "• A war the Australians fought and ultimately lost against the emus",
        wrongAnswer: ["• A war the emus fought amongst each other which caused mass destruction of the local towns and terrorized their citizens", 
        "• A brutal war over the hunting selling and trading of emu hide - the reason it's now illegal to trade in emu of any form", 
        "• A span during the great depression where the government railed against any consumption of emu, making it wildly expensive and earning the title of war" ],
    },
    question4 = {
        prompt: "_____ is a nickname for the ancient Greek name Theophania",
        rightAnswer: "• Tiffany",
        wrongAnswer: ["• Phia", "• Tia", "• Tamarra"],
    },
    question5 = {
        prompt: "Coca-cola as per their agreements with the US government are given special permission to import _____ for the use in their signature-soft drink.",
        rightAnswer: "• Coca leaves",
        wrongAnswer: ["• Gluco-amphetamine, an especially powerful sugar", 
        "• Concentrated 1,3,7-Trimethylpurine-2,6-dione", 
        "• Un-pasturized coco beans"],
    },
    question6 = {
        prompt: "The modern day version is the Cavendish. A few decades ago it was the (now extinct) gros michel. What is it?",
        rightAnswer: "• A banana",
        wrongAnswer: ["• The original american automobile", "• The blue-striped marmaset", "T• he flower we commonly call daisy"],
    },
    question7 = {
        prompt: "Kazakhstan has the only _____ left on earth",
        rightAnswer: "• Primordial apple forest",
        wrongAnswer: ["• Ancient riverbed", "• Copy of that wu-tang album", "• Cask of imantiago"],
    },
    question8 = {
        prompt: "Marigolds have, amongst other things _____ properties which give them a variety of uses",
        rightAnswer: "• Anti-inflamatory",
        wrongAnswer: ["• Sleep-inducing", "• Strangely acidic", "• Theton-altering"],
    },
]

var questionCount = 0;
var correctAnswer = 0;
var incorrectAnswer = 0;

$("#wins-column").text("You got " + correctAnswer + " questions right!");
$("#losses-column").text("You got " + incorrectAnswer + " questions wrong!");


// Timer Functions
function start() {

    // Use setInterval to start the count here and set the clock to running.
    if (!clockRunning) {
        intervalId = setInterval(count, 1000);
        clockRunning = true;
        makeQuestion();
    }
}
function stop() {

    // Use clearInterval to stop the count here and set the clock to not be running.
    clearInterval(intervalId);
    clockRunning = false;
}
function count() {

    // Decrement time by 1, remember we cant use "this" here.
    time--;

    // Get the current time, pass that into the timeConverter function,
    //       and save the result in a variable.
    var converted = timeConverter(time);
    console.log(converted);

    // Use the variable we just created to show the converted time in the "display" div.
    $("#timer-text").text(converted);
}
function timeConverter(t) {

    var minutes = Math.floor(t / 60);
    var seconds = t - (minutes * 60);

    // if time runs out lose condition
    if (seconds === 0) {
        stop();
        alert("Oh no, time ran out! Next question!");
        incorrectAnswer++;
        makeQuestion();
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    if (minutes === 0) {
        minutes = "00";
    }
    else if (minutes < 10) {
        minutes = "0" + minutes;
    }

    return minutes + ":" + seconds;
}
function timerReset() {
    time += (31 - time);
}

function makeQuestion() {
    start();
    if (questionCount === (questionArray.length)) {
        alert("that's it!");
        // Result Screen
        $("#wins-column").text("You got " + correctAnswer + " question(s) right!");
        $("#losses-column").text("You got " + incorrectAnswer + " question(s) wrong!");
        $("#results-container").show();
        stop();
    }
    else {
        // DOM links for questions & answers
        $("#random-question").text(questionArray[questionCount].prompt);
        $("#answer-A").text(questionArray[questionCount].wrongAnswer[0]);
        $("#answer-B").text(questionArray[questionCount].rightAnswer);
        $("#answer-C").text(questionArray[questionCount].wrongAnswer[1]);
        $("#answer-D").text(questionArray[questionCount].wrongAnswer[2]);
        questionCount++;
    }
    timerReset();

}

// When player clicks start
$("#start-button").on("click", function () {
    //Flip game started flag
    gameisStarted = true;
    // Hide instructions
    $("#instructions-container").hide();
    // Display Questions
    $("#question-container").show();
    // Display Timer
    $("#timer-container").show();
    // Start timer
    start();
})

// During gameplay functions
if (gameisStarted = true) {
    // Make list items clickable
    $("#answer-B").on("click", function () {
        correctAnswer++;
        alert("Correct!");
        makeQuestion();
    })
    $("#answer-A").on("click", function () {
        alert("mmmmNope!");
        incorrectAnswer++;
        makeQuestion();
    })
    $("#answer-C").on("click", function () {
        alert("Not that one!");
        incorrectAnswer++;
        makeQuestion();
    })
    $("#answer-D").on("click", function () {
        alert("Lo siento, try again!");
        incorrectAnswer++;
        makeQuestion();
    })
}