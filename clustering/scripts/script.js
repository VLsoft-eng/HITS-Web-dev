import {kMeansClustering} from "./KMeans/KMeans.js";
import {clearAndReset, draw, startDrawing, stopDrawing} from "./draw_utils.js";
import {changeClustersHandler, changeModeHandler} from "./params_handlers.js";
export let clusters = []
export let dots = [];
export let minDistance = 20;
export let squareSize = 10;
export let groupCount = 5;

export const canvas = document.getElementById('cluster_canvas');
export const btn = document.getElementById('draw_button');
const cbtn = document.getElementById('clear_button');
export const algorithmSelector = document.getElementById("select_algo");
export const metricSelector = document.getElementById('select_metric');
export const clustersSlider = document.getElementById('select_clusters');

export const fetchClustersCount = document.getElementById('clusters_count');
fetchClustersCount.innerHTML = groupCount;

canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;
export let ctx = canvas.getContext('2d');

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);
canvas.addEventListener('mousedown', startDrawing);
cbtn.addEventListener('click', clearAndReset)
btn.addEventListener('click', kMeansClustering);
algorithmSelector.addEventListener('change', changeModeHandler);
clustersSlider.addEventListener('input', changeClustersHandler);




