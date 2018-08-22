import Validator from './core/Validator';
import Form from './core/Form';
import Input from './core/Input';
import Radio from './core/Radio';
import Select from './core/Select';
import Notice from './core/Notice';
import Sender from './core/Sender';
import FormHandlerUtil from './core/FormHandlerUtil';
import defaultConfig from './common/defaultConfig';
import {
  RADIO_NODE_LIST,
  HTML_SELECT_ELEMENT,
  HTML_INPUT_ELEMENT,
  HTML_TEXTAREA_ELEMENT,
  INPUT,
  UNDEFINED,
  ERROR,
  SUCCESS,
  OBJECT,
  LOAD,
  FORM,
  STRING,
} from './common/constants';

export default class FormHandler extends FormHandlerUtil{
  constructor({...args}) {
    super({...args});
    this.init();
  }

  init() {
    this.complementOptions().makeForm();

    Object.entries(this.opts.fields).forEach(([name, field]) => {
      this.makeField(name, field).makeNotice(name, field.notice);
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
    this.makeNotice(FORM, this.opts.form.notice);

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
        send: field.send,
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

    this.fields[name].on(INPUT, this.inputHandler);
    return this;
  }

  makeNotice(name, notice) {
    console.log(notice.message)
    const message = this.fields[name]
      ? Validator.getMessage(this.fields[name].validatorOptions)
      : false,
      parent = notice.nextToField
        ? this.fields[name].node
        : document.querySelector(notice.attachTo),
      options = {
        form: this.form.node,
        classNames: notice.classNames,
        attachTo: notice.attachTo,
        message: notice.message || message,
        nextToField: notice.nextToField,
        parent: parent,
      };

    this.notices[name] = new Notice(options);

    return this;
  }

  setFieldStateFromResponse(response, property, name, message) {
    if (typeof response.then !== UNDEFINED) {
      response
        .then(data => data.json())
        .then(json => this.setFieldState(name, !!json[property], message));
    } else {
      response.addEventListener(LOAD, (ev) => {
        this.setFieldState(name, !!JSON.parse(ev.target.response)[property], message);
      });
    }
  }

  setFieldState(name, valid, message = this.notices[name].message) {
    const submitted = this.fields[name].submitted;

    if (typeof valid === OBJECT) {
      this.setFieldStateFromResponse(valid.response, valid.property, name, message);
    } else {
      this.fields[name].setFieldState(valid);
    }

    if (!valid && submitted) {
      this.notices[name].show();
    } else {
      this.notices[name].hide();
    }

    this.form.setFormState();

    return this;
  }

  inputHandler = ev => {
    console.log(this.fields[ev.target.name])
    const name = ev.target.name,
          validation = Validator.validate(this.fields[name].validatorOptions);

    this.setFieldState(name, validation.valid, validation.message);
    this.form.setFormState();
  }

  submitHandler = (ev) => {
    ev.preventDefault();
    this.validateForm();

    if (this.form.valid) {
      this.notices.form.hide();

      if (this.opts.sender.send) {
        const options = {
          type: this.opts.sender.type,
          url: this.form.node.action,
          method: this.form.node.method,
          fields: this.fields,
          form: this.form.node,
          callbackOnSend: this.setFormStateFromResponse,
        };

        new Sender(options);

        setTimeout(() => {
          this.notices.form.hide();
        }, 2000);
      }
    } else {
      this.notices.form.show();
      setTimeout(() => {
        this.notices.form.hide();
      }, 2000);
    }
  }

  setFormStateFromResponse = (result) => {
    if (result === SUCCESS) {
      this.notices.form.message = this.opts.form.notice.successMessage;
      this.form.send = true;
      this.form.clear();
    }
    if (result === ERROR) {
      this.notices.form.message = this.opts.form.notice.errorMessage;
      this.form.send = false;
    }
    this.notices.form.show();
  }
}
