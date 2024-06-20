let DIM = 800;
let N = 10;
let SIZE = parseInt(DIM/N);
//let OFFSET = parseInt(DIM/4);
let OFFSET = 0;
let radius = 10;
let delay = 1;
let timer = 0;
let blocks = [];
let prevs = [];
let cur = [];
let history = [];
let dirs = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1]
];

let dir_names = {
  '1_0': 'right',
  '-1_0': 'left',
  '0_1': 'down',
  '0_-1': 'up',
}

function generateBlocks() {
  for (let i=0; i<N; i++){
    let row = [];
    for (let j=0; j<N; j++){
      let x = SIZE*i+OFFSET;
      let y = SIZE*j+OFFSET;
      
      row.push(new Block(x, y, i, j, SIZE));
      //row.push(new Block(x, y, i, j, radius));
    }
    blocks.push(row);
  }
}

function isValid(x, y) {
  if (x<0 || x>=N || y<0 || y>=N){
    return false;
  }
  return true;
}

function checkPrevPaths(x, y) {
  for (var prev of prevs) {
    if (prev[0]==x && prev[1]==y) {
      return true;
    }
  } 
  return false;
}

function walk() {
  valid_paths = [];

  for (var dir of dirs){
    let x = cur[0]+dir[0];
    let y = cur[1]+dir[1];
    
    if (!(isValid(x, y))) {
      continue;
    }
    
    if (blocks[x][y].visited) {
      continue;
    }
    
    if (blocks[cur[0]][cur[1]].dir[dir_names[dir[0].toString()+'_'+dir[1].toString()]]) {
      continue;
    }
    
    valid_paths.push([x, y]);
  }
  
  if (valid_paths.length>0) {

    let prev_x = cur[0], prev_y = cur[1];
    cur = random(valid_paths);
    let x = cur[0], y = cur[1];

    blocks[x][y].visited = true;
    blocks[x][y].prev_x = prev_x;
    blocks[x][y].prev_y = prev_y;
    blocks[prev_x][prev_y].dir[dir_names[(x-prev_x).toString()+'_'+(y-prev_y).toString()]] = true;
    
    history.push([x, y]);

  } else {

    prev = history.pop();
    let x = prev[0], y = prev[1];
    
    blocks[x][y].visited = false;
    blocks[x][y].initializeDir(); 

    if (history.length==0) {
      return;
    }

    cur = history[history.length-1];
    cur = [cur[0], cur[1]];
    //blocks[cur[0]][cur[1]].dir[dir_names[(x-cur[0]).toString()+'_'+(y-cur[1]).toString()]] = false;
    blocks[x][y].prev_x = null;
    blocks[x][y].prev_y = null;
  }
}

function setup() {
  cur = [parseInt(random(N)), parseInt(random(N))];

  createCanvas(DIM, DIM);
  generateBlocks();

  history.push([cur[0], cur[1]]);

}

function draw() {
  timer++;
  
  if(timer < delay){
    return; 
  }
  
  timer = 0;
  
  for (let i=0;i<1;i++) {
    walk();
  }
  
  background(0);
  for (var row of blocks) {
    for (var block of row) {
      block.draw(cur);
    }
  }  
  
  if (history.length==N*N+1) {
    console.log("all blocks visited");
    console.log(history);
    noLoop();
  }
}