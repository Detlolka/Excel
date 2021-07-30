import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || '';
    this.emitter = options.emitter;
    this.unsubscribers = [];
    this.prepare();
  }

  // Настраиваем наш компонент до init;
  prepare() {}

  // Возвращаем шаблон компонентаж
  toHTML() {
    return '';
  }
  // Уведомляем слушателей про события event;
  $emit(evt, ...args) {
    this.emitter.emit(evt, ...args);
  }

  $on(evt, fn) {
    const unsub =this.emitter.subscribe(evt, fn);
    this.unsubscribers.push(unsub);
  }

  // Инициализируем компонент
  // Добавляем DOM слушатели
  init() {
    this.initDomListeners();
  }

  // Удаляем компонент
  // Чистим слушатели
  destroy() {
    this.removeDOMListeners();
    this.unsubscribers.forEach(unsub => unsub());
  }
}
