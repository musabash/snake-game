let boxes = [];
let snake = [2, 1, 0];
let speed = 500;
let direction = 1;
let timer = 0;
let index = 0;
let score = 0;

for (let i = 0; i < 100; i++){
    let box = document.createElement('div');
    box.classList.add('box');
    document.getElementById('grid').appendChild(box);
    boxes.push(box);
}
document.getElementById('btn').addEventListener ('click', start);

function start () {
    clearInterval(timer);
    snake = [2, 1, 0];
    speed = 500;
    score = 0;
    direction = 1;
    document.getElementById('score').textContent = score;
    for (let i = 0; i < 100; i++){
        boxes[i].classList.remove('snake', 'apple');
    }
    snake.forEach(elm => boxes[elm].classList.add('snake'));
    applePop();
    timer = setInterval(move, speed);
}

function move() {
    let tail = snake.pop();
    snake.unshift(snake[0] + direction);
    if (snake[0] % 10 === 0 && direction === 1 ||
        snake[0] % 10 === 9 && direction === - 1 ||
        snake[0] >= 100 && direction === 10 ||
        snake[0] < 0 && direction === - 10 ||
        boxes[snake[0]].classList.contains('snake')) {
        clearInterval(timer);
        document.getElementById('score').textContent = "Sorry. You Lose!";
    } else {
        boxes[snake[0]].classList.add('snake');
        boxes[tail].classList.remove('snake');
    };

    if (snake[0] === index) {
        boxes[index].classList.remove('apple');
        applePop();
        snake.push(tail);
        score++;
        document.getElementById('score').textContent = score;
        speed = speed * .9;
        clearInterval(timer);
        timer = setInterval(move, speed);              
    }
}

function applePop (){
    index = Math.floor(Math.random() * 100);
    snake.includes(index) ? applePop() : boxes[index].classList.add('apple');
}

function snakeControl (event) {
    if (event.keyCode === 39) {
        direction = 1;
    } else if (event.keyCode === 37) {
        direction = - 1;
    } else if (event.keyCode === 38) {
        direction = - 10;
    } else if (event.keyCode === 40) {
        direction = 10;
    }
}

document.addEventListener ('keydown', snakeControl);




/*
let counter = 0;
function clock() {
    counter++
    if (counter === 30) {
        alert('Hello!');
    };
    document.getElementById('title').textContent = new Date().toLocaleTimeString();
}
let timerId = setInterval(clock, 1000);
*/