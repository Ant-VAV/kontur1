let matrixAClassName = 'matrix-a';
let matrixBClassName = 'matrix-b';
let matrixCalcClassName = 'matrix-calculated';

document.querySelector('.matrix-edit-col .button-add').addEventListener('click', function () {
    if (isMatrixASelected()) {
        appendCol(matrixAClassName);
    } else {
        appendCol(matrixBClassName);
        appendCol(matrixCalcClassName);
    }
});

document.querySelector('.matrix-edit-col .button-delete').addEventListener('click', function () {
    if (isMatrixASelected()) {
        removeCol(matrixAClassName);
    } else {
        removeCol(matrixBClassName);
        removeCol(matrixCalcClassName);
    }
});

document.querySelector('.matrix-edit-row .button-add').addEventListener('click', function () {
    if (isMatrixASelected()) {
        appendRow(matrixAClassName);
        appendRow(matrixCalcClassName);
    } else {
        appendRow(matrixBClassName);
    }
});

document.querySelector('.matrix-edit-row .button-delete').addEventListener('click', function () {
    if (isMatrixASelected()) {
        removeRow(matrixAClassName);
        removeRow(matrixCalcClassName);
    } else {
        removeRow(matrixBClassName);
    }
});

function appendCol(matrixClassName) {
    let allRows = getMatrixRows(matrixClassName);
    let newColNumber = getColsFromFirstRow(matrixClassName).length + 1;
    if (newColNumber < 11) {
        for (let i = 0; i < allRows.length; i++) {
            allRows[i].appendChild(createMatrixField(i + 1, newColNumber, getFieldPrefixFromMatrixClass(matrixClassName)));
        }
    }
}

function removeCol(matrixClassName) {
    let allRows = getMatrixRows(matrixClassName);
    document.querySelectorAll(`.${matrixClassName} .matrix-row`);
    let colsCount = getColsFromFirstRow(matrixClassName).length;
    if (colsCount > 1) {
        for (let i = 0; i < allRows.length; i++) {
            allRows[i].removeChild(document.querySelector(`.${matrixClassName} .matrix-row:nth-of-type(${i + 1}) .matrix-field:nth-of-type(${colsCount})`));
        }
    }
}

function appendRow(matrixClassName) {
    let newRowNumber = getMatrixRows(matrixClassName).length + 1;
    if (newRowNumber < 11) {
        let colsCountInRow = getColsFromFirstRow(matrixClassName).length;

        let newRow = document.querySelector(`.${matrixClassName}`).appendChild(createEmptyMatrixRow(newRowNumber));
        for (let i = 0; i < colsCountInRow; i++) {
            newRow.appendChild(createMatrixField(newRowNumber, i + 1, getFieldPrefixFromMatrixClass(matrixClassName)));
        }
    }
}

function removeRow(matrixClassName) {
    let allRows = document.querySelectorAll(`.${matrixClassName} .matrix-row`);
    if (allRows.length > 1) {
        let lastRowIndex = allRows.length - 1;
        document.querySelector(`.${matrixClassName}`).removeChild(allRows[lastRowIndex]);
    }
}

function createEmptyMatrixRow(rowNumber) {
    let colElement = document.createElement('div');
    colElement.classList.add('matrix-row');
    colElement.setAttribute('data-row-number', rowNumber);

    return colElement;
}

function createMatrixField(rowNumber, colNumber, prefix) {
    let colElement = document.createElement('input');
    colElement.classList.add('matrix-field');
    colElement.setAttribute('type', 'text');
    colElement.setAttribute('placeholder', `${prefix}${rowNumber},${colNumber}`);
    colElement.setAttribute('data-col-number', colNumber);
    if (prefix === 'c') {
        colElement.disabled = true;
    }

    return colElement;
}

function getFieldPrefixFromMatrixClass(matrixClassName) {
    return matrixClassName === matrixAClassName ? 'a' : matrixClassName === matrixBClassName ? 'b' : 'c';
}

function isMatrixASelected() {
    return document.querySelector('#matrix-a-radio').checked;
}

function getMatrixRows(matrixClassName) {
    return document.querySelectorAll(`.${matrixClassName} .matrix-row`);
}

function getColsFromFirstRow(matrixClassName) {
    return document.querySelectorAll(`.${matrixClassName} .matrix-row:nth-of-type(1) .matrix-field`)
}