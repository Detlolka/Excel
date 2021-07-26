export class TableSelection {
  constructor() {
    this.group = [];
  }

  // $el instanceof DOM === true
  select($el) {
    $el.addClass('selected');
    this.group.push($el);
  }

  selectGroup() {
  }

  removeSelect() {
    this.group.map(el => el.removeClass('selected'));
    this.group = [];
  }
}
