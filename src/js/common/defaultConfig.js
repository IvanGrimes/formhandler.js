export default {
  form: {
    block: '.formhandler',
    submit: '.formhandler__submit',
    notice: {
      attachTo: '.formhandler__notices',
      message: 'please, fill the form',
      successMessage: 'ok',
      errorMessage: 'oops',
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
    attachTo: '.formhandler__notices',
    nextToField: false,
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
      disabledSubmitButton: 'formhandler__submit--disabled',
    },
    fields: {
      isValid: 'formhandler__field--is-valid',
      isNotValid: 'formhandler__field--is-not-valid',
    },
  },
  sender: {
    send: true,
    type: 'xhr',
  },
  callbacks: {
    onFieldChangeState() {},
    onFormChangeState() {},
    onSubmit() {},
  },
}
