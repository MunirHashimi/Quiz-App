const allQuestions = [
    { question: "What is 2 + 2?", answers: ["3", "4", "5", "6"], correct: 1 },
    { question: "Which language styles a webpage?", answers: ["HTML", "CSS", "JavaScript", "PHP"], correct: 1 },
    { question: "Which is a JavaScript framework?", answers: ["Django", "Flask", "React", "Laravel"], correct: 2 },
    { question: "What does HTML stand for?", answers: ["HighText Markup Language", "HyperText Markup Language", "Hyper Tool Markup Language", "None"], correct: 1 },
    { question: "What is the capital of France?", answers: ["Berlin", "Paris", "Rome", "Madrid"], correct: 1 },
    { question: "How many days in a leap year?", answers: ["365", "366", "364", "367"], correct: 1 },
    { question: "Which symbol is used for comments in JS?", answers: ["//", "<!--", "#", "--"], correct: 0 },
    { question: "What is the value of π (pi) to 2 decimal places?", answers: ["3.14", "3.15", "2.17", "3.13"], correct: 0 },
    { question: "Which tag is used for paragraphs in HTML?", answers: ["<h1>", "<div>", "<p>", "<span>"], correct: 2 },
    { question: "Which one is a CSS preprocessor?", answers: ["SASS", "React", "Node", "Vue"], correct: 0 },
    { question: "Where is the Eiffel Tower?", answers: ["Rome", "Paris", "London", "Berlin"], correct: 1 },
    { question: "Which company developed JavaScript?", answers: ["Netscape", "Microsoft", "Apple", "Google"], correct: 0 },
    { question: "What is the boiling point of water?", answers: ["90°C", "100°C", "110°C", "120°C"], correct: 1 },
    { question: "Which of these is a database?", answers: ["MongoDB", "React", "HTML", "CSS"], correct: 0 },
    { question: "Which protocol is used to access web pages?", answers: ["FTP", "HTTP", "SMTP", "TCP"], correct: 1 }
  ];
  
  
  let currentQuestionIndex = 0;
  let score = 0;
  let questions = []; // This will store 5 random questions
  
  
  const questionElement = document.getElementById("question");
  const answersElement = document.getElementById("answers");
  const nextBtn = document.getElementById("next-btn");
  
  function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    questions = getRandomQuestions(5);
    nextBtn.textContent = "Next";
    showQuestion();
  }
  
  
  function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
  
    currentQuestion.answers.forEach((answer, index) => {
      const button = document.createElement("button");
      button.textContent = answer;
      button.classList.add("btn", "btn-light", "answer-btn", "text-start");
      button.addEventListener("click", () => selectAnswer(index));
      answersElement.appendChild(button);
    });
  }
  
  function resetState() {
    nextBtn.style.display = "none";
    answersElement.innerHTML = "";
  }
  
  function selectAnswer(selectedIndex) {
    const currentQuestion = questions[currentQuestionIndex];
    const correctIndex = currentQuestion.correct;
    const buttons = document.querySelectorAll(".answer-btn");
  
    buttons.forEach((btn, index) => {
      btn.disabled = true;
      if (index === selectedIndex) {
        if (selectedIndex === correctIndex) {
          btn.classList.add("correct");
          score++;
        } else {
          btn.classList.add("wrong");
        }
      }
    });
  
    nextBtn.style.display = "block";
  }
  
  
  nextBtn.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      showScore();
    }
  });
  
  function showScore() {
    resetState();
    questionElement.textContent = `You scored ${score} out of ${questions.length}!`;
    nextBtn.textContent = "Restart Quiz";
    nextBtn.style.display = "block";
  
    // Temporarily remove the old event listener to avoid stacking
    const newNextBtn = nextBtn.cloneNode(true);
    nextBtn.parentNode.replaceChild(newNextBtn, nextBtn);
    newNextBtn.addEventListener("click", startQuiz);
  }
  
  function getRandomQuestions(count) {
    const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }
  
  
  startQuiz();
  