import Validator from './core/Validator';
import Form from './core/Form';
import Input from './core/Input';
import Radio from './core/Radio';
import Select from './core/Select';
import Notice from './core/Notice';
import Sender from './core/Sender';
import FormHandlerUtil from './core/FormHandlerUtil';
import {
  INPUT,
  UNDEFINED,
  ERROR,
  SUCCESS,
  OBJECT,
  LOAD,
  FORM,
  CHECKBOX,
  RADIO,
  SELECT,
} from './common/constants';

export default class FormHandler extends FormHandlerUtil {
  constructor({ ...args }) {
    super({ ...args });
    this.init();
  }

  init() {
    this.complementOptions().makeForm();

    Object.entries(this.opts.fields).forEach(([name, field]) => {
      this.makeField(name, field);
      if (field.validation) {
        this.makeNotice(name, field.notice);
      }
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
      callback: this.callbacks.onFormChangeState,
    };

    this.form = new Form(options);
    this.makeNotice(FORM, this.opts.form.notice);

    return this;
  }

  makeField(name, field) {
    let node = this.form.node.querySelector(`[name=${name}]`);
    const { type } = node;
    const options = {
      node,
      validation: field.validation,
      min: field.min,
      max: field.max,
      send: field.send,
      classNames: field.classNames,
      callback: this.callbacks.onFieldChangeState,
    };

    if (type === RADIO || type === CHECKBOX) {
      node = this.form.node.querySelectorAll(`[name=${name}]`);
      options.node = node;
      this.fields[name] = new Radio(options);
    } else if (type === SELECT) {
      this.fields[name] = new Select(options);
    } else {
      this.fields[name] = new Input(options);
    }

    this.fields[name].on(INPUT, this.inputHandler);
    return this;
  }

  makeNotice(name, notice) {
    const message = this.fields[name]
      ? Validator.validate(this.fields[name].validatorOptions).message
      : false;
    const parent = notice.nextToField
      ? this.fields[name].node
      : document.querySelector(notice.attachTo);
    const options = {
      form: this.form.node,
      classNames: notice.classNames,
      attachTo: notice.attachTo,
      message: notice.message || message,
      nextToField: notice.nextToField,
      parent,
    };

    this.notices[name] = new Notice(options);

    return this;
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
  };

  setFieldStateFromResponse(response, property, name, message) {
    // eslint-disable-next-line valid-typeof
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
    const { submitted } = this.fields[name];

    // eslint-disable-next-line valid-typeof
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

  inputHandler = (ev) => {
    const { name } = ev.target;
    const validation = Validator.validate(this.fields[name].validatorOptions);

    if (this.fields[name].validation) {
      this.setFieldState(name, validation.valid, validation.message);
    }

    this.form.setFormState();
  };

  submitHandler = (ev) => {
    ev.preventDefault();
    const fieldNodes = [];

    // eslint-disable-next-line no-unused-vars
    Object.entries(this.fields).forEach(([name, field]) => {
      field.setFieldSubmitted(true);
      fieldNodes.push(field.node);
    });

    this.callbacks.onSubmit(this.form.node, fieldNodes);

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
          callbacks: {
            setFormState: this.setFormStateFromResponse,
            onSend: this.callbacks.onSend,
          },
        };
        const sender = new Sender(options);

        sender.sendRequest(sender.makeData());

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
}
