const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('answer'));
const questionCounterText = document.getElementById('questionCounter');
const scoreText = document.getElementById('score');

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: 'What is the unit of electrical resistance?',
        choice1: 'Ampere',
        choice2: 'Volt',
        choice3: 'Ohm',
        choice4: 'Watt',
        answer: 3,
    },
    {
        question: "Which of the following particles is negatively charged?",
        choice1: "Proton",
        choice2: "Neutron",
        choice3: "Electron",
        choice4: "Positron",
        answer: 3,
    },
    {
        question: "The energy of a photon is proportional to its:",
        choice1: "Velocity",
        choice2: "Wavelength",
        choice3: "Frequency",
        choice4: "Mass",
        answer: 3,
    },
    {
        question: "Which law states that the force between two charges is inversely proportional to the square of the distance between them?",
        choice1: "Ohm's Law",
        choice2: "Coulomb's Law",
        choice3: "Newton's Third Law",
        choice4: "Faraday's Law",
        answer: 2,
    },
    {
        question: "What is the escape velocity from Earth's surface?",
        choice1: "7.9 km/s",
        choice2: "11.2 km/s",
        choice3: " 9.8 km/s",
        choice4: "5.6 km/s",
        answer: 2,
    },
    {
        question: "The Heisenberg Uncertainty Principle is associated with:",
        choice1: " The dual nature of light",
        choice2: "The impossibility of simultaneously knowing both position and momentum",
        choice3: "The equivalence of mass and energy",
        choice4: "The relationship between current and voltage",
        answer: 2,
    },
    {
        question: " What is the principle of superposition in wave theory?",
        choice1: "The total displacement is the sum of individual displacements",
        choice2: "The angle of incidence equals the angle of reflection",
        choice3: "Energy cannot be created or destroyed",
        choice4: "The frequency of a wave is proportional to its speed",
        answer: 1,
    },
    {
        question: "Which phenomenon demonstrates the particle nature of light?",
        choice1: "Diffraction",
        choice2: "Interference",
        choice3: "Photoelectric Effect",
        choice4: "Polarization",
        answer: 3,
    },
    {
        question: "The period of a pendulum depends on:",
        choice1: "Its mass and length",
        choice2: "Its length and gravitational acceleration",
        choice3: "Its amplitude and length",
        choice4: "Its mass and amplitude",
        answer: 2,
    },
    {
        question: "In which type of material does the speed of sound travel fastest",
        choice1: "Air",
        choice2: "Water",
        choice3: "Steel",
        choice4: "Vacuum",
        answer: 3,
    },
];


const CORRECT_BONUS = 1;
const MAX_QUESTIONS = 10;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
};

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);
        return window.location.assign("physics-end.html");
    }

    questionCounter++;
    questionCounterText.innerText = `${questionCounter}/${MAX_QUESTIONS}`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach((choice) => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if(classToApply === 'correct') {
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout( () => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000)  
    });
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
}

startGame();
