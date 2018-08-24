import {
  NODE_LIST,
} from '../common/constants';

export default class Field {
  constructor({
    node, validation, min, max, send, classNames, callback,
  }) {
    this.node = node;
    this.type = this.node.constructor.name;
    this.name = this.type === NODE_LIST ? this.node[0].name : this.node.name;
    this.validation = validation;
    this.send = send;
    this.min = min;
    this.max = max;
    this.classNames = classNames;
    this.valid = false;
    this.submitted = false;
    this.callback = callback;
  }

  get validatorOptions() {
    return {
      type: this.validation,
      node: this.node,
      min: this.min,
      max: this.max,
    };
  }

  setState(valid) {
    this.callback(this.name, this.node, this.valid, valid);

    this.valid = valid;

    if (this.submitted) {
      this.toggleClassNames();
    }
  }

  setFieldSubmitted(value) {
    this.submitted = value;
  }

  on(type, listener) {
    if (this.type === NODE_LIST) {
      this.node.forEach(el => el.addEventListener(type, listener));
    } else {
      this.node.addEventListener(type, listener);
    }
  }

  off(type, listener) {
    if (this.type === NODE_LIST) {
      this.node.forEach(el => el.removeEventListener(type, listener));
    } else {
      this.node.removeEventListener(type, listener);
    }
  }

  remove() {
    this.node.remove();
  }
}
