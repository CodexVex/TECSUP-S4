const grid = document.querySelector('.grid')
const scoreDisplay= document.querySelector('#score')
const blockWidth= 80
const blockHeight=20
const ballDiametro=20
const tablaWidth= 600
const tablaHeight=300
let xDireccion =-2
let YDirection =2

const userStart = [300,10]
let posicionActual =userStart

const ballStart = [350,40]
let ballPosicionActual = ballStart

let timerId
let score = 0

//mi bloque

class Block{
    constructor (xAxis, yAxis){
        this.bottomLeft =[xAxis, yAxis]
        this.bottomRight = [xAxis+blockWidth, yAxis]
        this.topRight = [xAxis + blockWidth, yAxis+blockHeight]
        this.topLeft = [xAxis, yAxis+blockHeight]
    }
}

//todos los bloques

const blocks = [
    new Block (10,350),
    new Block (100,350),
    new Block (190,350),
    new Block (280,350),
    new Block (370,350),
    new Block (10,320),
    new Block (100,320),
    new Block (190,320),
    new Block (280,320),
    new Block (370,320),
    new Block (10,290),
    new Block (100,290),
    new Block (190,290),
    new Block (280,290),
    new Block (370,290),
]

//dibujando los bloques
function addBlocks(){
    for (let i=0 ; i< blocks.length;i++){
        const block = document.createElement('div')
        block.classList.add('block')
        block.style.left= blocks[i].bottomLeft[0]+'px'
        block.style.bottom=blocks[i].bottomLeft[1]+'px'
        grid.appendChild(block)
        console.log(blocks[i].bottomLeft)
    }
}
addBlocks()

//add usuario
const user= document.createElement('div')
user.classList.add('user')
grid.appendChild(user)
drawUser()

//add pelota
const ball= document.createElement('div')
ball.classList.add('ball')
grid.appendChild(ball)
drawBall()

//movimientos

function movement(e){
    switch(e.key){
        case 'FlechaIzquierda':
            if (currentPosition[0]>0){
                currentPosition[0]+=10
                console.log(currentPosition[0]>0)
                drawUser()
            }
            break
            case 'FlechaDerecha':
                if (currentPosition[0]< (boardWidth - blockWidth)){
                    currentPosition[0] += 10
                    console.log(currentPosition[0])
                    drawUser()
                }
                break
    }
}
document.addEventListener('keydown', movement)
