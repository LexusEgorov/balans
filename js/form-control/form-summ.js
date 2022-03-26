import { createVector, sumVectors, radToDeg } from "../util/util.js";
import { clear } from "../canvas/canvas.js";


function addSummHandler(){
    const summ = document.querySelector('.summ-form');
    const summButton = summ.querySelector('.summ');
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

    summButton.addEventListener('click', function(evt){
        evt.preventDefault();
        setVectors = [];
        clear();
        const set = summ.querySelectorAll('.vector');
        set.forEach((vect) => {
            const len = vect.querySelector('#len').value;
            const ang = vect.querySelector('#ang').value;
            setVectors.push(createVector(len, ang));
        });
        const result = sumVectors(setVectors);
        resField.textContent = result.len + ' / ' + radToDeg(result.ang).toFixed(1);
    });
}

export {addSummHandler};
