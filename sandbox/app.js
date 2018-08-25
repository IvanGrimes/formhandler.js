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
      send: false,
      min: 2,
      max: 20,
    },
    email: {
      validation: 'isEmail',
    },
    phone: {
      validation: 'isPhone',
      notice: {
        message: 'phone blah-blah',
      },
    },
    zip1: {
      validation: 'isZipPromise',
    },
    zip2: {
      validation: 'isZipXML',
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
    clearFormOnSuccess: false,
  },
  callbacks: {
    onFieldChangeState(validation, name, el, pastValidity, newValidity) {
      console.log('onFieldChangeState', validation, name, el, pastValidity, newValidity);
    },
    onFormChangeState(el, pastValidity, newValidity) {
      console.log('onFormChangeState', el, pastValidity, newValidity);
    },
    onSubmit(form, fields) {
      console.log('onSubmit', form, fields);
    },
    onSend(result) {
      console.log('onsend', result);
    },
  },
});
