var questions = [{ questionText: "What color is my hair?", answers: ["Brown", "Red", "Blonde", "Gray"], correctAnswer: "Brown" },
{ questionText: "What is my dogs name?", answers: ["Hex", "Hen", "Dodo", "Almond"], correctAnswer: "Hex" },
{ questionText: "What state do I live in?", answers: ["WA", "OR", "UT", "ID"], correctAnswer: "WA" }]

// GLOBAL VARIBLES 
var score = 0;
var remainingQuestions = 3
var quizQuesitons = generateQuestions(remainingQuestions);
var currentQuestion = quizQuesitons[0];
// GLOBAL VARIBLES 

function cleanUpQuiz(questionNumber) {
    document.querySelector(".question").remove();
    for (i = 0; i < questions[questionNumber].answers.length; i++) {
        document.querySelector(`#answer-${i}`).remove();
    }
}
function populateQuiz(questionNumber) {
    var question = document.createElement("p");
    question.innerText = questions[questionNumber].questionText;
    question.setAttribute("class", "question");
    document.querySelector(`main`).appendChild(question);
    for (i = 0; i < questions[questionNumber].answers.length; i++) {
        var button = document.createElement("button");
        button.setAttribute("class", "quiz-answer btn-color");
        button.setAttribute("id", `answer-${i}`);
        button.innerText = questions[questionNumber].answers[i];

        button.addEventListener("click", quizButton)



        document.querySelector(`main`).appendChild(button);

    }
}

function quizButton(event) {
    if (event.currentTarget.innerText === questions[currentQuestion].correctAnswer){
        score ++;
    }
    if (remainingQuestions === 0) {
        cleanUpQuiz(currentQuestion);
        displayScores();
    } else {

        event.currentTarget;
        console.log(event.currentTarget.innerText);
        cleanUpQuiz(currentQuestion);
        currentQuestion = quizQuesitons.shift();
        populateQuiz(currentQuestion);
        remainingQuestions--;
    }
}


function displayScores() {
    var finalScore = document.createElement("p");
    finalScore.innerText = score;
    document.querySelector("main").appendChild(finalScore);

}

function generateQuestions(length) {
    var quizItems = [];
    var i = length;
    var j;
    while (i > 0) {
        j = randomWhole(length)
        if (quizItems.indexOf(j) === -1) {
            quizItems.push(j);
            i--;
        }
    }

    return quizItems

}


function randomWhole(max) {
    return Math.floor(Math.random() * max);
}


