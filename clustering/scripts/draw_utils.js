import {ctx, canvas, clusters, squareSize, circles, minDistance} from "./script.js";

let isDrawing = false;
export function stopDrawing() {
    isDrawing = false;
}

export function startDrawing() {
    isDrawing = true;
    draw();
}

export function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function isOverlap(newCircle) {
    if (circles.length === 0) return false;
    for (let circle of circles) {
        const distanceX = newCircle.x - circle.x;
        const distanceY = newCircle.y - circle.y;
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

        if (distance < minDistance) {
            return true;
        }
    }
    return false;
}

export function drawClusters() {
    clearCanvas();
    clusters.forEach((c) => {
        c.dots.forEach((d) => {
            console.log(d.x);
            ctx.fillStyle = c.color;
            ctx.beginPath();
            ctx.arc(d.x, d.y, 10, 0, Math.PI * 2);
            ctx.fill();
        })
        ctx.beginPath();
        ctx.fillStyle = c.color;
        ctx.rect(c.center.x, c.center.y, squareSize, squareSize);
        ctx.stroke();
    })
}

export function draw() {
    if (!isDrawing) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.offsetX;
    const y = event.offsetY;


    if (!isOverlap({x, y})) {
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, Math.PI * 2);
        ctx.fill();
        circles.push({x, y})
    }
}
