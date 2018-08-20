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
      if (node.value.length === 5) {
        fetch('http://api.zippopotam.us/us/' + node.value)
          .then(data => form.setFieldState(node.name, data.ok));
      } else {
        form.setFieldState(node.name, false, `iszippromise not valid`);
      }
    },
    isZipXML(node) {
      let xhr = new XMLHttpRequest();
      if (node.value.length === 5) {
        xhr.open('GET', 'http://api.zippopotam.us/us/' + node.value);
        xhr.send();
        xhr.addEventListener('load', (ev) => {
          form.setFieldState(node.name, ev.target.status === 200);
        });
      } else {
        form.setFieldState(node.name, false, `iszipxml not valid`);
      }
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

