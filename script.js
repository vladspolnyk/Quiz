document.addEventListener('DOMContentLoaded', () => {
    const questions = [
    {
        question: "Як звати головного героя, якого грає Х'ю Джекман?",
        answers: ["Чарлі Кентон", "Макс Кентон", "Сем Кентон", "Джон Кентон"],
        correct: 0
    },
    {
        question: "Як звати робота-боксера, якого знаходить Макс?",
        answers: ["Нокаут", "Атом", "Залізний Кулак", "Циклоп"],
        correct: 1
    },
    {
        question: "Ким був Чарлі Кентон до того, як боксували роботи?",
        answers: ["Тренером", "Механіком", "Боксером-профі", "Інженером"],
        correct: 2
    },
    {
        question: "Де Макс з батьком знаходять робота Атома?",
        answers: ["На звалищі", "У магазині", "На заводі", "У боксерському клубі"],
        correct: 0
    },
    {
        question: "Хто головний суперник Атома у фіналі фільму?",
        answers: ["Твін Сітіз", "Зевс", "Мідас", "Ноша"],
        correct: 1
    },
    {
        question: "Яка особлива функція є в Атома, завдяки якій Макс може ним керувати по-особливому?",
        answers: [
            "Голосове керування",
            "Режим тіньового бою (повторює рухи людини)",
            "Автопілот",
            "Дистанційний джойстик"
        ],
        correct: 1
    },
    {
        question: "Ким доводиться Максу Чарлі Кентон?",
        answers: ["Дядьком", "Тренером", "Батьком", "Другом сім'ї"],
        correct: 2
    }
];

    let score = 0;
    let qIndex = 0;
    let interval;

    const qText = document.querySelector("#question-text");
    const container = document.querySelector("#answers-container");
    const startEkran = document.querySelector("#start-screen");
    const voprosEkran = document.querySelector("#quiz-screen");
    const resultEkran = document.querySelector("#result-screen");
    const startBtn = document.querySelector("#start-btn");
    const restartBtn = document.querySelector("#restart-btn");
    const scoreText = document.querySelector("#score-display");
    const resultText = document.querySelector("#result-text");
    const timerText = document.querySelector("#timer")

    function startGame() {
        startEkran.classList.add('hide');
        resultEkran.classList.add('hide');
        voprosEkran.classList.remove('hide');
        score = 0;
        qIndex = 0;
        scoreText.textContent = `Бали ${score}`;
        showQ(questions[qIndex]);
    }

    startBtn.addEventListener('click', startGame);
    restartBtn.addEventListener('click', startGame);

    function showQ(q) {
        container.innerHTML = '';
        qText.textContent = q.question;
        for (let i = 0; i < q.answers.length; i++) {
            const btn = document.createElement('button');
            btn.textContent = q.answers[i];
            btn.classList.add('answer-btn');
            btn.addEventListener('click', () => checkAnswer(i, btn));
            container.append(btn);
        }
        clearInterval(interval)
        startTimer();
    }

    function checkAnswer(aindex, btn) {
        if (aindex === questions[qIndex].correct) {
            score++;
            console.log("Правильно");
            btn.classList.add('correct');
            scoreText.textContent = `Бали ${score}`;
        } else {
            console.log("Непрвально");
            btn.classList.add('wrong');
            document.querySelectorAll('.answer-btn')[questions[qIndex].correct].classList.add('correct');
        }

        document.querySelectorAll('.answer-btn').forEach(btn => {
            btn.disabled = true;
        });

        setTimeout(nextVopros, 1000);
    }

    function nextVopros() {
        qIndex++;
        if (qIndex < questions.length) {
            showQ(questions[qIndex]);
        } else {
            showResult();
        }
    }

    function showResult() {
        voprosEkran.classList.add('hide');
        resultEkran.classList.remove('hide');
        resultText.textContent = `Твій результат: ${score} з ${questions.length}`;
    }
    
    function startTimer() {
        let timer = 15;
        timerText.textContent = `Час: ${timer}`
        interval = setInterval(() => {
            timer-- // timer -= 1
            timerText.textContent = `Час: ${timer}`
            if (timer <= 0) {
                clearInterval(interval)
                nextVopros()
            }
        }, 1000)
    }
    
});
