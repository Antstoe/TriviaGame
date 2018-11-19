
//Empty array for user choices, fill with null in a for loop later
let userPick = [];
let correctAnswers = 0;
let wrongAnswers = 0;
let skippedAnswers = 0;
let timeDisplay;
let counter = 30;
let intervalID;
let questions = [{
    question: "Bananas float in water",
    choices: ["TRUE", "FALSE"],
    answer: 0
},
{
    question: "Scientific name for Banana is musa sapientum, which means -fruit of yellow men-.",
    choices: ["TRUE", "FALSE"],
    answer: 1
},
{
    question: "Banana peel oil is anti inflammatory and anti-itch.",
    choices: ["TRUE", "FALSE"],
    answer: 0
},
{
    question: "Bananas make great conditioner.",
    choices: ["TRUE", "FALSE"],
    answer: 0
}
];
//To capture the missed responses--all nulls=length of the questions object
for (var i = 0; i < questions.length; i++) {
    userPick[i] = null;
}
//Sounds
let audioClick = new Audio("assets/sounds/Banana_slip.wav");
let audioStart = new Audio("assets/sounds/Banana_Minion.mp3");
let audioEnd = new Audio("assets/sounds/Let_Slip.wav");

//Ready function
$(document).ready(function () {

    $("#startQuiz").click(function () {
        audioStart.play();
        intervalID = setInterval(decrement, 1000);
        writeQuestions();
        $("#startQuiz").hide();
        writeSubmitButton();

        $("#submitQuiz").click(function () {
            audioEnd.play();
            showResults();
        });
        //Recording function
        $("input").click(function () {
            audioClick.play();
            userPick[this.name] = this.value;
        });
    });
});

//Use a nested for loop to go through each question and each radio button option and write to page
function writeQuestions() {
    for (var i = 0; i < questions.length; i++) {
        $("#formQuiz").append(questions[i].question + "</br>");
        //https://www.w3schools.com/bootstrap/bootstrap_forms_inputs.asp
        //Within 1st loop, write out the radio option buttons and assign them values and names
        for (var x = 0; x < questions[i].choices.length; x++) {
            $("#formQuiz").append("<label class='radio-inline'><input value='" + x + "' type='radio' name='" + i + "'>" + questions[i].choices[x] + "</label>");
        }
        $("#formQuiz").append("<br/><br/>");
    }
}
//Submit Button
function writeSubmitButton() {
    $("#formSubmit").append("<button id='submitQuiz' class='btn btn-primary btn-lg'>Let's Split</button>");
}

function decrement() {
    counter--;
    $("#timeRemain").html("<h2><mark>" + counter + " seconds remaining.</mark></h2>");
    if (counter === 0) {
        //Process the quiz results
        audioEnd.play();
        showResults();
    }
}
//Write the results back to HTML
function showResults() {
    $("#formQuiz").hide();
    $("#timeRemain").hide();
    $("#submitQuiz").hide();
    //userPick[] record the player responses 
    for (i = 0; i < questions.length; i++) {
        if (questions[i].answer == userPick[i]) {
            correctAnswers++;
        }
        // Unanswered 
        else if (userPick[i] === null) {
            skippedAnswers++;
        }
        // Wrong Answer
        else {
            wrongAnswers++;
        }
    }
    //Aassigning an HTML id to a variable 
    let res = $("#quizResults");
    $(res).append("<p>ALL DONE!</p>");
    $(res).append("<p>Correct Answers: " + correctAnswers + "</p>");
    $(res).append("<p>Incorrect Answers: " + wrongAnswers + "</p>");
    $(res).append("<p>Unanswered: " + skippedAnswers + "</p>");
    //Clear intervalID
    clearInterval(intervalID);
}

