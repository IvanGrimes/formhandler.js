import Form from './core/Form';
import Field from './core/Field';
import Validator from './core/Validator';
import Notice from './core/Notice';
import Sender from './core/Sender';
import defaultConfig from './common/defaultConfig';

export default class FormHandler {
  constructor({ ...args }) {
    this.opts = args;
    this.fields = {};
    this.notices = {};
    this.form = null;
    this.validator = new Validator(this.opts.customValidations);
    this.init();
  }

  init() {
    this.complementOptions().makeForm().makeFields().makeNotices();

    return this;
  }

  complementOptions() { // TODO: Optimize it!
    // Add lacks classNames and merge.
    this.opts.classNames = this.opts.classNames ? { ...defaultConfig.classNames, ...this.opts.classNames } : defaultConfig.classNames;
    this.opts.classNames.form = { ...defaultConfig.classNames.form, ...this.opts.classNames.form };
    this.opts.classNames.fields = { ...defaultConfig.classNames.fields, ...this.opts.classNames.fields };
    this.opts.classNames.notices = { ...defaultConfig.classNames.notices, ...this.opts.classNames.notices };
    // Add lacks form options and merge.
    this.opts.form = this.opts.form ? { ...defaultConfig.form, ...this.opts.form } : defaultConfig.form;
    this.opts.form.notice = { ...defaultConfig.form.notice, ...this.opts.form.notice };
    this.opts.form.notice.classNames = { ...this.opts.classNames.notice, ...this.opts.form.notice.classNames };
    // Add lacks notices options and merge
    this.opts.notices = { ...defaultConfig.notices, ...this.opts.notices };
    // Add lacks fields options and merge
    Object.entries(this.opts.fields).forEach(([name,obj]) => {
      this.opts.fields[name] = {...defaultConfig.fields, ...this.opts.fields[name]};
      this.opts.fields[name].classNames = this.opts.fields[name].classNames ? { ...this.opts.classNames.fields, ...this.opts.fields[name].classNames } : this.opts.classNames.fields;
      this.opts.fields[name].notice = { ...this.opts.notices, ...this.opts.fields[name].notice };
      this.opts.fields[name].notice.classNames = { ...this.opts.classNames.notices, ...this.opts.fields[name].notice.classNames };
    });

    return this;
  }

  makeForm() {
    this.form = new Form({
      opts: this.opts,
      fields: this.fields,
      notice: new Notice({
        form: document.querySelector(this.opts.form.block),
        message: this.opts.form.notice.successMsg,
        classNames: this.opts.form.notice.classNames
          ? { ...this.opts.classNames.notices, ...this.opts.form.notice.classNames }
          : this.opts.classNames.notices,
        attachTo: this.opts.form.notice.attachTo,
        nextToField: false,
        parent: document.querySelector(this.opts.form.notice.attachTo),
      }),
      listener: this.submitHandler,
    });
    return this;
  }

  makeFields() {
    Object.entries(this.opts.fields).forEach(([name,field]) => {
      this.fields[name] = new Field({
        name: name,
        validation: {
          name: field.validation,
          minLength: field.minLength,
          maxLength: field.maxLength,
          validate: field.validate,
        },
        node: this.form.node[name],
        listener: this.inputHandler,
        classNames: field.classNames,
        send: field.send,
      });
    });
    return this;
  }

  makeNotices() {
    Object.entries(this.opts.fields).forEach(([name, field]) => {
      const notice = field.notice;

      this.notices[name] = new Notice({
        form: this.form.node,
        classNames: notice.classNames,
        attachTo: notice.attachTo,
        message: null || this.opts.fields[name].notice.message,
        nextToField: notice.nextToField,
        parent: notice.nextToField ? this.fields[name].node : document.querySelector(notice.attachTo),
      });
    });

    return this;
  }

  setFieldState(name, valid, message) {
    if (typeof valid !== 'undefined') {
      this.fields[name].setFieldState(valid);

      this.notices[name].message = message;

      if (valid) {
        this.notices[name].hide();
      } else {
        this.notices[name].show();
      }
      this.form.setFormState();
    }
    return this;
  }

  inputHandler = ev => {
    const name = ev.target.name,
          validation = this.fields[name].validation.name,
          minLength = this.fields[name].validation.minLength,
          maxLength = this.fields[name].validation.maxLength,
          newValid = Validator.validate(validation, ev.target, minLength, maxLength);

    if (newValid) {
      this.setFieldState(name, newValid.valid, this.notices[name].message || validation.message);
    }
  }

  readystatechangeHandler = (ev) => {
    const state = ev.target.readyState,
          status = ev.target.status;

    if (state === 4) {
      this.form.notice.message = this.form.messages.success;
      this.form.notice.show();
      this.form.resetForm();
      setTimeout(() => {
        this.form.notice.hide();
      }, 2000);
    }
    if (status !== 200 && state === 4) {
      console.log(`XMLHttpRequest: Status: ${status}, State: ${state}`);
      this.form.notice.message = this.form.messages.error;
      this.form.notice.show();
      setTimeout(() => {
        this.form.notice.hide();
      }, 2000);
    }
  }

  submitHandler = (ev) => {
    ev.preventDefault();
    Object.entries(this.fields).forEach(([name, field]) => {
      const validation = Validator.validate(field.validation.name, field.node, field.validation.minLength, field.validation.maxLength);
      field.node.addEventListener('input', field.listener);
      console.log(name, validation)
      if (typeof validation !== 'undefined') {
        this.setFieldState(name, validation.valid, this.notices[name].message || validation.message);
      }
    });

    this.form.notice.hide();
    this.form.setFormState();

    if (this.form.valid) {
      let sender = new Sender(
        this.form.action,
        this.form.method,
        this.fields,
        this.readystatechangeHandler
      );
      sender.makeRequest();
      sender.sendRequest();
    } else {
      this.form.notice.message = this.form.messages.invalid;
      this.form.notice.show();
      setTimeout(() => {
        this.form.notice.hide();
      }, 2000)
    }
  }
}
