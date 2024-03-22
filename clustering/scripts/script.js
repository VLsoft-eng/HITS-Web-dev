import {kMeansClustering} from "./KMeans.js";
import {draw, startDrawing, stopDrawing} from "./draw_utils.js";
export let circles = [];
export let clusters = []
export let dots = [];
export let minDistance = 20;
export let squareSize = 10;


export let canvas = document.getElementById('cluster_canvas');
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;
export let ctx = canvas.getContext('2d');
const btn = document.getElementById('draw_button');
export let groupCount = 3;
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);
canvas.addEventListener('mousedown', startDrawing);
btn.addEventListener('click', kMeansClustering);



