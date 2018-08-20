import {
  RADIO_NODE_LIST,
} from '../common/constants';

export default class Field {
  constructor({...opts}) {
    this.node = opts.node;
    this.name = this.node.constructor.name === RADIO_NODE_LIST ? this.node[0].name : this.node.name;
    this.validation = opts.validation;
    this.min = opts.min;
    this.max = opts.max;
    this.classNames = opts.classNames;
    this.valid = false;
  }

  get validatorOptions() {
    return {
      type: this.validation,
      node: this.node,
      min: this.min,
      max: this.max,
    };
  };

  on(type, listener) {
    if (this.node.constructor.name === RADIO_NODE_LIST) {
      this.node.forEach(el => el.addEventListener(type, listener));
    } else {
      this.node.addEventListener(type, listener);
    }
  }

  off(type, listener) {
    if (this.node.constructor.name === RADIO_NODE_LIST) {
      this.node.forEach(el => el.removeEventListener(type, listener));
    } else {
      this.node.removeEventListener(type, listener);
    }
  }
}
