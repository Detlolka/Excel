import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {resizeHandler} from './table.resize';
import {shouldResize, shouldId} from './table.functions';
import {TableSelection} from './TableSelection';


export class Table extends ExcelComponent {
  static className = 'excel__table';
  constructor($root) {
    super($root, {
      listeners: ['mousedown']
    });
    this.$root = $root;
  }

  toHTML() {
    return createTable();
  }

  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init();
    const $cell = this.$root.find('[data-id="A1"]');
    this.selection.select($cell);
  }

  onMousedown(evt) {
    if (shouldResize(evt)) {
      resizeHandler(this.$root, evt);
    } else if (shouldId(evt)) {
      const id = shouldId(evt);
      const $cell = this.$root.find(`[data-id="${id}"`);
      this.selection.removeSelect();
      this.selection.select($cell);
    }
  }
}


// Scripting 18ms;
// Rendering 306 ms
