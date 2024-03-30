import {lock,unlock} from './maze.js';


let slider = document.getElementById("range");
let output = document.getElementById("value");
output.innerHTML = slider.value;

slider.oninput = function() {
    output.innerHTML = this.value;
}
class Point {
    constructor(row, column) {
        this.row = row;
        this.column = column;
        this.clear = false;
    }

    makeClear() {
        cells[this.row * N + this.column].classList.remove('wall');
        this.clear = true;
    }

    isClear() {
        return this.clear;
    }

    makeWall() {
        cells[this.row * N + this.column].classList.add('wall');
        this.clear = false;
    }
    isWall() {
        return !this.clear;
    }
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function mazeInit(N) {
    const maze = [];
    for (let i = 0; i < N; i++) {
        maze[i] = [];
        for (let j = 0; j < N; j++) {
            maze[i][j] = new Point(i, j);
        }
    }
    return maze;
}

function prima() {
    // очистка поля
    cells.forEach(cell => {
        cell.classList.remove('spotted');
        cell.classList.remove('visited');
        cell.classList.remove('path');
        cell.classList.remove('start');
        cell.classList.remove('end');
    });

    const maze = mazeInit(N);
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            maze[i][j].makeWall(i, j);
        }
    }

    let currentPoint = new Point(random(0, N), random(0, N));
    maze[currentPoint.row][currentPoint.column].makeClear();
    cells[currentPoint.row * N + currentPoint.column].classList.add('start');
    lock();

    let queue = [];
    // добавляем наследников стартовой точки в очередь
    if (currentPoint.row - 2 >= 0) {
        queue.push(new Point(currentPoint.row - 2, currentPoint.column));
    }
    if (currentPoint.row + 2 < N) {
        queue.push(new Point(currentPoint.row + 2, currentPoint.column));
    }
    if (currentPoint.column - 2 >= 0) {
        queue.push(new Point(currentPoint.row, currentPoint.column - 2));
    }
    if (currentPoint.column + 2 < N) {
        queue.push(new Point(currentPoint.row, currentPoint.column + 2));
    }

    function visualizePrima() {
        if (queue.length === 0 ){
            cells[currentPoint.row * N + currentPoint.column].classList.add('end');
            unlock();
            return;
        }
        // обработка наследников
        if (queue.length > 0) {
            let index = random(0, queue.length)
            currentPoint.row = queue[index].row;
            currentPoint.column = queue[index].column;
            maze[currentPoint.row][currentPoint.column].makeClear();
            queue.splice(index, 1);

            let directions = ['up', 'down', 'left', 'right'];
            while (directions.length > 0) {
                let directionIndex = random(0,directions.length);
                let direction = directions[directionIndex];
                switch (direction) {
                    case 'up':
                        if (currentPoint.column - 2 >= 0 && maze[currentPoint.row][currentPoint.column - 2].isClear()) {
                            maze[currentPoint.row][currentPoint.column - 1].makeClear();
                            directions = [];
                        }
                        break;
                    case 'down':
                        if (currentPoint.column + 2 < N && maze[currentPoint.row][currentPoint.column + 2].isClear()) {
                            maze[currentPoint.row][currentPoint.column + 1].makeClear();
                            directions = [];
                        }
                        break;
                    case 'left':
                        if (currentPoint.row - 2 >= 0 && maze[currentPoint.row - 2][currentPoint.column].isClear()) {
                            maze[currentPoint.row - 1][currentPoint.column].makeClear();
                            directions = [];
                        }
                        break;
                    case 'right':
                        if (currentPoint.row + 2 < N && maze[currentPoint.row + 2][currentPoint.column].isClear()) {
                            maze[currentPoint.row + 1][currentPoint.column].makeClear();
                            directions = [];
                        }
                        break;
                }
                directions.splice(directionIndex, 1);
            }
            if (currentPoint.column - 2 >= 0 && maze[currentPoint.row][currentPoint.column - 2].isWall()) {
                queue.push(new Point(currentPoint.row, currentPoint.column - 2));
            }
            if (currentPoint.column + 2 < N && maze[currentPoint.row][currentPoint.column + 2].isWall()) {
                queue.push(new Point(currentPoint.row, currentPoint.column + 2));
            }
            if (currentPoint.row - 2 >= 0 && maze[currentPoint.row - 2][currentPoint.column].isWall()) {
                queue.push(new Point(currentPoint.row - 2, currentPoint.column));
            }
            if (currentPoint.row + 2 < N && maze[currentPoint.row + 2][currentPoint.column].isWall()) {
                queue.push(new Point(currentPoint.row + 2, currentPoint.column));
            }
        }
        setTimeout(visualizePrima, 100 - slider.value);
    }
    visualizePrima();
}

const cells = document.querySelectorAll('.cell');
const N = 25;

document.getElementById('auto').addEventListener('click', prima);

