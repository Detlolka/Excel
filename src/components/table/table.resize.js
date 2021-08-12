import {$} from '@core/Dom';

export function resizeHandler($root, evt) {
  return new Promise(resolve =>{
    const $resizer = $(evt.target);
    const $parent = $resizer.closest('[data-type="resizable"]');
    const coords = $parent.getCords();
    const parentData = $parent.data.num;
    const type = $resizer.data.resize;
    $resizer.css({
      opacity: 1,
      zIndex: 10,
    });
    let value;

    document.onmousemove = e => {
      e.preventDefault();
      if (type === 'col') {
        document.body.style.cursor = 'col-resize';
        const delta = e.pageX - coords.right;
        value = coords.width + delta;
        if (value <= 40) {
          value = 40;
          return;
        }
        $resizer.css({right: -delta + 'px'});
      } else {
        document.body.style.cursor = 'row-resize';
        const delta = e.pageY - coords.bottom;
        value = coords.height + delta;
        if (value <= 20) {
          value = 20;
          return;
        }
        $resizer.css({bottom: -delta + 'px'});
      }
    };

    document.onmouseup = () => {
      document.onmousemove = null;
      document.onmouseup = null;
      document.body.style.cursor = 'default';

      if (type === 'col') {
        $root.findAll(`[data-num="${parentData}"]`)
            .forEach(el => {
              el.style.width = value + 'px';
            });
        $parent.css({width: value + 'px'});
      } else {
        $parent.css({height: value + 'px'});
      }

      resolve({
        value,
        id: type === 'col' ? $parent.data.num : null,
      });

      $resizer.css({
        opacity: 0,
        right: 0,
        bottom: 0,
      });
    };
  });
}
