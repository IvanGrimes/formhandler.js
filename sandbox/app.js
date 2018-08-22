const form = new FormHandler({
  form: {
    block: '.formhandler',
    notice: {
      message: 'please, fill the form',
      successMessage: 'Form is successful sent',
      errorMessage: 'Something went wrong...',
    },
  },
  fields: {
    date: {
      validation: 'isNonEmpty',
    },
    datetime: {
      validation: 'isNonEmpty',
    },
    month: {
      validation: 'isNonEmpty',
    },
    time: {
      validation: 'isNonEmpty',
    },
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
      validation: false,
      send: false,
      min: 2,
      max: 20,
      notice: {
        message: 'this value is required',
      },
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
    zip2: {
      validation: 'isZipXML',
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
    isZipXML(node) {
      let message = 'zipxml',
          valid = false;
      if (node.value.length === 5) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://api.zippopotam.us/us/' + node.value, true);
        xhr.send();
        return {
          valid: {
            response: xhr,
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
    },
  },
  sender: {
    send: true,
    type: 'xhr',
  },
  callbacks: {
    onFieldChangeState(name, el, pastValidity, newValidity) {
      console.log('onFieldChangeState', name, el, pastValidity, newValidity);
    },
    onFormChangeState(el, pastValidity, newValidity) {
      console.log('onFormChangeState', el, pastValidity, newValidity);
    },
    onSubmit(form, fields) {
      console.log('onSubmit', form, fields);
    }
  },
});

form.addField('lastname', {validation: 'isName'});
