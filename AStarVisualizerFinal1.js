function removeFromArray(openSet,ele){
  
  for(var i=openSet.length-1;i>=0;i--)
  {
    if(openSet[i]==ele)
      openSet.splice(i,1)
  }
}
function heuristic(a,b){
  var d=dist(a.i,a.j,b.i,b.j)
  return d;
}
// var noSolution=false;
var cols=50
var rows=50
var grid=new Array(cols)
var openSet=[]
var closedSet=[]
var start,end,w,h;
var path=[]
function Spot(i,j){
  this.i=i;
  this.j=j;
  this.f=0;
  this.g=0;
  this.h=0;
  this.prev=undefined;
  this.wall=false;
  if(random(1)<0.3){
    this.wall=true;
  }
  this.neighbors=[]
  this.show=function(col){
    
    fill(col)
    if(this.wall===true){
      fill(0)
    }
    noStroke()
    rect(this.i*w,this.j*h,w-1,h-1)
  }
  
  this.addNeighbors=function(grid){
    var i=this.i;
    var j=this.j;
    if(i<cols-1){
    this.neighbors.push(grid[i+1][j]);
    }
    if(i>0){
    this.neighbors.push(grid[i-1][j]);
    }
    if(j<rows-1){
    this.neighbors.push(grid[i][j+1]);
    }
    if(j>0){
    this.neighbors.push(grid[i][j-1]);
    }
    if(i>0 && j>0){
    this.neighbors.push(grid[i-1][j-1]);
    }
    if(i>0 && j<rows-1){
    this.neighbors.push(grid[i-1][j+1]);
    }
    if(i<cols-1 && j>0){
    this.neighbors.push(grid[i+1][j-1]);
    }
    if(i<cols-1 && j<rows-1){
    this.neighbors.push(grid[i+1][j+1]);
    }
    
  }
    
}
function setup() {
  createCanvas(400, 400);
  console.log('A*')
      w=width/cols;
      h=height/rows;
  for(var i=0;i<cols;i++)
    grid[i]=new Array(rows);
  console.log(grid)
  for(var i=0;i<cols;i++)
  {
    for(var j=0;j<rows;j++)
    {
      grid[i][j]=new Spot(i,j);
    }
  }
  
  for(var i=0;i<cols;i++)
  {
    for(var j=0;j<rows;j++)
    {
      grid[i][j].addNeighbors(grid);
    }
  }
  start=grid[0][0]
  end=grid[cols-1][rows-1]
  start.wall=false;
  end.wall=false;
  openSet.push(start)
}

function draw() {
  background(220);
  
  if(openSet.length>0)
  {
    var winner=0;
    for(var i=0;i<openSet.length;i++)
    {
      if(openSet[i].f<openSet[winner].f)
        winner=i;
    }
    var current=openSet[winner]
    if(current===end){
      // if(!noSolution){
      var temp=current;
      path=[]
      path.push(temp)
      while(temp.prev)
      {
        path.push(temp.prev)
        temp=temp.prev
      }
    //}
      console.log('Done!')
    }    
    removeFromArray(openSet,current)
    closedSet.push(current)
    
    var neighbors=current.neighbors;
    for(var i=0;i<neighbors.length;i++){
      var neighbor=neighbors[i]
      if(!closedSet.includes(neighbor) && !neighbor.wall){
        var tempg=current.g+1;
        var newPath=false;
        if(openSet.includes(neighbor)){
          if(tempg<neighbor.g){
            neighbor.g=tempg;
            newPath=true;
          }
        }
        else{
          newPath=true;
          neighbor.g=tempg;
          openSet.push(neighbor);
        }
        neighbor.h=heuristic(current,end)
        neighbor.f=neighbor.g+neighbor.h
        if(newPath)
        neighbor.prev=current
        
      }
      
      
      }
  }
  else
  {
    //noSolution=true;
    console.log('no solution')
    noLoop();
    return;
  }
  
  for(var i=0;i<cols;i++)
  {
    for(var j=0;j<rows;j++)
    {
      grid[i][j].show(color(255))
    }
  }
  
  for(var i=0;i<openSet.length;i++)
    openSet[i].show(color(0,255,0))
  for(var i=0;i<closedSet.length;i++)
    closedSet[i].show(color(255,0,0))
  for(var i=0;i<path.length;i++)
    path[i].show(color(0,0,255))
}
