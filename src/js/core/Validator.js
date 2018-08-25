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
      const message = 'Please, check any';
      let valid = false;
      let checked = 0;

      node.forEach((el) => {
        if (el.checked) checked += 1;
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
      const valid = Array.from(node).some(el => el.checked === true);
      const message = 'Please, press any button';

      return {
        valid,
        message,
      };
    },
    isSelected(node) {
      const valid = Array.from(node.options)
        .filter(el => el.value.length > 0)
        .some(el => el.selected === true);
      const message = 'Please, choose any option';

      return {
        valid,
        message,
      };
    },
    isName(node, min, max) {
      const pattern = /[\u00BF-\u1FFF\u2C00-\uD7FF\w]/;
      let valid = pattern.test(node.value);
      let message = 'Must contain any letter';

      if (node.value.length === 0) {
        valid = false;
        if (min && !max) {
          message = `Must contain at least ${min} letter`;
        }
        if (!min && max) {
          message = `Must contain at least one letter and less than ${max + 1}`;
        }
        if (min && max) {
          message = `Must contain between ${min} and ${max} letters`;
        }
      } else {
        if (min && node.value.length < min) {
          valid = false;
          message = `Must contain at least ${min === 1 ? `${min} letter` : `${min} letters`}`;
        }
        if (min && node.value.length > min) {
          valid = true;
        }
        if (max && node.value.length > max) {
          valid = false;
          message = `Must contain less than ${max + 1} letters`;
        }
      }

      return {
        valid,
        message,
      };
    },
    isEmail(node, min, max) {
      const pattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      let valid = pattern.test(node.value);
      let message = 'Must be a valid email address';

      if (node.value.length === 0) {
        valid = false;
        if (min && !max) {
          message = `Must contain at least ${min === 1 ? `${min} character` : `${min} characters`}`;
        }
        if (!min && max) {
          message = `Must contain at least one character and less than ${max + 1}`;
        }
        if (min && max) {
          message = `Must contain between ${min} and ${max} characters`;
        }
      } else {
        if (min && node.value.length < min) {
          valid = false;
          message = `Must contain at least ${min === 1 ? `${min} character` : `${min} characters`}`;
        }
        if (min && node.value.length > min) {
          valid = true;
        }
        if (max && node.value.length > max) {
          valid = false;
          message = `Must contain less than ${max + 1} characters`;
        }
      }

      return {
        valid,
        message,
      };
    },
    isPhone(node, min, max) {
      const pattern = /^[+]?[\s./0-9]*[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/g;
      let valid = pattern.test(node.value);
      let message = 'Must be a valid phone number';

      if (node.value.length === 0) {
        valid = false;
        if (min && !max) {
          message = `Must contain at least ${min === 1 ? `${min} digit` : `${min} digits`}`;
        }
        if (!min && max) {
          message = `Must contain at least one digit and less than ${max + 1}`;
        }
        if (min && max) {
          message = `Must contain between ${min} and ${max} digits`;
        }
      } else {
        if (min && node.value.length < min) {
          valid = false;
          message = `Must contain at least ${min === 1 ? `${min} digit` : `${min} digits`}`;
        }
        if (min && node.value.length > min) {
          valid = true;
        }
        if (max && node.value.length > max) {
          valid = false;
          message = `Must contain less than ${max + 1} letters`;
        }
      }

      return {
        valid,
        message,
      };
    },
    isNonEmpty(node, min, max) {
      let valid = node.value.length > 0;
      let message = 'Must be non empty';

      if (node.value.length === 0) {
        valid = false;
        if (min && !max) {
          message = `Must contain at least ${min === 1 ? `${min} character` : `${min} characters`}`;
        }
        if (!min && max) {
          message = `Must contain at least one character and less than ${max + 1}`;
        }
        if (min && max) {
          message = `Must contain between ${min} and ${max} characters`;
        }
      } else {
        if (min && node.value.length < min) {
          valid = false;
          message = `Must contain at least ${min === 1 ? `${min} character` : `${min} characters`}`;
        }
        if (min && node.value.length > min) {
          valid = true;
        }
        if (max && node.value.length > max) {
          valid = false;
          message = `Must contain less than ${max + 1} characters`;
        }
      }

      return {
        valid,
        message,
      };
    },
  };
}
