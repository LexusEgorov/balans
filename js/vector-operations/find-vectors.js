import {
    createVector,
    vectorByAng,
    degToRad,
    radToDeg,
    getCoeff,
} from "../util/util.js";

import {
    clear,
    drawVector
} from "../canvas/canvas.js";

function getTriangle(a, angleA, angleB, angleC){
    const angle1 = degToRad(angleB - angleA);
    const angle3 = degToRad(angleA - angleC);
    const angle2 = degToRad(180 - radToDeg(angle1) - radToDeg(angle3));
    
    return {
        b: (Math.sin(angle3) * a) / Math.sin(angle2),
        c: (Math.sin(angle1) * a) / Math.sin(angle2),
    };
}

function getVectors(lenA, angleA, angleB, angleC){
    const SIZE = 50;
    clear();
    if(Math.max(angleB, angleC) <= angleA || Math.min(angleB, angleC) >= angleA){
        return -1;
    }
    const vectorA = new createVector(lenA, angleA);
    const setLen = getTriangle(vectorA.len, radToDeg(vectorA.ang), Math.max(angleB, angleC), Math.min(angleB, angleC));
    const vectorB = new vectorByAng(setLen.b, Math.max(angleB, angleC));
    const vectorC = new vectorByAng(setLen.c, Math.min(angleB, angleC));
    
    const set = [vectorA, vectorB, vectorC];
    const coeff = getCoeff(set);
    drawVector(vectorB, coeff, 'red');
    drawVector(vectorC, coeff, 'red');
    drawVector(vectorA, coeff, 'green');
    document.querySelector('.size-value').textContent = SIZE * coeff;
    return {
        a: vectorB,
        b: vectorC,
    }
}

export { getVectors};
