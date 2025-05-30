let canvas = document.querySelector("canvas")
canvas.height = window.innerHeight
canvas.width = window.innerWidth
let ctx = canvas.getContext("2d")


class vector2{
    constructor(x=0, y=0){
        this.x = x
        this.y = y
    }
    text(){
        return `(${this.x}, ${this.y})`
    }
    roundedText(precision=10){
        return `(${Math.round(this.x*precision)/precision}, ${Math.round(this.y*precision)/precision})`
    }
    add(other){
        return new vector2(this.x+other.x, this.y+other.y)
    }
    sub(other){
        return new vector2(this.x-other.x, this.y-other.y)
    }
    mul(other){
        if (typeof(other) == "number"){
            return new vector2(this.x*other, this.y*other)
        }else{
            return new vector2(this.x*other.x, this.y*other.y)
        }
    }
    div(other){
        if (typeof(other) == "number"){
            return new vector2(this.x/other, this.y/other)
        }else{
            return new vector2(this.x/other.x, this.y/other.y)
        }
    }
    magnitude(){
        return Math.sqrt(this.x*this.x+this.y*this.y)
    }
    unit(){
        return this.div(Math.sqrt(this.x*this.x+this.y*this.y))
    }
    //Reverificar
    rotate(angle){
        let vertice = this
        angle = angle.mul(Math.PI).div(180)
        vertice = new vector3(vertice.x, vertice.y*Math.cos(angle.x)+Math.sin(angle.x)*vertice.z, vertice.z*Math.cos(angle.x)-Math.sin(angle.x)*vertice.y)
        vertice = new vector3(vertice.x*Math.cos(angle.y)-Math.sin(angle.y)*vertice.z, vertice.y, vertice.z*Math.sin(angle.y)+Math.cos(angle.y)*vertice.z)
        vertice = new vector3(vertice.x*Math.cos(angle.z)+Math.sin(angle.z)*vertice.y, -Math.sin(angle.z)*vertice.x+Math.cos(angle.z)*vertice.y, vertice.z)
        return vertice
    }
}
class vector3{
    constructor(x=0, y=0, z=0){
        this.x = x
        this.y = y
        this.z = z
    }
    text(){
        return "("+this.x+", "+this.y+", "+this.z+")"
    }
    rText(precision=10){
        return "("+Math.round(this.x*precision)/precision+", "+Math.round(this.y*precision)/precision+", "+Math.round(this.z*precision)/precision+")"
    }
    add(other){
        return new vector3(this.x+other.x, this.y+other.y, this.z+other.z)
    }
    sub(other){
        return new vector3(this.x-other.x, this.y-other.y, this.z-other.z)
    }
    mul(other){
        if (typeof(other)=="number"){
            return new vector3(this.x*other,this.y*other, this.z*other)
        }else{
            return new vector3(this.x*other.x, this.y*other.y, this.z*other.z)
        }
    }
    div(other){
        if (typeof(other)=="number"){
            return new vector3(this.x/other, this.y/other, this.z/other)
        }else{
            return new vector3(this.x/other.x, this.y/other.y, this.z/other.z)
        }
    }
    magnitude(){
        return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)
    }
    unit(){
        return this.div(Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z))
    }
    rotate(angle){
        let vertice = this
        angle = angle.mul(Math.PI).div(180)
        vertice = new vector3(vertice.x, vertice.y*Math.cos(angle.x)+Math.sin(angle.x)*vertice.z, vertice.z*Math.cos(angle.x)-Math.sin(angle.x)*vertice.y)
        vertice = new vector3(vertice.x*Math.cos(angle.y)-Math.sin(angle.y)*vertice.z, vertice.y, vertice.z*Math.sin(angle.y)+Math.cos(angle.y)*vertice.z)
        vertice = new vector3(vertice.x*Math.cos(angle.z)+Math.sin(angle.z)*vertice.y, -Math.sin(angle.z)*vertice.x+Math.cos(angle.z)*vertice.y, vertice.z)
        return vertice
    }
}

function rad(degrees){
    return (degrees-45)/360*Math.PI*2
}
function rotationToVector(degrees){
    let radians = rad(degrees)
    return new vector2(Math.sin(radians)+Math.cos(radians), Math.cos(radians)-Math.sin(radians))
}
var Models = []
Models.cube = [
[new vector3(0.5, 0.5, -0.5), new vector3(0.5, 0.5, 0.5)],
[new vector3(0.5, 0.5, 0.5), new vector3(-0.5, 0.5, 0.5)],
[new vector3(-0.5, 0.5, 0.5), new vector3(-0.5, 0.5, -0.5)],
[new vector3(-0.5, 0.5, -0.5), new vector3(0.5, 0.5, -0.5)],

[new vector3(0.5, -0.5, -0.5), new vector3(0.5, -0.5, 0.5)],
[new vector3(0.5, -0.5, 0.5), new vector3(-0.5, -0.5, 0.5)],
[new vector3(-0.5, -0.5, 0.5), new vector3(-0.5, -0.5, -0.5)],
[new vector3(-0.5, -0.5, -0.5), new vector3(0.5, -0.5, -0.5)],

[new vector3(0.5, 0.5, -0.5), new vector3(0.5, -0.5, -0.5)],
[new vector3(-0.5, 0.5, -0.5), new vector3(-0.5, -0.5, -0.5)],
[new vector3(0.5, 0.5, 0.5), new vector3(0.5, -0.5, 0.5)],
[new vector3(-0.5, 0.5, 0.5), new vector3(-0.5, -0.5, 0.5)]
]
Models.pyramid = [
[new vector3(0.5, -0.5, -0.5), new vector3(0.5, -0.5, 0.5)],
[new vector3(0.5, -0.5, 0.5), new vector3(-0.5, -0.5, 0.5)],
[new vector3(-0.5, -0.5, 0.5), new vector3(-0.5, -0.5, -0.5)],
[new vector3(-0.5, -0.5, -0.5), new vector3(0.5, -0.5, -0.5)],

[new vector3(0.5, -0.5, -0.5), new vector3(0, 0.5, 0)],
[new vector3(0.5, -0.5, 0.5), new vector3(0, 0.5, 0)],
[new vector3(-0.5, -0.5, 0.5), new vector3(0, 0.5, 0)],
[new vector3(-0.5, -0.5, -0.5), new vector3(0, 0.5, 0)]
]
Models.sphere = [
[new vector3(1.41, 0, 0), new vector3(1, -1, 0)],
[new vector3(1, -1, 0), new vector3(0, -1.41, 0)],
[new vector3(0, -1.41, 0), new vector3(-1, -1, 0)],
[new vector3(-1, -1, 0), new vector3(-1.41, 0, 0)],

[new vector3(-1.41, 0, 0), new vector3(-1, 1, 0)],
[new vector3(-1, 1, 0), new vector3(0, 1.41, 0)],
[new vector3(0, 1.41, 0), new vector3(1, 1, 0)],
[new vector3(1, 1, 0), new vector3(1.41, 0, 0)],


[new vector3(1.41, 0, 0), new vector3(1, 0, -1)],
[new vector3(1, 0, -1), new vector3(0, 0, -1.41)],
[new vector3(0, 0, -1.41), new vector3(-1, 0, -1)],
[new vector3(-1, 0, -1), new vector3(-1.41, 0, 0)],

[new vector3(-1.41, 0, 0), new vector3(-1, 0, 1)],
[new vector3(-1, 0, 1), new vector3(0, 0, 1.41)],
[new vector3(0, 0, 1.41), new vector3(1, 0, 1)],
[new vector3(1, 0, 1), new vector3(1.41, 0, 0)],


[new vector3(0, 1.41, 0), new vector3(0, 1, -1)],
[new vector3(0, 1, -1), new vector3(0, 0, -1.41)],
[new vector3(0, 0, -1.41), new vector3(0, -1, -1)],
[new vector3(0, -1, -1), new vector3(0, -1.41, 0)],

[new vector3(0, -1.41, 0), new vector3(0, -1, 1)],
[new vector3(0, -1, 1), new vector3(0, 0, 1.41)],
[new vector3(0, 0, 1.41), new vector3(0, 1, 1)],
[new vector3(0, 1, 1), new vector3(0, 1.41, 0)],
]
Models.cylinder = [
[new vector3(1.41, -0.5, 0), new vector3(1, -0.5, -1)],
[new vector3(1, -0.5, -1), new vector3(0, -0.5, -1.41)],
[new vector3(0, -0.5, -1.41), new vector3(-1, -0.5, -1)],
[new vector3(-1, -0.5, -1), new vector3(-1.41, -0.5, 0)],

[new vector3(-1.41, -0.5, 0), new vector3(-1, -0.5, 1)],
[new vector3(-1, -0.5, 1), new vector3(0, -0.5, 1.41)],
[new vector3(0, -0.5, 1.41), new vector3(1, -0.5, 1)],
[new vector3(1, -0.5, 1), new vector3(1.41, -0.5, 0)],


[new vector3(1.41, 0.5, 0), new vector3(1, 0.5, -1)],
[new vector3(1, 0.5, -1), new vector3(0, 0.5, -1.41)],
[new vector3(0, 0.5, -1.41), new vector3(-1, 0.5, -1)],
[new vector3(-1, 0.5, -1), new vector3(-1.41, 0.5, 0)],

[new vector3(-1.41, 0.5, 0), new vector3(-1, 0.5, 1)],
[new vector3(-1, 0.5, 1), new vector3(0, 0.5, 1.41)],
[new vector3(0, 0.5, 1.41), new vector3(1, 0.5, 1)],
[new vector3(1, 0.5, 1), new vector3(1.41, 0.5, 0)],

[new vector3(0, -0.5, 1.41), new vector3(0, 0.5, 1.41)],
[new vector3(0, -0.5, -1.41), new vector3(0, 0.5, -1.41)],
[new vector3(1.41, -0.5, 0), new vector3(1.41, 0.5, 0)],
[new vector3(-1.41, -0.5, 0), new vector3(-1.41, 0.5, 0)],
]
Models.cone = [
[new vector3(1.41, -0.5, 0), new vector3(1, -0.5, -1)],
[new vector3(1, -0.5, -1), new vector3(0, -0.5, -1.41)],
[new vector3(0, -0.5, -1.41), new vector3(-1, -0.5, -1)],
[new vector3(-1, -0.5, -1), new vector3(-1.41, -0.5, 0)],

[new vector3(-1.41, -0.5, 0), new vector3(-1, -0.5, 1)],
[new vector3(-1, -0.5, 1), new vector3(0, -0.5, 1.41)],
[new vector3(0, -0.5, 1.41), new vector3(1, -0.5, 1)],
[new vector3(1, -0.5, 1), new vector3(1.41, -0.5, 0)],


[new vector3(0, -0.5, 1.41), new vector3(0, 0.5, 0)],
[new vector3(0, -0.5, -1.41), new vector3(0, 0.5, 0)],
[new vector3(1.41, -0.5, 0), new vector3(0, 0.5, 0)],
[new vector3(-1.41, -0.5, 0), new vector3(0, 0.5, 0)],
]
Models.dot = [[new vector3(0, 0, 0), new vector3(0, 0, 0)]]

let letterRatio = 20
ctx.font = letterRatio+"px monospace"
ctx.textRendering = "optimizeSpeed"
class screen{
    constructor(size){
        this.size = size
        this.fill(" ")
    }

    fill(character){
        this.text = ""
        for (let i = 0; i < this.size.x*this.size.y; i++){
            this.text += character
        }
    }

    refresh(){
        ctx.fillStyle = "rgb(0, 0, 0)"
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "rgb(100, 255, 0)"
        for (let line = 0; line < this.size.y; line++){
            ctx.fillText(this.text.slice(line*this.size.x, line*this.size.x+this.size.x), 0, line*letterRatio+letterRatio)
        }
    }

    drawPixel(character, position){
        position = new vector2(Math.floor(position.x), Math.floor(position.y))
        if (position.x >= 0 && position.y >= 0 && position.x < this.size.x && position.y < this.size.y){
            let index = this.size.x*position.y+position.x
            this.text = this.text.substring(0, index)+character+this.text.substring(index+character.length)
        }
    }

    drawLine(charactere, position1, position2){
        let direction = (position2.sub(position1)).unit()
        let distance = position2.sub(position1).magnitude()
        let reference = position1
        for (let i = 0; i < distance; i++){
            reference = reference.add(direction)
            Screen.drawPixel(charactere, reference)
        }
    }

    drawPolygon(charactere, positionsList, filled=false){
        positionsList.forEach((position, index) => {
            if (index == 0){
                Screen.drawLine(charactere, position, positions[positions.length-1])
            }else{
                Screen.drawLine(charactere, position, positions[index-1])
            }
        })
    }
}
function transformVertice(v, angle){
    let vertice = v
    angle = angle.mul(Math.PI).div(180)
    vertice = new vector3(vertice.x, vertice.y*Math.cos(angle.x)+Math.sin(angle.x)*vertice.z, vertice.z*Math.cos(angle.x)-Math.sin(angle.x)*vertice.y)
    vertice = new vector3(vertice.x*Math.cos(angle.y)-Math.sin(angle.y)*vertice.z, vertice.y, vertice.z*Math.sin(angle.y)+Math.cos(angle.y)*vertice.z)
    vertice = new vector3(vertice.x*Math.cos(angle.z)+Math.sin(angle.z)*vertice.y, -Math.sin(angle.z)*vertice.x+Math.cos(angle.z)*vertice.y, vertice.z)
    return vertice
}
function to2d(vertice){
    return new vector2(focalLenght*vertice.x/(focalLenght+vertice.z), focalLenght*vertice.y/(focalLenght+vertice.z))
}





//Principal



let Screen = new screen(new vector2(159, 44))
class object{
    constructor(name, size, position, model){
        this.name = name
        this.size = size
        this.position = position
        this.orientation = new vector3(0, 0, 0)
        this.velocity = new vector3()
        this.rotationVelocity = new vector3(0, 0, 0)
        this.model = model
        this.anchored = false
    }
}
const focalLenght = 70
let Object = new object("cubo", new vector3(20, 20, 20), new vector3(0, 0, 0), Models.cube)

let camera = []
camera.position = new vector3(0, 0, 0)
camera.speed = 5
camera.orientation = new vector3(0, 0, 0)
camera.sensibility = 5

function updateFrame(dt){
    Object.orientation = Object.orientation.add(Object.rotationVelocity.mul(dt))
    Object.position = Object.position.add(Object.velocity.mul(dt))
}

document.addEventListener("keydown", function(event) {
    /*if (event.key == "a"){
        camera.position = camera.position.add(new vector3(camera.speed, 0, 0))
    }
    if (event.key == "d"){
        camera.position = camera.position.add(new vector3(-camera.speed, 0, 0))
    }
    if (event.key == "s"){
        camera.position = camera.position.add(new vector3(0, 0, camera.speed))
    }
    if (event.key == "w"){
        camera.position = camera.position.add(new vector3(0, 0, -camera.speed))
    }*/

    if (event.key == "w"){
        let direction = new vector3(0, 0, -1).rotate(camera.orientation)
        camera.position = camera.position.add(direction)
    }
    if (event.key == "a"){
        let direction = new vector3(1, 0, 0).rotate(camera.orientation)
        camera.position = camera.position.add(direction)
    }
    if (event.key == "d"){
        let direction = new vector3(-1, 0, 0).rotate(camera.orientation)
        camera.position = camera.position.add(direction)
    }
    if (event.key == "s"){
        let direction = new vector3(0, 0, 1).rotate(camera.orientation)
        camera.position = camera.position.add(direction)
    }
    
    if (event.key == "z"){
        camera.position = camera.position.add(new vector3(0, camera.speed, 0))
    }
    if (event.key == "x"){
        camera.position = camera.position.add(new vector3(0, -camera.speed, 0))
    }

    if (event.key == "ArrowUp"){
        camera.orientation = camera.orientation.add(new vector3(camera.sensibility, 0, 0))
    }
    if (event.key == "ArrowDown"){
        camera.orientation = camera.orientation.add(new vector3(-camera.sensibility, 0, 0))
    }
    if (event.key == "ArrowRight"){
        camera.orientation = camera.orientation.add(new vector3(0, camera.sensibility, 0))
    }
    if (event.key == "ArrowLeft"){
        camera.orientation = camera.orientation.add(new vector3(0, -camera.sensibility, 0))
    }
})

function drawFrame(){
    Screen.fill(" ")
    console.log()
    Object.model.forEach((line, i2) => {
        let v1 = line[0].mul(Object.size)
        let v2 = line[1].mul(Object.size)
        v1 = v1.rotate(Object.orientation)
        v2 = v2.rotate(Object.orientation)
        v1 = v1.add(Object.position).add(camera.position)
        v2 = v2.add(Object.position).add(camera.position)
        v1 = v1.sub(new vector3(0, 0, -70))
        v2 = v2.sub(new vector3(0, 0, -70))
        v1 = v1.rotate(camera.orientation)
        v2 = v2.rotate(camera.orientation)
        v1 = v1.add(new vector3(0, 0, -70))
        v2 = v2.add(new vector3(0, 0, -70))

        v1 = to2d(v1)
        v2 = to2d(v2)
        v1 = v1.add(new vector2(Screen.size.x/2, Screen.size.y/2))
        v2 = v2.add(new vector2(Screen.size.x/2, Screen.size.y/2))
        Screen.drawLine("A", v1, v2)
    })
    let dotZero = new vector3()
    dotZero = to2d(dotZero)
    dotZero = dotZero.add(new vector2(Screen.size.x/2, Screen.size.y/2))
    Screen.drawPixel("C", dotZero)


    Screen.refresh()
}

const FPS = 12
const wait = time => new Promise(res => setTimeout(res, time))
async function _load(){
    while (true){
        const dt = 1/FPS
        updateFrame(dt)
        drawFrame()
        await wait(dt*1000)
    }
}
_load()