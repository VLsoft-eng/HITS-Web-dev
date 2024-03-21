document.addEventListener("DOMContentLoaded", function() {
    let slider = document.getElementById("range");
    let output = document.getElementById("value");
    output.innerHTML = slider.value;

    slider.oninput = function() {
        output.innerHTML = this.value;
    }
    class Coordinate{
        constructor(row,col) {
            this.row = row;
            this.col = col;
        }
    }

    function prima() {
        const N = 20;
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            cell.classList.add('wall');
            cell.classList.remove('start');
            cell.classList.remove('add');
            cell.classList.remove('spotted');
            cell.classList.remove('visited');
            cell.classList.remove('path');
            cell.classList.remove('end');
        })

        // прима
        let point = new Coordinate(Math.floor(Math.random() * 20), Math.floor(Math.random() * 20));
        cells[point.row * N + point.col].classList.remove('wall');
        cells[point.row * N + point.col].classList.add('start');


        let queue = [];

        if (point.col - 2 >= 0) {
            queue.push(new Coordinate(point.row, point.col - 2));
        }
        if (point.col + 2 < N) {
            queue.push(new Coordinate(point.row, point.col + 2));
        }
        if (point.row - 2 >= 0) {
            queue.push(new Coordinate(point.row - 2, point.col));
        }
        if (point.row + 2 < N) {
            queue.push(new Coordinate(point.row + 2, point.col));
        }

        function visualizePrima() {
            if (queue.length === 0 ){
                cells[point.row * N + point.col].classList.add('end');
                return;
            }
            if (queue.length > 0) {
                let index = Math.floor(Math.random() * queue.length);
                point = new Coordinate(queue[index].row, queue[index].col);
                cells[point.row * N + point.col].classList.remove('wall');

                queue.splice(index, 1);

                let direction = ['up', 'down', 'left', 'right'];
                while (direction.length > 0) {
                    let directionIndex = Math.floor(Math.random() * direction.length);
                    switch (direction[directionIndex]) {
                        case 'top':
                            if (point.col - 2 >= 0 && !cells[point.row * N + point.col - 2].classList.contains('wall')) {
                                cells[point.row * N + point.col - 1].classList.remove('wall');
                                direction = [];
                            }
                            break;
                        case 'down':
                            if (point.col + 2 < N && !cells[point.row * N + point.col + 2].classList.contains('wall')) {
                                cells[point.row * N + point.col + 1].classList.remove('wall')
                                direction = [];
                            }
                            break;
                        case 'left':
                            if (point.row - 2 >= 0 && !cells[(point.row - 2) * N + point.col].classList.contains('wall')) {
                                cells[(point.row - 1) * N + point.col].classList.remove('wall');
                                direction = [];
                            }
                            break;
                        case 'right':
                            if (point.row + 2 < N && !cells[(point.row + 2) * N + point.col].classList.contains('wall')) {
                                cells[(point.row + 1) * N + point.col].classList.remove('wall');
                                direction = []
                            }
                            break;
                    }
                    direction.splice(directionIndex, 1);
                }

                if (point.col - 2 >= 0 && cells[point.row * N + point.col - 2].classList.contains('wall')) {
                    queue.push(new Coordinate(point.row, point.col - 2));
                }
                if (point.col + 2 < N && cells[point.row * N + point.col + 2].classList.contains('wall')) {
                    queue.push(new Coordinate(point.row, point.col + 2));
                }
                if (point.row - 2 >= 0 && cells[(point.row - 2) * N + point.col].classList.contains('wall')) {
                    queue.push(new Coordinate(point.row - 2, point.col));
                }
                if (point.row + 2 < N && cells[(point.row + 2) * N + point.col].classList.contains('wall')) {
                    queue.push(new Coordinate(point.row + 2, point.col));
                }
            }
            setTimeout(visualizePrima, slider.value);
        }
        visualizePrima();
    }
    document.getElementById('auto').addEventListener('click', prima);
});