import Validator from './Validator';
import defaultConfig from '../common/defaultConfig';
import {
  HTML_SELECT_ELEMENT,
  OBJECT,
  STRING,
  NODE_LIST,
  CHECKBOX,
  RADIO,
} from '../common/constants';

export default class FormHandlerUtil {
  constructor({ ...args }) {
    this.opts = args;
    this.fields = {};
    this.notices = {};
    this.form = null;
    this.validator = new Validator(this.opts.customValidations);
    this.callbacks = this.opts.callbacks;
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

    return this.form.node;
  }

  getFieldsAndValues() {
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
