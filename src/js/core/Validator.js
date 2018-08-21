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
    return this;
  };

  static validate({type, node, min, max}) {
    let validation = Validator.validations[type];

    if (!validation) {
      throw new FormHandlerError(`No handler to validate type ${type}`);
    }

    return validation(node, min, max);
  }

  static getMessage({type, node, min, max}) {
    return Validator.validations[type](node, min, max).message;
  }

  static validations = {
    isCheckboxChecked(node, min, max) {
      let valid = false,
          message = 'Check any boxes',
          checked = 0;

      node.forEach(el => {
        el.checked ? checked += 1 : null;
      });

      if (min && max) {
        valid = !!(min && max && checked >= min && checked <= max);
      }
      if (min && !max) {
        valid = checked >= min;
      }
      if (!min && max) {
        valid = checked <= max;
      }

      return {
        valid,
        message,
      };
    },
    isRadioChecked(node) {
      let valid = Array.from(node).some(el => el.checked === true),
          message = 'Please, press any button';

      return {
        valid,
        message,
      };
    },
    isSelected(node) {
      const valid = Array.from(node.options)
                         .filter(el => el.value.length > 0)
                         .some(el => el.selected === true),
        message = 'Please, choose any option';
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
        if (min && !max) {
          message = `Must contain at least ${min} latin character`;
        }
        if (!min && max) {
          message = `Must contain at least one latin character and less than ${max + 1}`;
        }
        if (min && max) {
          message = `Must contain between ${min} and ${max} latin characters`;
        }
      } else {
        if (min && node.value.length < min) {
          valid = false;
          message = `Must contain at least ${min} latin characters`;
        }
        if (max && node.value.length > max) {
          valid = false;
          message = `Must contain less than ${max + 1} latin characters`;
        }
        if (min && node.value.length > min) {
          valid = true;
        }
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
          message = `Must be non empty`;

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
