import {
    drawVector,
} from "../canvas/canvas.js";

const radToDeg = (rad) => rad * (180 / Math.PI);
const degToRad = (deg) => (deg * (Math.PI / 180));
const SIZE = 50;

function getQuad(x, y, ang) {
    if (x <= 0){
        return degToRad(180) - ang;
    }
    else if(y < 0){
       return degToRad(360) + ang;
    }
    return ang;
}

function vectorByCoord(x, y) {
    this.len = Math.round(Math.sqrt(x * x + y * y));
    this.ang = getQuad(x, y, Math.asin(y / Math.sqrt(x * x + y * y)));
    this.x = x;
    this.y = y;
}

function vectorByAng(len, ang) {
    this.len = Number(len);
    this.ang = degToRad(ang);
    this.x = Math.round(Math.cos(degToRad(ang)) * len);
    this.y = Math.round(Math.sin(degToRad(ang)) * len);
};

function getCoeff(set){
    const DIVIDER = 400;
    let max = set[0].len;
    for(let i = 1; i < set.length; i++){
        if(set[i].len > max){
            max = set[i].len;
        }
    }
    const coeff = Math.floor(max / DIVIDER) + 1;
    
    return coeff;
}

function sumVector(a, b) {
    const result = new vectorByCoord(a.x + b.x, a.y + b.y);
    return result;
};

function sumVectors(set) {
    let result = set[0];
    for(let i = 1; i < set.length; i++){
        result = sumVector(result, set[i]);
    }
    set.push(result);
    const coeff = getCoeff(set);
    set.forEach((vector) => {
        drawVector(vector, coeff, 'green');
    });
    drawVector(result, coeff, 'red');
    document.querySelector('.size-value').textContent = SIZE * coeff;
    return result;
}

function createVector(len, ang) {
    const a = new vectorByAng(len, ang);
    return a;
}

export {
    degToRad,
    radToDeg,
    createVector,
    sumVectors,
    getCoeff,
    vectorByAng,
    vectorByCoord,
};