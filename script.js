var questions = [{ questionText: "What color is my hair?", answers: ["Brown", "Red", "Blonde", "Gray"], correctAnswer: "Brown" },
{ questionText: "What is my dogs name?", answers: ["Hex", "Dodo", "Hen", "Almond"], correctAnswer: "Dodo" },
{ questionText: "What state do I live in?", answers: ["WA", "OR", "UT", "ID"], correctAnswer: "WA" }]

// GLOBAL VARIBLES 
var score = 0;
var quizLength = 3;
var remainingQuestions = quizLength - 1;
var quizQuesitons = generateQuestions(quizLength);
var currentQuestion = quizQuesitons.shift();
var leaderboard = [];
// GLOBAL VARIBLES 

welcome();

function welcome() {
    var welcomeText = document.createElement("p");
    welcomeText.innerText = "Welcome to my quiz! Please push the button to begin. Your final score is the time you have left remaining. Every wrong answer subtracts 10 seconds";
    var button = document.createElement("button");
    button.innerText = "Begin...";
    button.addEventListener("click", startButton);
    button.setAttribute("class", "welcome btn-color");
    welcomeText.setAttribute("class", "welcome");
    document.querySelector("main").appendChild(welcomeText);
    document.querySelector("main").appendChild(button);
}
function startButton() {
    cleanUp();
    populateQuiz();
}
function cleanUp() {
    clearThis = document.querySelectorAll("main *").length;
    console.log(clearThis)
    for (i = 0; i < clearThis; i++) {
        if (document.querySelector("main *") != null) {
            document.querySelector("main *").remove();
        }
    }

}
function populateQuiz() {
    console.log("Current Question: " + currentQuestion)
    console.log("Remaining Questions: " + remainingQuestions)
    var question = document.createElement("p");
    question.innerText = questions[currentQuestion].questionText;
    console.log(" Question:" + question.innerText)
    question.setAttribute("class", "quiz question");
    document.querySelector(`main`).appendChild(question);
    for (i = 0; i < questions[currentQuestion].answers.length; i++) {
        var button = document.createElement("button");
        button.setAttribute("class", "quiz quiz-answer btn-color");
        button.setAttribute("id", `answer-${i}`);
        button.innerText = questions[currentQuestion].answers[i];

        button.addEventListener("click", quizButton);



        document.querySelector(`main`).appendChild(button);

    }
}

function quizButton(event) {
    if (event.currentTarget.innerText === questions[currentQuestion].correctAnswer) {
        score++;
    }
    if (remainingQuestions === 0) {
        cleanUp();
        restart();
        displayScores();
    } else {

        // console.log(event.currentTarget.innerText);
        cleanUp();
        currentQuestion = quizQuesitons.shift();
        remainingQuestions--;
        populateQuiz();
    }
}

function restart() {

    remainingQuestions = quizLength - 1;
    console.log(remainingQuestions);
    quizQuesitons = generateQuestions(quizLength);
    console.log(quizQuesitons);
    currentQuestion = quizQuesitons.shift();
    console.log(currentQuestion);
}


function displayScores() {
    // Create Elements
    var finalScore = document.createElement("p");
    var tryAgainBtn = document.createElement("button");
    var toLeaderboardBtn = document.createElement("button");
    var input = document.createElement("input");
    var form = document.createElement("form");

    // Give Elements Info
    finalScore.setAttribute("class", "score current-score")
    finalScore.innerText = score;

    tryAgainBtn.setAttribute("class", "score btn-color")
    tryAgainBtn.innerText = "Try again";
    tryAgainBtn.addEventListener("click", tryAgainButton);

    input.setAttribute("class", "score");
    input.setAttribute("id", "high-score-input");
    input.setAttribute("type", "text");
    input.setAttribute("value", "????");

    toLeaderboardBtn.setAttribute("class", "score btn-color")
    toLeaderboardBtn.setAttribute("id", "submit")
    toLeaderboardBtn.innerText = "Submit";
    toLeaderboardBtn.addEventListener("click", addToLeaderboard);

    form.setAttribute("class", "score");


    // Add elements to page
    document.querySelector("main").appendChild(finalScore);
    document.querySelector("main").appendChild(tryAgainBtn);
    document.querySelector("main").appendChild(form);
    document.querySelector("main form").appendChild(toLeaderboardBtn);
    document.querySelector("main form").appendChild(input);

}

function addToLeaderboard(event) {
    event.preventDefault();
    document.querySelector("#submit").disabled = true;
    sortLeaderboard(document.querySelector("#high-score-input").value);
    processLeaderboard();

}

function processLeaderboard() {
    var list = document.createElement("ol");
    list.setAttribute("class", "score");
    document.querySelector("main").appendChild(list);
    for (i = 0; i < leaderboard.length; i++) {
        var listItem = document.createElement("li");
        listItem.textContent = `${leaderboard[i][0]}: ${leaderboard[i][1]}`;
        listItem.setAttribute("class", "score");
        document.querySelector("main ol").appendChild(listItem);
    }
}

function sortLeaderboard(initials) {

    var i = 0;

    if (leaderboard.length === 0) {
        leaderboard.push([initials, score]);
    } else if (score < leaderboard[leaderboard.length - 1][1]) {
        leaderboard.push(score);
    } else {
        while (true) {
            console.log(score >= leaderboard[i][1])
            if (score >= leaderboard[i][1]) {

                leaderboard.splice(i, 0, [initials, score])
                console.log("first if")
                break;
            }
            i++;
        }
    }


}

function tryAgainButton() {
    score = 0;
    cleanUp();
    populateQuiz();
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


