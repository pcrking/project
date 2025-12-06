
  const gameArea = document.getElementById('gameArea');
  const playerCar = document.getElementById('playerCar');
  const livesDisplay = document.getElementById('lives');
  const scoreDisplay = document.getElementById('score');
  const restartBtn = document.getElementById('restartBtn');

  let gameWidth = gameArea.offsetWidth;
  let carWidth = playerCar.offsetWidth;
  let carX = (gameWidth - carWidth) / 2;
  let lives = 3;
  let score = 0;
  let speed = 4;
  let gameOver = false;

  // Move player
  document.addEventListener('keydown', e => {
    if (gameOver) return;
    if (e.key === 'ArrowLeft' && carX > 0) {
      carX -= 20;
    } else if (e.key === 'ArrowRight' && carX < gameWidth - carWidth) {
      carX += 20;
    }
    playerCar.style.left = carX + 'px';
  });

  // Create obstacle
  function createObstacle() {
    if (gameOver) return;

    const obstacle = document.createElement('div');
    obstacle.classList.add('obstacle');
    const lane = Math.floor(Math.random() * 8) * 45;
    obstacle.style.left = lane + 'px';
    gameArea.appendChild(obstacle);

    let obstacleY = -100;
    const move = setInterval(() => {
      if (gameOver) {
        clearInterval(move);
        return;
      }

      obstacleY += speed;
      obstacle.style.top = obstacleY + 'px';

      if (obstacleY > 600) {
        clearInterval(move);
        gameArea.removeChild(obstacle);
        score += 10;
        scoreDisplay.textContent = score;

        if (score % 100 === 0) {
          speed += 1;
        }
      }

      // Collision
      if (
        obstacleY + 80 > 500 && obstacleY < 600 &&
        parseInt(obstacle.style.left) < carX + carWidth &&
        parseInt(obstacle.style.left) + 40 > carX
      ) {
        clearInterval(move);
        gameArea.removeChild(obstacle);
        lives--;
        livesDisplay.textContent = lives;

        if (lives <= 0) {
          endGame();
        }
      }

    }, 20);
  }

  // End game
  function endGame() {
    gameOver = true;
    alert("💥 Game Over! Your Score: " + score);
    restartBtn.style.display = "block";
  }

  // Reset game
  function resetGame() {
    lives = 3;
    score = 0;
    speed = 4;
    carX = (gameWidth - carWidth) / 2;
    playerCar.style.left = carX + 'px';
    livesDisplay.textContent = lives;
    scoreDisplay.textContent = score;
    restartBtn.style.display = 'none';
    gameOver = false;
  }

  restartBtn.addEventListener('click', resetGame);

  // Run
  setInterval(() => {
    if (!gameOver) createObstacle();
  }, 1300);
