document.addEventListener("DOMContentLoaded", function() {

    class Node {
        constructor(row, column) {
            this.row = row;
            this.column = column;
            this.type = 0;
            this.g = 0;
            this.h = 0;
            this.f = 0;
            this.neighboor = [];
            this.parrent = undefined;
        }
    }

    function matrixInit(mazeMatrix,cells) {
        const N = 20;
        let start = new Node(0, 0);
        let end = new Node(0, 0);

        for (let i = 0; i < N; i++) {
            mazeMatrix[i] = [];
            for (let j = 0; j < N; j++) {
                mazeMatrix[i][j] = new Node();

                if (cells[i * N + j].classList.contains('wall')) {
                    mazeMatrix[i][j].type = 1;
                } else if (cells[i * N + j].classList.contains('start')) {
                    start = new Node(i, j);
                } else if (cells[i * N + j].classList.contains('end')) {
                    end = new Node(i, j);
                }
            }
        }
        return {mazeMatrix, start, end};
    }


    function heuristic(currentPosition, endPosition) {
        let d1 = Math.abs(endPosition.row - currentPosition.row);
        let d2 = Math.abs(endPosition.column - currentPosition.column);
        return d1 + d2;
    }

    function updateNeighboor(currentNode, mazeMatrix, cells) {
        const N = 20;
        if (currentNode.row > 0 && mazeMatrix[currentNode.row-1][currentNode.column].type !== 1) {
            currentNode.neighboor.push(mazeMatrix[currentNode.row-1][currentNode.column]);
            cells[(currentNode.row - 1) * N + currentNode.column].classList.add('spotted');
            mazeMatrix[currentNode.row-1][currentNode.column].parrent=currentNode;
        }
        if (currentNode.row < N - 1 && mazeMatrix[currentNode.row + 1][currentNode.column].type !== 1) {
            currentNode.neighboor.push(mazeMatrix[currentNode.row + 1][currentNode.column]);
            cells[(currentNode.row + 1) * N + currentNode.column].classList.add('spotted');
            mazeMatrix[currentNode.row + 1][currentNode.column].parrent=currentNode;
        }
        if (currentNode.column > 0 && mazeMatrix[currentNode.row][currentNode.column - 1].type !== 1) {
            currentNode.neighboor.push(mazeMatrix[currentNode.row][currentNode.column - 1]);
            cells[currentNode.row * N + currentNode.column - 1].classList.add('spotted');
            mazeMatrix[currentNode.row][currentNode.column - 1].parrent=currentNode
        }
        if (currentNode.column < N - 1 && mazeMatrix[currentNode.row][currentNode.column + 1].type !== 1) {
            currentNode.neighboor.push(mazeMatrix[currentNode.row][currentNode.column + 1]);
            cells[currentNode.row * N + currentNode.column + 1].classList.add('spotted');
            mazeMatrix[currentNode.row][currentNode.column + 1].parrent=currentNode;
        }
    }

    function a_star() {
        const cells = document.querySelectorAll('.cell');
        const { mazeMatrix, start, end } = matrixInit([],cells);
        updateNeighboor(start, mazeMatrix, cells);
    }

    document.getElementById('start').addEventListener('click', a_star);
});
