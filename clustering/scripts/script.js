const canvas = document.getElementById('cluster_canvas');
const ctx = canvas.getContext('2d');

let isDrawing = false;

canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

function startDrawing(event) {
    isDrawing = true;
    draw(event);
}

function draw(event) {
    if (!isDrawing) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(x, y, 3, 0, Math.PI * 2);
    ctx.fill();
}

function stopDrawing() {
    isDrawing = false;
}