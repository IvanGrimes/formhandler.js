import {
  DIV,
  BEFORE,
  AFTER, NODE_LIST,
} from '../common/constants';

export default class Notice {
  constructor({
    form, message, classNames, appendTo, nextToField, parent,
  }) {
    this.form = form;
    this.message = message;
    this.classNames = classNames;
    this.appendTo = appendTo;
    this.nextToField = nextToField;
    this.parent = parent;
    this.node = null;
    this.mount();
  }

  mount() {
    this.node = document.createElement(DIV);
    this.node.classList.add(this.classNames.block);
    this.node.classList.add(this.classNames.hidden);

    if (this.appendTo) {
      this.parent.appendChild(this.node);
    } else {
      if (this.nextToField === BEFORE) {
        if (this.parent.constructor.name === NODE_LIST) {
          this.parent = this.parent[0];
        }
        this.parent.parentElement.insertBefore(this.node, this.parent);
      }
      if (this.nextToField === AFTER) {
        if (this.parent.constructor.name === NODE_LIST) {
          this.parent = this.parent[this.parent.length - 1];
        }
        this.parent.parentElement.insertBefore(this.node, this.parent.nextElementSibling);
      }
    }
  }

  show() {
    this.node.classList.remove(this.classNames.hidden);
    this.node.classList.add(this.classNames.visible);
    this.node.innerText = this.message;
  }

  hide() {
    this.node.classList.remove(this.classNames.visible);
    this.node.classList.add(this.classNames.hidden);
  }

  remove() {
    this.node.remove();
  }
}
