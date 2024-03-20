document.addEventListener("DOMContentLoaded", function() {

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
        let start = new Node(0,0, null);
        let end = new Node(0,0, null);

        for (let i = 0; i < N; i++) {
            mazeMatrix[i] = [];
            for (let j = 0; j < N; j++) {
                mazeMatrix[i][j] = new Node();

                if (cells[i * N + j].classList.contains('wall')) {
                    mazeMatrix[i][j].type = 1;
                } else if (cells[i * N + j].classList.contains('start')) {
                    start.row = i;
                    start.column = j;
                } else if (cells[i * N + j].classList.contains('end')) {
                    end.row = i;
                    end.column = j;
                }
            }
        }
        return {mazeMatrix, start, end};
    }

    function a_star() {
        const N = 20;
        const cells = document.querySelectorAll('.cell');
        const { mazeMatrix, start, end } = matrixInit([],cells);

        let queue = [];
        let visited =[];
        queue.push(start);

        function visualize() {
            setTimeout(function() {
        if (queue.length > 0){
            let current = queue[0];
            let currentIndex = 0;

            // вывод пути
            if (current.row === end.row && current.column === end.column) {
                let currentNode = current;
                while (currentNode.parent !== null){
                    cells[currentNode.row * N + currentNode.column].classList.remove('visited');
                    cells[currentNode.row * N + currentNode.column].classList.remove('spotted');
                    cells[currentNode.row * N + currentNode.column].classList.add('path');
                    currentNode=currentNode.parent;
                }
                return;
            }

            queue.splice(currentIndex,1);
            visited.push(current);

            cells[current.row * N + current.column].classList.remove('spotted');
            cells[current.row * N + current.column].classList.add('visited');

            const neighbors = [];
            const {row,column} = current;

            const moves = [
                {row : 0, column : -1},
                {row : 0, column : 1},
                {row : -1, column : 0},
                {row : 1, column : 0}
            ]

            for (const move of moves){
                let neighbor = new Node(row + move.row, column + move.column, current);

                if (neighbor.row > 0 && neighbor.row < N && neighbor.column > 0 && neighbor.column < N){
                    if (mazeMatrix[neighbor.row][neighbor.column].type !== 1){
                        neighbors.push(neighbor);
                        cells[neighbor.row * N + neighbor.column].classList.add('spotted');
                    }
                }
            }

            for (const neighbor of neighbors){
                if (visited.includes(neighbor)){
                    continue;
                }
                neighbor.g = current.g + 1;
                neighbor.h = Math.abs(neighbor.row - end.row) + Math.abs(neighbor.column - end.column);
                neighbor.f = neighbor.g + neighbor.h;

                queue.push(neighbor);
            }

                queue.sort((a, b) => a.f - b.f);
                visualize();
            }
        }, 0);
    }

    // Начинаем визуализацию алгоритма
    visualize();
}

    document.getElementById('start').addEventListener('click', a_star);
});
