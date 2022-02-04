var score = 0;
var questAsked = 0;
let time = 40; //seconds
var showScorePageFlag = false;

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

startButtonEl.addEventListener('click', start);

function start() {
    startButtonEl.classList.add('hide');
    introEl.classList.add('hide');
    scoreTimerEl.classList.remove('hide');
    questionWrapperEl.classList.remove('hide');
    countDown();
    scoreCounter();
    showQuestion();

}

function scoreCounter() {
    scoreEl.innerHTML = "Score: " + score;
}

function countDown() {
    var timer = setInterval(function function1() { 
        timerEl.innerHTML = "Timer: " + time + " seconds";
        time-=1 

        if (time <= -1) {
            clearInterval(timer);            
            showScorePageFlag = true;
            showScorePage();
        }
         
    }, 1000);

}

function reduceTime() {
    time -= 10
}

function showQuestion() {
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
    answerA.setAttribute("onclick", "checkAnswer('a', questions[questAsked].correct, answerA)");
    answerB.setAttribute("onclick", "checkAnswer('b', questions[questAsked].correct, answerB)");
    answerC.setAttribute("onclick", "checkAnswer('c', questions[questAsked].correct, answerC)");
    answerD.setAttribute("onclick", "checkAnswer('d', questions[questAsked].correct, answerD)");
}

function checkAnswer(selectedAns, correctAns, correctElement) {

    // If Correct
    if (selectedAns === correctAns) {
        score += 5;
        scoreCounter();

    }
    else {
        reduceTime();
    };


    // Increment to next question
    questAsked += 1;

    // Show next question only if maximum number of questions has not been reached
    if ((questions.length === questAsked) || (time <= -1 )) {
        
        showScorePageFlag = true;
        showScorePage();
        // showScorePageFlag = true;
        
    }
    else {
        showQuestion();
    };
}

function showScorePage() {
    if(showScorePageFlag)  {
        showScorePageFlag = false; // Reset Flag

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

        // not able to pass the below function
        submitBtn.setAttribute("onclick", "saveInitials()");
    }
}

function saveInitials() { 
    var initials = textBox.value;
    if (initials) {
        localStorage.setItem(initials, JSON.stringify(score));
    }
    highScore()
}

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

    for (var i = 0; i < localStorage.length; i++) {
        var initials = localStorage.key(i);
        var score = JSON.parse(localStorage.getItem(initials));

        highScore.innerHTML += `${initials} : ${score} <br/>`;

        // if(!initials || !score) {
        //     highScore = "";
        // }

    }

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

    clearBtn.addEventListener("click", () => {
        localStorage.clear();
        highScore.innerHTML = "  ";
    });

    resetBtn.addEventListener("click", () => {
        location.reload();
    });
}