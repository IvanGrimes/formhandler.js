export default class Form {
  constructor({ ...opts }) {
    this.node = opts.node;
    this.submit = opts.submit;
    this.classNames = opts.classNames;
    this.fields = opts.fields;
    this.listener = opts.listener;
    this.valid = false;
    this.sended = null;

    this.submit.addEventListener('click', this.listener);
  }

  setFormState() {
    let validness = new Set();

    Object.entries(this.fields).forEach(([name, field]) => {
      validness.add(field.valid);
    });

    this.valid = !validness.has(false);

    if (this.valid) {
      this.node.classList.remove(this.classNames.isNotValid);
      this.node.classList.add(this.classNames.isValid);
    } else {
      this.node.classList.remove(this.classNames.isValid);
      this.node.classList.add(this.classNames.isNotValid);
    }
  }

  clear() {
    Object.entries(this.fields).forEach(([name, field]) => {
      field.clear();
    });

    this.valid = false;
    this.node.classList.remove(this.classNames.isNotValid);
    this.node.classList.remove(this.classNames.isValid);
  }
}
