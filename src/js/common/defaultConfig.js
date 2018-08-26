export default {
  form: {
    block: '.formhandler',
    submit: '.formhandler__submit',
    delayForNotice: 3000,
    notice: {
      appendTo: '.formhandler__notices',
      message: 'This form seems to be invalid',
      successMessage: 'Form was successfully sent',
      errorMessage: 'Oops, something went wrong',
      classNames: {
        block: 'formhandler__notice-form',
        hidden: 'formhandler__notice-form--hidden',
        visible: 'formhandler__notice-form--visible',
      },
    },
  },
  fields: {
    min: false,
    max: false,
    send: true,
  },
  notices: {
    appendTo: false,
    nextToField: 'before',
    message: false,
  },
  classNames: {
    notices: {
      block: 'formhandler__notice',
      hidden: 'formhandler__notice--hidden',
      visible: 'formhandler__notice--visible',
    },
    form: {
      isValid: 'formhandler--is-valid',
      isNotValid: 'formhandler--is-not-valid',
    },
    fields: {
      isValid: 'formhandler__field--is-valid',
      isNotValid: 'formhandler__field--is-not-valid',
    },
  },
  sender: {
    send: false,
    type: 'xhr',
    clearFormOnSuccess: true,
  },
  callbacks: {
    onFieldChangeState() {},
    onFormChangeState() {},
    onSubmit() {},
    onSend() {},
  },
};
