const maze = document.getElementById("maze");

for (let i = 0; i < 21; i++) {
    for (let j = 0; j < 21; j++) {
        let cell = document.createElement("div");
        cell.classList.add("cell");

        cell.addEventListener("click", function () {
            if (!cell.classList.contains('start') && !cell.classList.contains('end')) {
                cell.classList.toggle("wall");
            }
        });

        maze.appendChild(cell);
    }
}

function lock(){
    document.getElementById('start').disabled = true;
    document.getElementById('auto').disabled = true;
    document.getElementById('delete').disabled = true;
    document.getElementById('add').disabled = true;
}
function unlock(){
    document.getElementById('start').disabled = false;
    document.getElementById('auto').disabled = false;
    document.getElementById('delete').disabled = false;
    document.getElementById('add').disabled = false;
}

// очистка лабиринта
function clearMaze() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.classList.remove('wall');
        cell.classList.remove('start');
        cell.classList.remove('end');
        cell.classList.remove('spotted');
        cell.classList.remove('visited');
        cell.classList.remove('path');
    });
}

// удаления старта и финиша
function clearPos() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.classList.remove('start');
        cell.classList.remove('end');
        cell.classList.remove('spotted');
        cell.classList.remove('visited');
        cell.classList.remove('path');
    });
}

// добавление старта и финиша
function addPos() {
    let startCell = null;
    let finishCell = null;

    clearPos();

    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.addEventListener('click', function () {
            if (!startCell) {
                startCell = cell;
                cell.classList.add('start');
                cell.classList.remove('wall');
            } else if (!finishCell) {
                finishCell = cell;
                cell.classList.add('end');
                cell.classList.remove('wall');
            } else {
                return 0;
            }
        });
    });
}

export {lock,unlock};
document.getElementById('add').addEventListener('click', addPos);
document.getElementById('delete').addEventListener('click', clearMaze);

