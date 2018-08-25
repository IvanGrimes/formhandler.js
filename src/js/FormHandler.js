import defaultConfig from './common/defaultConfig';
import Validator from './core/Validator';
import Form from './core/Form';
import Input from './core/Input';
import Radio from './core/Radio';
import Select from './core/Select';
import Color from './core/Color';
import Notice from './core/Notice';
import Sender from './core/Sender';
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
  COLOR,
  STRING,
  NODE_LIST,
  HTML_SELECT_ELEMENT,
} from './common/constants';

export default class FormHandler { // TODO: Переименовать опцию attachTo => appendTo
  constructor({ ...args }) {
    this.opts = args;
    this.fields = {};
    this.notices = {};
    this.form = null;
    this.validator = new Validator(this.opts.customValidations);
    this.callbacks = this.opts.callbacks;

    this.init();
  }

  init() {
    this.complementOptions().makeForm();

    Object.entries(this.opts.fields).forEach(([name, field]) => {
      this.makeField(name, field);
      if (field.validation) {
        const validation = Validator.validate(this.fields[name].validatorOptions);
        this.makeNotice(name, field.notice);
        this.setFieldState(name, validation.valid, validation.message);
      }
    });
    this.form.setState();

    return this;
  }

  complementOptions() {
    // Add lacks classNames and merge.
    this.opts.classNames = this.opts.classNames
      ? { ...defaultConfig.classNames, ...this.opts.classNames }
      : defaultConfig.classNames;
    this.opts.classNames.form = {
      ...defaultConfig.classNames.form,
      ...this.opts.classNames.form,
    };
    this.opts.classNames.fields = {
      ...defaultConfig.classNames.fields,
      ...this.opts.classNames.fields,
    };
    this.opts.classNames.notices = {
      ...defaultConfig.classNames.notices,
      ...this.opts.classNames.notices,
    };


    // Add lacks form options and merge.
    this.opts.form = this.opts.form
      ? { ...defaultConfig.form, ...this.opts.form }
      : defaultConfig.form;
    this.opts.form.notice = { ...defaultConfig.form.notice, ...this.opts.form.notice };
    this.opts.form.notice.classNames = {
      ...this.opts.classNames.notice,
      ...this.opts.form.notice.classNames,
    };


    // Add lacks notices options and merge
    this.opts.notices = { ...defaultConfig.notices, ...this.opts.notices };


    // Add lacks fields options and merge
    // eslint-disable-next-line no-unused-vars
    Object.entries(this.opts.fields).forEach(([name, obj]) => {
      this.opts.fields[name] = { ...defaultConfig.fields, ...this.opts.fields[name] };
      this.opts.fields[name].classNames = this.opts.fields[name].classNames
        ? { ...this.opts.classNames.fields, ...this.opts.fields[name].classNames }
        : this.opts.classNames.fields;
      this.opts.fields[name].notice = { ...this.opts.notices, ...this.opts.fields[name].notice };
      this.opts.fields[name].notice.classNames = {
        ...this.opts.classNames.notices,
        ...this.opts.fields[name].notice.classNames,
      };
    });

    this.opts.sender = this.opts.sender
      ? { ...defaultConfig.sender, ...this.opts.sender }
      : defaultConfig.sender;

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
    } else if (type === COLOR) {
      this.fields[name] = new Color(options);
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
      if (this.opts.sender.clearFormOnSuccess) {
        this.form.clear();
      }
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
        .then((json) => {
          this.setFieldState(name, !!json[property], message);
          this.form.setState();
        });
    } else {
      response.addEventListener(LOAD, (ev) => {
        this.setFieldState(name, !!JSON.parse(ev.target.response)[property], message);
        this.form.setState();
      });
    }
  }

  setFieldState(name, valid, message = this.notices[name].message) {
    const { submitted } = this.fields[name];

    // eslint-disable-next-line valid-typeof
    if (typeof valid === OBJECT) {
      this.setFieldStateFromResponse(valid.response, valid.property, name, message);
    } else {
      this.fields[name].setState(valid);
    }

    this.notices[name].message = this.opts.fields[name].message || message;
    if (!valid && submitted) {
      this.notices[name].show();
    } else {
      this.notices[name].hide();
    }

    return this;
  }

  inputHandler = (ev) => {
    const { name } = ev.target;
    const validation = Validator.validate(this.fields[name].validatorOptions);

    if (this.fields[name].validation) {
      this.setFieldState(name, validation.valid, validation.message);

      // eslint-disable-next-line valid-typeof
      if (typeof validation.valid !== OBJECT) {
        this.form.setState();
      }
    }
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
          data: this.getFieldsAndValues,
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

  getFieldNameBy(field) { // return field name get by NodeList/Selector(.className)
    const type = typeof field;
    const { name } = field;
    const { node } = this.form;
    let fieldName;

    if (type === OBJECT) {
      fieldName = name;
    }
    if (type === STRING) {
      const isSelector = /\./.test(field);

      if (isSelector) {
        fieldName = node.querySelector(field).name;
      } else {
        fieldName = field;
      }
    }

    return fieldName;
  }

  isFieldValid(field) {
    return this.fields[this.getFieldNameBy(field)].valid;
  }

  getFieldValue(field) {
    return this.fields[this.getFieldNameBy(field)].node.value;
  }

  isFormValid() {
    return this.form.valid;
  }

  isFormSubmitted() {
    return this.form.submitted;
  }

  isFormSent() {
    return this.form.sended;
  }

  clearForm() {
    this.form.clear();
  }

  clearField(field) { // Also clears classNames and field of instance like valid, submitted
    this.fields[this.getFieldNameBy(field)].clear();
    this.form.setState();
  }

  getField(field) { // Returns a field node
    return this.fields[this.getFieldNameBy(field)].node;
  }

  addField(field, { ...opts }) {
    const options = opts;
    options.notice = options.notice ? options.notice : {};
    const name = this.getFieldNameBy(field);


    const fieldOptions = {
      validation: options.validation,
      min: options.min || defaultConfig.fields.min,
      max: options.max || defaultConfig.fields.max,
      send: options.send || defaultConfig.fields.send,
      classNames: { ...this.opts.classNames.fields, ...options.classNames },
    };


    const noticeOptions = {
      attachTo: options.notice.attachTo || defaultConfig.notices.attachTo,
      nextToField: options.notice.nextToField || defaultConfig.notices.nextToField,
      message: options.notice.message || defaultConfig.notices.message,
      classNames: { ...this.opts.classNames.notices, ...options.notice.classNames },
    };

    this.makeField(name, fieldOptions);
    this.makeNotice(name, noticeOptions);

    return this.fields[name].node;
  }

  removeField(field) {
    const name = this.getFieldNameBy(field);

    this.fields[name].remove();
    this.notices[name].remove();
  }

  validateField(field) { // also turns on toggleClassNames
    const name = this.getFieldNameBy(field);

    if (field.validation) {
      const validation = Validator.validate(this.fields[name].validatorOptions);
      this.fields[name].submitted = true;
      this.setFieldState(name, validation.valid);
    }

    return this.fields[name].node;
  }

  validateForm() { // also turns on toggleClassNames
    Object.entries(this.fields).forEach(([name, field]) => {
      if (field.validation) {
        const validation = Validator.validate(field.validatorOptions);
        field.setFieldSubmitted(true);
        this.setFieldState(name, validation.valid, validation.message);
      }
    });

    this.form.submitted = true;
    this.form.setState();

    return this.form.node;
  }

  getFieldsAndValues = () => {
    const data = {};

    Object.entries(this.fields).forEach(([name, field]) => {
      const type = field.node.constructor.name;

      if (type === NODE_LIST) { // Radio/Checkbox
        const inputType = field.node[0].type;

        if (inputType === CHECKBOX) {
          data[name] = [];
          Array.from(field.node).forEach((node) => {
            if (node.checked) {
              data[name].push(node.value);
            }
          });
        }
        if (inputType === RADIO) {
          data[name] = '';
          Array.from(field.node).forEach((node) => {
            if (node.checked) {
              data[name] = node.value;
            }
          });
        }
      } else if (type === HTML_SELECT_ELEMENT) { // Select
        data[name] = field.node.options[field.node.options.selectedIndex].value;
      } else { // Others
        data[name] = field.node.value;
      }
    });

    return data;
  }
}
