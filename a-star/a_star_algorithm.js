import {lock,unlock} from './maze.js';
document.addEventListener("DOMContentLoaded", function() {

    let slider = document.getElementById("range");
    let output = document.getElementById("value");
    output.innerHTML = slider.value;
    slider.oninput = function() {
        output.innerHTML = this.value;
    }

    class Node {
        constructor(row, column, parent) {
            this.row = row;
            this.column = column;
            this.type = 0;
            this.g = 0;
            this.h = 0;
            this.f = 0;
            this.parent = parent;
        }
    }

    function matrixInit(mazeMatrix,cells) {
        let start;
        let end;

        for (let i = 0; i < N; i++) {
            mazeMatrix[i] = [];
            for (let j = 0; j < N; j++) {
                mazeMatrix[i][j] = new Node();

                if (cells[i * N + j].classList.contains('wall')) {
                    mazeMatrix[i][j].type = 1;
                } else if (cells[i * N + j].classList.contains('start')) {
                    start = new Node (i,j,null);
                } else if (cells[i * N + j].classList.contains('end')) {
                    end = new Node (i,j,null);
                }
            }
        }
        return {mazeMatrix, start, end};
    }

    function showPath(path, cells, N) {
        path.reverse();
        let i = 0;
        function visualize() {
            if (i < path.length - 1) {
                setTimeout(function() {
                    cells[path[i].row * N + path[i].column].classList.remove('visited');
                    cells[path[i].row * N + path[i].column].classList.remove('spotted');
                    cells[path[i].row * N + path[i].column].classList.add('path');
                    i++;
                    visualize();
                }, 100 - slider.value);
            }
            else{unlock();}
        }
        visualize();
    }

    function a_star() {
        lock();
        const cells = document.querySelectorAll('.cell');
        const {mazeMatrix, start, end} = matrixInit([], cells);

        if (start == null || end == null) {
            alert("Постабде пж стартп и финимш");
            unlock();
            return;
        }

        cells.forEach(cell => {
            cell.classList.remove('spotted');
            cell.classList.remove('visited');
            cell.classList.remove('path');
        });

        let visited = [];
        for (let i = 0;i<N;i++){
            visited[i]=[];
            for (let j =0;j<N;j++){
                visited[i][j] = 0;
            }
        }
        let queue = [];
        queue.push(start);

        function visualizeAlg() {
            if (queue.length === 0) {
                alert("Пути Нед!1!!1!");
                unlock();
                return 0;
            } else if (queue.length > 0) {

                let bestIndex = 0;
                for (let i = 0; i < queue.length; i++) {
                    if (queue[i].f < queue[bestIndex].f) {
                        bestIndex = i;
                    }
                }

                let current = queue[bestIndex];

                // вывод пути
                if (current.row === end.row && current.column === end.column) {
                    let path = [];
                    let currentNode = current;
                    while (currentNode.parent !== null) {
                        path.push(currentNode);
                        currentNode = currentNode.parent;
                    }
                    showPath(path, cells, N);
                    return 0;
                }

                queue.splice(bestIndex, 1);
                visited[current.row][current.column] = 1;
                cells[current.row * N + current.column].classList.remove('spotted');
                cells[current.row * N + current.column].classList.add('visited');

                // создание массива соседей
                let moves = [
                    {row: 0, column: -1},
                    {row: 0, column: 1},
                    {row: -1, column: 0},
                    {row: 1, column: 0}
                ];

                let neighbors = [];
                for (let i = 0; i < 4; i++) {
                    let neighbor = new Node(current.row + moves[i].row, current.column + moves[i].column, current);

                    if (neighbor.row >= 0 && neighbor.row < N && neighbor.column >= 0 && neighbor.column < N) {
                        if (mazeMatrix[neighbor.row][neighbor.column].type !== 1) {
                            neighbors.push(neighbor);
                        }
                    }
                }

                // основная часть алгоритма
                for (let i = 0; i < neighbors.length; i++) {
                    let neighbor = neighbors[i];

                    if (visited[neighbor.row][neighbor.column] !== 1) {

                        let newG = current.g + 1;

                        if (!queue.includes(neighbor)) {
                            queue.push(neighbor);
                        } else if (newG >= neighbor.g) {
                            continue;
                        }

                        neighbor.g = newG;
                        neighbor.h = Math.abs(neighbor.row - end.row) + Math.abs(neighbor.column - end.column);
                        neighbor.f = neighbor.g + neighbor.h;
                        neighbor.parent = current;
                        visited[neighbor.row][neighbor.column] = 1;
                        cells[neighbor.row * N + neighbor.column].classList.add('spotted');
                    }
                }
            }
            setTimeout(visualizeAlg, 100 - slider.value);
        }
        visualizeAlg();
    }

    const N = 25;
    document.getElementById('start').addEventListener('click', a_star);
});
