var questions = [{ questionText: "What color is my hair?", answer1: "brown", answer2: "red", answer3: "blonde", answer4: "grey", correctAnswer: "brown" },
{ questionText: "What is my dogs name?", answer1: "Hen", answer2: "hex", answer3: "hover", answer4: "dodo", correctAnswer: this.answer1 },
{ questionText: "What state do I live in?", answers: ["WA", "OR", "UT", "ID"], correctAnswer: "WA" }]


var k = 0;
// var answerBtn0 = document.querySelector("#answer-0");
// var answerBtn0 = document.querySelector("#answer-1");
// var answerBtn0 = document.querySelector("#answer-2");
// var answerBtn0 = document.querySelector("#answer-3");

for (i = 0; i < questions[2].answers.length; i++) {
    var button = document.createElement("button");
    button.setAttribute("class", "btn quiz-answer btn-color");
    button.setAttribute("id", `answer-${i}`);
    button.innerText = questions[2].answers[i];
    if (k === 0) {
        document.querySelector(".column-1").appendChild(button)
        k = 1;
    } else {
        document.querySelector(".column-2").appendChild(button)
        k = 0;
    }

}



