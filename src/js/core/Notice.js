import {
  DIV,
  BEFORE,
  AFTER,
} from '../common/constants';


export default class Notice {
  constructor({form, message, classNames, attachTo, nextToField, parent}) {
    this.form = form;
    this.message = message;
    this.classNames = classNames;
    this.attachTo = attachTo;
    this.nextToField = nextToField;
    this.parent = parent;
    this.node = null;
    this.mount();
  }

  mount() {
    this.node = document.createElement(DIV);
    this.node.classList.add(this.classNames.block);
    this.node.classList.add(this.classNames.hidden);

    if (this.attachTo) {
      this.parent.appendChild(this.node);
    } else {
      if (this.nextToField === BEFORE) {
        this.form.insertBefore(this.node, this.parent);
      }
      if (this.nextToField === AFTER) {
        this.form.insertBefore(this.node, this.parent.nextElementSibling);
      }
    }
  };

  show() {
    this.node.classList.remove(this.classNames.hidden);
    this.node.classList.add(this.classNames.visible);
    this.node.innerText = this.message;
  };

  hide() {
    this.node.classList.remove(this.classNames.visible);
    this.node.classList.add(this.classNames.hidden);
  }
}
