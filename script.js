const questionElement = document.getElementById('question');
const answerInput = document.getElementById('answer');
const feedbackElement = document.getElementById('feedback');
const scoreElement = document.getElementById('score');
const timerElement = document.getElementById('timer');
const submitBtn = document.getElementById('submitBtn');
const startBtn = document.getElementById('startBtn');
const suspenseAudio = document.getElementById('suspenseAudio');
const timeOverAudio = document.getElementById('timeOverAudio');
const buttonClickAudio = document.getElementById('buttonClickAudio'); // Button click sound

let score = 0;
let timeLeft = 30;
let currentQuestion = {};

// Play click sound for buttons
function playClickSound() {
  buttonClickAudio.play();
}

// Generate a new question
function generateQuestion() {
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  currentQuestion = { num1, num2, answer: num1 + num2 };
  questionElement.textContent = `What is ${num1} + ${num2}?`;
  answerInput.value = '';
  feedbackElement.textContent = '';
}

// Start the game and timer
function startGame() {
  playClickSound(); // Play click sound when starting the game

  // Show game elements and hide the Start button
  startBtn.style.display = 'none';
  questionElement.style.display = 'block';
  answerInput.style.display = 'block';
  submitBtn.style.display = 'inline-block';

  generateQuestion();
  suspenseAudio.play(); // Start suspense music

  const timerInterval = setInterval(() => {
    timeLeft--;
    timerElement.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      gameOver(); // Call game over function when time ends
    }
  }, 1000);
}

// Check the answer when the player submits
submitBtn.addEventListener('click', () => {
  playClickSound(); // Play click sound on submit

  const userAnswer = parseInt(answerInput.value);
  if (userAnswer === currentQuestion.answer) {
    feedbackElement.textContent = 'Correct! 🎉';
    feedbackElement.style.color = 'lime';
    score++;
    scoreElement.textContent = score;
  } else {
    feedbackElement.textContent = 'Wrong! 😞';
    feedbackElement.style.color = 'red';
  }
  generateQuestion();
});

// Handle game over: Stop music and play time-over sound
function gameOver() {
  suspenseAudio.pause(); // Stop suspense sound
  timeOverAudio.play(); // Play time-over sound

  feedbackElement.textContent = `Game Over! Your score is ${score}.`;
  feedbackElement.style.color = 'yellow';
  submitBtn.disabled = true;
  answerInput.disabled = true;
}

// Attach click sound to buttons
startBtn.addEventListener('click', startGame);
submitBtn.addEventListener('click', playClickSound);
