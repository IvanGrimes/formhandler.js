export default class Field {
  constructor({...opts}) {
    this.name = opts.name;
    this.node = opts.node;
    this.listener = opts.listener;
    this.validation = {
      name: opts.validation.name,
      minLength: opts.validation.minLength,
      maxLength: opts.validation.maxLength,
      validate: opts.validation.validate,
    };
    this.classNames = opts.classNames;
    this.send = opts.send;
    this.valid = false;
  }

  setFieldState(valid) {
    this.valid = valid;
    this.toggleClassNames();
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
    this.node.value = "";
    this.valid = false;
    this.node.classList.remove(this.classNames.isNotValid);
    this.node.classList.remove(this.classNames.isValid);
  }
}
