const canvas = document.getElementById('field');

canvas.addEventListener('click', (e) => {
    if (points.length >= 50){
        alert ("Воу воу, коммивояжер, притормози, сначала эти 50 городов обойди!")
        return;
    }
    const x = e.offsetX;
    const y = e.offsetY;
    points.push({ x, y });
    draw([]);
});

function draw(path){
    if (path.length!==0){
        bestPath = path;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (show) {
        ctx.beginPath();
        ctx.strokeStyle = 'gray';
        ctx.fillStyle = 'lightgray';
        for (let i = 0; i < points.length; i++) {
            for (let j = 0; j < points.length; j++) {
                ctx.moveTo(points[i].x, points[i].y);
                ctx.lineTo(points[j].x, points[j].y);
            }
        }
        ctx.stroke();
        ctx.closePath();
    }

    for (let i = 1; i < bestPath.length; i++) {
        ctx.beginPath();
        ctx.strokeStyle = 'navajowhite';
        ctx.lineWidth = 4;
        ctx.moveTo(points[bestPath[i]].x, points[bestPath[i]].y);
        ctx.lineTo(points[bestPath[i-1]].x, points[bestPath[i-1]].y);
        ctx.stroke();
        ctx.lineWidth = 1;
        ctx.closePath();
    }

    for (let i = 0; i < points.length; i++){
        ctx.beginPath();
        ctx.arc(points[i].x, points[i].y, 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "black";
        ctx.font = "12px Times New Roman";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(i + 1, points[i].x, points[i].y);
        ctx.fillStyle = "lightGray";
        ctx.closePath();
    }
}

function showLines(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    show = !show;
    draw([])
}

function clearField() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    points.splice(0);
    bestPath.splice(0);
}

//слайдеры
let antCount = document.getElementById("ants");
let outputCount = document.getElementById("antsCount");
outputCount.innerHTML = antCount.value;
antCount.oninput = function() {
    outputCount.innerHTML = this.value;
}

let slider = document.getElementById("range");
let output = document.getElementById("value");
output.innerHTML = slider.value;
slider.oninput = function() {
    output.innerHTML = this.value;
}

let iterateCount = document.getElementById("iterates");
let outputIterates = document.getElementById("iteratesCount");
outputIterates.innerHTML = iterateCount.value;
iterateCount.oninput = function() {
    outputIterates.innerHTML = this.value;
}

let ctx = canvas.getContext('2d');

let points = [];
let show = true;
let bestPath = [];

export {points,antCount,slider,iterateCount,draw};

document.getElementById('show').addEventListener('click', showLines)
document.getElementById('delete').addEventListener('click', clearField);
