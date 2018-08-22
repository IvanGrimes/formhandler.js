import {
  RADIO_NODE_LIST,
} from '../common/constants';

export default class Field {
  constructor({node, validation, min, max, send, classNames}) {
    this.node = node;
    this.name = this.node.constructor.name === RADIO_NODE_LIST ? this.node[0].name : this.node.name;
    this.validation = validation;
    this.send = send;
    this.min = min;
    this.max = max;
    this.classNames = classNames;
    this.valid = false;
    this.submitted = false;
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

  remove() {
    this.node.remove();
  }
}
