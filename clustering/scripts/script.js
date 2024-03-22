import {kMeansClustering} from "./KMeans/KMeans.js";
import {clearAndReset, draw, startDrawing, stopDrawing} from "./draw_utils.js";
export let circles = [];
export let clusters = []
export let dots = [];
export let minDistance = 20;
export let squareSize = 10;


export let canvas = document.getElementById('cluster_canvas');
const btn = document.getElementById('draw_button');
const cbtn = document.getElementById('clear_button');
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;
export let ctx = canvas.getContext('2d');
export let groupCount = 5;
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);
canvas.addEventListener('mousedown', startDrawing);
cbtn.addEventListener('click', clearAndReset)
btn.addEventListener('click', kMeansClustering);



