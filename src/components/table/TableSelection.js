export class TableSelection {
  static className = 'selected';
  constructor() {
    this.group = [];
    this.current = null;
  }

  // $el instanceof DOM === true
  select($el) {
    this.removeSelect();
    this.group.push($el);
    this.current = $el;
    $el.focus().addClass(TableSelection.className);
  }

  selectGroup($group = []) {
    this.removeSelect();
    this.group = $group;
    this.group.forEach($el => $el.addClass(TableSelection.className));
  }

  removeSelect() {
    this.group.map($el => $el.removeClass(TableSelection.className));
    this.group = [];
  }
}
