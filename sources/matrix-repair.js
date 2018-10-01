document.querySelector('.button-clear').addEventListener('click', function () {
    clearMatrixes();
});

document.querySelector('.button-vice-versa').addEventListener('click', function () {
    swapMatrixes();
});

function clearMatrixes() {
    clearOneMatrix(matrixAClassName);
    clearOneMatrix(matrixBClassName);
    clearOneMatrix(matrixCalcClassName);
    removeWarnings();
}

function removeWarnings() {
    document.querySelector('.left-side').classList.remove('left-side-warning');
    let warnings = document.querySelectorAll('.warning')
    for (warning of warnings) {
        warning.classList.remove('warning-visible');
    }
}

function clearOneMatrix(matrixClassName) {
    let rowsCount = getMatrixRows(matrixClassName).length;
    let colsCount = getColsFromFirstRow(matrixClassName).length;

    for (let i=0; i< rowsCount; i++) {
        for(let j=0; j<colsCount; j++) {
            getijElementFromMatrix(matrixClassName, i, j).value=null;
        }
    }
}

function swapMatrixes() {
    let rowsCountMatrixA = getMatrixRows(matrixAClassName).length;
    let rowsCountMatrixB = getMatrixRows(matrixBClassName).length;
    let colsCountMatrixA = getColsFromFirstRow(matrixAClassName).length;
    let colsCountMatrixB = getColsFromFirstRow(matrixBClassName).length;

    if (rowsCountMatrixA === colsCountMatrixB && rowsCountMatrixB === colsCountMatrixA) {
        for (let i = 0; i < rowsCountMatrixA; i++) { // Строки A
            for (let j = 0; j < rowsCountMatrixB; j++) { // Столбцы B

                let buffer = getijElementFromMatrix(matrixAClassName, i, j).value;
                getijElementFromMatrix(matrixAClassName, i, j).value = getijElementFromMatrix(matrixBClassName, j, i).value;
                getijElementFromMatrix(matrixBClassName, j, i).value = buffer;

            }
        }
    } else {
        showWarningAndMakeLeftPanelRed('.warning-vice-versa');
    }
}