const grid = document.querySelector(".grid");
const scoreDisplay = document.querySelector("#score");
const blockWidth = 80;
const blockHeight = 20;
const ballDiametro = 20;
const tablaWidth = 600;
const tablaHeight = 300;
let xDireccion = -2;
let YDirection = 2;

const userStart = [300, 10];
let posicionActual = userStart;

const ballStart = [350, 40];
let ballPosicionActual = ballStart;

let timerId;
let score = 0;

//mi bloque

class block {
  constructor(xAxis, yAxis) {
    this.bottomLeft = [xAxis, yAxis];
    this.bottomRight = [xAxis + blockWidth, yAxis];
    this.topRight = [xAxis + blockWidth, yAxis + blockHeight];
    this.topLeft = [xAxis, yAxis + blockHeight];
  }
}

//todos los bloques

const blocks = [
  new block(10, 350),
  new block(100, 350),
  new block(190, 350),
  new block(280, 350),
  new block(370, 350),
  new block(10, 320),
  new block(100, 320),
  new block(190, 320),
  new block(280, 320),
  new block(370, 320),
  new block(10, 290),
  new block(100, 290),
  new block(190, 290),
  new block(280, 290),
  new block(370, 290),
];

//dibujando los bloques
function addblocks() {
  for (let i = 0; i < blocks.length; i++) {
    const block = document.createElement("div");
    block.classList.add("block");
    block.style.left = blocks[i].bottomLeft[0] + "px";
    block.style.bottom = blocks[i].bottomLeft[1] + "px";
    grid.appendChild(block);
    console.log(blocks[i].bottomLeft);
  }
}
addblocks();

//add usuario
const user = document.createElement("div");
user.classList.add("user");
grid.appendChild(user);
drawUser();

//add pelota
const ball = document.createElement("div");
ball.classList.add("ball");
grid.appendChild(ball);
drawBall();

//movimientos

function movement(e) {
  switch (e.key) {
    case "FlechaIzquierda":
      if (currentPosition[0] > 0) {
        currentPosition[0] += 10;
        console.log(currentPosition[0] > 0);
        drawUser();
      }
      break;
    case "FlechaDerecha":
      if (currentPosition[0] < tablaWidth - blockWidth) {
        currentPosition[0] += 10;
        console.log(currentPosition[0]);
        drawUser();
      }
      break;
  }
}
document.addEventListener("keydown", movement);

//pull usuario
function pullUser() {
  user.style.left = currentPosition[0] + "px";
  user.style.bottom = currentPosition[1] + "px";
}

//pull pelota
function pullBall() {
  ball.style.left = ballPosicionActual[0] + "px";
  ball.style.bottom = ballPosicionActual[1] + "px";
}

//mover pelota
function moverPelota() {
  ballPosicionActual[0] += xDireccion;
  ballPosicionActual[1] += YDirection;
  drawBall();
  checkForCollisions();
}
timerId = setInterval(moverPelota, 30);

//Revisar x colisiones
function checkxcolisiones() {
  for (let i = 0; i < blocks.length; i++) {
    if (
      ballPosicionActual[0] > blocks[i].bottomLeft[0] &&
      ballPosicionActual[0] < blocks[i].bottomRight[0] &&
      ballPosicionActual[1] + ballDiametro > blocks[i].bottomLeft[1] &&
      ballPosicionActual[1] < blocks[i].topLeft[1]
    ) {
      const allblocks = Array.from(document.querySelectorAll(".block"));
      allblocks[i].classList.remove(".block");
      blocks.splice(i, 1);
      changeDirection();
      score++;
      scoreDisplay.innerHTML = score;
      if (blocks.lenght == 0) {
        scoreDisplay.innerHTML = "✨🎉🎇Ganaste!🎈🥳🎈You won!🤑🎇🎉✨";
        clearInterval(timerId);
        document.removeEventListener("keydown", movement);
      }
    }
  }
  //chequeo x hits en la pared
  if (
    ballPosicionActual[0] >= tablaWidth - ballDiametro ||
    ballPosicionActual[0] <= 0 ||
    ballPosicionActual[1] >= tablaHeight - ballDiametro
  ) {
    changeDirection();
  }
  //chequeo x hit usuario
  if (
    ballPosicionActual[0] > posicionActual[0] &&
    ballPosicionActual[0] < posicionActual[0] + blockWidth &&
    ballPosicionActual[1] > posicionActual[1] &&
    ballPosicionActual[1] < posicionActual[1] + blockHeight
  ) {
    changeDirection();
  }
  //game-over🐶
  if (ballPosicionActual[1] <= 0) {
    clearInterval(timerId);
    scoreDisplay.innerHTML = "🏴‍☠️😭Perdiste😭🏴‍☠️";
    document.removeEventListener("keydown", movement);
  }
}

function changeDirection() {
  if (xDireccion === 2 && YDirection === 2) {
    YDirection = -2;
    return;
  }
  if (xDireccion === 2 && YDirection === -2) {
    xDirection = -2;
    return;
  }
  if (xDireccion === -2 && YDirection === -2) {
    YDirection = 2;
    return;
  }
  if (xDireccion === -2 && YDirection === 2) {
    xDirection = 2;
    return;
  }
}
