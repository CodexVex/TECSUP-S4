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

