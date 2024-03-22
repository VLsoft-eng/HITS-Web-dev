import {ctx, canvas, clusters, squareSize, circles, minDistance, dots} from "./script.js";
import {Dot} from "./dot_class.js";

let isDrawing = false;
export function stopDrawing() {
    isDrawing = false;
}

export function startDrawing() {
    isDrawing = true;
    draw();
}

export function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

export function clearAndReset() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    circles.length = 0;
    clusters.length = 0;
    dots.length = 0;
}
function isOverlap(newDot) {
    if (dots.length === 0) return false;
    for (let dot of dots) {
        const distanceX = newDot.x - dot.x;
        const distanceY = newDot.y - dot.y;
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

        if (distance < minDistance) {
            return true;
        }
    }
    return false;
}

export function drawClusters() {
    clear();
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
        dots.push(new Dot(x, y))
    }
}
