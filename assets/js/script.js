const questions = [
    {
        question: 'Commonly used data types DO Not Include:',
        choices: [{ answer: 'strings', isCorrect: false }, { answer: 'alerts', isCorrect: true }, { answer: 'booleans', isCorrect: false }, { answer: 'numbers', isCorrect: false }]
    },
    {
        question: 'The condition in an if / else statement is enclosed with __________.',
        choices: [{ answer: 'quotes', isCorrect: false }, { answer: 'curly brackets', isCorrect: false }, { answer: 'parenthesis', isCorrect: true }, { answer: 'square brackets', isCorrect: false }]
    },
    {
        question: 'Arrays in JavaScript can be used to store __________.',
        choices: [{ answer: 'numbers and strings', isCorrect: false }, { answer: 'other arrays', isCorrect: false }, { answer: 'booleans', isCorrect: false }, { answer: 'all of the above', isCorrect: true }]
    },
    {
        question: 'String values must be enclosed within __________ while being assigned to variables.',
        choices: [{ answer: 'commas', isCorrect: false }, { answer: 'curly brackets', isCorrect: false }, { answer: 'quotes', isCorrect: true }, { answer: '  parenthesis', isCorrect: false }]
    },
    {
        question: 'A very useful tool used during development and debugging for printing content to the debugger is:',
        choices: [{ answer: 'JavaScript', isCorrect: false }, { answer: 'terminal/bash', isCorrect: false }, { answer: 'for loops', isCorrect: true }, { answer: '  console.log', isCorrect: true }]
    }
]

const question = document.querySelector('#question')
const answerSection = document.querySelector('#answer-section')
let globalIndex = 0

let time = 300
// interval variable that's called to start/stop
let timer

const countdownTimer = () => {
    const counter = document.querySelector('#counter')
    if (time > 0) {
        counter.innerHTML = time
        time--
    } else if (time === 0) {
        document.querySelector('#choices').remove()
        endQuiz()
    }
}

// function to start the timer
const startTimer = () => {
    timer = setInterval(countdownTimer, 1000)
}

// function to stop the timer
const stopTimer = () => {
    clearInterval(timer)
}

const startBtnHandler = (event) => {
    event.preventDefault()
    startTimer()
    console.log('start quiz button clicked')

    // remove start-text and start button after clicking start quiz button
    document.querySelector('#start-text').remove()
    document.querySelector('#start-btn').remove()

    renderQuestions()
}

const renderQuestions = () => {

    const currentQuestion = questions[globalIndex]
    question.textContent = currentQuestion.question

    const choicesList = document.createElement('div')
    choicesList.setAttribute('class', 'list-group')
    choicesList.setAttribute('id', 'choices')

    for (let i = 0; i < currentQuestion.choices.length; i++) {
        const choice = document.createElement('button')
        choice.setAttribute('class', 'list-group-item list-group-item-action choice')

        // set the choice text and data-isCorrect attribute
        choice.innerText = currentQuestion.choices[i].answer
        choice.setAttribute('data-isCorrect', `${currentQuestion.choices[i].isCorrect}`)

        choicesList.appendChild(choice)
    }
    answerSection.appendChild(choicesList)
    globalIndex++
    // querySelector will only return a the first element with the class name
    // querySelectorAll will return an array that needs to be looped over for 'click' event
    const selectedChoice = document.querySelectorAll('.choice')
    for (choice of selectedChoice) {
        // 'click' event must be tracked as an event in the callback nextQuestion
        choice.addEventListener('click', checkAnswer)
    }
}

const checkAnswer = (event) => {
    const answerSection = document.querySelector('#check-answer-section')
    // const correctAnswer = document.querySelector('#correct')
    // const wrongAnswer = document.querySelector('#wrong')
    const answer = document.createElement('h4')
    answer.setAttribute('class', 'fw-light fst-italic clear-answer')
    // answer.setAttribute('id', 'check-answer')

    if (event.target.dataset.iscorrect === 'true') {
        answerSection.style.display = 'block'
        answer.innerText = 'Correct!'
        answerSection.appendChild(answer)
        // correctAnswer.style.display = 'block'
    }
    if (event.target.dataset.iscorrect === 'false') {
        answerSection.style.display = 'block'
        answer.innerText = 'Wrong!'
        time -= 15
        answerSection.appendChild(answer)
        // wrongAnswer.style.display = 'block'
    }
    nextQuestion()
}

const nextQuestion = (event) => {
    document.querySelector('#choices').remove()
    if (globalIndex < questions.length) {
        renderQuestions()
        clearAnswer()
    } else {
        clearAnswer()
        endQuiz()
    }
}

const clearAnswer = (event) => {
    const previousAnswer = document.querySelectorAll('.clear-answer')
    // console.log(previousAnswer)
    // console.log(typeof previousAnswer)
    // console.log(previousAnswer.length)
    if (previousAnswer.length >= 2) {
        console.log('on the second question')
        console.log(previousAnswer[0])
        previousAnswer[0].remove()
    }
}

const endQuiz = () => {
    stopTimer()
    const getScore = document.querySelector('#counter').innerText
    console.log(getScore)
    question.textContent = 'All Done!'
    const finalScore = document.createElement('p')
    finalScore.setAttribute('class', 'card-text')
    finalScore.textContent = `Your final score is ${getScore}.`

    document.querySelector('#initials-form').style.display = 'block'

    answerSection.appendChild(finalScore)

    document.querySelector('#get-initials-form').addEventListener('submit', (event) => {
        event.preventDefault()
        const initials = event.target[0].value.trim()
        finalScore.remove()
        document.querySelector('#initials-form').style.display = 'none'
        // highScores()
        displayScore(initials, getScore)
        saveToStorage(initials, getScore)
    })
}

// const highScores = () => {
//     question.textContent = 'High scores'
//     document.querySelector('#high-scores').style.display = 'block'
// }

const displayScore = (initials, score) => {

    // serialize the initials and score for localStorage
    // const scoreObj = { initials, score }
    // const scoreObjSerialized = JSON.stringify(scoreObj)

    // localStorage.setItem(`${initials}`, `${score}`)
    // console.log(localStorage)

    document.querySelector('#high-scores').style.display = 'block'
    const scoreListEl = document.createElement('li')
    scoreListEl.setAttribute('class', 'list-group-item-primary')

    scoreListEl.innerText = `${initials} - ${score}`
    document.querySelector('#high-scores-ol').appendChild(scoreListEl)
}

const saveToStorage = (initials, score) => {
    const scoreObj = { initials, score }
    // check to see if scores already exist in localStorage
    // if not, then create an array to store scores in localStorage
    if (localStorage.getItem('code-quiz') === null) {
        localStorage.setItem('code-quiz', '[]')
    }

    // get existing data and push new data into existing data
    // JSON.parse will return a JavaScript object array instead of strings
    const oldData = JSON.parse(localStorage.getItem('code-quiz'))
    oldData.push(scoreObj)

    // resave back to localStorage
    localStorage.setItem('code-quiz', JSON.stringify(oldData))
}

const init = () => {
    document.querySelector('#start-btn').addEventListener('click', startBtnHandler)
}

init()