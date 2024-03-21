const canvas = document.getElementById('cluster_canvas');
const ctx = canvas.getContext('2d');

let isDrawing = false;
let drawDist = 15;
let circles = [];
let minDistance = 20;

canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;



canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);
canvas.addEventListener('mousedown', startDrawing);

function startDrawing(event) {
    isDrawing = true;
    draw(event);
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


function draw(event) {
    if (!isDrawing) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;


    if (!isOverlap({x, y})) {
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, Math.PI * 2);
        ctx.fill();
        circles.push({x, y})
    }
}

function stopDrawing() {
    isDrawing = false;
}