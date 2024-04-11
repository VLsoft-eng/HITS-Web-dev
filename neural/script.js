import {draw} from "./draw_utils.js";

const paintbrushSizeSlider = document.getElementById('select_paintbrush_size')
const clearButton = document.getElementById('clear_button')
export const mainCanvas = document.getElementById('main_canvas');
mainCanvas.width = mainCanvas.clientWidth;
mainCanvas.height = mainCanvas.clientHeight;
export let mainContext = mainCanvas.getContext('2d');

export let isDrawing = false;
export let lineWidth = 5;
export let currentX = 0;
export let currentY = 0;
export let previousX = 0;
export let previousY = 0;

let fetchPaintbrushSize = document.getElementById('paintbrush_size')
fetchPaintbrushSize.innerHTML = lineWidth;
paintbrushSizeSlider.addEventListener('input', () => {
    lineWidth = paintbrushSizeSlider.value;
    fetchPaintbrushSize.textContent = paintbrushSizeSlider.value;
})

clearButton.addEventListener('click', () => {
    mainContext.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
})
mainCanvas.addEventListener('mousemove', (event) => {
    previousX = currentX;
    previousY = currentY;
    currentX = event.clientX - mainCanvas.offsetLeft;
    currentY = event.clientY - mainCanvas.offsetTop;
    draw();
});
mainCanvas.addEventListener('mouseup', () => {isDrawing = false;});
mainCanvas.addEventListener('mouseout', () => {isDrawing = false;});
mainCanvas.addEventListener('mousedown', (event) => {
    isDrawing = true;
    currentX = event.clientX - mainCanvas.offsetLeft;
    currentY = event.clientY - mainCanvas.offsetTop;
});

