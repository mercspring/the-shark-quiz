var questions = [{ questionText: "How many bones does a shark have in it's body?", answers: ["0", "37", "95", "257"], correctAnswer: "0" },
{ questionText: "What type of scales do sharks have?", answers: ["Cycloid", "Ganoid", "Placoid", "Cosmoid"], correctAnswer: "Placoid" },
{ questionText: "How many teeth do sharks normally have?", answers: ["10-15", "20-25", "40-45", "100-150"], correctAnswer: "40-45" },
{ questionText: "What is the oldest known living species of shark?", answers: ["Magalodon Shark", "Goblin Shark", "Porbeagle Shark", "Frilled Shark"], correctAnswer: "Goblin Shark" },
{ questionText: "Do sharks hunt in packs?", answers: ["Yes", "No", "Sometimes"], correctAnswer: "Sometimes" },
{ questionText: "How often do sharks sleep?", answers: ["Once a day", "Twice a day", "Sharks never sleep"], correctAnswer: "Sharks never sleep" },
{ questionText: "How long are frilled sharks pregnant before giving birth?", answers: ["9 months", "2 years", "3 1/2 years", "5 years"], correctAnswer: "3 1/2 years" },
{ questionText: "How many sharks are killed every year by humans?", answers: ["500,000", "1,000,000", "40,000,000", "100,000,000"], correctAnswer: "100,000,000" },
{ questionText: "On average how much food does a great white shark eat every year?", answers: ["1 ton", "11 tons", "23 tons", "30 tons"], correctAnswer: "11 tons" },
{ questionText: "Which of the following oceans don't have sharks?", answers: ["Pacific Ocean", "South Ocean", "Artic Ocean", "Atlantic Ocean", "Indian Ocean", "None of the above"], correctAnswer: "None of the above" }]

// GLOBAL VARIBLES 
var score = 0;
var timeLimit = 75;
var quizLength = 6;
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
        document.querySelector("#show-leader").textContent = "Show Leaders"
    } else {
        processLeaderboard();
        document.querySelector("#show-leader").textContent = "Hide Leaders"
    }

}

function startTimer() {
    quizTimer = setInterval(function () {
        document.querySelector("#timer").innerText = --timer;
        if (timer <= 0) {
            cleanUpTimer();
            cleanUp();
            displayScores();
        }
    }, 1000)

}

function cleanUpTimer() {
    clearInterval(quizTimer);
    document.querySelector("#timer").innerText = timeLimit;

}

function welcome() {
    var welcomeHeading = document.createElement("h4");
    welcomeHeading.innerText = "Welcome to the Shark Quiz";
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
    console.log("remaining questions", remainingQuestions);
    quizQuesitons = generateQuestions(quizLength);
    console.log("quiz questions", quizQuesitons);
    currentQuestion = quizQuesitons.shift();
    console.log("current question", currentQuestion);
    timer = timeLimit;
}


function displayScores() {
    // Create Elements
    var finalScore = document.createElement("p");
    var tryAgainBtn = document.createElement("button");
    var toLeaderboardBtn = document.createElement("button");
    var input = document.createElement("input");
    var form = document.createElement("form");
    var instructions = document.createElement("p");

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
    input.setAttribute("value", "");

    instructions.setAttribute("class", "score")
    instructions.setAttribute("id", "instructions");
    instructions.innerText = "Please add your initials and hit submit to add your score to the leaderboard"

    toLeaderboardBtn.setAttribute("class", "score btn-color")
    toLeaderboardBtn.setAttribute("id", "submit")
    toLeaderboardBtn.innerText = "Submit";
    // toLeaderboardBtn.disabled = true;

    toLeaderboardBtn.addEventListener("click", addToLeaderboard);
    // input.addEventListener("click", checkForInput);

    form.setAttribute("class", "score");


    // Add elements to page
    document.querySelector("main").appendChild(finalScore);
    document.querySelector("main").appendChild(instructions);
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
    initials = document.querySelector("#initials-input").value;

    if (!initials || initials.length > 2) {

        document.querySelector("#instructions").innerText = "Initials must be one or two characters"
        return
    }


    event.preventDefault();
    console.log("inititials " + initials);
    document.querySelector("#submit").disabled = true;
    sortLeaderboard(initials);
    processLeaderboard();

}

function processLeaderboard() {
    cleanUpLeaderboard();
    var heading = document.createElement("h4");
    var list = document.createElement("ol");
    if (localStorage.leaders != "") {
        leaderboard = JSON.parse(localStorage.getItem("leaderboard"));
    }
    list.setAttribute("class", "score");
    heading.setAttribute("class", "score");
    heading.innerText = "Leaderboard";
    document.querySelector("#high-scores").appendChild(heading);
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
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));


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
        j = randomWhole(questions.length)
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


