import Field from './Field';

export default class Radio extends Field {
  constructor({...opts}) {
    super({...opts});
  }

  setFieldState(valid) {
    this.valid = valid;
    this.toggleClassNames();
  }

  toggleClassNames() {
    if (this.valid) {
      this.node.forEach(el => el.classList.remove(this.classNames.isNotValid));
      this.node.forEach(el => el.classList.add(this.classNames.isValid));
    } else {
      this.node.forEach(el => el.classList.remove(this.classNames.isValid));
      this.node.forEach(el => el.classList.add(this.classNames.isNotValid));
    }
  }

  clear() {
    this.valid = false;
    this.node.forEach(el => el.classList.remove(this.classNames.isValid));
    this.node.forEach(el => el.classList.remove(this.classNames.isNotValid));
    this.node.forEach(el => el.checked = false);
  }
}
