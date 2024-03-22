import {searching} from "./genetic.js";

export let points = [];
let answerPath = [];

let showLines = true;
let answerFound= false;

const canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d');
canvas.addEventListener('click', function (event){
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    points.push({x, y});
    if (answerFound){
        answerPath = [];
        answerFound = false;
    }
    drawPoints();
});

const findButton = document.getElementById('start');
findButton.addEventListener('click', function (){
    if (points.length < 2){
        alert('Поставьте больше точек...')
        return;
    }
    answerFound = true;
    answerPath = searching();
    drawPoints();
});


const clearButton = document.getElementById('clear');
clearButton.addEventListener('click', function (){
    ctx.reset();
    points.length = 0;
    answerPath.length = 0;
    answerFound = false;
});

const showLinesButton = document.getElementById('lineBetweenPoints');
showLinesButton.addEventListener('click', function (){
    showLines = !showLines;
    ctx.reset();
    drawPoints();
});

function drawPoints(){
    ctx.reset();
    if (showLines){
        drawLines();
    }
    if (answerFound){
        drawAnswerPath();
    }
    ctx.font = "15px Arial";
    ctx.textAlign = "center";
    let len = points.length;
    for (let i = 0; i < len; i++){
        ctx.beginPath();
        ctx.fillStyle = 'black';
        ctx.arc(points[i].x, points[i].y, 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = 'white';
        ctx.fillText(i, points[i].x, points[i].y + 5);
        ctx.closePath();
    }
}

function drawLines(){
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.line;
    let len = points.length;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
    for(let i = 0; i < len - 1; i++) {
        for (let j = i + 1; j < len; j++) {
            ctx.moveTo(points[i].x, points[i].y);
            ctx.lineTo(points[j].x, points[j].y);
        }
    }
    ctx.stroke();
    ctx.closePath();
}

function drawAnswerPath() {
    ctx.beginPath();
    ctx.lineWidth = 4;
    ctx.line;
    ctx.strokeStyle = 'rgba(0,255,255,1)';
    ctx.shadowColor = 'rgba(0,255,255,1)'; // Цвет тени
    ctx.shadowBlur = 5; // Размытие тени
    let len = answerPath.length;
    for (let i = 0; i < len - 1; i++){
        ctx.moveTo(points[answerPath[i]].x, points[answerPath[i]].y);
        ctx.lineTo(points[answerPath[i + 1]].x, points[answerPath[i + 1]].y);
    }
    ctx.moveTo(points[answerPath[0]].x, points[answerPath[0]].y);
    ctx.lineTo(points[answerPath[len - 1]].x, points[answerPath[len - 1]].y);
    ctx.stroke();
    ctx.closePath();
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
}


