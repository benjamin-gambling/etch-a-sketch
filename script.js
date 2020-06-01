let grid = document.getElementById("container");
let inputHeight = document.getElementById("resolution");
let inputWidth = document.getElementById("length")
let resetButton = document.getElementById("resetAll");
let colorPicker = document.getElementById("html5colorpicker");
let colorRandom = document.getElementById("random");
let colorRainbow = document.getElementById("rainbow");
let keyboardBtn = document.getElementById("keyboard");
let mouseBtn = document.getElementById("mouse");

let newColor = '#3C3738';
let color; 
let drawType = true;

inputHeight.addEventListener('change', function() {
    inputWidth.value = parseInt(inputHeight.value * 1.4);
});


inputHeight.onchange = changeSize;
resetButton.onclick = resetCanvas;
colorPicker.onchange = changeColor;
colorRandom.onclick = randomColor;
colorRainbow.onclick = rainbowColor; 
mouseBtn.onclick = mouseDraw;
keyboardBtn.onclick = keyboardDraw;



let gridWidth = 685;
let gridHeight = 485;

let x = document.getElementById("x");
let y = document.getElementById("y");

window.onload = generateBoxes(140); //default value

let defaultColor = 'rgba(255, 255, 255, 0.753)';
let defaultFillColor = 'black';

function generateBoxes(squares){
    let gridBoxes = [];
    for(let i = 0; i < squares; i++){
        gridBoxes[i] = document.createElement('div');
        gridBoxes[i].classList.add('gridBox');
        gridBoxes[i].addEventListener('mouseenter', function () {
            if(drawType){
                event.target.style.backgroundColor = newColor;
            }
            if(color === 'random'){
                newColor = '#'+ Math.floor(Math.random()*16777215).toString(16);
                
            }
        });
        grid.appendChild(gridBoxes[i]);
    } 
    boxSize(); 
    x.textContent = Math.floor(inputWidth.value/ 2);    
    y.textContent = Math.floor(inputHeight.value/ 2);
}

function boxSize(){
    let gridBox = document.querySelectorAll(".gridBox");
    let squareWidth = gridWidth/inputWidth.value;
    let squareHeight = gridHeight/inputHeight.value;
    for(let i = 0; i < gridBox.length; i++){
        gridBox[i].style.height = squareHeight + "px";   
        gridBox[i].style.width = squareWidth + "px";
    }
}

function changeSize(){
    let height = inputHeight.value;
    let across = height * 1.4;
    let squares = height * across; 
    let canvas = document.getElementById("container");
    canvas.innerHTML = "";
    generateBoxes(squares);
}

function resetCanvas(){
    let gridBox = document.querySelectorAll(".gridBox");
    let numBox = gridBox.length;
    for (let i =0; i < numBox; i++){
        gridBox[i].style.backgroundColor = '';
    }
}

function changeColor(){
    color = true;
    newColor = colorPicker.value;
}

function randomColor(){
    color = false;
    newColor = '#'+ Math.floor(Math.random()*16777215).toString(16);
    colorPicker.value = newColor;
}

function rainbowColor(){
    color = "random";
}

function mouseDraw(){
    drawType = true;
}

function keyboardDraw(){
    drawType = false;
}

document.onkeydown = keyboardMode;

function keyboardMode(e){
    let xMax = inputWidth.value;
    let yMax = inputHeight.value;
    console.log(x)
    console.log(y)
    console.log(xMax)
    console.log(yMax)


    if(drawType === false){
        if(e.keyCode === 37) {
            //LEFT
            if(x.textContent > 0){
            x.textContent = Number(x.textContent) - 1;
            }
        } else if (e.keyCode === 38) {
            //UP
            if(y.textContent > 0){
                y.textContent = Number(y.textContent) - 1;
            }
        } else if (e.keyCode === 39) {
            //RIGHT
            if(x.textContent < xMax - 1){
                x.textContent = Number(x.textContent) + 1;
            }
        } else if (e.keyCode === 40) {
            //DOWN
            if(y.textContent < yMax - 1){
                y.textContent = Number(y.textContent) + 1;
            }
        }
        let row = Number(y.textContent) * xMax;
        let index = Number(x.textContent) + row;
        let gridBox = document.querySelectorAll(".gridBox")[index];
        if(color === 'random'){
            newColor = '#'+ Math.floor(Math.random()*16777215).toString(16);
        }
        gridBox.style.backgroundColor = newColor;
    }
}

