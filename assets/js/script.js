var score = 0;
var questAsked = 0;



var questions = [
    {
        question: 'How to align an element to the top of its parent in CSS?',
        answers: {
            a: 'text-align:top',
            b: "margin-align:top",
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
    countdown();
    scoreCounter();
    showQuestion();

}

function scoreCounter() {
    scoreEl.innerHTML = "Score: " + score;
}

function countdown() {
    var startingMinutes = 2;
    let time = startingMinutes * 60;
    var timer = setInterval(function function1() {

        const minutes = Math.floor(time / 60);
        let seconds = time % 60;

        seconds = seconds < 10 ? '0' + seconds : seconds;
        timerEl.innerHTML = "Timer: " + `${minutes}:${seconds}`;
        time--;

        time -= 0;
        if (time <= 0) {
            clearInterval(timer);
        }
    }, 1000);
}

function showQuestion() {
    // Print question
    questionEl.innerText = questions[questAsked].question;

    // Print Answers
    answerA.innerText = questions[questAsked].answers["a"];
    answerB.innerText = questions[questAsked].answers["b"];
    answerC.innerText = questions[questAsked].answers["c"];
    answerD.innerText = questions[questAsked].answers["d"];

    // Add OnClick
    answerA.setAttribute("onclick", "checkAnswer('a', questions[questAsked].correct)");
    answerB.setAttribute("onclick", "checkAnswer('b', questions[questAsked].correct)");
    answerC.setAttribute("onclick", "checkAnswer('c', questions[questAsked].correct)");
    answerD.setAttribute("onclick", "checkAnswer('d', questions[questAsked].correct)");
}

function checkAnswer(selectedAns, correctAns) {

    // If Correct
    if (selectedAns === correctAns) {
        score += 5;
        scoreCounter();
        // // not working
        // selectedAns.setAttribute('class', 'btn-correct');
    }
    else {
        // TODO Reduce Timer
    }

    
    // // not working
    // if (selectedAns != correctAns) {
    //     selectedAns.setAttribute('class', 'btn-wrong');
    // }

    // Increment to next question
    questAsked += 1;

    // Show next question ony if maximum number of questions has not been reached
    if (questions.length === questAsked)
        showScorePage();
    else
        showQuestion();
}

function showScorePage() {
    console.log("Done");
    timerEl.classList.add('hide');
    questionWrapperEl.classList.add('hide')
    scoreTimerEl.setAttribute("class", "score-page")
    var textBox = document.createElement("input");
    textBox.setAttribute("type", "text");
    textBox.setAttribute("placeholder", "Your Initials");
    textBox.setAttribute("class", "inputInitials")
    // textBox.innerText = "Enter Your Initials " + textBox;
    var submitBtn = document.createElement("button");
    submitBtn.setAttribute("text", "submit");
    submitBtn.innerText = "Submit";
    submitBtn.setAttribute("class", "score-submit-btn");

    scoreTimerEl.appendChild(textBox);
    scoreTimerEl.appendChild(submitBtn);

    submitBtn.addEventListener("click", setInitials);
}
// showQuestion(questions[0]);

function setInitials() {
    localStorage.setItem("score", JSON.stringify(score));
}