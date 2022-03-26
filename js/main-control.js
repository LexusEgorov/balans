import { addSummHandler } from "./form-control/form-summ.js";
import { addDecompositionHandler } from "./form-control/form-decomposition.js";
import { clear } from "./canvas/canvas.js";

const selector = document.querySelector('#select');
const input = document.querySelector('.operations');

input.appendChild(document.querySelector(getOperation('.sum-vectors')).content.cloneNode(true));
getHandler('.sum-vectors');
selector.value = 'summ';

function getOperation(value){
    switch (value){
        case 'summ':
            return '.sum-vectors';
        case 'decomposition':
            return '.vector-to-angles';
        case 'table':
            return '.a';
        default:
            return '.sum-vectors';
    }
}

function getHandler(value){
    switch (value){
        case '.sum-vectors':
            addSummHandler();
            return;
        case '.vector-to-angles':
            addDecompositionHandler();
            return;
        default:
            return;
    }
}

selector.addEventListener('change', () =>{
    clear();
    document.querySelector('.size-value').textContent = 50;
    const operation = getOperation(selector.value);
    input.innerHTML = '';
    input.appendChild(document.querySelector(operation).content.cloneNode(true));
    getHandler(operation);
});
