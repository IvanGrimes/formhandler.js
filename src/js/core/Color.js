import Field from './Field';

export default class Color extends Field {
  constructor({ ...opts }) {
    super({ ...opts });
  }

  setFieldState(valid) {
    this.callback(this.name, this.node, this.valid, valid);

    this.valid = valid;

    if (this.submitted) {
      this.toggleClassNames();
    }
  }

  toggleClassNames() {
    if (this.valid) {
      this.node.classList.remove(this.classNames.isNotValid);
      this.node.classList.add(this.classNames.isValid);
    } else {
      this.node.classList.remove(this.classNames.isValid);
      this.node.classList.add(this.classNames.isNotValid);
    }
  }

  clear() {
    this.callback(this.name, this.node, this.valid, false);
    this.node.value = '#000000';
    this.valid = false;
    this.submitted = false;
    this.node.classList.remove(this.classNames.isNotValid);
    this.node.classList.remove(this.classNames.isValid);
  }
}
