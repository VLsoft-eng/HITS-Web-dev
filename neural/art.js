document.addEventListener("DOMContentLoaded", function() {
    const art = document.getElementById("art");

    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            let cell = document.createElement("div");
            cell.classList.add("cell");

            cell.addEventListener("click", function () {
                cell.classList.toggle("filled");
            });

            art.appendChild(cell);
        }
    }

    function clear(){
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell =>{
            cell.classList.remove('filled');
        });
    }
    document.getElementById('delete').addEventListener('click', clear);
});