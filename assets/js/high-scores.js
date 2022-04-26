const getScores = () => {
    const oldData = JSON.parse(localStorage.getItem('code-quiz'))
    console.log(oldData)
    // displayScores(oldData)
    sortScores(oldData)
}

const sortScores = (arr) => {
    const sortedScores = arr.sort((a, b) => {
        // > 0 sort b before a
        // < 0 sort a before b
        return b.score - a.score
    })
    displayScores(sortedScores)
}

const displayScores = (arr) => {

    for (let i = 0; i < arr.length; i++) {
        const scoreEl = document.createElement('li')
        scoreEl.setAttribute('class', 'list-group-item-info')

        scoreEl.innerHTML = `${arr[i].initials} - ${arr[i].score}`
        document.querySelector('#high-scores-ol').appendChild(scoreEl)
    }
}

getScores()