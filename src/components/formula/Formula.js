import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/Dom';

export class Formula extends ExcelComponent {
  static className = 'excel__formula';
  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      ...options
    });
    this.$root = $root;
  }

  toHTML() {
    return `
    <div class="info">fx</div>
    <div id="formula" class="input" contenteditable spellcheck="false"></div>`;
  }

  init() {
    super.init();
    this.$formula = this.$root.find('#formula');
    this.$on('table:select', $cell => {
      this.$formula.text($cell.text());
    });
    this.$on('table:input', $cell => {
      this.$formula.text($cell.text());
    });

    // this.$subscribe(state => console.log('Formula Test', state));
  }

  onKeydown(evt) {
    const keys = ['Enter', 'Tab'];
    if (keys.includes(evt.key)) {
      evt.preventDefault();
      this.$emit('formula:done');
    }
    return;
  }

  onInput(evt) {
    this.$emit('formula:input', $(evt.target).text());
  }
}
