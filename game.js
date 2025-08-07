const dog = document.getElementById('dog');
const obstacle = document.getElementById('obstacle');
const scoreElement = document.getElementById('score');

let isJumping = false;
let score = 0;

document.addEventListener('keydown', jump);

function jump(event) {
  if (event.code === 'Space' && !isJumping) {
    isJumping = true;
    let jumpHeight = 100;
    dog.style.bottom = `${jumpHeight}px`;

    setTimeout(() => {
      dog.style.bottom = `0px`;
      isJumping = false;
    }, 500);
  }
}

function checkCollision() {
  const dogRect = dog.getBoundingClientRect();
  const obsRect = obstacle.getBoundingClientRect();

  if (
    dogRect.left < obsRect.left + obsRect.width &&
    dogRect.left + dogRect.width > obsRect.left &&
    dogRect.bottom < obsRect.bottom &&
    dogRect.bottom + dogRect.height > obsRect.top
  ) {
    alert('Game Over! Final Score: ' + score);
    window.location.reload();
  }
}

function updateScore() {
  score++;
  scoreElement.textContent = `Score: ${score}`;
}

setInterval(() => {
  checkCollision();
  updateScore();
}, 100);
