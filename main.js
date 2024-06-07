const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 20;
const tileSize = canvas.width / gridSize;
let snake = [{ x: 10, y: 10 }];
let direction = { x: 0, y: 0 };
let food = { x: 15, y: 15 };
let score = 0;

function drawTile(x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
}

function drawGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  snake.forEach((segment) => drawTile(segment.x, segment.y, "lime"));
  drawTile(food.x, food.y, "red");

  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText(`Score: ${score}`, 10, 20);
}

function updateGame() {
  const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

  if (head.x === food.x && head.y === food.y) {
    score++;
    food = {
      x: Math.floor(Math.random() * gridSize),
      y: Math.floor(Math.random() * gridSize),
    };
  } else {
    snake.pop();
  }

  if (
    head.x < 0 ||
    head.x >= gridSize ||
    head.y < 0 ||
    head.y >= gridSize ||
    snake.some((segment) => segment.x === head.x && segment.y === head.y)
  ) {
    alert("Game Over! Press OK to restart.");
    snake = [{ x: 10, y: 10 }];
    direction = { x: 0, y: 0 };
    score = 0;
    food = { x: 15, y: 15 };
  }

  snake.unshift(head);
}

function gameLoop() {
  updateGame();
  drawGame();
}

function changeDirection(event) {
  const keyPressed = event.keyCode;
  const goingUp = direction.y === -1;
  const goingDown = direction.y === 1;
  const goingRight = direction.x === 1;
  const goingLeft = direction.x === -1;

  if (keyPressed === 37 && !goingRight) {
    direction = { x: -1, y: 0 };
  }
  if (keyPressed === 38 && !goingDown) {
    direction = { x: 0, y: -1 };
  }
  if (keyPressed === 39 && !goingLeft) {
    direction = { x: 1, y: 0 };
  }
  if (keyPressed === 40 && !goingUp) {
    direction = { x: 0, y: 1 };
  }
}

document.addEventListener("keydown", changeDirection);
setInterval(gameLoop, 100);
