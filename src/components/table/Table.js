import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {$} from '@core/Dom';

export class Table extends ExcelComponent {
  static className = 'excel__table';
  constructor($root) {
    super($root, {
      listeners: ['mousedown']
    });
  }

  toHTML() {
    return createTable();
  }

  onMousedown(evt) {
    if (evt.target.dataset.resize) {
      const $resizer = $(evt.target);
      const $parent = $resizer.closest('[data-type="resizable"]');
      const coords = $parent.getCords();

      document.onmousemove = e => {
        const delta = e.pageX - coords.right;
        const value = coords.width + delta;
        $parent.$el.style.width = value + 'px';
      };

      document.onmouseup = () => {
        document.onmousemove = null;
      };
    }
  }
}
