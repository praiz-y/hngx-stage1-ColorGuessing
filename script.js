const colorBox = document.getElementById('colorBox');
const colorOptions = document.querySelectorAll('.color-option');
const scoreDisplay = document.getElementById('score');
const feedbackDisplay = document.getElementById('feedback');
const restartButton = document.getElementById('restartButton');
const winSound = document.getElementById('winSound');
const lossSound = document.getElementById('lossSound');

let score = 0;

const colors = [
  '#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#A1FF33',
  '#57FF33', '#FFC300', '#C70039', '#900C3F', '#581845'
];

function rgbToHex(rgb) {
  const [r, g, b] = rgb.match(/\d+/g).map(Number);
  return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1).toUpperCase()}`;
}

function showColorBox() {
  document.querySelector('.color-options').classList.remove('fade-in');
  document.querySelector('.color-options').classList.add('fade-out');
  colorBox.classList.remove('fade-out');
  colorBox.classList.add('fade-in');
  setTimeout(() => {
    colorBox.classList.remove('fade-in');
    colorBox.classList.add('fade-out');
    showOptions();
  }, 3000);
}

function showOptions() {
  document.querySelector('.color-options').classList.remove('fade-out');
  document.querySelector('.color-options').classList.add('fade-in');
}

function generateGame() {
  const targetColor = colors[Math.floor(Math.random() * colors.length)];
  colorBox.style.backgroundColor = targetColor;

  let shuffledColors = [...colors].sort(() => Math.random() - 0.5);

  let randomIndex = Math.floor(Math.random() * colorOptions.length);
  colorOptions[randomIndex].style.backgroundColor = targetColor;

  let colorIndex = 0;
  colorOptions.forEach((button, index) => {
    if (index !== randomIndex) {
      button.style.backgroundColor = shuffledColors[colorIndex];
      colorIndex++;
    }
    button.onclick = function () {
      const guessedColor = rgbToHex(button.style.backgroundColor);
      checkGuess(guessedColor, targetColor);
    };
  });
  showColorBox();
}

function checkGuess(guessedColor, targetColor) {
  if (guessedColor === targetColor) {
    score += 10;
    feedbackDisplay.textContent = 'Correct!';
    feedbackDisplay.style.color = 'green';
    winSound.play();
  } else {
    if (score > 0) score -= 10;
    feedbackDisplay.textContent = 'Wrong! Try again!';
    feedbackDisplay.style.color = 'red';
    lossSound.play();
  }
  scoreDisplay.textContent = score;
  
  setTimeout(() => {
    generateGame();
  }, 1000); 
}

restartButton.addEventListener('click', () => {
  score = 0;
  scoreDisplay.textContent = score;
  feedbackDisplay.textContent = '';
  generateGame();
});

generateGame();
