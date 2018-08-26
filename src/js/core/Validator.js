/* eslint-disable no-useless-escape */
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
  }

  static validate({
    type, node, min, max,
  }) {
    if (!type) return;
    const validation = Validator.validations[type];

    if (!validation) {
      throw new FormHandlerError(`No handler to validate type ${type}`);
    }

    // eslint-disable-next-line consistent-return
    return validation(node, min, max);
  }

  static validations = {
    isCheckboxChecked(node, min, max) {
      let message = 'At least one checkbox must be selected';
      let valid = true;
      let checked = 0;

      node.forEach((el) => {
        if (el.checked) checked += 1;
      });

      if (min && max) {
        if (checked < min) {
          valid = false;
          message = `Minimum ${min}, maximum ${max} checkboxes must be selected`;
        }
        if (checked > max) {
          valid = false;
          message = `Not more than ${max} ${max === 1 ? 'checkbox' : 'checkboxes'} must be selected`;
        }
      }
      if (min && !max) {
        if (checked < min) {
          valid = false;
          message = `At least ${min} ${min === 1 ? 'checkbox' : 'checkboxes'} must be selected`;
        }
      }
      if (!min && max) {
        if (!checked) {
          message = `Minimum 1, maximum ${max} checkboxes must be selected`;
        }
        if (checked > max) {
          valid = false;
          message = `Not more than ${max} ${max === 1 ? 'checkbox' : 'checkboxes'} must be selected`;
        }
      }
      if (!min && !max && !checked) {
        valid = false;
        message = 'At least one checkbox must be selected';
      }

      return {
        valid,
        message,
      };
    },
    isRadioChecked(node) {
      const valid = Array.from(node).some(el => el.checked === true);
      const message = 'Please select one of the buttons';

      return {
        valid,
        message,
      };
    },
    isSelected(node) {
      const valid = Array.from(node.options)
        .filter(el => el.value.length > 0)
        .some(el => el.selected === true);
      const message = 'Please select one of the options';

      return {
        valid,
        message,
      };
    },
    isName(node, min, max) {
      const pattern = /^[a-zA-Z]+$/;
      let valid = pattern.test(node.value);
      let message = 'Must contain only letters';
      const { length } = node.value.trim();

      if (min && max) {
        if (length < min) {
          valid = false;
          message = `Must contain at least ${min} ${min === 1 ? 'letter' : 'letters'} but not more than ${max}`;
        }
        if (length > max) {
          valid = false;
          message = `Must contain not more than ${max} ${max === 1 ? 'letter' : 'letters'}`;
        }
      }
      if (min && !max) {
        if (length < min) {
          valid = false;
          message = `Must contain at least ${min} ${min === 1 ? 'letter' : 'letters'}`;
        }
      }
      if (!min && max) {
        if (!length) {
          message = `Must contain at least 1 letter but not more than ${max}`;
        }
        if (length > max) {
          valid = false;
          message = `Must contain not more than ${max} ${max === 1 ? 'letter' : 'letters'}`;
        }
      }
      if (!min && !max && !length) {
        valid = false;
        message = 'Must contain at least one letter';
      }

      return {
        valid,
        message,
      };
    },
    isEmail(node) {
      const pattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      const valid = pattern.test(node.value);
      const message = 'Must be a valid email address';

      return {
        valid,
        message,
      };
    },
    isPhone(node, min, max) {
      const pattern = /^[+]?[\s./0-9]*[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/g;
      const { length } = node.value.trim();
      let valid = pattern.test(node.value);
      let message = 'Must be a valid phone number';

      if (min && max) {
        if (length < min) {
          valid = false;
          message = `Must contain at least ${min} ${min === 1 ? 'digit' : 'digits'} but not more than ${max}`;
        }
        if (length > max) {
          valid = false;
          message = `Must contain not more than ${max} ${max === 1 ? 'digit' : 'digits'}`;
        }
      }
      if (min && !max) {
        if (length < min) {
          valid = false;
          message = `Must contain at least ${min} ${min === 1 ? 'digit' : 'digits'}`;
        }
      }
      if (!min && max) {
        if (!length) {
          message = `Must contain at least 1 digit but not more than ${max}`;
        }
        if (length > max) {
          valid = false;
          message = `Must contain not more than ${max} ${max === 1 ? 'digit' : 'digits'}`;
        }
      }

      return {
        valid,
        message,
      };
    },
    isNonEmpty(node, min, max) {
      const { length } = node.value.trim();
      let valid = length > 0;
      let message = 'Must contain at least one character';

      if (min && max) {
        if (length < min) {
          valid = false;
          message = `Must contain at least ${min} ${min === 1 ? 'character' : 'characters'} but not more than ${max}`;
        }
        if (length > max) {
          valid = false;
          message = `Must contain not more than ${max} ${max === 1 ? 'character' : 'characters'}`;
        }
      }
      if (min && !max) {
        if (length < min) {
          valid = false;
          message = `Must contain at least ${min} ${min === 1 ? 'character' : 'characters'}`;
        }
      }
      if (!min && max) {
        if (!length) {
          message = `Must contain at least 1 character but not more than ${max}`;
        }
        if (length > max) {
          valid = false;
          message = `Must contain not more than ${max} ${max === 1 ? 'character' : 'characters'}`;
        }
      }

      return {
        valid,
        message,
      };
    },
  };
}
