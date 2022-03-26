import { radToDeg } from "../util/util.js";
import { getVectors } from "../vector-operations/find-vectors.js";

function addDecompositionHandler(){
    const decomposition = document.querySelector('.decomposition-form');
    const decompButton = decomposition.querySelector('.decomposition');
    const resFields = decomposition.querySelector('.results').children;
    
    decompButton.addEventListener('click', function(evt){
        evt.preventDefault();
        const len = decomposition.querySelector('.vector').querySelector('#len').value;
        const ang = [
            decomposition.querySelector('.vector').querySelector('#ang').value,
            decomposition.querySelector('.angles').querySelector('#ang1').value,
            decomposition.querySelector('.angles').querySelector('#ang2').value,
        ];
    
        const result = getVectors(len, ang[0], ang[1], ang[2]);
        if(result === -1){
            resFields[0].textContent = 'Ошибка';
            resFields[1].textContent = 'Ошибка';
        }
        resFields[0].textContent = result.a.len.toFixed(1) + ' / ' + radToDeg(result.a.ang).toFixed(1);
        resFields[1].textContent = result.b.len.toFixed(1) + ' / ' + radToDeg(result.b.ang).toFixed(1);
    });
}

export {addDecompositionHandler};
