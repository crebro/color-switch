let obstacleDiameter = 250;
let score = 0;
let obstacleThickness = 20;
let obstaclePassRadius = obstacleDiameter / 2 - 30;
let colors = [[255, 0, 0], [0, 255, 0], [0, 0, 255], [255, 255, 0]]



let ball;
let onGround = false;
let obstacles = [];
let tingSound;
let failSound;
let jumpSound;

function setup() {
  createCanvas(windowWidth, windowHeight);
  ball = new Ball(windowWidth / 2, windowHeight / 2, 20);
  obstacles.push(new CircularObstacle(windowWidth / 2, ball.y - 200));
  obstacles.push(new CircularObstacle(windowWidth / 2, obstacles[obstacles.length - 1].y - 600));
  obstacles.push(new CircularObstacle(windowWidth / 2, obstacles[obstacles.length - 1].y - 600));
  tingSound = loadSound('assets/ting.wav');
  failSound = loadSound('assets/fail.wav');
  jumpSound = loadSound('assets/jump.wav');
}

function draw() {
  background(0);
  
  push();
  fill(255);
  textSize(40);
  text(`Score: ${score}`, 25, 50)
  pop();
  
  if (ball.y < windowHeight / 2) {
    translate(0, windowHeight / 2 - ball.y);
  }

  for (let i = 0; i < obstacles.length; i++) {
    let obstacle = obstacles[i];
    obstacle.draw();
    obstacle.checkBallPass(ball);
    obstacle.ballCollision(ball);
  }
  
  if (obstacles[0].y > ball.y + 600 ) {
    obstacles = obstacles.splice(1, obstacles.length);
    obstacles.push(new CircularObstacle(windowWidth / 2, obstacles[obstacles.length - 1].y - 600));
  }
  
  ball.draw();
  
  if (ball.y < windowHeight - 20) {
      ball.gravity();
  } else if (!onGround) {
    ball.y = windowHeight - 20;
    onGround = true;
  }

}

function keyPressed() {
  if (keyCode === 32) {
    ball.jump();
  }
}

function touchStarted() {
  ball.jump();
  return false;
}
