class Block {
  constructor(x, y, i, j, r) {
    this.x = x;
    this.y = y;
    this.i = i;
    this.j = j;
    this.r = r;
    
    this.center_x = this.x + this.r/2;
    this.center_y = this.y + this.r/2;
    
    this.start = [cur[0], cur[1]];

    this.initializeDir();
    
    this.visited = false;
    
    this.red = 0;
    this.green = 0;
    this.blue = 200;
  }
  
  initializeDir() {
    this.dir = {
      'up': false,
      'down': false,
      'left': false,
      'right': false,
    }
    this.prev_x = null;
    this.prev_y = null;
  }
  
  addColor() {
    this.red += 100;
  }
  
  subtractColor() {
    this.red -= 100;
  }

  draw(cur) {
    push();
    
    let c;
    if (this.visited) {
      if ((cur[0]==this.i) && (cur[1]==this.j)) {
        c = color(this.red+200, this.green, this.blue);  
      } else {
        c = color(this.red, this.green, this.blue);  
      }
    } else {
      c = 100;
    }
    
    if ((this.i==this.start[0]) && (this.j==this.start[1])){
      c = color(0, 200, 0);  
    }

    fill(c);
    stroke(50);
    strokeWeight(3);
    rect(this.x, this.y, this.r, this.r);
    
    stroke(255);
    strokeWeight(5);
    
    
    if ((this.prev_x!=null && this.prev_y!=null)){
      line(this.center_x, this.center_y, this.center_x+(this.prev_x-this.i)*this.r/2, this.center_y+(this.prev_y-this.j)*this.r/2);
        if (this.dir['right']){
        line(this.center_x, this.center_y, this.center_x + this.r/2, this.center_y);
      } else if (this.dir['left']){
        line(this.center_x, this.center_y, this.center_x - this.r/2, this.center_y);
      } else if (this.dir['up']){
        line(this.center_x, this.center_y, this.center_x, this.center_y - this.r/2);
      } else if (this.dir['down']){
        line(this.center_x, this.center_y, this.center_x, this.center_y + this.r/2);
      }
    }
    pop();
  }
}