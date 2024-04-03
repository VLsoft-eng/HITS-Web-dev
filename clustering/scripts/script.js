
import {clearAndReset, draw, startDrawing, stopDrawing} from "./draw_utils.js";
import {main_clustering} from "./main_clustering.js"
export let kmeansClusters = []
export let hierarchicalClusters = []
export let dots = [];
export let minDistance = 20;
export let squareSize = 10;
export let groupCount = 5;

export const canvas = document.getElementById('cluster_canvas');
export const btn = document.getElementById('draw_button');
const cbtn = document.getElementById('clear_button');
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
btn.addEventListener('click', function (){main_clustering(dots)});
clustersSlider.addEventListener('input', function () {
    fetchClustersCount.textContent = clustersSlider.value;
    groupCount = clustersSlider.value;
});




