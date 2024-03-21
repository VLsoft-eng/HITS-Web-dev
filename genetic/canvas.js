import {searching} from "./genetic.js";

const canvas = document.getElementById('canvas');
const clear = document.getElementById('clear');
const start = document.getElementById('start');
let ctx = canvas.getContext('2d');
export let points = [];

canvas.addEventListener('click', addPoint)

function addPoint(event){
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    points.push({x, y});
    drawPoints();
    drawLines(x, y);
}

function drawPoints(){
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

function drawLines(x, y){
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.line;
    let len = points.length;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
    for (let i = 0; i < len - 1; i++){
        ctx.moveTo(x, y);
        ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.stroke();
    ctx.closePath();
}

clear.addEventListener('click', clearCanvas);
start.addEventListener('click', showPath);

function clearCanvas() {
    ctx.reset();
    points.length = 0;
}

function showPath(){
    let ans =  searching();
    drawAnswer(ans);
}

function drawAnswer(answer) {
    ctx.beginPath();
    ctx.lineWidth = 4;
    ctx.line;
    ctx.strokeStyle = 'rgba(0,255,255,1)';
    ctx.shadowColor = 'rgba(0,255,255,1)'; // Цвет тени
    ctx.shadowBlur = 5; // Размытие тени
    let len = answer.length;
    for (let i = 0; i < len - 1; i++){
        ctx.moveTo(points[answer[i]].x, points[answer[i]].y);
        ctx.lineTo(points[answer[i + 1]].x, points[answer[i + 1]].y);
    }
    ctx.moveTo(points[answer[0]].x, points[answer[0]].y);
    ctx.lineTo(points[answer[len - 1]].x, points[answer[len - 1]].y);
    ctx.stroke();
    ctx.closePath();
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    drawPoints();
}

