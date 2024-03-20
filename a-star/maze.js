document.addEventListener("DOMContentLoaded", function() {
    const maze = document.getElementById("maze");

    // Создание клеток поля
    for (let i = 0; i < 20; i++) {
        for (let j = 0; j < 20; j++) {
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

    // очистка лабиринта
    function clearMaze() {
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            cell.classList.remove('wall');
            cell.classList.remove('start');
            cell.classList.remove('end');
            cell.classList.remove('spotted');

        });
    }

    // удаления старта и финиша
    function clearPos() {
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            cell.classList.remove('start');
            cell.classList.remove('end');
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

    document.getElementById('add').addEventListener('click', addPos);
    document.getElementById('delete').addEventListener('click', clearMaze);
});
