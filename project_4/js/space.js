//Game Board
var width = 600, height = 400
var draw = SVG('pong').size(width, height)
draw.viewbox(0,0,600,400)
var background = draw.rect(width, height).fill('#1B1C1F')
var line = draw.line(width/2, 0, width/2, height)
line.stroke({ width: 5, color: '#fff'})


//Player Paddles
var padWid = 10, padHt = 50
var leftPad = draw.rect(padWid, padHt)
leftPad.x(0).cy(height/2).fill('#C80C40')
var rightPad = leftPad.clone()
rightPad.x(width-padWid).fill('#381BBD')

//Ping Pong Ball
var pongSize = 10
var ball = draw.circle(pongSize)
ball.center(width/2, height/2).fill('#C87611')
//ping pong speed
var xspeed = 0, yspeed = 0


//Scoreboard
var player1 = player2 = 0
var p1Score = draw.text(player1+'').font({
  size: 32,
  family: 'Bungee, sans-serif',
  anchor: 'end',
  fill: '#fff'
}).move(width/2-10, 10)
var p2Score = p1Score.clone()
  .text(player2+'')
  .font('anchor', 'start')
  .x(width/2+10)

// Diffculty Level
var difficulty = 4

function update(dt) {
  // move the ball by its velocity
  ball.dmove(xspeed*dt, yspeed*dt)

  var cx = ball.cx()
    , cy = ball.cy()
  
  var leftPadCy = leftPad.cy()

  var dy = Math.min(difficulty, Math.abs(cy - leftPadCy))
 leftPadCy += cy > leftPadCy ? dy : -dy

  //Keep the movement inside the canvas
  leftPad.cy(Math.max(padHt/2, Math.min(height-padHt/2, leftPadCy)))

  if ((yspeed < 0 && cy <= 0) || (yspeed > 0 && cy >= height)) {
    yspeed = -yspeed
  }
  
  var leftPadY = leftPad.y()
    , rightPadY = rightPad.y()

  //Hit Detection
  if((xspeed < 0 && cx <= padWid && cy > leftPadY && cy < leftPadY + padHt) ||
     (xspeed > 0 && cx >= width - padWid && cy > rightPadY && cy < rightPadY + padHt)) {

    yspeed = (cy - ((xspeed < 0 ? leftPadY : rightPadY) + padHt/2)) * 7 

    xspeed = -xspeed * 1.15
  } else

  if ((xspeed < 0 && cx <= 0) || (xspeed > 0 && cx >= width)) {

    if(xspeed < 0) { ++player2 }
    else { ++player1 }
    
    reset()

    p1Score.text(player1+'')
    p2Score.text(player2+'')
  }
  
  var rightPadY = rightPad.y()

  if (rightPadY <= 0 && padControl == -1) {
    rightPad.cy(padHt/2)
  } else if (rightPadY >= height-padHt && padControl == 1) {
    rightPad.y(height-padHt)
  } else {
    rightPad.dy(padControl*padSpeed)
  }
  
  ball.fill(ballColor.at(1/width*ball.x()))
  
}

var lastTime, animFrame

function callback(ms) {
  if (lastTime) {
    update((ms-lastTime)/1000)
  }

  lastTime = ms
  animFrame = requestAnimationFrame(callback)
}


callback()

var padControl = 0
  , padSpeed = 5

SVG.on(document, 'keydown', function(e) {
  padControl = e.keyCode == 40 ? 1 : e.keyCode == 38 ? -1 : 0
  e.preventDefault()
})

SVG.on(document, 'keyup', function(e) {
  padControl = 0
  e.preventDefault()
})

draw.on('click', function() {
  if(xspeed === 0 && yspeed === 0) {
    xspeed = Math.random() * 500 - 150
    yspeed = Math.random() * 500 - 150
  }
})


//Ball Color changes based on player side
var ballColor = new SVG.Color('#FF4C7B')
ballColor.morph('#FFF23D')


// Displays effect for winning player
function victory() {

  var paddle = ball.cx() > width/2 ? leftPad : rightPad

  var gradient = draw.gradient('radial', function(stop) {
    stop.at(0, paddle.attr('fill'), 1)
    stop.at(1, paddle.attr('fill'), 0)
  })

  var blast = draw.circle(300)
  blast.center(ball.cx(), ball.cy()).fill(gradient)

  blast.animate(1000, '>').opacity(0).after(function() {
    blast.remove()
  })
}


function reset() {
  victory()
    
  xspeed = 0
  yspeed = 0

  ball.animate(100).center(width/2, height/2)

  leftPad.animate(100).cy(height/2)
  rightPad.animate(100).cy(height/2)
}


/*


 */