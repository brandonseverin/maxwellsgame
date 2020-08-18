console.log('r/place');

var canvas = document.querySelector('canvas');

// Define height and width of canvas
// to be that of window dimensions
canvas.width = window.innerWidth;
canvas.height = window.innerHeight; 

// c stands for context 
var c = canvas.getContext('2d');

// Create a rectangle
// Fill rect takes what ever fill style before
//c.fillStyle = 'rgba(255,0,0,0.1)'; // color rectangles below
//c.fillRect(100, 100, 100, 100); // colour rectangle

// Line
//c.beginPath();
//c.moveTo(50,300);
//c.lineTo(300,100);
//c.lineTo(400,300);
//c.strokeStyle = 'blue'; // add colour to line
//c.stroke();

// Loading Please wait initially to canvas before being cleared
c.fillStyle = 'black';
c.fillText('Loading, Please wait', innerWidth/2, innerHeight/2);

var mouse = {
	x: undefined,
	y: undefined
}

// Mouse movemennt interaction event
window.addEventListener('mousemove', function(event) {
	mouse.x = event.x;
	mouse.y = event.y;

	console.log(event)
	// gate control
	//gateY = event.clientY - gateHeight/2;
})

// Browser resize window event
window.addEventListener('resize', function() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	init()
})

// Add event listeners for arrow key control of gate
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
// Mouse and touch input
document.addEventListener('mousedown', mouseDownHandler, false);
document.addEventListener('mouseup', mouseUpHandler, false);
document.addEventListener("touchstart", touchStartHandler, false);
//document.addEventListener('touchmove', process_touchmove, false);
//document.addEventListener('touchcancel', process_touchcancel, false);
document.addEventListener('touchend', touchEndHandler, false);
// frame rate of game 
//window.onload = ()=> {
//	var canvas = document.querySelector('canvas');
//	var c = canvas.getContext('2d')
	//c=document.getElementById('gc');
	//cc=c.getContext('2d');
//	setInterval(update, 1000/30); 
	//c.addEventListener('mousemove',function(e) {
	//		p1y=e.clientY-ph/2;
	//})
//}

// Can use Kuler to create/choose color palettes
var colorArray1 = [
	'#ffaa33',
	'#99ffaa',
	'#00ff00',
	'#4411aa',
	'#ff1100'

];
// Circle properties
var initradius = 10;
var numCircles = 20;
var fastCircleSpeed = 4;
var slowCircleSpeed = 1;
var colorArray = ['red','blue'];
var circleSpeedArray = [fastCircleSpeed, slowCircleSpeed];
var circleArray = [];
// Variables for mouse interaction
var maxRadius = initradius * 1.10;
var minRadius = initradius;


// Gap size for balls to pass through
var gapSize = maxRadius * 4.5;

// Gate variables
var mingateWidth= 10;
var gateWidth = mingateWidth;
var mingateHeight = gapSize;
var gateHeight = mingateHeight;
var gateY = innerHeight/2 - gateHeight/2;
var gateX = innerWidth/2 - gateWidth/2;
var gateColor = 'white';

var wallWidth = gateWidth * 1.1;
var wallHeight = innerHeight/2 - gapSize/2;
var wallColor = 'black';

var centerWallTop_posX = innerWidth/2 - wallWidth/2;
var centerWallTop_posY = 0 ; 
var centerWall_Width = wallWidth;
var centerWall_lenY = innerHeight/2 - gapSize/2;

// Bottom wall variables
var lowerWallX = innerWidth/2 - wallWidth/2;
var lowerWallY = innerHeight/2 + gapSize/2;

// add arrow key control to gate
var upPressed = false;
var downPressed = false;
var spacePressed = false;
var keySensitivity = gateHeight * 0.1;
// may add vim type key bindinings as well later.

// Keyboard control
function keyDownHandler(e){
	e.preventDefault();
	if (e.key == "Up" || e.key == "ArrowUp" || e.key == "k"){
		upPressed = true;
	}
	else if(e.key == "Down" || e.key == "ArrowDown" || e.key == "j"){
		downPressed = true;
	}
	else if(e.key == " " || e.key == "Spacebar" || e.key == "x"){
		spacePressed = true;
	}

	e.preventDefault();

}
function keyUpHandler(e){
	e.preventDefault();
	if (e.key == "Up" || e.key == "ArrowUp" || e.key == "k"){
		upPressed = false;
	}
	else if(e.key == "Down" || e.key == "ArrowDown" || e.key == "j"){
		downPressed = false;
	}
	else if(e.key == " " || e.key == "Spacebar" || e.key == "x"){
		spacePressed = false;
	}

	e.preventDefault();
}
function mouseDownHandler(e) {
	e.preventDefault();
	spacePressed = true;
}

function mouseUpHandler(e) {
	e.preventDefault();
	spacePressed = false;
}
function touchStartHandler(e){
	e.preventDefault();
	spacedPressed = true;
}
function touchEndHandler(e){
	e.preventDefault;
	spacePressed = false;
}


function gateControl() {
	//if(downPressed){
	//	gateY += keySensitivity;
	//	if (gateY + gateHeight > innerHeight){
	//		gateY = innerHeight - gateHeight;
	//	}
	//}
	//else if(upPressed){
	//	gateY -= keySensitivity;
	//	if (gateY < 0) {
	//		gateY = 0;
	//	}
	//}
	// Add spacebar make gate disappear xxx
	if(spacePressed){
		gateWidth = 0;
		gateHeight = 0;
	}else{
		gateWidth = mingateWidth;
		gateHeight = mingateHeight;
	}
	
	// need to find a way of making the gate reAppear may need object orientated programming - simialr to what is down with the circles and their mouse interactivity.
	//}

}
// Draw center partition
// Line
function centerLine() {

	c.beginPath();
	c.moveTo(innerWidth/2, 0);
	c.lineTo(innerWidth / 2, innerHeight);
	//c.lineTo(400,300);
	c.strokeStyle = 'black'; // add colour to line
	c.stroke();
}

function centerWall(color= 'rgba(255,0,0,0.1)', posX = innerWidth/2 - wallWidth/2, posY = 0, widthX = wallWidth, lenY = innerHeight) {
	// Create a rectangle
	// Fill rect takes what ever fill style before
	c.fillStyle = color;// color rectangles below
	c.fillRect(posX, posY, widthX, lenY); // colour rectangle
}

// Circle intersection
function circleIntersect(x1, y1, r1, x2, y2, r2){
	// Calculate the distance between the two circles
	let squareDistance = (x1 - x2)*(x1 - x2) + (y1 - y2)*(y1 - y2);

	// when the distance is smaller or equal to the sum 
	// of the two radius, the circles touch or overlap
	return squareDistance <= ((r1 + r2) * (r1 + r2));
}

// Collision detection
function detectCollisions(){
	let obj1;
	let obj2;

	// Reset collision state of all objects
	for (let i = 0; i < circleArray.length; i++){
		circleArray[i].isColliding = false;
	}

	// Start checking for collisions
	for (let i = 0; i < circleArray.length; i++){

		obj1 = circleArray[i];
		
		for (let j = i + 1; j < circleArray.length; j++)
		{
			obj2 = circleArray[j];

			// Compare object 1 with object2
			if (circleIntersect(obj1.x, obj1.y, obj1.radius, obj2.x, obj2.y, obj2.radius)){
				obj1.isColliding = true;
				obj2.isColliding = true;
			}
		}
	}
}
// Captital letter signifies object 
function Circle(x, y, dx, dy, radius, color) {
	// define variables
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;
	this.minRadius = radius;
	this.color = color;

	this.isColliding = false;
	//this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

	this.draw = function() {
		// Arc/circle
		c.beginPath(); // stops arc from connecting to previous shapes/lines
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false); // create outline for arc
		c.strokeStyle = 'black';
		//c.stroke(); // fill arc outline in
		c.fillStyle = this.isColliding?'black':this.color; 
		c.fill();
		console.log('circle drawn');	
	}

	this.update = function() {
		// Check Circle - circle collision detection
		
		detectCollisions();
		// Check collisions with canvas edges
		if(this.x + this.radius > innerWidth || this.x - this.radius < 0) {
				this.dx = -this.dx;
		}

		if(this.y + this.radius > innerHeight || this.y - this.radius < 0) {
			this.dy = -this.dy;
		}
		//// Interactions with top central wall
		//if(this.x + this.radius < centerWallTop_posX + wallWidth && this.x + this.radius > centerWallTop_posX && this.y + this.radius < centerWallTop_posY + centerWall_lenY) {
		//	this.dx = -this.dx;
		//	console.log('circle hit side of top center wall')
		//}
		// Circle penetration on the wall's left and right walls
		// Aliases to avoid thinking of offsetting positions
		var circleTop = this.y - this.radius;
		var circleBottom = this.y + this.radius;
		var circleLeft = this.x - this.radius;
		var circleRight = this.x + this.radius;
		
		// Simple Gate collision
		if (this.x > gateX && this.x < gateX + gateWidth
			&& this.y > gateY && this.y < gateY + gateHeight){
			this.dx = -this.dx;
		}
		// Write a simple collision function
		this.simpleHCollision =  function (xPos, yPos, xWidth, yLength){
			// Simple Gate collision
			if (this.x > xPos && this.x < xPos + xWidth
				&& this.y > yPos && this.y < yPos + yLength){
				this.dx = -this.dx;
			}
		}

		// Call simple horizontal collision function for top and lower walls
		this.simpleHCollision(lowerWallX, lowerWallY, wallWidth, wallHeight);

		this.simpleHCollision(centerWallTop_posX, centerWallTop_posY, wallWidth, wallHeight);
		//// circle penetration on walls left and right side
		//if (((circleRight > centerWallTop_posX && circleLeft < centerWallTop_posX) ||
		//(circleLeft < centerWallTop_posX + wallWidth && circleRight > centerWallTop_posX + wallWidth)) && 
		//circleTop < centerWall_lenY && circleBottom > centerWall_lenY){
		//this.dx = -this.dx;
		//}
		//// circle penetration on the wall's top and bottom side
		//if (((circleBottom > centerWallTop_posY && circleTop < centerWallTop_posY) ||
		//(circleTop < centerWall_lenY && circleBottom > centerWall_lenY)) && 
		//circleLeft < centerWallTop_posX + wallWidth && circleRight > centerWallTop_posX) {
		//	this.dy = -this.dy;
		//}

		//// Object reflections based on side closest to circle - contains an error	
		//if(this.x - this.radius < centerWallTop_posX + wallWidth 
		//	&& this.x + this.radius > centerWallTop_posX 
		//	&& this.y - this.radius < centerWallTop_posY + centerWall_lenY 
		//	&& this.y + this.radius > centerWallTop_posY){
		//	// choose which side of the wall is closest to the circle's centre
		//	var dists = [
		//		Math.abs(this.x - centerWallTop_posX),
		//		Math.abs(this.x - centerWallTop_posX + wallWidth),
		//		Math.abs(this.y - centerWallTop_posY),
		//		Math.abs(this.y - centerWallTop_posY + centerWall_lenY)];
		//		var i = dists.indexOf(Math.min.apply(Math, dists)); // get minimum distsance
		//	if(i < 2){
		//		this.dx=( i || -1 ) * Math.abs(this.dx);
		//	} else {
		//		this.dy = (i > 2 || -1) * Math.abs(this.dy);
		//	}
		//	console.log('circle hit bottom of top center wall')
		//}
		
		// Update velocity
		this.y += this.dy;
		this.x += this.dx;
		console.log('circle updated')
		
			
		// intereactivity
		if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y- this.y > - 50) {
		if (this.radius < maxRadius) {
		this.radius +=1;
		}
		} else if (this.radius > this.minRadius) {
		this.radius -= 1; 
		}

		this.draw();
		
	}

}

function init() {
	circleArray = [];
	for (var i = 0; i < numCircles; i++) {
		// Initiate random radius value between 1 and 4
		//var radius = Math.random() * 40 + 1; // chris course
		var radius = initradius;
		// Make sure circle don't fall within wall and gate
		do { // reapeat until not in wall/gate
		// Initiate random x, y coordinates for each circle
		var x = Math.random() * (innerWidth - radius * 2) + radius;
		var y = Math.random() * (innerHeight - radius * 2) + radius; 	

		} while(x - radius < centerWallTop_posX + wallWidth
			&& x + radius > centerWallTop_posX
			&& y + radius > centerWallTop_posY
			&& y - radius < innerHeight)
		//// Initiate random x, y coordinates for each circle
		//var x = Math.random() * (innerWidth - radius * 2) + radius;
		//var y = Math.random() * (innerHeight - radius * 2) + radius; 
		// Initiate directions/trajectories of circles
		var theta = Math.random() * 2 * Math.PI; // brandon
		// Initiate velocities of circles
		let index = Math.floor(Math.random()*circleSpeedArray.length);
		var dx = circleSpeedArray[index] * Math.cos(theta);// brandon
		var dy = circleSpeedArray[index] * Math.sin(theta);// brandon
		var color = colorArray[index];
		//var dx = fastCircleSpeed * Math.cos(theta);// brandon
		//var dy = fastCircleSpeed * Math.sin(theta);
		//var dx = (Math.round(Math.random()) * 2 - 1) * fastCircleSpeed;		
		//var dy = (Math.round(Math.random()) * 2 - 1) * fastCircleSpeed;
		//var dx = (Math.random() - 0.5) * 8;
		//var dy = (Math.random() - 0.5) * 8;

	// Instantiate circle and store into array
		circleArray.push(new Circle(x, y, dx, dy, radius, color));
		console.log(circleArray);
		// instatiate circle
		//var circle = new Circle(x, y, dx, dy, radius);

	}

}


function animate() {
	//requestAnimationFrame(animate);
	c.clearRect(0,0,innerWidth, innerHeight);

	// Draw center wall top
	//centerWall();
	centerWall(wallColor, centerWallTop_posX, centerWallTop_posY, wallWidth, centerWall_lenY);	

	// Draw lower center wall
	centerWall(wallColor, lowerWallX, lowerWallY, wallWidth, wallHeight);
	// create gate
	centerWall(gateColor, gateX, gateY, gateWidth, gateHeight);

	// Add keyboard control to paddle
	gateControl();

	// Load up and draw circles
	for (var i = 0; i < circleArray.length; i++){
	
		circleArray[i].update();
	}

	//Circle.draw();
	//// Arc/circle
	//c.beginPath(); // stops arc from connecting to previous shapes/lines
	//c.arc(x, y, radius, 0, Math.PI * 2, false); // create outline for arc
	//c.strokeStyle = 'black';
	//c.stroke(); // fill arc outline in

	//if(x + radius > innerWidth || x - radius < 0) {
	//	dx = -dx;
	//}
	//if(y + radius > innerHeight || y - radius < 0) {
	//	dy = -dy;
	//}
	//
	//
	//y += dy;
	//x += dx;
	console.log('animating: fdskaljlas')
}

init();
setInterval(animate,10); // control frame per second of animation
//animate();
// create hundreds of circles
//for (var i = 0; i < 3; i++) {
//	// Math.random() returns float between 0 and 1
//	var x = Math.random() * window.innerWidth;
//	var y = Math.random() * window.innerHeight;
//	c.beginPath();
//	c.arc(x,y,30, 0, Math.PI * 2, false); // create outline for arc
//	c.strokeStyle = 'black';
//	c.stroke(); // fill arc outline in
//
//
//}


console.log(canvas);

