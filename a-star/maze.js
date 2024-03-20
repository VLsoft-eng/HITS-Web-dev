document.addEventListener("DOMContentLoaded", function() {
    const maze = document.getElementById("maze");

    // Создание клеток поля
    for (let i = 0; i < 24; i++) {
        for (let j = 0; j < 37; j++) {
            let cell = document.createElement("div");
            cell.classList.add("cell");
            cell.addEventListener("click", function() {
                cell.classList.toggle("wall");
            });
            maze.appendChild(cell);
        }
    }
});

function clearMaze() {
    const cells = document.querySelectorAll('.cell'); // Получаем все клетки лабиринта
    cells.forEach(cell => {
        cell.classList.remove('wall'); // Удаляем класс 'wall' у каждой клетки
    });
}
document.getElementById('delete').addEventListener('click', clearMaze);