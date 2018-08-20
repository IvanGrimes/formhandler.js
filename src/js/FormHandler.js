import Validator from './core/Validator';
import Form from './core/Form';
import Input from './core/Input';
import Radio from './core/Radio';
import Select from './core/Select';
import Notice from './core/Notice';
import defaultConfig from './common/defaultConfig';
import {
    RADIO_NODE_LIST,
    HTML_SELECT_ELEMENT,
    HTML_INPUT_ELEMENT,
    HTML_TEXTAREA_ELEMENT
  } from './common/constants';

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
    this.complementOptions().makeForm();

    Object.entries(this.opts.fields).forEach(([name, field]) => {
      this.makeField(name,field).makeNotice(name, field.notice);
    });

    return this;
  }

  complementOptions() {
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
    const options = {
      fields: this.fields,
      classNames: this.opts.classNames.form,
      node: document.querySelector(this.opts.form.block),
      submit: document.querySelector(this.opts.form.submit),
      listener: this.submitHandler,
    };

    this.form = new Form(options);

    this.makeNotice('form', this.opts.form.notice);
    return this;
  }

  makeField(name, field) {
    const node = this.form.node[name],
          type = node.constructor.name,
          options = {
            node: node,
            validation: field.validation,
            min: field.min,
            max: field.max,
            classNames: field.classNames,
            listener: this.inputHandler,
          };

    if (type === HTML_INPUT_ELEMENT ||
        type === HTML_TEXTAREA_ELEMENT) {
      this.fields[name] = new Input(options);
    }

    if (type === RADIO_NODE_LIST) {
      this.fields[name] = new Radio(options);
    }

    if (type === HTML_SELECT_ELEMENT) {
      this.fields[name] = new Select(options);
    }

    return this;
  }

  makeNotice(name, notice) {
    this.notices[name] = new Notice({
      form: this.form.node,
      classNames: notice.classNames,
      attachTo: notice.attachTo,
      message: null || notice.message,
      nextToField: notice.nextToField,
      parent: notice.nextToField ? this.fields[name].node : document.querySelector(notice.attachTo),
    });
    return this;
  }

  setFieldState(name, valid) {
    this.fields[name].setFieldState(valid);

    if (valid) {
      this.notices[name].hide();
    } else {
      this.notices[name].show();
    }
    this.form.setFormState();
    return this;
  }

  inputHandler = ev => {
    const name = ev.target.name,
          validation = this.fields[name].validation,
          minLength = this.fields[name].min,
          maxLength = this.fields[name].max,
          newValid = Validator.validate(validation, ev.target, minLength, maxLength);

    if (newValid) {
      this.setFieldState(name, newValid.valid, this.notices[name].message || validation.message);
    }
  }

  submitHandler = (ev) => {
    ev.preventDefault();
    Object.entries(this.fields).forEach(([name, field]) => {
      const validation = Validator.validate(field.validation, field.node, field.min, field.max);
      field.on('input', this.inputHandler);
      console.log(name, validation)
      if (typeof validation !== 'undefined') {
        this.setFieldState(name, validation.valid);
      }
    });

    this.notices.form.hide();
    this.form.setFormState();

    if (this.form.valid) {
      console.log('form is valid');
    } else {
      console.log('form is not valid');
      this.notices.form.show();
      setTimeout(() => {
        this.notices.form.hide();
      }, 2000)
    }
  }
}
