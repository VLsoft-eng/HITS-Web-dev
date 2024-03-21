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
        const N = 20;
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

    function visualizePath(path, cells, N) {
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
                }, slider.value * 2);
            }
        }
        visualize();
    }

    function a_star() {
        const N = 20;
        const cells = document.querySelectorAll('.cell');
        const {mazeMatrix, start, end} = matrixInit([], cells);

        if (start == null || end == null){
            alert("Постабде пж стартп и финимш");
            return;
        }

        cells.forEach(cell => {
            cell.classList.remove('spotted');
            cell.classList.remove('visited');
            cell.classList.remove('path');
        });

        let queue = [];
        let visited = [];
        queue.push(start);

        function visualizeAlg() {
            let current = queue[0];

            if (visited.includes(current)){
                alert("Пути Нед!1!!1!");
                return 0;
            }

            // вывод пути
            if (current.row === end.row && current.column === end.column) {
                let path = [];
                let currentNode = current;
                while (currentNode.parent !== null) {
                    path.push(currentNode);
                    currentNode = currentNode.parent;
                }
                visualizePath(path, cells, N);
                return 0;
            }

            queue.splice(0, 1);

            cells[current.row * N + current.column].classList.remove('spotted');
            cells[current.row * N + current.column].classList.add('visited');

            const {row, column} = current;

            const moves = [
                {row: 0, column: -1},
                {row: 0, column: 1},
                {row: -1, column: 0},
                {row: 1, column: 0}
            ];

            for (const move of moves) {
                let neighbor = new Node(row + move.row, column + move.column, current);

                if (neighbor.row >= 0 && neighbor.row < N && neighbor.column >= 0 && neighbor.column < N) {
                    if (mazeMatrix[neighbor.row][neighbor.column].type !== 1) {

                        if (visited.includes(neighbor)) {
                            continue;
                        }
                        neighbor.g = current.g + 1;
                        neighbor.h = Math.abs(neighbor.row - end.row) + Math.abs(neighbor.column - end.column);
                        neighbor.f = neighbor.g + neighbor.h;

                        queue.push(neighbor);
                        cells[neighbor.row * N + neighbor.column].classList.add('spotted');
                    }
                }
            }

            visited.push(current);
            queue.sort((a, b) => a.f - b.f);
            setTimeout(visualizeAlg, slider.value);
        }
        visualizeAlg();
    }
    document.getElementById('start').addEventListener('click', a_star);
});
