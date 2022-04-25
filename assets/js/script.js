const questions = [
    {
        question: 'Commonly used data types DO Not Include:',
        choices: ['strings', 'booleans', 'alerts', 'numbers']
    },
    {
        question: 'The condition in an if / else statement is enclosed with __________.',
        choices: ['quotes', 'curly brackets', 'parenthesis', 'square brackets']

    },
    {
        question: 'Arrays in JavaScript can be used to store __________.',
        choices: ['numbers and strings', 'other arrays', 'booleans', 'all of the above']
    },
    {
        question: 'String values must be enclosed within __________ while being assigned to variables.',
        choices: ['commas', 'curly brackets', 'quotes', 'parenthesis']
    },
    {
        question: 'A very useful tool used during development and debugging for printing content to the debugger is:',
        choices: ['JavaScript', 'terminal/bash', 'for loops', 'console.log']
    }
]

const question = document.querySelector('#question')
const answerSection = document.querySelector('#answer-section')
let globalIndex = 0

const startBtnHandler = (event) => {
    event.preventDefault()
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

        choice.innerText = currentQuestion.choices[i]
        choicesList.appendChild(choice)
    }
    answerSection.appendChild(choicesList)
    globalIndex++
    // querySelector will only return a the first element with the class name
    // querySelectorAll will return an array that needs to be looped over for 'click' event
    const selectedChoice = document.querySelectorAll('.choice')
    for (choice of selectedChoice) {
        choice.addEventListener('click', nextQuestion)
    }
}

const nextQuestion = () => {
    document.querySelector('#choices').remove()
    if (globalIndex < questions.length) {
        renderQuestions()
    } else {
        endQuiz()
    }
}

const endQuiz = () => {
    question.textContent = 'All Done!'
    const finalScore = document.createElement('p')
    finalScore.setAttribute('class', 'card-text')
    finalScore.textContent = `Your final score is 100.`

    document.querySelector('#initials-form').style.display = 'block'
    
    answerSection.appendChild(finalScore)

    document.querySelector('#get-initials-form').addEventListener('submit', (event) => {
        event.preventDefault()
        const initials = event.target[0].value.trim()
        finalScore.remove()
        document.querySelector('#initials-form').style.display = 'none'
        highScores()
    })
}

const highScores = () => {
    question.textContent = 'High scores'

    document.querySelector('#high-scores').style.display = 'block'
}

document.querySelector('#start-btn').addEventListener('click', startBtnHandler)