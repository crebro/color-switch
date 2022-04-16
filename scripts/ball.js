
class Ball {
  constructor(x, y, radius) {
    this.canJump = true;
    this.x = x;
    this.y = y;
    this.accel = 1;
    this.velocity = 0;
    this.xVelocity = 0;
    this.jumpForce = 15;
    this.radius = radius;
    this.color = colors[0];
    this.gravityApplicable = false;
  }
  
  gravity() {
    if (this.gravityApplicable) {
      this.velocity += this.accel;
      this.y += this.velocity;
    }
  }
  
  draw () {
    push();
    stroke(10);
    fill(...this.color);
    circle(this.x, this.y, this.radius * 2);
    
    this.x += this.xVelocity;
    pop();
  }
  
  jump () {
    if (!this.gravityApplicable) { this.gravityApplicable = true  }
    
    if (this.canJump) {
      jumpSound.play();
      this.velocity = -this.jumpForce;
    }
  }
}