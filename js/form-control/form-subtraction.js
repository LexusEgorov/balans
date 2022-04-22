import { createVector, subtractVectors, radToDeg } from "../util/util.js";
import { clear } from "../canvas/canvas.js";

function addSubtractHandler(){
    const subtraction = document.querySelector('.subtraction-form');
    const subtractButton = subtraction.querySelector('.subtract');
    const res = document.querySelectorAll('.reset');
    const resField = document.querySelector('.result');
    
    let setVectors = [];
    
    res.forEach((reset) => {
        reset.addEventListener('click', function(){
            clear();
            document.querySelector('.size-value').textContent = 50;
            const results = document.querySelectorAll('.result');
            results.forEach((res) =>{
                res.textContent = 'Результат';
            })
        }); 
    });

    subtractButton.addEventListener('click', function(evt){
        evt.preventDefault();
        setVectors = [];
        clear();
        const set = subtraction.querySelectorAll('.vector');
        set.forEach((vect) => {
            const len = vect.querySelector('#len').value;
            const ang = vect.querySelector('#ang').value;
            setVectors.push(createVector(len, ang));
        });
        const result = subtractVectors(setVectors);
        resField.textContent = result.len + ' / ' + radToDeg(result.ang).toFixed(1);
    });
}

export {addSubtractHandler};
