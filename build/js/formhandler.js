(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.FormHandler = factory());
}(this, (function () { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  }

  var Form =
  /*#__PURE__*/
  function () {
    function Form(_ref) {
      var opts = _extends({}, _ref);

      _classCallCheck(this, Form);

      this.opts = opts.opts;
      this.node = document.querySelector(this.opts.form.block);
      this.submit = this.node.querySelector(this.opts.form.submit);
      this.classNames = this.opts.classNames.form;
      this.fields = opts.fields;
      this.notice = opts.notice;
      this.method = this.node.method;
      this.action = this.node.action;
      this.messages = {
        success: this.opts.form.notice.successMsg,
        invalid: this.opts.form.notice.invalidMsg,
        error: this.opts.form.notice.errorMsg
      };
      this.listener = opts.listener;
      this.valid = false;
      this.submit.addEventListener('click', this.listener);
    }

    _createClass(Form, [{
      key: "setFormState",
      value: function setFormState() {
        var validness = new Set();
        Object.entries(this.fields).forEach(function (_ref2) {
          var _ref3 = _slicedToArray(_ref2, 2),
              name = _ref3[0],
              field = _ref3[1];

          validness.add(field.valid);
        });
        this.valid = !validness.has(false);

        if (this.valid) {
          this.node.classList.remove(this.classNames.isNotValid);
          this.node.classList.add(this.classNames.isValid);
        } else {
          this.node.classList.remove(this.classNames.isValid);
          this.node.classList.add(this.classNames.isNotValid);
        }
      }
    }, {
      key: "setSubmitState",
      value: function setSubmitState() {}
    }, {
      key: "resetForm",
      value: function resetForm() {
        Object.entries(this.fields).forEach(function (_ref4) {
          var _ref5 = _slicedToArray(_ref4, 2),
              name = _ref5[0],
              field = _ref5[1];

          field.clear();
        });
        this.valid = false;
        this.node.classList.remove(this.classNames.isNotValid);
        this.node.classList.remove(this.classNames.isValid);
      }
    }]);

    return Form;
  }();

  var Field =
  /*#__PURE__*/
  function () {
    function Field(_ref) {
      var opts = _extends({}, _ref);

      _classCallCheck(this, Field);

      this.name = opts.name;
      this.node = opts.node;
      this.listener = opts.listener;
      this.validation = {
        name: opts.validation.name,
        minLength: opts.validation.minLength,
        maxLength: opts.validation.maxLength,
        validate: opts.validation.validate
      };
      this.classNames = opts.classNames;
      this.send = opts.send;
      this.valid = false;
    }

    _createClass(Field, [{
      key: "setFieldState",
      value: function setFieldState(valid) {
        this.valid = valid;
        this.toggleClassNames();
      }
    }, {
      key: "toggleClassNames",
      value: function toggleClassNames() {
        if (this.valid) {
          this.node.classList.remove(this.classNames.isNotValid);
          this.node.classList.add(this.classNames.isValid);
        } else {
          this.node.classList.remove(this.classNames.isValid);
          this.node.classList.add(this.classNames.isNotValid);
        }
      }
    }, {
      key: "clear",
      value: function clear() {
        this.node.value = "";
        this.valid = false;
        this.node.classList.remove(this.classNames.isNotValid);
        this.node.classList.remove(this.classNames.isValid);
      }
    }]);

    return Field;
  }();

  function FormHandlerError(message) {
    this.name = "FormHandlerError";
    this.message = message;
  }

  var Validator =
  /*#__PURE__*/
  function () {
    function Validator(custom) {
      _classCallCheck(this, Validator);

      this.custom = custom;
      this.addCustomValidations();
    }

    _createClass(Validator, [{
      key: "addCustomValidations",
      value: function addCustomValidations() {
        Object.entries(this.custom).forEach(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
              type = _ref2[0],
              obj = _ref2[1];

          Validator.validations[type] = obj;
        });
        console.log(Validator.validations);
        return this;
      }
    }], [{
      key: "validate",
      value: function validate(type, node, min, max) {
        var validation = Validator.validations[type];

        if (!validation) {
          throw new FormHandlerError("No handler to validate type ".concat(type));
        }

        return validation(node, min, max);
      }
    }, {
      key: "getMessage",
      value: function getMessage(type, min, max) {
        if (typeof Validator.validations[type].message === 'function') {
          return Validator.validations[type].message(min, max);
        } else {
          return Validator.validations[type].message;
        }
      }
    }]);

    return Validator;
  }();

  _defineProperty(Validator, "validations", {
    isName: function isName(node, min, max) {
      var pattern = /^[A-Za-z]/;
      var valid = pattern.test(node.value),
          message = "Must contain any latin character";

      if (node.value.length === 0) {
        valid = false;
      }

      if (min && node.value.length < min && node.value.length !== 0) {
        valid = false;
      }

      if (max && node.value.length > max) {
        valid = false;
      }

      return {
        valid: valid,
        message: message
      };
    },
    isEmail: function isEmail(node) {
      var pattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      var valid = pattern.test(node.value),
          message = "Must be a valid email address";
      return {
        valid: valid,
        message: message
      };
    },
    isAge: function isAge(node, min, max) {
      var pattern = /^[\d]*$/;
      var valid = pattern.test(node.value),
          message = "Must contain only digits";

      if (node.value.length === 0 || !valid) {
        valid = false;
      }

      if (min && node.value.length < min && node.value.length !== 0) {
        valid = false;
      }

      if (max && node.value.length > max) {
        valid = false;
      }

      return {
        valid: valid,
        message: message
      };
    },
    isPhone: function isPhone(node, min, max) {
      var pattern = /^[+]?[\s./0-9]*[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/g;
      var valid = pattern.test(node.value),
          message = "Must contain a valid phone number";
      return {
        valid: valid,
        message: message
      };
    },
    isNonEmpty: function isNonEmpty(node, min, max) {
      var valid = node.value.length > 0,
          message = "Must be is non empty";

      if (min && node.value.length < min && node.value.length !== 0) {
        valid = false;
      }

      if (max && node.value.length > max && node.value.length !== 0) {
        valid = false;
      }

      return {
        valid: valid,
        message: message
      };
    }
  });

  var Notice =
  /*#__PURE__*/
  function () {
    function Notice(_ref) {
      var opts = _extends({}, _ref);

      _classCallCheck(this, Notice);

      this.form = opts.form;
      this.message = opts.message;
      this.classNames = opts.classNames;
      this.attachTo = opts.attachTo;
      this.nextToField = opts.nextToField;
      this.parent = opts.parent;
      this.node = null;
      this.mount();
    }

    _createClass(Notice, [{
      key: "mount",
      value: function mount() {
        this.node = document.createElement('div');
        this.node.classList.add(this.classNames.block);
        this.node.classList.add(this.classNames.hidden);

        if (this.attachTo) {
          this.parent.appendChild(this.node);
        } else {
          if (this.nextToField === 'before') {
            this.form.insertBefore(this.node, this.parent);
          }

          if (this.nextToField === 'after') {
            this.form.insertBefore(this.node, this.parent.nextElementSibling);
          }
        }
      }
    }, {
      key: "show",
      value: function show() {
        this.node.classList.remove(this.classNames.hidden);
        this.node.classList.add(this.classNames.visible);
        this.node.innerText = this.message;
      }
    }, {
      key: "hide",
      value: function hide() {
        this.node.classList.remove(this.classNames.visible);
        this.node.classList.add(this.classNames.hidden);
      }
    }]);

    return Notice;
  }();

  var Sender =
  /*#__PURE__*/
  function () {
    function Sender(url, method, fields, listener) {
      _classCallCheck(this, Sender);

      this.url = url;
      this.method = method;
      this.fields = fields;
      this.listener = listener;
      Object.defineProperty(this, 'test', {
        value: 123,
        writable: false
      });
    }

    _createClass(Sender, [{
      key: "makeData",
      value: function makeData() {
        var data = new FormData();
        Object.entries(this.fields).forEach(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
              name = _ref2[0],
              field = _ref2[1];

          if (field.send) {
            data.append(name, field.node.files && field.node.files[0] || field.node.value);
          }
        });
        return data;
      }
    }, {
      key: "makeRequest",
      value: function makeRequest() {
        //TODO: Add fetch method
        this.request = new XMLHttpRequest();
        this.request.open(this.method, this.url, true);
        return this;
      }
    }, {
      key: "sendRequest",
      value: function sendRequest() {
        this.request.addEventListener('readystatechange', this.listener);
        this.request.send(this.makeData());
      }
    }]);

    return Sender;
  }();

  var defaultConfig = {
    form: {
      block: '.formhandler',
      submit: '.formhandler__submit',
      notice: {
        attachTo: '.formhandler__notices',
        successMsg: 'ok',
        invalidMsg: 'please, fill the form',
        errorMsg: 'oops',
        classNames: {
          block: 'formhandler__notice-form',
          hidden: 'formhandler__notice-form--hidden',
          visible: 'formhandler__notice-form--visible'
        }
      }
    },
    fields: {
      minLength: false,
      maxLength: false,
      send: true
    },
    notices: {
      attachTo: '.formhandler__notices',
      nextToField: false,
      message: false
    },
    classNames: {
      notices: {
        block: 'formhandler__notice',
        hidden: 'formhandler__notice--hidden',
        visible: 'formhandler__notice--visible'
      },
      form: {
        isValid: 'formhandler--is-valid',
        isNotValid: 'formhandler--is-not-valid',
        disabledSubmitButton: 'formhandler__submit--disabled'
      },
      fields: {
        isValid: 'formhandler__field--is-valid',
        isNotValid: 'formhandler__field--is-not-valid'
      }
    }
  };

  var FormHandler =
  /*#__PURE__*/
  function () {
    function FormHandler(_ref) {
      var _this = this;

      var args = _extends({}, _ref);

      _classCallCheck(this, FormHandler);

      _defineProperty(this, "inputHandler", function (ev) {
        var name = ev.target.name,
            validation = _this.fields[name].validation.name,
            minLength = _this.fields[name].validation.minLength,
            maxLength = _this.fields[name].validation.maxLength,
            newValid = Validator.validate(validation, ev.target, minLength, maxLength);

        if (newValid) {
          _this.setFieldState(name, newValid.valid, _this.notices[name].message || validation.message);
        }
      });

      _defineProperty(this, "readystatechangeHandler", function (ev) {
        var state = ev.target.readyState,
            status = ev.target.status;

        if (state === 4) {
          _this.form.notice.message = _this.form.messages.success;

          _this.form.notice.show();

          _this.form.resetForm();

          setTimeout(function () {
            _this.form.notice.hide();
          }, 2000);
        }

        if (status !== 200 && state === 4) {
          console.log("XMLHttpRequest: Status: ".concat(status, ", State: ").concat(state));
          _this.form.notice.message = _this.form.messages.error;

          _this.form.notice.show();

          setTimeout(function () {
            _this.form.notice.hide();
          }, 2000);
        }
      });

      _defineProperty(this, "submitHandler", function (ev) {
        ev.preventDefault();
        Object.entries(_this.fields).forEach(function (_ref2) {
          var _ref3 = _slicedToArray(_ref2, 2),
              name = _ref3[0],
              field = _ref3[1];

          var validation = Validator.validate(field.validation.name, field.node, field.validation.minLength, field.validation.maxLength);
          field.node.addEventListener('input', field.listener);
          console.log(name, validation);

          if (typeof validation !== 'undefined') {
            _this.setFieldState(name, validation.valid, _this.notices[name].message || validation.message);
          }
        });

        _this.form.notice.hide();

        _this.form.setFormState();

        if (_this.form.valid) {
          var sender = new Sender(_this.form.action, _this.form.method, _this.fields, _this.readystatechangeHandler);
          sender.makeRequest();
          sender.sendRequest();
        } else {
          _this.form.notice.message = _this.form.messages.invalid;

          _this.form.notice.show();

          setTimeout(function () {
            _this.form.notice.hide();
          }, 2000);
        }
      });

      this.opts = args;
      this.fields = {};
      this.notices = {};
      this.form = null;
      this.validator = new Validator(this.opts.customValidations);
      this.init();
    }

    _createClass(FormHandler, [{
      key: "init",
      value: function init() {
        this.complementOptions().makeForm().makeFields().makeNotices();
        return this;
      }
    }, {
      key: "complementOptions",
      value: function complementOptions() {
        var _this2 = this;

        // TODO: Optimize it!
        // Add lacks classNames and merge.
        this.opts.classNames = this.opts.classNames ? Object.assign({}, defaultConfig.classNames, this.opts.classNames) : defaultConfig.classNames;
        this.opts.classNames.form = Object.assign({}, defaultConfig.classNames.form, this.opts.classNames.form);
        this.opts.classNames.fields = Object.assign({}, defaultConfig.classNames.fields, this.opts.classNames.fields);
        this.opts.classNames.notices = Object.assign({}, defaultConfig.classNames.notices, this.opts.classNames.notices); // Add lacks form options and merge.

        this.opts.form = this.opts.form ? Object.assign({}, defaultConfig.form, this.opts.form) : defaultConfig.form;
        this.opts.form.notice = Object.assign({}, defaultConfig.form.notice, this.opts.form.notice);
        this.opts.form.notice.classNames = Object.assign({}, this.opts.classNames.notice, this.opts.form.notice.classNames); // Add lacks notices options and merge

        this.opts.notices = Object.assign({}, defaultConfig.notices, this.opts.notices); // Add lacks fields options and merge

        Object.entries(this.opts.fields).forEach(function (_ref4) {
          var _ref5 = _slicedToArray(_ref4, 2),
              name = _ref5[0],
              obj = _ref5[1];

          _this2.opts.fields[name] = Object.assign({}, defaultConfig.fields, _this2.opts.fields[name]);
          _this2.opts.fields[name].classNames = _this2.opts.fields[name].classNames ? Object.assign({}, _this2.opts.classNames.fields, _this2.opts.fields[name].classNames) : _this2.opts.classNames.fields;
          _this2.opts.fields[name].notice = Object.assign({}, _this2.opts.notices, _this2.opts.fields[name].notice);
          _this2.opts.fields[name].notice.classNames = Object.assign({}, _this2.opts.classNames.notices, _this2.opts.fields[name].notice.classNames);
        });
        return this;
      }
    }, {
      key: "makeForm",
      value: function makeForm() {
        this.form = new Form({
          opts: this.opts,
          fields: this.fields,
          notice: new Notice({
            form: document.querySelector(this.opts.form.block),
            message: this.opts.form.notice.successMsg,
            classNames: this.opts.form.notice.classNames ? Object.assign({}, this.opts.classNames.notices, this.opts.form.notice.classNames) : this.opts.classNames.notices,
            attachTo: this.opts.form.notice.attachTo,
            nextToField: false,
            parent: document.querySelector(this.opts.form.notice.attachTo)
          }),
          listener: this.submitHandler
        });
        return this;
      }
    }, {
      key: "makeFields",
      value: function makeFields() {
        var _this3 = this;

        Object.entries(this.opts.fields).forEach(function (_ref6) {
          var _ref7 = _slicedToArray(_ref6, 2),
              name = _ref7[0],
              field = _ref7[1];

          _this3.fields[name] = new Field({
            name: name,
            validation: {
              name: field.validation,
              minLength: field.minLength,
              maxLength: field.maxLength,
              validate: field.validate
            },
            node: _this3.form.node[name],
            listener: _this3.inputHandler,
            classNames: field.classNames,
            send: field.send
          });
        });
        return this;
      }
    }, {
      key: "makeNotices",
      value: function makeNotices() {
        var _this4 = this;

        Object.entries(this.opts.fields).forEach(function (_ref8) {
          var _ref9 = _slicedToArray(_ref8, 2),
              name = _ref9[0],
              field = _ref9[1];

          var notice = field.notice;
          _this4.notices[name] = new Notice({
            form: _this4.form.node,
            classNames: notice.classNames,
            attachTo: notice.attachTo,
            message: _this4.opts.fields[name].notice.message,
            nextToField: notice.nextToField,
            parent: notice.nextToField ? _this4.fields[name].node : document.querySelector(notice.attachTo)
          });
        });
        return this;
      }
    }, {
      key: "setFieldState",
      value: function setFieldState(name, valid, message) {
        if (typeof valid !== 'undefined') {
          this.fields[name].setFieldState(valid);
          this.notices[name].message = message;

          if (valid) {
            this.notices[name].hide();
          } else {
            this.notices[name].show();
          }

          this.form.setFormState();
        }

        return this;
      }
    }]);

    return FormHandler;
  }();

  return FormHandler;

})));
//# sourceMappingURL=FormHandler.js.map
