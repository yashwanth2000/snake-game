const board = document.getElementById('game-board');
const instructionText = document.getElementById('instruction-text');
const logo = document.getElementById('logo');

//game variables
const gridSize = 20;
let snake = [{x: 10, y :10}];
let food = generateFood();
let direction = 'right';
let gameInterval;
let gameSpeedDelay = 200;
let gameStarted = false;



function draw(){
	board.innerHTML = '';
	drawSnake();
	drawFood();
}

//snake
function drawSnake() {
	snake.forEach((segment) => {
		const snakeElement = createGameElement('div','snake');
		setPosition(snakeElement,segment);
		board.appendChild(snakeElement)
		
	})
}

function createGameElement(tag,className){
	const element = document.createElement(tag);
	element.className = className;
	return element;
}

function setPosition(element,position){
	element.style.gridColumn = position.x;
	element.style.gridRow = position.y;
}

// draw();

//food
function drawFood(){
	const foodElement = createGameElement('div', 'food');
	setPosition(foodElement, food);
	board.appendChild(foodElement);

}

function generateFood(){
	const x = Math.floor(Math.random() * gridSize) + 1;
	const y = Math.floor(Math.random() * gridSize) + 1;
	return {x,y};
}

//move
function move(){
	const head = {...snake[0]};
	switch(direction){
		case 'up':
			head.y--;
			break;
		case 'down':
			head.y++;
			break;
		case 'left':
			head.x--;
			break;
		case 'right':
			head.x++;
			break;
	}

	snake.unshift(head);
	
	//snake.pop();

	if (head.x === food.x && head.y === food.y) {
		food = generateFood();
		clearInterval(); //clear past intervals
		gameInterval = setInterval(() => {
			move();
			//checkCollision();
			draw();
		},gameSpeedDelay);
	} else{
		snake.pop();
	}
}

// setInterval(() => {
// 	move();
// 	draw();
// },200)

//start game
function startGame() {
	gameStarted = true;
	instructionText.style.display = 'none';
	logo.style.display = 'none';
	gameInterval = setInterval(() => {
		move();
		//checkCollision();
		draw();
	},gameSpeedDelay);
}

//keypress event
function handleKeyPress(event) {
	if(
		(!gameStarted && event.code === 'Space') ||
		(!gameStarted && event.key === ' ') 
	) {
		startGame();
	} else{
		switch(event.key) {
			case 'ArrowUp':
				direction = 'up';
				break;
			case 'ArrowDown':
				direction = 'down';
				break;
			case 'ArrowLeft':
				direction = 'left';
				break;
			case 'ArrowRight':
				direction = 'right';
				break;
		}
	}
}

document.addEventListener('keydown', handleKeyPress);

