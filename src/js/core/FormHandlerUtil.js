import Validator from "./Validator";
import defaultConfig from "../common/defaultConfig";
import {
  HTML_INPUT_ELEMENT,
  HTML_SELECT_ELEMENT,
  HTML_TEXTAREA_ELEMENT, OBJECT,
  RADIO_NODE_LIST, STRING
} from "../common/constants";

export default class FormHandlerUtil {
  constructor({...args}) {
    this.opts = args;
    this.fields = {};
    this.notices = {};
    this.form = null;
    this.validator = new Validator(this.opts.customValidations);
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
  }

  getFieldNameBy(field) { // return field name get by NodeList/Selector(.className)
    const type = typeof field;
    let name;

    if (type === OBJECT) {
      name = field.name;
    }
    if (type === STRING) {
      const isSelector = /\./.test(field);

      if (isSelector) {
        name = this.form.node.querySelector(field).name;
      } else {
        name = field;
      }
    }

    return name;
  }

  isFieldValid(field) {
    return this.fields[this.getFieldNameBy(field)].valid;
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

  addField(field, {...opts}) {
    opts.notice = opts.notice ? opts.notice : {};
    const name = this.getFieldNameBy(field),
      fieldOptions = {
        validation: opts.validation,
        min: opts.min || defaultConfig.fields.min,
        max: opts.max || defaultConfig.fields.max,
        send: opts.send || defaultConfig.fields.send,
        classNames: { ...this.opts.classNames.fields, ...opts.classNames },
      },
      noticeOptions = {
        attachTo: opts.notice.attachTo || defaultConfig.notices.attachTo,
        nextToField: opts.notice.nextToField || defaultConfig.notices.nextToField,
        message: opts.notice.message || defaultConfig.notices.message,
        classNames: { ...this.opts.classNames.notices, ...opts.notice.classNames },
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

    const validation = Validator.validate(this.fields[name].validatorOptions);
    this.fields[name].submitted = true;
    this.setFieldState(name, validation.valid);

    return this.fields[name].node;
  }

  validateForm() {
    Object.entries(this.fields).forEach(([name, field]) => {
      const validation = Validator.validate(field.validatorOptions);
      field.submitted = true;
      this.setFieldState(name, validation.valid);
    });

    this.form.submitted = true;
    this.form.setFormState();

    return this.form.node;
  }

  getFieldsAndValues() {
    const data = {};

    Object.entries(this.fields).forEach(([name, field]) => {
      const type = field.node.constructor.name;
      if (type === HTML_INPUT_ELEMENT ||
        type === HTML_TEXTAREA_ELEMENT) {
        data[name] = field.node.value;
      }
      if (type === HTML_SELECT_ELEMENT) {
        data[name] = field.node.options[field.node.options.selectedIndex].value;
      }
      if (type === RADIO_NODE_LIST) {
        data[name] = [];
        Array.from(field.node).forEach(node => {
          if (node.checked) {
            data[name].push(node.value);
          }
        });
      }
    });

    return data;
  }
}
