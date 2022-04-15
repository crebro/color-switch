
class CircularObstacle {
  constructor (x, y) {
    this.x = x;
    this.y = y;
    this.rotation = 0;
    this.passed = false;
  }
  
  draw () {
    push();
    noFill();
    strokeWeight(obstacleThickness);
    strokeCap(SQUARE);
    angleMode(DEGREES);
    
    translate(this.x, this.y);
    rotate(this.rotation);
    
    angleMode(RADIANS);
    
    for (let i = 0; i < colors.length; i++) {
      stroke(...colors[i]);
      arc(0, 0, obstacleDiameter, obstacleDiameter, i * ( PI / 2 ), (i * ( PI / 2 )) + PI / 2);
    }
    
    pop();
    
    this.rotate();
  }
  
  ballCollision(ball) {
    let isCollidingBottom = ball.y > this.y + (obstacleDiameter / 2) - obstacleThickness / 2 && ball.y < this.y + (obstacleDiameter / 2) + obstacleThickness / 2;
    let isCollidingUp = ball.y > this.y - (obstacleDiameter / 2) - obstacleThickness / 2 && ball.y < this.y - (obstacleDiameter / 2) + obstacleThickness / 2;
    if ((isCollidingBottom || isCollidingUp) && ball.canJump) {
      let color = getBallCollisionColor(colors, isCollidingBottom, this.rotation);
      if (color !== ball.color) {
        ball.canJump = false;
        ball.xVelocity = 10 * ( Math.round(Math.random()) ? 1 : -1 );
        failSound.play();
      }
    }
  }
  
  checkBallPass(ball) {
    if (!this.passed && ball.y < (this.y + obstaclePassRadius)) {
      this.passed = true;
      score += 1;
      tingSound.play();
    }
  }
  
  rotate () {
    this.rotation += 1;
    if (this.rotation > 360) {
      this.rotation = 0;
    }
  }
}