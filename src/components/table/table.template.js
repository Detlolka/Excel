
const CODES =
{
  A: 65,
  Z: 90
};

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}


function toCell(row) {
  return function(_, index) {
    return `
    <div class="cell"
      data-num="${index + 1}"
      data-id ="${row}:${index}"
      data-type="cell"
      contenteditable>
    </div>
  `;
  };
}

function toColumn(col, index) {
  return `
  <div class="column" data-type="resizable" data-num="${index + 1}">
    ${col}
    <div class="col-resize" data-resize="col"></div>
  </div>
  `;
}

function createRow(content = '', index = '') {
  return `
  <div class="row" data-type="resizable">
    <div class="row-info">
    ${index}
    ${index ? '<div class="row-resize" data-resize="row"></div>' : ''}
    </div>
    <div class="row-data">${content}</div>
  </div>
  `;
}

export function createTable(rowsCount = 20) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];

  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(toColumn)
      .join('');

  rows.push(createRow(cols));

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(toCell(row))
        .join('');
    rows.push(createRow(cells, row + 1));
  }

  return rows.join('');
}

