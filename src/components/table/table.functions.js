import {range} from '@core/utils';

export function shouldResize(evt) {
  return evt.target.dataset.resize;
}

export function shouldId(evt) {
  return evt.target.dataset.type === 'cell';
}

export function matrix($target, $current) {
  const target = $target.id(true);
  const current = $current.id(true);
  const cols = range(current.col, target.col);
  const rows = range(current.row, target.row);
  return cols.reduce((acc, col) => {
    rows.forEach(row => acc.push(`${row}:${col}`));
    return acc;
  }, []);
}

export function nextSelector(key, {col, row}, {maxRows, maxCols}) {
  const MAX_VALUE_ROWS = maxRows;
  const MAX_VALUE_COLS = maxCols;
  const MIN_VALUE = 0;
  switch (key) {
    case 'Enter':
    case 'ArrowDown':
      row = row + 1 > MAX_VALUE_ROWS ? MAX_VALUE_ROWS : row + 1;
      break;
    case 'Tab':
    case 'ArrowRight':
      col = col + 1 > MAX_VALUE_COLS ? MAX_VALUE_COLS : col + 1;
      break;
    case 'ArrowLeft':
      col = col - 1 < MIN_VALUE ? MIN_VALUE: col - 1;
      break;
    case 'ArrowUp':
      row = row - 1 < MIN_VALUE ? MIN_VALUE: row - 1;
      break;
  }
  return `[data-id="${row}:${col}"]`;
}
