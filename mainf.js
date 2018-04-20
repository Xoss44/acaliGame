// JavaScript Document
// Codigo "limpio"
var canvas = document.getElementById("mainGame");
var ctx = canvas.getContext("2d");  //ctx.fillRect(0, 0, canvas.width, canvas.height);

var boardF = new BoardF();
var swimmingBoyF = new SwimmingBoyF();
var shark = new Shark();
var crock = new Crock();
var beachBall = new Beachball();
var rubberDock = new Rubberdoc();

var shoot = new Shoot(swimmingBoyF.x,swimmingBoyF.y);
var evils =[shark, crock, beachBall, rubberDock];
var bullets = [];

var score = 0;

//classes
function BoardF() {
	this.x = 0;
	this.y = 0;
	this.width = canvas.width;
	this.height = canvas.height;
	this.img = new Image();
	this.img.src = "assets/piscinalateral.png";
	this.score = 0;
	//this.music = new Audio();
	//this.music.src = ""
	
	//llama al metodo draw cuando la imagen ya cargó
	this.img.onload = function() {
		this.draw();
	}.bind(this);
	
	this.move = function() {
		this.x--;
		if(this.x < -canvas.width) {
			this.x = 0;
		}
	};
	
	//metodo principal
	this.draw = function() {
		this.move();
		ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
		ctx.drawImage(this.img, this.x + canvas.width, this.y, this.width, this.height);
	};
}//end of boardf


//SwimmingBoyF
function SwimmingBoyF() {
	this.x = 50;
	this.y = Math.floor(Math.random() * 380)+120;
	this.width = 150;
	this.height = 70;
	this.lives = 3;
	this.img = new Image();
	this.img.src = "assets/NADADORAZUL.png";


	this.img.onload = function() {
		this.draw();
	}.bind(this);

	this.draw = function() {
		this.y += 1;
		ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
		//esto es una validacion
		if(this.y < 0 || this.y > canvas.height - this.height) {
			this.lives--;
			if(!swimmingBoyF.lives) {
				gameOver();
			}
		}
	};
	this.move =function() {
		this.y -= 30;
	};
	this.isTouching = function(evil){
		return(this.x < evil.x + evil.width) && (this.x + this.width > evil.x) && (this.y < evil.y + evil.height) && (this.y + this.height > evil.y);
	};

}



function Shoot(x,y){
  this.x = x; 
  this.y = y;
  this.width = 20;
  this.height = 20;
  this.move = false;
  this.img = new Image();
  this.img.src = "assets/burbujas.png";
    this.img.onload = function(){
      this.draw();
    }.bind(this);
  
    this.draw = function(){
      if(this.move) this.x += 5;
      ctx.drawImage(this.img,this.x + 75,this.y + 5,this.width,this.height);
    };
    this.moveUp = function(){
       this.y -= 20; 
    };
    this.moveDown = function(){
      this.y += 20;
    };
    this.moveLeft = function(){
      this.x -= 10;
    };
    this.moveRight = function(){
      this.x += 10;
    };
  this.isTouching = function(evil){
    return(this.x < evil.x + evil.width) && (this.x + this.width > evil.x) && (this.y < evil.y + evil.height) && (this.y + this.height > evil.y);
  };
}

function createShoots(){
  bullets.push(new Shoot(swimmingBoyF.x + 50,swimmingBoyF.y+30));  
  }


//objects
function Shark() {
	this.name = "shark";
	this.x = canvas.width + 80; //+ widthRandom
	this.y = Math.floor(Math.random() * 330)+120;
	this.width = 70;
	this.height = 59;
	this.num = 1;
	this.img = new Image();
		this.img.src = "assets/tiburon.png";
		this.img.onload = function() {
			this.draw();
		}.bind(this);
	this.move = function() {
		this.x -= 3.5;
	};
	this.draw = function() {
		this.move();
		ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
		//pinta los numeros
		if(this.x < 0) {
			var randomX = Math.floor(Math.random() * 800);
			var randomY = Math.floor(Math.random() * 330)+120;
			this.x = canvas.width + randomX;
			this.y = randomY;
		}
	this.redraw = function(){
		var randomX = Math.floor(Math.random() * 800);
		var randomY = Math.floor(Math.random() * 330)+120;
		this.x = canvas.width + randomX;
		this.y = randomY;
	};
	};
}

function Crock() {
	this.name = "crock";
	this.x = canvas.width; //+ widthRandom
	this.y = Math.floor(Math.random() * 330)+120;
	this.width = 75;
	this.height = 55;
	this.num = 1;
	this.img = new Image();
		this.img.src = "assets/cocodrilo.png";
		this.img.onload = function() {
			this.draw();
		}.bind(this);
	this.move = function() {
		this.x -= 3;
	};
	this.draw = function() {
		this.move();
		ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
		//pinta los numeros
		if(this.x < 0) {
			var randomX = Math.floor(Math.random() * 800);
			var randomY = Math.floor(Math.random() * 330)+120;
			this.x = canvas.width + randomX;
			this.y = randomY;
		}
	this.redraw = function(){
		var randomX = Math.floor(Math.random() * 800);
		var randomY = Math.floor(Math.random() * 330)+120;
		this.x = canvas.width + randomX;
		this.y = randomY;
	};
	};
}

function Beachball() {
	this.name = "beachball";
	this.x = canvas.width + 40; //+ widthRandom
	this.y = Math.floor(Math.random() * 330)+120;
	this.width = 59;
	this.height = 59;
	this.num = 1;
	this.img = new Image();
		this.img.src = "assets/pelota.png";
		this.img.onload = function() {
			this.draw();
		}.bind(this);
	this.move = function() {
		this.x -= 2;
	};
	this.draw = function() {
		this.move();
		ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
		//pinta los numeros
		if(this.x < 0) {
			var randomX = Math.floor(Math.random() * 800);
			var randomY = Math.floor(Math.random() * 330)+120;
			this.x = canvas.width + randomX;
			this.y = randomY;
		}
	this.redraw = function(){
		var randomX = Math.floor(Math.random() * 800);
		var randomY = Math.floor(Math.random() * 330)+120;
		this.x = canvas.width + randomX;
		this.y = randomY;
	};
	};
}

function Rubberdoc() {
	this.name = "rubberduck"
	this.x = canvas.width + Math.floor(Math.random() * 120);; //+ widthRandom
	this.y = Math.floor(Math.random() * 330)+120;
	this.width = 59;
	this.height = 59;
	this.num = 0;
	this.img = new Image();
		this.img.src = "assets/patohule.png";
		this.img.onload = function() {
			this.draw();
		}.bind(this);
	this.move = function() {
		this.x -= 2.5;
	};
	this.draw = function() {
		this.move();
		ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
		//pinta los numeros
		if(this.x < 0) {
			var randomX = Math.floor(Math.random() * 800);
			var randomY = Math.floor(Math.random() * 330)+120;
			this.x = canvas.width + randomX;
			this.y = randomY;
		}
	this.redraw = function(){
		var randomX = Math.floor(Math.random() * 800);
		var randomY = Math.floor(Math.random() * 330)+120;
		this.x = canvas.width + randomX;
		this.y = randomY;
	};
	};
}


//declaraciones
var intervaloF;
var framesF = 0; //cuantas veces se ejecuta

//auxiliar functions
function gameOver() {
	drawLives();
	stop();
	ctx.font = "120px courier";
	ctx.strokeStyle = "orange";
	ctx.lineWidth = 8;
	ctx.strokeText("Game Over", 100, 200);
	ctx.font = "50px Avenir";
	ctx.fillStyle = "blue";
	ctx.fillText("Press R to start", 280, 250);
}

function drawScore() {
	ctx.font = "30px Arial";
	ctx.fillStyle = "blue";
	ctx.fillText("Score: "+boardF.score, 8, 40);
}

function drawLives() {
	ctx.font = "30px Arial";
	ctx.fillStyle = "blue";
	ctx.fillText("Lives: "+swimmingBoyF.lives, 190, 40);	
}

//main function
//el encargado de que todos se mueva es la funcion update alimentado por un intervalo
function updateF() {
	framesF++;
	//console.log("Update F");
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	boardF.draw();
	drawScore();
	drawLives();
	swimmingBoyF.draw();
	//console.log(swimmingBoyF.lives);
	shark.draw();
	crock.draw();
	beachBall.draw();
	rubberDock.draw();
	bullets.forEach((bullet, indexB) => {
    bullet.draw();

    evils.forEach((evil, indexP) => {
      if(bullet.isTouching(evil)){
        bullets.splice(indexB,1);
        console.log(evil.name);
		//console.log("its evil");
		evils[indexP].num--;
        if (evils[indexP].num<=0){
          evils[indexP].redraw();
          boardF.score+=1;
        
		
		}
      }
      if(swimmingBoyF.isTouching(evil)){
        //bullets.splice(indexB,1);
		  if(evil.name === "shark" || evil.name === "crock"){
			 //console.log("Sati touch un malo D= " + evil.name);
			  swimmingBoyF.lives--;
			  console.log(swimmingBoyF.lives);
				if(!swimmingBoyF.lives) {
					gameOver();
//				}else{
//					clearInterval(intervaloF);
				}
		  }else if(evil.name === "beachball" || evil.name === "rubberduck"){
			 //console.log("Sati touch un bueno :D " + evil.name);
			  swimmingBoyF.score++;
		  }
		  //evils[indexP].num--;
		  if(evils[indexP].num<=0){
			  evils[indexP].redraw();
			  boardF.score+=1;
		  }
      }
		
    });
    bullet.move = true;
  });
//requestAnimationFrame(updateF)
}


function startF() {
	if(intervaloF > 0) return
	//se pueden poner extras que se tengan que reiniciar al principio
	intervaloF = setInterval(function(){
		updateF();
	}, 1000/60);
	swimmingBoyF.y = 120;
	framesF = 0;
	//board.music.play();
}

function stop() {
	clearInterval(intervaloF);
	intervaloF = 0;
	//board.music.pause();
}

function randomColor() {
	var letters = "0123456789ABCDEF";
	var color = "#";
	
	for(var i = 0; i<6; i++) {
		color += letters[Math.floor(Math.random()*16)];
	}
	return color;
}

//listeners (escuchadores/ observadores)
addEventListener("keydown", function(e) {
	if(e.keyCode === 32) {
		swimmingBoyF.move();
	}
	if(e.keyCode === 82) { // presionas r
		startF();
	}
	if(e.keyCode === 13){
    createShoots();
   }
});