import {
  CLICK,
} from '../common/constants';

export default class Form {
  constructor({ ...opts }) {
    this.node = opts.node;
    this.submit = opts.submit;
    this.classNames = opts.classNames;
    this.fields = opts.fields;
    this.listener = opts.listener;
    this.valid = false;
    this.submitted = false;
    this.sended = null;
    this.callback = opts.callback;

    this.submit.addEventListener(CLICK, this.listener);
  }

  setFormState() {
    let validness = new Set(),
        validity;

    Object.entries(this.fields).forEach(([name, field]) => {
      if (field.validation) {
        validness.add(field.valid);
      }
    });

    validity = !validness.has(false);

    this.callback(this.node, this.valid, validity);

    this.valid = validity;

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
    Object.entries(this.fields).forEach(([name, field]) => {
      field.clear();
    });

    this.valid = false;
    this.node.classList.remove(this.classNames.isNotValid);
    this.node.classList.remove(this.classNames.isValid);
  }
}
