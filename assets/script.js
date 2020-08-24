var timerEl = document.getElementById('countdown');
var startButton = document.getElementById('start-btn');
var nextButton = document.getElementById('next-btn');
var questionContainerElement = document.getElementById('question-container');
var questionElement = document.getElementById('question');
var answerButtonsElement = document.getElementById('answer-buttons');
var scoreCardElement = document.getElementById('score-card');
var signUpButton = document.querySelector("#sign-up-btn");
var userNameSpan = document.querySelector("#name");
var userHighscoreSpan = document.querySelector("#highscore");


let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
startButton.addEventListener('click', countdown)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (!correct) {
    timeLeft = timeLeft - 5;
  }

  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    clearInterval(timeInterval);
    endGame();
  }
}

//function to end game
var endGame = function() {
  startButton.innerText = 'Restart'
  startButton.classList.remove('hide')
  questionElement.classList.add('hide')
  answerButtonsElement.classList.add('hide')
  scoreCardElement.classList.remove('hide')
  clearStatusClass(document.body)
  };


function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong') 
  }
}

var clearStatusClass = function(element)  {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

var questions = [
  {
    question: 'Commonly used data types DO NOT include?',
    answers: [
      { text: 'character', correct: false },
      { text: 'booleans', correct: false },
      { text: 'alerts', correct: true},
      { text: 'numbers', correct: false } 
    ]
  },
  {
    question: 'Arrays in JavaScript can be used to store what?',
    answers: [
      { text: 'numbers & strings', correct: true},
      { text: 'other arrays', correct: true},
      { text: 'booleans', correct: true},
      { text: 'all of the above', correct: true}
    ]
  },
  {
    question: 'Is web development fun?',
    answers: [
      { text: 'YES!!!', correct: true},
      { text: 'Kinda', correct: true},
      { text: 'IDK', correct: true},
      { text: 'Um no', correct: true}
    ]
  },
  {
    question: 'The condition of an if/else statement is enclosed in what?',
    answers: [
      { text: 'quotes', correct: false },
      { text: 'curly brackets', correct: true},
      { text: 'parentheses', correct: false },
      { text: 'square brackets', correct: false }
    ]
  },
  {
    question: 'String values must be enclosed with ___ when being assigned a variable.',
    answers: [
      { text: 'comma', correct: false },
      { text: 'curly brackets', correct: false },
      { text: 'quotes', correct: false },
      { text: 'parentheses', correct: true }
    ]
  },
  {
    question: 'What is a useful tool in the Development and Debugging process for printing information to the "debugger"?',
    answers: [
      { text: 'JavaScript', correct: false },
      { text: 'treminal/bash', correct: false },
      { text: 'for loops', correct: false },
      { text: 'console.log', correct: true }
    ]
  }
]

var timeLeft = 60;

// Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
var timeInterval = setInterval(function() {
  if (timeLeft > 1) {
    timerEl.textContent = timeLeft + ' seconds remaining';
    timeLeft--;
  } else if (timeLeft === 1) {
    timerEl.textContent = timeLeft + ' second remaining';
    timeLeft--;
  } else {
    timerEl.textContent = '';
    clearInterval(timeInterval);
    endGame();
  }
}, 1000);

//high score
function renderLastHighscore() {
  var highscore = localStorage.getItem("highscore");
  var name = localStorage.getItem("name");

  if (highscore && name === null) {
    return;
  }

  userHighscoreSpan.textContent = highscore;
  userNameSpan.textContent = name;
}

renderLastHighscore();



signUpButton.addEventListener('click', newHighscore)

function newHighscore() {
  var highscore = timeLeft;
  var name = document.querySelector("#new-name").value;

  if (name === "") {
    alert("error", "Name cannot be blank");
  } else {
    alert("success", "Registered successfully");

    localStorage.setItem("highscore", highscore);
    localStorage.setItem("name", name);
    renderLastHighscore();
  }
};