var questions = [{ questionText: "What color is my hair?", answers: ["Brown", "Red", "Blonde", "Gray"], correctAnswer: "Brown" },
{ questionText: "What is my dogs name?", answers: ["Hex", "Dodo", "Hen", "Almond"], correctAnswer: "Dodo" },
{ questionText: "What state do I live in?", answers: ["WA", "OR", "UT", "ID"], correctAnswer: "WA" }]

// GLOBAL VARIBLES 
var score = 0;
var timeLimit = 75;
var quizLength = 3;
var remainingQuestions = quizLength - 1;
var quizQuesitons = generateQuestions(quizLength);
var currentQuestion = quizQuesitons.shift();
var leaderboard = [];
var timer = timeLimit;
var quizTimer;
// GLOBAL VARIBLES 

welcome();

document.querySelector("#show-leader").addEventListener("click", toggleLeaderboard);
document.querySelector("#home").addEventListener("click", function () {
    clearInterval(quizTimer);
    restart();
    cleanUp();
    welcome();

});

function toggleLeaderboard() {
    console.log("button worked")
    if (document.querySelector("#high-scores ol") != null) {
        cleanUpLeaderboard();
    } else {
        processLeaderboard();
    }

}

function startTimer() {
    quizTimer = setInterval(function () {
        document.querySelector("#timer").innerText = --timer;
        if (timer <= 0) {
            cleanUpTimer();
        }
    }, 1000)

}

function cleanUpTimer() {
    clearInterval(quizTimer);
    document.querySelector("#timer").innerText = timeLimit;

}

function welcome() {
    var welcomeHeading = document.createElement("h4");
    welcomeHeading.innerText = "Welcome to my quiz";
    welcomeHeading.setAttribute("class", "welcome");
    var welcomeText = ["Please push the button to begin.", "Your final score is the time reamaining.", "Every question you get wrong subtracts 10 seconds.", "Good Luck!"]
    document.querySelector("main").appendChild(welcomeHeading);
    for (i = 0; i < welcomeText.length; i++) {
        var welcome = document.createElement("p")
        welcome.innerText = welcomeText[i];
        welcome.setAttribute("class", "welcome");
        document.querySelector("main").appendChild(welcome);
    }
    var button = document.createElement("button");
    button.innerText = "Begin...";
    button.addEventListener("click", startButton);
    button.setAttribute("class", "welcome btn-color");
    document.querySelector("#timer").innerText = timeLimit;

    document.querySelector("main").appendChild(button);
}
function startButton() {
    cleanUp();
    startTimer();
    populateQuiz();
}
function cleanUp() {
    cleanUpLeaderboard();
    cleanUpQuiz();
}
function cleanUpLeaderboard() {
    clearThis = document.querySelectorAll("#high-scores *").length;
    console.log(clearThis)
    for (i = 0; i < clearThis; i++) {
        if (document.querySelector("#high-scores *") != null) {
            document.querySelector("#high-scores *").remove();
        }
    }

}

function cleanUpQuiz() {
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
    if (event.currentTarget.innerText != questions[currentQuestion].correctAnswer) {
        timer = timer - 10;
    }
    if (remainingQuestions === 0) {
        cleanUpTimer();
        cleanUp();
        score = timer;
        displayScores();
        console.log("final score " + score);
        console.log("final timer" + timer);
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
    timer = timeLimit;
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
    finalScore.innerText = "Your score is: " + score;

    tryAgainBtn.setAttribute("class", "score btn-color")
    tryAgainBtn.setAttribute("id", "try-again")
    tryAgainBtn.innerText = "Try again";
    tryAgainBtn.addEventListener("click", tryAgainButton);

    input.setAttribute("class", "score");
    input.setAttribute("id", "initials-input");
    input.setAttribute("type", "text");
    input.setAttribute("value", "??");

    toLeaderboardBtn.setAttribute("class", "score btn-color")
    toLeaderboardBtn.setAttribute("id", "submit")
    toLeaderboardBtn.innerText = "Submit";
    // toLeaderboardBtn.disabled = true;

    toLeaderboardBtn.addEventListener("click", addToLeaderboard);
    // input.addEventListener("click", checkForInput);

    form.setAttribute("class", "score");


    // Add elements to page
    document.querySelector("main").appendChild(finalScore);
    // document.querySelector("main").appendChild(form);
    document.querySelector("main").appendChild(input);
    document.querySelector("main").appendChild(toLeaderboardBtn);
    document.querySelector("main").appendChild(tryAgainBtn);

}
function checkForInput() {
    if (document.querySelector("#initials-input").value != "") {
        document.querySelector("#submit").disabled = false;
    } else {
        document.querySelector("#submit").disabled = true;
    }
}
function addToLeaderboard(event) {
    event.preventDefault();
    initials = document.querySelector("#initials-input").value;
    console.log("inititials " + initials);
    document.querySelector("#submit").disabled = true;
    sortLeaderboard(initials);
    processLeaderboard();

}

function processLeaderboard() {
    cleanUpLeaderboard();
    var list = document.createElement("ol");
    list.setAttribute("class", "score");
    document.querySelector("#high-scores").appendChild(list);
    for (i = 0; i < leaderboard.length; i++) {
        var listItem = document.createElement("li");
        console.log(listItem);
        console.log(leaderboard)
        listItem.textContent = `${leaderboard[i][0]}: ${leaderboard[i][1]}`;
        listItem.setAttribute("class", "score");
        document.querySelector("#high-scores ol").appendChild(listItem);
    }
}

function sortLeaderboard(initials) {

    var i = 0;

    if (leaderboard.length === 0) {
        leaderboard.push([initials, score]);
    } else if (score < leaderboard[leaderboard.length - 1][1]) {
        leaderboard.push([initials, score]);
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
    restart();
    cleanUp();
    startTimer();
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


