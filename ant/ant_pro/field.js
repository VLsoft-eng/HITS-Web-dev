import {map,pheromones,reset} from './ant_algorithm_pro.js'

const canvas = document.getElementById('field');
let ctx = canvas.getContext('2d');

function startDrawing(e){
    isDrawing = true;
    draw(e);
}

function endDrawing(){
    isDrawing = false;
}


function draw(e){
    if (isDrawing) {
        let x = e.offsetX, y = e.offsetY;
        if (drawingColony && !colonyPos.x) {
            drawColony(x, y);
            colonyPos.x = x;
            colonyPos.y = y;
        }

        if (drawingWalls) {
            drawWall(x, y);
            for (let i = x;i<x+20;i++){
                for (let j = y;j<y+20;j++){
                    map[i][j]=-1;
                }
            }
            walls.push({x:x,y:y});
        }

        if (drawingFood) {
            drawFood(x, y);
            for (let i = x;i<x+20;i++){
                for (let j = y;j<y+20;j++){
                    map[i][j]=-2;
                }
            }
            food.push({x:x,y:y});
        }
    }
}

function drawColony(x,y){
    ctx.beginPath();
    ctx.arc(x, y, 15, 0, Math.PI * 2);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
}
function drawWall(x,y){
    ctx.beginPath();
    ctx.rect(x, y, 20, 20);
    ctx.fillStyle = 'navajowhite';
    ctx.fill();
    ctx.closePath();
}
function drawFood(x,y) {
    ctx.beginPath();
    ctx.rect(x - 10, y - 10, 20, 20);
    ctx.fillStyle = 'green';
    ctx.fill();
    ctx.closePath();
}

function switchColony(){
    drawingColony = true;
    drawingWalls = false;
    drawingFood = false;

    document.getElementById('addWall').disabled = false;
    document.getElementById('addColony').disabled = true;
    document.getElementById('addFood').disabled = false;
}

function switchWalls(){
    drawingWalls = true;
    drawingColony = false;
    drawingFood = false;

    document.getElementById('addWall').disabled = true;
    document.getElementById('addColony').disabled = false;
    document.getElementById('addFood').disabled = false;
}

function switchFood(){
    drawingFood = true;
    drawingWalls = false;
    drawingColony = false;

    document.getElementById('addWall').disabled = false;
    document.getElementById('addColony').disabled = false;
    document.getElementById('addFood').disabled = true;
}

function drawMap(ants){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < ants.length; i++) {
        for (let j = 0; j < ants[i].pheromonePath.length; j++) {
            const x = ants[i].pheromonePath[j].x;
            const y = ants[i].pheromonePath[j].y;
            if (pheromones[x][y] < 0) {
                ctx.beginPath();
                ctx.arc(x, y, 1, 0, Math.PI * 2);
                ctx.fillStyle = 'purple';
                ctx.fill();
                ctx.closePath();
                pheromones[x][y] += 1;
            }
            if (pheromones[x][y] > 0) {
                ctx.beginPath();
                ctx.arc(x, y, 1, 0, Math.PI * 2);
                ctx.fillStyle = 'yellow';
                ctx.fill();
                ctx.closePath();
                pheromones[x][y] -= 1;
            }
        }
    }
    for (let i = 0;i<ants.length;i++){
        ctx.drawImage(antImage,ants[i].x - 10,ants[i].y - 10,40,40);
    }
    for (let i = 0; i <food.length;i++){
        drawFood(food[i].x,food[i].y);
    }
    for (let i = 0; i <walls.length;i++){
        drawWall(walls[i].x,walls[i].y);
    }
    if (colonyPos.x){drawColony(colonyPos.x, colonyPos.y);}
}

function clear(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    colonyPos = { x: null, y: null };
    reset();
    walls=[];
    food=[];
    for (let i = 0 ;i<750;i++){
        map[i]=[];
    }
}

//слайдеры
let antCount = document.getElementById("ants");
let outputCount = document.getElementById("antsCount");
outputCount.innerHTML = antCount.value;
antCount.oninput = function() {
    outputCount.innerHTML = this.value;
}

let slider = document.getElementById("range");
let output = document.getElementById("value");
output.innerHTML = slider.value;
slider.oninput = function() {
    output.innerHTML = this.value;
}


let colonyPos = { x: null, y: null };
let walls = [];
let food = [];

let drawingColony = false;
let drawingWalls = false;
let drawingFood = false;
let isDrawing = false;
let antImage = new Image();
antImage.src = '../../source/ant_algorithm_images/ant.png';

export {slider,antCount,colonyPos,drawMap,ctx};
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('addColony').addEventListener('click', switchColony);
    document.getElementById('addWall').addEventListener('click', switchWalls);
    document.getElementById('addFood').addEventListener('click', switchFood);
    document.getElementById('delete').addEventListener('click', clear);
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
   canvas.addEventListener('mouseup', endDrawing);
});

