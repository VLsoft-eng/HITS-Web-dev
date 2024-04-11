import {currentX, currentY, isDrawing, lineWidth, mainCanvas, mainContext, previousX, previousY} from "./script.js";

export function draw() {
    if (!isDrawing) return;

    const dist = Math.sqrt((currentX - previousX) ** 2 + (currentY - previousY) ** 2);
    const angle = Math.atan2(currentY - previousY, currentX - previousX);

    for (let i = 0; i < dist; i += lineWidth / 2) {
        const x = previousX + Math.cos(angle) * i;
        const y = previousY + Math.sin(angle) * i;
        mainContext.beginPath();
        mainContext.arc(x, y, lineWidth / 2, 0, Math.PI * 2);
        mainContext.fillStyle = "black";
        mainContext.fill();
        mainContext.closePath();
    }

    previousX = currentX;
    previousY = currentY;
}