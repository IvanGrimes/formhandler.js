const form = new FormHandler({
  form: {
    block: '.formhandler',
    notice: {
      message: 'please, fill the form',
    },
  },
  fields: {
    checkbox: {
      validation: 'isCheckboxChecked',
      min: 2,
      max: 3,
    },
    radio: {
      validation: 'isRadioChecked',
    },
    select: {
      validation: 'isSelected',
    },
    firstname: {
      validation: 'isName',
      min: 2,
      max: 20,
      // notice: {
      //   message: 'this value is required',
      // },
    },
    email: {
      validation: 'isEmail',
    },
    phone: {
      validation: 'isPhone',
    },
    zip1: {
      validation: 'isZipPromise',
    },
    custom: {
      validation: 'isCustom',
    },
    file: {
      validation: 'isFile',
    },
    message: {
      validation: 'isNonEmpty',
    },
  },
  customValidations: {
    isCustom(node) {
      const pattern = /[a-z]/;
      let valid = pattern.test(node.value),
          message = 'iscustom invalid';

      return {
        valid,
        message,
      };
    },
    isZipPromise(node) {
      let message = 'zippromise',
          valid = false;
      if (node.value.length === 5) {
        let response = fetch('http://api.zippopotam.us/us/' + node.value);

        return {
          valid: {
            response,
            property: 'country',
          },
          message,
        };
      }
      return {
        valid,
        message,
      };
    },
    isFile(node) {
      let valid = node.value.length > 0,
        message = 'should be is non empty'
      return {
        valid,
        message,
      };
    }
  }
});
