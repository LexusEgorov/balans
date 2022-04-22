import { addSummHandler } from "./form-control/form-summ.js";
import { addDecompositionHandler } from "./form-control/form-decomposition.js";
import { addSubtractHandler } from "./form-control/form-subtraction.js";
import { clear } from "./canvas/canvas.js";
import { load, tableHandler } from "./tables-substraction.js";

const selector = document.querySelector('#select');
const input = document.querySelector('.operations');
const canvas = document.querySelector('.coords');

input.appendChild(document.querySelector(getOperation('.sum-vectors')).content.cloneNode(true));
getHandler('.sum-vectors');
selector.value = 'summ';

function getOperation(value){
    switch (value){
        case 'summ':
            return '.sum-vectors';
        case 'decomposition':
            return '.vector-to-angles';
        case 'subtraction':
            return '.subtraction-vectors';
        case 'table-sub':
            return '.tables-sub';
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
        case '.subtraction-vectors':
            addSubtractHandler();
            return;
        case '.tables-sub':
            load();
            tableHandler();
            return;
        default:
            return;
    }
}

selector.addEventListener('change', () =>{
    clear();
    canvas.classList.remove('hidden');
    document.querySelector('.size-value').textContent = 50;
    const operation = getOperation(selector.value);
    input.innerHTML = '';
    input.appendChild(document.querySelector(operation).content.cloneNode(true));
    getHandler(operation);
});
