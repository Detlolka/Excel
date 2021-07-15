const CODES ={
  A: 65,
  Z: 90
};

function toCell(_, index) {
  return `
  <div class="cell" data-num="${index + 1}" contenteditable>
  </div>
  `;
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

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}

export function createTable(rowsCount = 20) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];

  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(toColumn)
      .join('');

  const cells = new Array(colsCount)
      .fill('')
      .map(toCell)
      .join('');

  rows.push(createRow(cols));

  for (let i = 0; i < rowsCount; i++) {
    rows.push(createRow(cells, i + 1));
  }

  return rows.join('');
}
