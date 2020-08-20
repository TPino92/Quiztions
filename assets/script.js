const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
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
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'Commonly used data types DO NOT include?',
    answers: [
      { text: 'character', correct: false },
      { text: 'booleans', correct: false },
      { text: 'alerts', correct: true},
      { text: 'numbers', correct: false}
    ]
  },
  {
    question: 'Arrays in JavaScript can be used to store what?',
    answers: [
      { text: 'numbers & strings', correct: true },
      { text: 'other arrays', correct: true },
      { text: 'booleans', correct: true },
      { text: 'all of the above', correct: true }
    ]
  },
  {
    question: 'Is web development fun?',
    answers: [
      { text: 'Kinda', correct: true },
      { text: 'YES!!!', correct: true },
      { text: 'Um no', correct: true },
      { text: 'IDK', correct: true }
    ]
  },
  {
    question: 'The condition of an if/else statement is enclosed in what?',
    answers: [
      { text: 'quotes', correct: false },
      { text: 'curly brackets', correct: true },
      { text: 'parentheses', correct: false},
      { text: 'square brackets', correct: false}
    ]
  },
  {
    question: 'String values must be enclosed with __ when being assigned a variable.',
    answers: [
      { text: 'comma', correct: false },
      { text: 'curly brackets', correct: false },
      { text: 'quotes', correct: false},
      { text: 'parentheses', correct: true}
    ]
  },
  {
    question: 'What is a useful tool in tyhe Development and Debugging process for printing information to the "debugger"?',
    answers: [
      { text: 'JavaScript', correct: false },
      { text: 'treminal/bash', correct: false},
      { text: 'for loops', correct: false},
      { text: 'console.log', correct: true}
    ]
  }
  
]