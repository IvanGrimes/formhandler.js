export default class Notice {
  constructor({ ...opts }) {
    this.form = opts.form;
    this.message = opts.message;
    this.classNames = opts.classNames;
    this.attachTo = opts.attachTo;
    this.nextToField = opts.nextToField;
    this.parent = opts.parent;
    this.node = null;
    this.mount();
  }

  mount() {
    this.node = document.createElement('div');
    this.node.classList.add(this.classNames.block);
    this.node.classList.add(this.classNames.hidden);

    if (this.attachTo) {
      this.parent.appendChild(this.node);
    } else {
      if (this.nextToField === 'before') {
        this.form.insertBefore(this.node, this.parent);
      }
      if (this.nextToField === 'after') {
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
