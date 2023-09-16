const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const userScore = document.getElementById('score');
const quiz = document.getElementById('quiz-container');
let currentQuestion;
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let questions = [
    {
        question: "What is my favorite food?",
        choice1: "Pizza",
        choice2: "Burgers",
        choice3: "Sushi",
        choice4: "Apples",
        answer: 1
    },
    {
        question: "What is my Favorite Artist?",
        choice1: "Taylor Swift ",
        choice2: "Bruno mars",
        choice3: "John Mayer",
        choice4: "Billy Joel",
        answer: 3
    },
    {
        question: "Where I'm from?",
        choice1: "Mexico",
        choice2: "Honduras",
        choice3: "Ecuador",
        choice4: "Colombia",
        answer: 4
    },
    {
        question: "What is my middle name",
        choice1: "Raul",
        choice2: "Felipe",
        choice3: "Sebastian",
        choice4: "Camilo",
        answer: 2
    }
];
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 4;
let startGame = () => {
    // Reset all the values to 0 when the game starts
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    userScore.innerHTML = score.toString();
    getNewQuestion();
};
let getNewQuestion = () => {
    // Check if the quiz is done 
    if (availableQuestions.length == 0) {
        quiz.style.display = "none";
        document.querySelector("main").innerHTML += '<p class="text-2xl text-center my-5">Thank you for playing</p>';
    }
    questionCounter++;
    // Generate a random number between 1 and the number of questions
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;
    // Question data type
    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });
    // Delete one question from the array of questions available
    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
    choices.forEach(choice => {
        choice.addEventListener('click', e => {
            if (!acceptingAnswers)
                return;
            acceptingAnswers = false;
            const selectedChoice = e.target;
            const selectedAnswer = selectedChoice.dataset["number"];
            console.log(selectedAnswer == currentQuestion.answer);
            const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
            selectedChoice.classList.add(classToApply);
            if (selectedAnswer == currentQuestion.answer) {
                score += CORRECT_BONUS;
                userScore.innerHTML = score.toString();
            }
            setTimeout(() => {
                selectedChoice.classList.remove(classToApply);
                getNewQuestion();
            }, 1200);
        });
    });
};
startGame();
