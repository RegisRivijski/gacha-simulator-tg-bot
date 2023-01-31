import _ from 'lodash';

export default class ActionData {
  #callbackData = '';

  #dataArray = [];

  constructor(ctx) {
    this.#callbackData = _.result(ctx, 'update.callback_query.data', '');
    if (this.#callbackData) {
      this.#dataArray = this.#callbackData.split(' ');
    }
  }

  getParam(key) {
    for (const item of this.#dataArray) {
      if (item.includes(key)) {
        return item.replace(key, '');
      }
    }
    return '';
  }
}
