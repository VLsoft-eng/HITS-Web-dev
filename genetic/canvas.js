import { geneticAlgorithm } from "./genetic.js";

export let points = [];
export let shortestRoute = [];
let population = [];
let timeout;
let interval = null;
let showLines = true;
let answerIsFound= false;
let searchingRoute = false;

const canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d');
canvas.addEventListener('click', function (event){
    resetInterval();

    if(points.length > 50){
        alert('Я не буду запускаться с таким большим количеством точек');
        return;
    }

    let edge  = canvas.getBoundingClientRect();
    let x = event.clientX - edge.left;
    let y = event.clientY - edge.top;
    points.push({x, y});

    shortestRoute.length = 0;
    population.length = 0;
    answerIsFound = false;
    searchingRoute = false;
    redrawGraph();
});

const findButton = document.getElementById('start');
findButton.addEventListener('click', function (){
    resetInterval();
    if (points.length < 3){
        alert('Поставьте больше точек...')
        return;
    }
    population.length = 0;
    findRoute();
});

function findRoute(){
    searchingRoute = true;
    answerIsFound = false;
    let countIterations = 0;
    interval = setInterval(function (){
        population = geneticAlgorithm(population)
        if (population[0] !== shortestRoute){
            shortestRoute = population[0];
            redrawGraph();
            countIterations = 0;
        }
        if (countIterations > 100){
            searchingRoute = false;
            answerIsFound = true;
            redrawGraph();
            resetInterval();
        }
        countIterations++;
    }, timeout);
}

const clearButton = document.getElementById('clear');
clearButton.addEventListener('click', function (){
    resetInterval();
    ctx.reset();
    points.length = 0;
    shortestRoute.length = 0;
    population.length = 0;
    answerIsFound = false;
    searchingRoute = false;
});

const showLinesButton = document.getElementById('lineBetweenPoints');
showLinesButton.addEventListener('click', function (){
    showLines = !showLines;
    redrawGraph();
    if (searchingRoute) {
        resetInterval();
        findRoute();
    }
});

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

function drawShortRoute() {
    ctx.beginPath();
    ctx.lineWidth = 4;
    ctx.line;
    if (answerIsFound) {
        ctx.strokeStyle = 'rgba(0,255,255,1)';
        ctx.shadowColor = 'rgba(0,255,255,1)';
    } else {
        ctx.strokeStyle = 'rgba(255,255,255,1)';
        ctx.shadowColor = 'rgba(255,255,255,1)';
    }
    ctx.shadowBlur = 5;
    let len = points.length;
    for (let i = 0; i < len - 1; i++){
        ctx.moveTo(points[shortestRoute[i]].x, points[shortestRoute[i]].y);
        ctx.lineTo(points[shortestRoute[i + 1]].x, points[shortestRoute[i + 1]].y);
    }
    ctx.moveTo(points[shortestRoute[0]].x, points[shortestRoute[0]].y);
    ctx.lineTo(points[shortestRoute[len - 1]].x, points[shortestRoute[len - 1]].y);
    ctx.stroke();
    ctx.closePath();
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
}

const sliderSpeed = document.getElementById('slider-speed');
sliderSpeed.addEventListener('input', function (){
    timeout = 101 - sliderSpeed.value ;
    if(searchingRoute){
        resetInterval();
        findRoute();
    }
});

function resetInterval() {
    clearInterval(interval);
    interval = null;
}

function redrawGraph(){
    ctx.reset();
    if (showLines){
        drawLines();
    }
    if (answerIsFound || searchingRoute){
        drawShortRoute();
    }
    drawPoints();
}

