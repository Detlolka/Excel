import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {resizeHandler} from './table.resize';
import {shouldResize} from './table.functions';


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

  onMousedown(evt) {
    if (shouldResize(evt)) {
      resizeHandler(this.$root, evt);
    }
  }
}


// Scripting 18ms;
// Rendering 306 ms
