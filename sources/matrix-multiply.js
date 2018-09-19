document.querySelector('.button-multiply').addEventListener('click', function () {
    miltiplyMatrixes();
});

function miltiplyMatrixes() {

    if (!(document.querySelector('input:invalid:not(:placeholder-shown)'))) {
        removeWarnings();
        let rowsCountMatrixA = getMatrixRows(matrixAClassName).length;
        let rowsCountMatrixB = getMatrixRows(matrixBClassName).length;
        let colsCountMatrixA = getColsFromFirstRow(matrixAClassName).length;
        let colsCountMatrixB = getColsFromFirstRow(matrixBClassName).length;

        if (colsCountMatrixA === rowsCountMatrixB) {
            for (let i = 0; i < rowsCountMatrixA; i++) { // Строки A
                for (let j = 0; j < colsCountMatrixB; j++) { // Столбцы B
                    let elementSum = 0;
                    for (let r = 0; r < colsCountMatrixA; r++) { // Умножаем и суммируем по количеству эл-ов в строке матрицы А
                        elementSum +=
                            getijElementFromMatrix(matrixAClassName, i, r).value *
                            getijElementFromMatrix(matrixBClassName, r, j).value;
                    }
                    getijElementFromMatrix(matrixCalcClassName, i, j).value = elementSum;
                }
            }
        } else {
            showWarningAndMakeLeftPanelRed('.warning-multiply');
        }
    } else {
        showWarningAndMakeLeftPanelRed('.warning-wrong-input');
    }
}

function getijElementFromMatrix(matrixClassName, i, j) {
    return document.querySelector(`.${matrixClassName} .matrix-row:nth-of-type(${i + 1}) .matrix-field:nth-of-type(${j + 1})`)
}

function showWarningAndMakeLeftPanelRed(warningClassName) {
    document.querySelector(warningClassName).classList.add('warning-visible');
    makeLeftPanelRedAgain();
}

function makeLeftPanelRedAgain() {
    document.querySelector('.left-side').classList.add('left-side-warning');
}