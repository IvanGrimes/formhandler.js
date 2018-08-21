import Validator from './core/Validator';
import Form from './core/Form';
import Input from './core/Input';
import Radio from './core/Radio';
import Select from './core/Select';
import Notice from './core/Notice';
import Sender from './core/Sender';
import defaultConfig from './common/defaultConfig';
import {
  RADIO_NODE_LIST,
  HTML_SELECT_ELEMENT,
  HTML_INPUT_ELEMENT,
  HTML_TEXTAREA_ELEMENT,
  INPUT,
} from './common/constants';

export default class FormHandler {
  constructor({...args}) {
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
      this.makeField(name, field).makeNotice(name, field.notice);
    });

    return this;
  }

  complementOptions() {
    // Add lacks classNames and merge.
    this.opts.classNames = this.opts.classNames ? {...defaultConfig.classNames, ...this.opts.classNames} : defaultConfig.classNames;
    this.opts.classNames.form = {...defaultConfig.classNames.form, ...this.opts.classNames.form};
    this.opts.classNames.fields = {...defaultConfig.classNames.fields, ...this.opts.classNames.fields};
    this.opts.classNames.notices = {...defaultConfig.classNames.notices, ...this.opts.classNames.notices};
    // Add lacks form options and merge.
    this.opts.form = this.opts.form ? {...defaultConfig.form, ...this.opts.form} : defaultConfig.form;
    this.opts.form.notice = {...defaultConfig.form.notice, ...this.opts.form.notice};
    this.opts.form.notice.classNames = {...this.opts.classNames.notice, ...this.opts.form.notice.classNames};
    // Add lacks notices options and merge
    this.opts.notices = {...defaultConfig.notices, ...this.opts.notices};
    // Add lacks fields options and merge
    Object.entries(this.opts.fields).forEach(([name, obj]) => {
      this.opts.fields[name] = {...defaultConfig.fields, ...this.opts.fields[name]};
      this.opts.fields[name].classNames = this.opts.fields[name].classNames ? {...this.opts.classNames.fields, ...this.opts.fields[name].classNames} : this.opts.classNames.fields;
      this.opts.fields[name].notice = {...this.opts.notices, ...this.opts.fields[name].notice};
      this.opts.fields[name].notice.classNames = {...this.opts.classNames.notices, ...this.opts.fields[name].notice.classNames};
    });
    this.opts.sender = this.opts.sender ? {...defaultConfig.sender, ...this.opts.sender} : defaultConfig.sender;

    return this;
  } // TODO: Need a review

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

  makeNotice(name, notice) { // TODO: Make beautiful
    const options = {
      form: this.form.node,
      classNames: notice.classNames,
      attachTo: notice.attachTo,
      message: notice.message || Validator.getMessage(this.fields[name].validatorOptions),
      nextToField: notice.nextToField,
      parent: notice.nextToField ? this.fields[name].node : document.querySelector(notice.attachTo),
    };

    this.notices[name] = new Notice(options);
    return this;
  }

  setFieldStateFromResponse(response, property, name, message) {
    console.log(response)
    if (typeof response.then !== 'undefined') {
      response
        .then(data => data.json())
        .then(json => this.setFieldState(name, !!json[property], message));
    } else {
      response.addEventListener('load', (ev) => {
        this.setFieldState(name, !!JSON.parse(ev.target.response)[property], message);
      });
    }
  }

  setFieldState(name, valid, message) {
    console.log(name, valid);
    if (typeof valid === 'object') {
      this.setFieldStateFromResponse(valid.response, valid.property, name, message);
    } else {
      this.fields[name].setFieldState(valid);
    }
    this.notices[name].message = message;
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
          validation = Validator.validate(this.fields[name].validatorOptions);

    this.setFieldState(name, validation.valid, validation.message);
  }

  submitHandler = (ev) => {
    ev.preventDefault();
    Object.entries(this.fields).forEach(([name, field]) => {
      const validation = Validator.validate(field.validatorOptions);

      this.setFieldState(name, validation.valid, validation.message);
      field.on(INPUT, this.inputHandler);
    });

    this.form.setFormState();

    if (this.opts.sender.send) {
      const options = {
        type: this.opts.sender.type,
        url: this.form.node.action,
        method: this.form.node.method,
        form: this.form.node,
        formState: this.setFormStateFromResponse,
      };

      new Sender(options);
    }


    if (this.form.valid) {
      this.notices.form.hide();
    } else {
      this.notices.form.show();
      setTimeout(() => {
        this.notices.form.hide();
      }, 2000)
    }
  }

  setFormStateFromResponse = (result) => {
    this.notices.form.message = result === 'success' ? this.opts.form.notice.successMessage : this.opts.form.notice.errorMessage;
    this.notices.form.show();
  }
}
