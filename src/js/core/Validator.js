import FormHandlerError from '../common/FormHandlerError';

export default class Validator {
  constructor(custom) {
    this.custom = custom;

    this.addCustomValidations();
  }

  addCustomValidations() {
    Object.entries(this.custom).forEach(([type, obj]) => {
      Validator.validations[type] = obj;
    });
    console.log(Validator.validations)
    return this;
  };

  static validate(type, node, min, max) {
    let validation = Validator.validations[type];

    if (!validation) {
      throw new FormHandlerError(`No handler to validate type ${type}`);
    }

    return validation(node, min, max);
  }

  static getMessage(type, min, max) {
    if (typeof Validator.validations[type].message === 'function') {
      return Validator.validations[type].message(min, max);
    } else {
      return Validator.validations[type].message;
    }
  }

  static validations = {
    isCheckboxChecked(node, min, max) {
      let valid = false,
          message = 'isCheckboxChecked';
      return {
        valid,
        message,
      };
    },
    isRadioChecked(node, min, max) {
      let valid = false,
        message = 'isCheckboxChecked';
      return {
        valid,
        message,
      };
    },
    isSelected(node, min, max) {
      let valid = false,
        message = 'isCheckboxChecked';
      return {
        valid,
        message,
      };
    },
    isName(node, min, max) {
      const pattern = /^[A-Za-z]/;
      let valid = pattern.test(node.value),
          message = `Must contain any latin character`;

      if (node.value.length === 0) {
        valid = false;
      }
      if (min && node.value.length < min && node.value.length !== 0) {
        valid = false;
      }
      if (max && node.value.length > max) {
        valid = false;
      }

      return {
        valid,
        message,
      };
    },
    isEmail(node) {
      const pattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      let valid = pattern.test(node.value),
          message = `Must be a valid email address`;

      return {
        valid,
        message,
      };
    },
    isAge(node, min, max) {
      const pattern = /^[\d]*$/;
      let valid = pattern.test(node.value),
          message = `Must contain only digits`;

      if (node.value.length === 0 || !valid) {
        valid = false;
      }
      if (min && node.value.length < min && node.value.length !== 0) {
        valid = false;
      }
      if (max && node.value.length > max) {
        valid = false;
      }

      return {
        valid,
        message,
      };
    },
    isPhone(node, min, max) {
      const pattern = /^[+]?[\s./0-9]*[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/g;
      let valid = pattern.test(node.value),
          message = `Must contain a valid phone number`;

      return {
        valid,
        message,
      };
    },
    isNonEmpty(node, min, max) {
      let valid = node.value.length > 0,
          message = `Must be is non empty`;

      if (min && node.value.length < min && node.value.length !== 0) {
        valid = false;
      }
      if (max && node.value.length > max && node.value.length !== 0) {
        valid = false;
      }

      return {
        valid,
        message,
      };
    },
  };
}
