// global variables
var score = 0;
var questAsked = 0;
let time = 40; //seconds
var showScorePageFlag = false;

// questions array
var questions = [
    {
        question: 'How to align an element to the top of its parent in CSS?',
        answers: {
            a: 'text-align: top',
            b: "margin-align: top",
            c: "overflow-top",
            d: "vertical-align: top",
        },
        correct: "d"
    },
    {
        question: 'Which of these is not a type of loop',
        answers: {
            a: 'while',
            b: 'if',
            c: 'for',
            d: 'continue'
        },
        correct: "b"
    },
    {
        question: 'What does JSON.parse() do',
        answers: {
            a: 'Retrieves an item from local storage',
            b: 'Turns a string into an object',
            c: 'Combines two strings',
            d: 'Analyses items in local storage'
        },
        correct: "b"
    },
    {
        question: 'Inside which HTML element do you place the Javascript?',
        answers: {
            a: '<javascript>',
            b: '<js>',
            c: '<scripting>',
            d: '<script>'
        },
        correct: "d"
    },
    {
        question: 'How do you round the number 7.25 to the nearest integer?',
        answers: {
            a: 'Math.rnd(7.25)',
            b: 'Math.round(7.25)',
            c: 'rnd(7.25)',
            d: 'round(7.25)'
        },
        correct: "b"

    }

];

// dynamic variables using ids
var startButtonEl = document.getElementById('start');
var mainContentEl = document.getElementById('main-content');
var scoreTimerEl = document.getElementById('score-timer-wrapper')
var introEl = document.getElementById('intro');
var scoreEl = document.getElementById('score');
var timerEl = document.getElementById('timer');
var questionWrapperEl = document.getElementById('question-wrapper');
var questionEl = document.getElementById('question');
var answerListEl = document.getElementById('answer-list');
var answerButtonsStyle = document.getElementsByClassName('btn');
var answerA = document.getElementById('answerA');
var answerB = document.getElementById('answerB');
var answerC = document.getElementById('answerC');
var answerD = document.getElementById('answerD');

// click start button 
startButtonEl.addEventListener('click', start);

// hides start page elements
function start() {
    // hides previous page
    startButtonEl.classList.add('hide');
    introEl.classList.add('hide');
    scoreTimerEl.classList.remove('hide');
    questionWrapperEl.classList.remove('hide');
    // calls the following functions
    countDown();
    scoreCounter();
    showQuestion();

}

// Shows the score
function scoreCounter() {
    scoreEl.innerHTML = "Score: " + score;
}

// starts countdown
function countDown() {
    var timer = setInterval(function () {
        timerEl.innerHTML = "Timer: " + time + " seconds";
        time -= 1
        //  if time runs out show score page
        if ((questions.length === questAsked) || (time <= -1)) {
            clearInterval(timer);
            showScorePageFlag = true;
            showScorePage();
        }

    }, 1000);

}

// reduces time when a wrong answer is clicked
function reduceTime() {
    time -= 10
}

// creates buttons and displays questions in the buttons
function showQuestion() {

    if (questions.length === questAsked) {
        return
    } else {
        // Print question
        questionEl.innerText = questions[questAsked].question;

        // Print Answers
        answerA.innerText = questions[questAsked].answers["a"];
        answerB.innerText = questions[questAsked].answers["b"];
        answerC.innerText = questions[questAsked].answers["c"];
        answerD.innerText = questions[questAsked].answers["d"];

        // Reset Class
        answerA.setAttribute('class', '');
        answerB.setAttribute('class', '');
        answerC.setAttribute('class', '');
        answerD.setAttribute('class', '');

        // Add OnClick
        answerA.setAttribute("onclick", "checkAnswer('a', questions[questAsked].correct)");
        answerB.setAttribute("onclick", "checkAnswer('b', questions[questAsked].correct)");
        answerC.setAttribute("onclick", "checkAnswer('c', questions[questAsked].correct)");
        answerD.setAttribute("onclick", "checkAnswer('d', questions[questAsked].correct)");

    }
}

// checks if answers are correct
function checkAnswer(selectedAns, correctAns) {

    // If Correct answer is selected
    if (selectedAns === correctAns) {
        score += 5;
        scoreCounter();

    }
    else {
        reduceTime();
    };


    questAsked += 1;
    showQuestion();

}

// Displays the score page
function showScorePage() {
    if (showScorePageFlag) {
        showScorePageFlag = false; // Reset Flag
        // hides previous page and creates score page
        timerEl.classList.add('hide');
        questionWrapperEl.classList.add('hide')
        scoreTimerEl.setAttribute("class", "score-page")
        var textBox = document.createElement("input");
        textBox.setAttribute("type", "text");
        textBox.setAttribute("id", "textBox");
        textBox.setAttribute("placeholder", "Your Initials");
        textBox.setAttribute("class", "inputInitials");
        var submitBtn = document.createElement("button");
        submitBtn.setAttribute("text", "submit");
        submitBtn.innerText = "Submit";
        submitBtn.setAttribute("class", "score-submit-btn");
        submitBtn.setAttribute("id", "submitBtn");


        scoreTimerEl.appendChild(textBox);
        scoreTimerEl.appendChild(submitBtn);

        submitBtn.setAttribute("onclick", "saveInitials()");
    }
}

// saves initials to local storage
function saveInitials() {
    var initials = textBox.value;
    if (initials) {
        localStorage.setItem(initials, JSON.stringify(score));
    }

    highScore()
}

// displays high scores
function highScore() {
    // Hide Previous Page
    var textBox = document.getElementById("textBox");
    textBox.classList.add("hide");

    var submitBtn = document.getElementById("submitBtn");
    submitBtn.classList.add("hide");
    scoreEl.classList.add("hide");

    // Build High Score Page
    var highScoreDisplay = document.getElementById("high-score");
    highScoreDisplay.setAttribute("class", "highScoreDisplay");

    var highScoreHeading = document.createElement("h3");
    highScoreHeading.setAttribute("id", "highScoreHeading")
    highScoreHeading.innerText = "High Score"

    var highScore = document.createElement("div")
    highScore.setAttribute("id", "highScore");

    highScoreDisplay.appendChild(highScoreHeading);
    highScoreDisplay.appendChild(highScore);
    document.body.appendChild(highScoreDisplay);

    // display high score from local storage
    for (var i = 0; i < localStorage.length; i++) {
        var initials = localStorage.key(i);
        var score = JSON.parse(localStorage.getItem(initials));

        highScore.innerHTML += `${initials} : ${score} <br/>`;

    }

    // create reset and clear buttons
    var btnDiv = document.createElement("div")
    btnDiv.setAttribute("id", "btnDiv");
    var clearBtn = document.createElement("button");
    clearBtn.setAttribute("id", "clearBtn");
    clearBtn.innerText = "Clear"
    var resetBtn = document.createElement("button");
    resetBtn.setAttribute("id", "resetBtn");
    resetBtn.innerText = "Go Back";

    btnDiv.appendChild(clearBtn);
    btnDiv.appendChild(resetBtn);
    highScoreDisplay.appendChild(btnDiv);

    // clear high score
    clearBtn.addEventListener("click", () => {
        localStorage.clear();
        highScore.innerHTML = "  ";
    });

    // return to start page 
    resetBtn.addEventListener("click", () => {
        location.reload();
    });
}