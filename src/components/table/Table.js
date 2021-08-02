import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {resizeHandler} from './table.resize';
import {shouldResize, shouldId, matrix, nextSelector} from './table.functions';
import {TableSelection} from './TableSelection';
import {$} from '@core/Dom';

export class Table extends ExcelComponent {
  static className = 'excel__table';
  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options
    });
    this.$root = $root;
    this.maxValue = {};
  }

  maxValues() {
    const maxSelect = this.$root.findAll('.cell');
    const value = this.$root.lastId(maxSelect);
    this.maxValue = {
      maxRows: +value[0],
      maxCols: +value[1]
    };
  }

  toHTML() {
    return createTable();
  }

  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init();
    this.maxValues();
    const $cell = this.$root.find('[data-id="0:0"]');
    this.selectCell($cell);
    this.$on('formula:input', (text) => {
      this.selection.current.text(text);
    });
    this.$on('formula:done', () => {
      this.selection.current.focus();
    });
  }

  selectCell($cell) {
    this.selection.select($cell);
    this.$emit('table:select', $cell);
  }

  onMousedown(evt) {
    if (shouldResize(evt)) {
      resizeHandler(this.$root, evt);
    } else if (shouldId(evt)) {
      const $target = $(evt.target);
      if (evt.shiftKey) {
        const $cells = matrix($target, this.selection.current)
            .map(id => this.$root.find(`[data-id="${id}"]`));
        this.selection.selectGroup($cells);
      } else {
        this.selection.select($target);
      }
    }
  }

  onKeydown(evt) {
    const keys = [
      'Enter',
      'Tab',
      'ArrowLeft',
      'ArrowRight',
      'ArrowDown',
      'ArrowUp'
    ];
    const {key} = evt;
    if (keys.includes(key) && !evt.shiftKey) {
      evt.preventDefault();
      const id = this.selection.current.id(true);
      const $next = this.$root.find(nextSelector(key, id, this.maxValue));
      this.selectCell($next);
    }
  }

  onInput(evt) {
    this.$emit('table:input', $(evt.target));
  }
}


// Scripting 18ms;
// Rendering 306 ms
