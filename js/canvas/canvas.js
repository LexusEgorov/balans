import {
    degToRad,
    radToDeg
} from "../util/util.js";

const canvas = document.querySelector('.coord');
const ctx = canvas.getContext('2d');

function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawArrow(x, y, angle) {
    const LENGTH = 20;
    const ROTATE_FIRST = 170 + radToDeg(angle);
    const ROTATE_SECOND = ROTATE_FIRST + 20;
    if (x < 400) {
        ctx.lineTo(x - LENGTH * Math.cos(degToRad(ROTATE_FIRST)), y - LENGTH * Math.sin(degToRad(ROTATE_FIRST)));
        ctx.moveTo(x, y);
        ctx.lineTo(x - LENGTH * Math.cos(degToRad(ROTATE_SECOND)), y - LENGTH * Math.sin(degToRad(ROTATE_SECOND)));
    } else {
        ctx.lineTo(x + LENGTH * Math.cos(degToRad(ROTATE_FIRST)), y - LENGTH * Math.sin(degToRad(ROTATE_FIRST)));
        ctx.moveTo(x, y);
        ctx.lineTo(x + LENGTH * Math.cos(degToRad(ROTATE_SECOND)), y - LENGTH * Math.sin(degToRad(ROTATE_SECOND)));
    }
    ctx.stroke();
}

function drawVector(vector, coeff, color = 'green', xStart = 400, yStart = 400) {
    const LINE_WIDTH = 3;
    const LINE_COLOR = color;
    const ANGLE = Math.asin(vector.y / Math.sqrt(vector.x * vector.x + vector.y * vector.y));
    ctx.beginPath();
    ctx.lineWidth = LINE_WIDTH;
    ctx.strokeStyle = LINE_COLOR;
    ctx.moveTo(xStart, yStart);
    ctx.lineTo(xStart + vector.x / coeff, yStart - vector.y / coeff);
    ctx.lineCap = 'round';
    ctx.stroke();
    drawArrow(xStart + vector.x / coeff, yStart - vector.y / coeff, ANGLE);
    
}

export {
    drawVector,
    clear
};