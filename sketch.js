//Some global variables.
var gameOver;
var gameStarted;
var player;
var player2;
var projectiles;
var projectiles2;

var setupGame;

var catchProjectiles;

var wall1;
var wall2;
var wall3;
var wall4;

var square;
var barrier1;
var barrier2;


var playerscore = 0;
var player2score = 0;


var wallSounds = [];
var tankSound = [];
var shotSound = [];
var hitSound = [];

var tankP1;
var tankP2;
var missle;
 
 //basic sprites and sounds
 function preload(){
	tankP1 = loadImage("assets/tanksprite.png");
	tankP2 = loadImage("assets/tankbsprite.png");
	missile = loadImage("assets/ball.png");
	
	wallSounds = [ loadSound("assets/pop1.wav"), loadSound("assets/pop2.wav"), loadSound("assets/pop3.wav")];
	tankSound[0] = loadSound("assets/tankmove.wav");
	shotSound[0] = loadSound("assets/ChargeShot01.wav");
	hitSound[0] = loadSound("assets/ShotExplosionDirect00.wav");
	
 }


function setup() {
	createCanvas(windowWidth, windowHeight);
	setupGame();
	tankP1.rotation = -90;
	
	// set up player, start so facing up (-90 degrees)
	fill(150);
	player = createSprite(200, height/2, 40, 40);
	//adding sprite
	player.addImage(tankP1);
	player.rotation = -90;	// face player up
	
	
	
	
	player2 = createSprite(width-200, (height/2) , 40, 40);
	player2.rotation = -90;	// face player up
	// adding sprite
	player2.addImage(tankP2);
 
	// a group of sprites is initialized like this
	projectiles = new Group();
	projectiles2 = new Group();
	
	
 
	// make it so Projectiles die at edges of screen
	// make them die when in contact with the terrain
	catchProjectiles1 = createSprite(width/2, 10, width, 20);
	wall1 = createSprite(width/2, 10, width, 20);
	
	catchProjectiles2 = createSprite(width/2, height-10, width, 20);
	wall2 = createSprite(width/2, height-10, width, 20);
	
	catchProjectiles3 = createSprite(10, height/2, 20, width);
	wall3 = createSprite(10, height/2, 20, width);
	
	catchProjectiles4 = createSprite(width-10, height/2, 20, width);
	wall4 = createSprite(width-10, height/2, 20, width);
	
	
	catchProjectiles5 = createSprite(width/2, height/2, 300, 300);
	square = createSprite(width/2, height/2, 300, 300);
	
	
	catchProjectiles6 = createSprite(width/4, height/2, 30, 600);
	barrier1 = createSprite(width/4, height/2, 30, 600);
	
	catchProjectiles7 = createSprite(width/1.33, height/2, 30, 600);
	barrier2 = createSprite(width/1.33, height/2, 30, 600);
	
	// player physics
	player.maxSpeed = 10;
	player.friction = .96;
	
	player2.maxSpeed = 10;
	player2.friction = .96;
}

  function setupGame(){
	 gameStarted = false;
	 gameOver = false;
	 playerscore = 0;
	 player2score = 0;
  }
 
 
function draw() {
 
	background(185);
 
	
	if(!gameOver) {
		if(!gameStarted) {
			// --- MENU ---
			textSize(50);
			textAlign(CENTER, CENTER);
			text("First to 10 wins!\n P1 uses WASD to move and Spacebar to fire.\n P2 uses the arrow keys to move and Enter to fire.\n Press Enter to begin!", width/2, height/2);
 
			// if menu is active and player presses A
			if(keyWentDown("ENTER")) {
				gameStarted = true;
			}
		} else {
	
	
	
	
 
	
		// check for keys
	
		if(keyWentDown(" ")) {
		// create a new sprite on the fly
		var p = createSprite(player.position.x, (player.position.y), 10, 10);
		shotSound[0].play();
 
		// give projectile an upwards speed of -10 pixels,
		// and make it shoot in the same direction the player is facing
		p.setSpeed(10, player.rotation);
		p.addImage(missile);
		//p.debug = true;	//optional
 
		// add it to the group
		projectiles.add(p);
	}
 
	
 
		if(keyWentDown("ENTER")) {
		// create a new sprite on the fly
		var p = createSprite((player2.position.x), (player2.position.y), 10, 10);
		shotSound[0].play();
		
		// give projectile an upwards speed of -10 pixels,
		// and make it shoot in the same direction the player is facing
		p.setSpeed(10, player2.rotation);
		p.addImage(missile);
 
		//p.debug = true;	//optional
 
		// add it to the group
		projectiles2.add(p);
		
		
	}
	
 
 
		// move player -- either by moving left to right or
		// by changing your angle (uncomment as necessary)
		if(keyDown("a")) {
		//player.position.x -= 10;
		player.rotation -= .8;
		
	}
 
		if(keyDown("d")) {
		//player.position.x += 10;
		player.rotation += .8;
	}
	
		if(keyDown("w")) {
		player.addSpeed(.1, player.rotation);
		//player.rotation += .2;
		//tankSound[0].play();
	}
	
	
		if(keyDown("s")) {
		player.addSpeed(-.1, player.rotation);
		//player.rotation += 2;
		//tankSound[0].play();
	}
	
	
	
	
	
	
	
	
		//move player2
	
		if(keyDown("LEFT_ARROW")) {
		//player.position.x -= 10;
		player2.rotation -= .8;
		
	}
 
		if(keyDown("RIGHT_ARROW")) {
		//player.position.x += 10;
		player2.rotation += .8;
	}
	
		if(keyDown("UP_ARROW")) {
		player2.addSpeed(.1, player2.rotation);
		//player.rotation += .2;
		//tankSound[0].play();
	}
	
	
		if(keyDown("DOWN_ARROW")) {
		player2.addSpeed(-.1, player2.rotation);
		//player.rotation += 2;
		//tankSound[0].play();
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
 
		// check collisions, call playerHit functions if so
		// it fails sometimes don't fret...
	
		//p2
		if(player.overlap(projectiles2,playerHit)){
		player.overlap(projectiles2,playerHit);
		player2score++;
		
		
	}
		//p1
		if(player2.overlap(projectiles,player2Hit)){
		player2.overlap(projectiles,player2Hit);
		playerscore++;
	}

 
 
		// catch Projectiles
		catchProjectiles1.overlap(projectiles, projectileCatch);
		catchProjectiles1.overlap(projectiles2, projectileCatch);
		
		catchProjectiles2.overlap(projectiles, projectileCatch);
		catchProjectiles2.overlap(projectiles2, projectileCatch);
		
		catchProjectiles3.overlap(projectiles, projectileCatch);
		catchProjectiles3.overlap(projectiles2, projectileCatch);
		
		catchProjectiles4.overlap(projectiles, projectileCatch);
		catchProjectiles4.overlap(projectiles2, projectileCatch);
		
		catchProjectiles5.overlap(projectiles, projectileCatch);
		catchProjectiles5.overlap(projectiles2, projectileCatch);
		
		catchProjectiles6.overlap(projectiles, projectileCatch);
		catchProjectiles6.overlap(projectiles2, projectileCatch);
		
		catchProjectiles7.overlap(projectiles, projectileCatch);
		catchProjectiles7.overlap(projectiles2, projectileCatch);
		
		
		// draw all the stuff
		
		//collision detection
		player.collide(wall1);
		player.collide(wall2);
		player.collide(wall3);
		player.collide(wall4);
		player.collide(square);
		player.collide(barrier1);
		player.collide(barrier2);
	
	
		player2.collide(wall1);
		player2.collide(wall2);
		player2.collide(wall3);
		player2.collide(wall4);
		player2.collide(square);
		player2.collide(barrier1);
		player2.collide(barrier2);
	
		drawSprites();
	
	
		//Score keeping...
		fill(200,100,0);
		textSize(30);
		text("Player 2 Score: " + player2score, (width/1.15), 100);
	
	
		fill(20,0,200);
		textSize(30);
		text("Player 1 Score: " + playerscore, 30, 100);
	
	
		
		//covering up the hitboxes
		fill(75);
		noStroke();
		rectMode(CENTER);
		rect(width/2,height/2,300,300);
		
		fill(25);
		rect(width/4, height/2, 30, 600);
		rect(width/1.33, height/2, 30, 600);
	
		fill(225);
		rect(width/2, 10, width, 20);
		rect(width/2, height-10, width, 20);
		rect(10, height/2, 20, width);
		rect(width-10, height/2, 20, width);
		
		if(playerscore == 10){
			
		gameOver = true;
		
		
		
		}
		if(player2score == 10){
		gameOver = true;
		
		
		}
		
		
	}
 
	} else {
		if(player2score == 10){
		// --- DISPLAY GAME OVER TEXT ---
		textSize(50);
		textAlign(CENTER, CENTER);
		text("GAME OVER P2 Wins!\nPRESS R TO RESTART", width/2, height/2);
		}
		if(playerscore == 10){
		// --- DISPLAY GAME OVER TEXT ---
		textSize(50);
		textAlign(CENTER, CENTER);
		text("GAME OVER P1 Wins!\nPRESS R TO RESTART", width/2, height/2);
		}
		if(keyWentDown("r")) {
			setupGame();
		}	
	}
	
}
 
 

 
// this is a little tricky--
// the incoming arguments are the objects in question, so since i said
// catchProjectiles.overlap(projectiles, functionName)
// that means that catchProjectiles is the first argument (catcher)
// and projectiles is the second (projectile)
function projectileCatch(catcher, projectile) {
	projectile.remove();
	//sound effect for hitting a wall
	var randWall = int(random(wallSounds.length));
	wallSounds[randWall].play();
}
 

function playerHit(player, projectile) {
	//this.pscore = 0;
	projectile.remove();

	hitSound[0].play();
	
	//enemy.setSpeed(10, 90);
}
function player2Hit(player2, projectile) {
	projectile.remove();
	
	hitSound[0].play();
	//enemy.setSpeed(10, 90);
}

