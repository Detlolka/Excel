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
      const parentData = $parent.$el.dataset.num;
      const columns = document
          .querySelectorAll(`[data-num="${parentData}"]`);

      document.onmousemove = e => {
        e.preventDefault();
        if (evt.target.dataset.resize === 'col') {
          document.body.style.cursor = 'col-resize';
          const delta = e.pageX - coords.right;
          const value = coords.width + delta;
          const finalSize = $parent.$el.style.width = value + 'px';
          columns.forEach(k => {
            k.style.width = finalSize;
          });
        }
        if (evt.target.dataset.resize === 'row') {
          document.body.style.cursor = 'row-resize';
          const delta = e.pageY - coords.bottom;
          const value = coords.height + delta;
          $parent.$el.style.height = value + 'px';
        }
      };

      document.onmouseup = () => {
        document.onmousemove = null;
        document.body.style.cursor = 'default';
      };
    }
  }
}
