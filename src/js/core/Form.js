export default class Form {
  constructor({ ...opts }) {
    this.opts = opts.opts;
    this.node = document.querySelector(this.opts.form.block);
    this.submit = this.node.querySelector(this.opts.form.submit);
    this.classNames = this.opts.classNames.form;
    this.fields = opts.fields;
    this.notice = opts.notice;
    this.method = this.node.method;
    this.action = this.node.action;
    this.messages = {
      success: this.opts.form.notice.successMsg,
      invalid: this.opts.form.notice.invalidMsg,
      error: this.opts.form.notice.errorMsg,
    };
    this.listener = opts.listener;
    this.valid = false;

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

  setSubmitState() {}

  resetForm() {
    Object.entries(this.fields).forEach(([name, field]) => {
      field.clear();
    });

    this.valid = false;
    this.node.classList.remove(this.classNames.isNotValid);
    this.node.classList.remove(this.classNames.isValid);
  }
}
