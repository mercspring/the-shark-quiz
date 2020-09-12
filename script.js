var questions = [{ questionText: "What color is my hair?", answers: ["Brown", "Red", "Blonde", "Gray"], correctAnswer: "Brown" },
{ questionText: "What is my dogs name?", answers: ["Hex", "Hen", "Dodo", "Almond"], correctAnswer: "Hex" },
{ questionText: "What state do I live in?", answers: ["WA", "OR", "UT", "ID"], correctAnswer: "WA" }]



function cleanUpQuiz(questionNumber){
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

        document.querySelector(`main`).appendChild(button);

    }
}

function generateQuestions(quizLength) {
    var quizItems = [];
    var i = quizLength;
    var j;
    while (i > 0) {
        j = randomWhole(quizLength)
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


