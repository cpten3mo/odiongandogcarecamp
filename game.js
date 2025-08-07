const dog = document.getElementById('dog');
const obstacle = document.getElementById('obstacle');
const scoreDisplay = document.getElementById('score');

let score = 0;
let isJumping = false;
let isGameOver = false;
let gameLoop;

function jump() {
    if (isJumping || isGameOver) return;

    isJumping = true;
    dog.style.bottom = '150px';

    setTimeout(() => {
        dog.style.bottom = '0';
        setTimeout(() => {
            isJumping = false;
        }, 200); // Corresponds to the transition time
    }, 300); // Time the dog stays in the air
}

document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        jump();
    }
});

document.addEventListener('click', () => {
    jump();
});

function checkCollision() {
    const dogRect = dog.getBoundingClientRect();
    const obstacleRect = obstacle.getBoundingClientRect();

    if (
        dogRect.right > obstacleRect.left &&
        dogRect.left < obstacleRect.right &&
        dogRect.bottom > obstacleRect.top &&
        dogRect.top < obstacleRect.bottom
    ) {
        isGameOver = true;
        clearInterval(gameLoop);
        obstacle.style.animationPlayState = 'paused';
        alert(`Game Over! Your score: ${score}. Refresh to play again.`);
    }
}

obstacle.addEventListener('animationiteration', () => {
    if (!isGameOver) {
        score++;
        scoreDisplay.textContent = `Score: ${score}`;
    }
});

gameLoop = setInterval(() => {
    if (!isGameOver) {
        checkCollision();
    }
}, 50);
