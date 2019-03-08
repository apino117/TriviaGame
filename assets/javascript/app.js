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
var gameisStarted = false;

// Answers go in as objects within an array
var question1 = {
    prompt: "The color _____ is named after a battle fought in Italy in the 1800's",
    answerA: "Fuchsia",
    answerB: "Magenta",
    answerC: "Capri",
    answerD: "Olivine",
}
var question2 = {
    prompt: "Mozart once wrote a song for his mother which translates approximately to _____",
    answerA: "Come lick my ass",
    answerB: "I've got a dirty surprise for you",
    answerC: "The wench who pleased herself",
    answerD: "A country setting",
}
var questionArray = [
    question1,
    question2,
]

// console.log(question1.answerA);
// console.log(questionArray[0])

var randomQuestion = questionArray[Math.floor((Math.random() * questionArray.length))];
console.log(randomQuestion);


// DOM links for questions & answers
$("#random-question").text(questionArray[0].prompt);
$("#answer-A").text(questionArray[0].answerA);
$("#answer-B").text(questionArray[0].answerB);
$("#answer-C").text(questionArray[0].answerC);
$("#answer-D").text(questionArray[0].answerD);

// Timer Variables
var clockRunning = false;
var time = 30;

// Timer Functions
function start() {

    // Use setInterval to start the count here and set the clock to running.
    if (!clockRunning) {
        intervalId = setInterval(count, 1000);
        clockRunning = true;
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
        alert("ph no!");
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
    $("li").on("click", function () {
        alert("clicked!");
    })
}