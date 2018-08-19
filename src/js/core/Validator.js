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
    isName(node, min, max) {
      const pattern = /[a-z]/;
      let valid = pattern.test(node.value),
          message;

      if (min && node.value.length < min && node.value.length !== 0) {
        valid = false;
        message = `Must contain at least ${min} characters`
      }
      if (max && node.value.length > max) {
        valid = false;
        message = `Shouldn't contain more than ${max} characters`
      }
      if (node.value.length === 0) {
        valid = false;
        message = `Must contain characters between ${min} and ${max}`;
      }

      return {
        valid,
        message,
      };
    },
    isEmail(node) {
      const pattern = /[a-z]/;
      let valid = pattern.test(node.value),
          message = `Should be a valid email address`;

      return {
        valid,
        message,
      };
    },
    isAge(node, min, max) {
      const pattern = /[0-9]/;
      let valid = pattern.test(node.value),
          message = `Must contain only numbers but contain: "${node.value}"`;

      return {
        valid,
        message,
      };
    },
    isPhone(node, min, max) {
      const pattern = /[0-9]/;
      let valid = pattern.test(node.value),
          message = `Must contain only numbers but contain: "${node.value}"`;

      return {
        valid,
        message,
      };
    },
    isText(node, min, max) {
      const pattern = /[a-z]/;
      let valid = pattern.test(node.value),
          message = `Must contain text`;

      return {
        valid,
        message,
      };
    },
    isNonEmpty(node, min, max) {
      let valid = node.value.length > 0,
          message = `Should be is non empty`;

      return {
        valid,
        message,
      };
    },
  };
}
