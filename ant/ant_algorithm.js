import {antCount, iterateCount, points,drawPath} from './field.js'

const alpha = 1;
const beta = 1;
const p = 0.5;
const q = 100;
const startPheromone = 0.2;

function matrixInit(){
    for (let i=0; i < points.length; i++){
        pheromoneMatrix[i] = [];
        for (let j= 0; j < points.length; j++){
            pheromoneMatrix[i][j] = startPheromone;
        }
    }
}
function calculateDistance(index1,index2){
    console.log(`Координаты точек: (${points[index1].x},${points[index1].y}) и (${points[index2].x},${points[index2].y})`);
    let side1 = Math.abs(points[index1].x - points[index2].x);
    let side2 = Math.abs(points[index1].y - points[index2].y);
    console.log(`Длины катетов: ${side1} и ${side2}`);
    return Math.sqrt(Math.pow(side1,2) + Math.pow(side2,2));
}
function probability(currentIndex,unvisited){
    let chances =[];
    let sum= 0;
    for (let i = 0; i < unvisited.length; i++){
        if (currentIndex === unvisited[i]){continue;}
        let currentChance = Math.pow(pheromoneMatrix[currentIndex][unvisited[i]],alpha) * Math.pow(1 / calculateDistance(currentIndex,i),beta);
        console.log("Current distance:", calculateDistance(currentIndex,i));
        console.log("Current chance:", currentChance);
        chances.push(currentChance);
        sum+=currentChance;
    }
    for (let i = 0; i <unvisited.length; i++){
        chances[i] /= sum;
    }
    return chances;
}

function nextPoint(chances){
    let random = Math.random();
    let sum = 0;

    for (let i = 0; i < chances.length; i++){
        sum+=chances[i];
        if(sum>=random){
            return i;
        }
    }
    return chances[chances.length-1];
}

function update(paths) {
    let flag = false;
    for (let i = 0; i < points.length; i++) {
        for (let j = 0; j < points.length; j++) {
            pheromoneMatrix[i][j] *= (1 - p);
        }
    }

    for (let i = 0; i < antsCount; i++) {
        let path = paths[i];
        let len = 0;
        for (let j = 0; j < path.length; j++) {
            len += path[j];
        }
        let delta = q / len;
        if (len < bestPathLength) {
            bestPath = path;
            bestPathLength = len;
            flag = true;
        }
        for (let j = 1; j < path.length; j++) {
            pheromoneMatrix[path[j - 1]][path[j]] += delta;
            pheromoneMatrix[path[j]][path[j - 1]] += delta;
        }
    }
    if (flag ===true){drawPath(bestPath);}
}

function antMove(startIndex){
    let unvisited =[];
    for (let i = 0; i < points.length;i++){
        unvisited.push(i);
    }
    unvisited.splice(startIndex,1);

    let currentIndex = startIndex;
    let path=[]; path.push(currentIndex);
    while (unvisited.length>0){
        console.log("unvisited length:", unvisited.length);
        console.log("currentIndex:", currentIndex);
        console.log("unvisited:", unvisited);
        let chances = probability(currentIndex, unvisited);
        console.log("chances:", chances);
        currentIndex = nextPoint(chances);
        console.log("next currentIndex:", currentIndex);
        path.push(currentIndex);
        unvisited.splice(currentIndex, 1);
    }
    path.push(unvisited[0]);
    return path;
}

function iterate(){
    let paths = [];
    for (let i =0; i < antsCount; i++){
        paths.push(antMove(Math.floor(Math.random()*points.length)));
    }
    update(paths);
}

function antAlgorithm(){
    matrixInit();
    for (let i= 0; i < iterateCount.value; i++){
        iterate();
    }
}

let antsCount = antCount.value;
let bestPath =[];
let pheromoneMatrix = [];
let bestPathLength = Number.MAX_VALUE;
document.getElementById('start').addEventListener('click',antAlgorithm);