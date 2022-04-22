import {
    tableSubtraction,
    createVector,
    radToDeg
} from "./util/util.js";

const canvas = document.querySelector('.coords');

function createLen() {
    const inputLen = document.createElement('input');
    inputLen.classList.add('len');
    inputLen.setAttribute('maxlength', '3');
    inputLen.value = 0;
    return inputLen;
}

function createAng() {
    const inputAng = document.createElement('input');
    inputAng.classList.add('ang');
    inputAng.setAttribute('maxlength', '3');
    inputAng.value = 0;
    return inputAng;
}

function createSlash() {
    const slash = document.createElement('span');
    slash.textContent = ' / ';
    return slash;
}

function createTd() {
    const td = document.createElement('td');
    td.appendChild(createLen());
    td.appendChild(createSlash());
    td.appendChild(createAng());
    return td;
}

function createInputTable(inputedTable, cellsCount) {
    for (let i = 0; i < 4; i++) {
        const tr = document.createElement('tr');
        for (let j = 0; j < cellsCount; j++) {
            tr.appendChild(createTd());
            if (i === 0) {
                tr.children[j].textContent = j;
            }
        }
        inputedTable.appendChild(tr);
    }
    inputedTable.children[0].children[0].textContent = '';
    inputedTable.children[1].children[0].textContent = 'В';
    inputedTable.children[2].children[0].textContent = 'П';
    inputedTable.children[3].children[0].textContent = 'О';
}

function createResultTable(resultTable, cellsCount, resultSet) {
    console.log(resultSet);
    for(let i = 0; i < 4; i++){
        if(resultTable.firstChild){
            resultTable.removeChild(resultTable.firstChild);
        }
    }

    for (let i = 0; i < 4; i++) {
        const tr = document.createElement('tr');
        for (let j = 0; j < cellsCount; j++) {
            const td = document.createElement('td');
            switch (i) {
                case 0:
                    td.textContent = j;
                    if(j === 0){
                        td.textContent = '';
                    }
                    break;
                case 1:
                    if(j === 0){
                        td.textContent = 'В';
                    } else {
                        let ang = radToDeg(resultSet.vertical[j - 1].ang).toFixed(1);
                        if(ang === 'NaN'){
                            ang = 0;
                        }
                        td.textContent = resultSet.vertical[j - 1].len + ' / ' + ang;
                    }
                    break;
                case 2:
                    if(j === 0){
                        td.textContent = 'П';
                    } else {
                        let ang = radToDeg(resultSet.transverse[j - 1].ang).toFixed(1);
                        if(ang === 'NaN'){
                            ang = 0;
                        }
                        td.textContent = resultSet.transverse[j - 1].len + ' / ' + ang;
                    }
                    break;
                case 3:
                    if(j === 0){
                        td.textContent = 'О';
                    } else {
                        let ang = radToDeg(resultSet.axial[j - 1].ang).toFixed(1);
                        if(ang === 'NaN'){
                            ang = 0;
                        }
                        td.textContent = resultSet.axial[j - 1].len + ' / ' + ang;
                    }
                    break;
                default:
                    break;
            }
            tr.appendChild(td);
        }
        resultTable.appendChild(tr);
    }
}

function load() {
    const firstTable = document.querySelector('.table-subtraction--first');
    const secondTable = document.querySelector('.table-subtraction--second');
    createInputTable(firstTable, 11);
    createInputTable(secondTable, 11);
    canvas.classList.add('hidden');
}

function tableHandler() {
    const firstTable = document.querySelector('.table-subtraction--first');
    const secondTable = document.querySelector('.table-subtraction--second');
    const subtractButton = document.querySelector('.substract');
    const resultTable = document.querySelector('.table-subtraction--result');

    subtractButton.addEventListener('click', function () {
        const firstSet = {
            vertical: [],
            transverse: [],
            axial: [],
        };

        const secondSet = {
            vertical: [],
            transverse: [],
            axial: [],
        };
        for(let i = 1; i < 4; i++){
            for(let j = 1; j < firstTable.children[1].children.length; j++){
                const firstLen = firstTable.children[i].children[j].querySelector('.len').value;
                const firstAng = firstTable.children[i].children[j].querySelector('.ang').value;
                const secondLen = secondTable.children[i].children[j].querySelector('.len').value;
                const secondAng = secondTable.children[i].children[j].querySelector('.ang').value;
                switch (i) {
                    case 1:
                        firstSet.vertical.push(createVector(firstLen, firstAng));
                        secondSet.vertical.push(createVector(secondLen, secondAng));    
                        break;
                    case 2:
                        firstSet.transverse.push(createVector(firstLen, firstAng));
                        secondSet.transverse.push(createVector(secondLen, secondAng));    
                        break;
                    case 3:
                        firstSet.axial.push(createVector(firstLen, firstAng));
                        secondSet.axial.push(createVector(secondLen, secondAng));    
                        break;
                    default:
                        break;
                }
            }
        }
        const resultSet = tableSubtraction(firstSet, secondSet);
        createResultTable(resultTable, 11, resultSet);
    });
}

export {
    tableHandler,
    load
};