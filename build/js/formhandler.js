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

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
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
    isCheckboxChecked: function isCheckboxChecked(node, min, max) {
      var valid = false,
          message = 'isCheckboxChecked';
      return {
        valid: valid,
        message: message
      };
    },
    isRadioChecked: function isRadioChecked(node, min, max) {
      var valid = false,
          message = 'isCheckboxChecked';
      return {
        valid: valid,
        message: message
      };
    },
    isSelected: function isSelected(node, min, max) {
      var valid = false,
          message = 'isCheckboxChecked';
      return {
        valid: valid,
        message: message
      };
    },
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

  var Form =
  /*#__PURE__*/
  function () {
    function Form(_ref) {
      var opts = _extends({}, _ref);

      _classCallCheck(this, Form);

      this.node = opts.node;
      this.submit = opts.submit;
      this.classNames = opts.classNames;
      this.fields = opts.fields;
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

  var RADIO_NODE_LIST = 'RadioNodeList';
  var HTML_SELECT_ELEMENT = 'HTMLSelectElement';
  var HTML_INPUT_ELEMENT = 'HTMLInputElement';
  var HTML_TEXTAREA_ELEMENT = 'HTMLTextAreaElement';

  var Field =
  /*#__PURE__*/
  function () {
    function Field(_ref) {
      var opts = _extends({}, _ref);

      _classCallCheck(this, Field);

      this.node = opts.node;
      this.name = this.node.constructor.name === RADIO_NODE_LIST ? this.node[0].name : this.node.name;
      this.validation = opts.validation;
      this.min = opts.min;
      this.max = opts.max;
      this.classNames = opts.classNames;
      this.valid = false;
      this.listener = opts.listener;
    }

    _createClass(Field, [{
      key: "setFieldState",
      value: function setFieldState(valid) {
        this.valid = valid;
        this.toggleClassNames();
      }
    }, {
      key: "on",
      value: function on(type, listener) {
        if (this.node.constructor.name === RADIO_NODE_LIST) {
          this.node.forEach(function (el) {
            return el.addEventListener(type, listener);
          });
        } else {
          this.node.addEventListener(type, listener);
        }
      }
    }, {
      key: "off",
      value: function off(type, listener) {
        if (this.node.constructor.name === RADIO_NODE_LIST) {
          this.node.forEach(function (el) {
            return el.removeEventListener(type, listener);
          });
        } else {
          this.node.removeEventListener(type, listener);
        }
      }
    }, {
      key: "validatorOptions",
      get: function get() {
        return {
          type: this.validation,
          node: this.node,
          min: this.min,
          max: this.max
        };
      }
    }]);

    return Field;
  }();

  var Input =
  /*#__PURE__*/
  function (_Field) {
    _inherits(Input, _Field);

    function Input(_ref) {
      var opts = _extends({}, _ref);

      _classCallCheck(this, Input);

      return _possibleConstructorReturn(this, _getPrototypeOf(Input).call(this, Object.assign({}, opts)));
    }

    _createClass(Input, [{
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

    return Input;
  }(Field);

  var Radio =
  /*#__PURE__*/
  function (_Field) {
    _inherits(Radio, _Field);

    function Radio(_ref) {
      var opts = _extends({}, _ref);

      _classCallCheck(this, Radio);

      return _possibleConstructorReturn(this, _getPrototypeOf(Radio).call(this, Object.assign({}, opts)));
    }

    _createClass(Radio, [{
      key: "toggleClassNames",
      value: function toggleClassNames() {
        var _this = this;

        if (this.valid) {
          this.node.forEach(function (el) {
            return el.classList.remove(_this.classNames.isNotValid);
          });
          this.node.forEach(function (el) {
            return el.classList.add(_this.classNames.isValid);
          });
        } else {
          this.node.forEach(function (el) {
            return el.classList.remove(_this.classNames.isValid);
          });
          this.node.forEach(function (el) {
            return el.classList.add(_this.classNames.isNotValid);
          });
        }
      }
    }]);

    return Radio;
  }(Field);

  var Select =
  /*#__PURE__*/
  function (_Field) {
    _inherits(Select, _Field);

    function Select(_ref) {
      var opts = _extends({}, _ref);

      _classCallCheck(this, Select);

      return _possibleConstructorReturn(this, _getPrototypeOf(Select).call(this, Object.assign({}, opts)));
    }

    _createClass(Select, [{
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
    }]);

    return Select;
  }(Field);

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
      min: false,
      max: false
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
            validation = _this.fields[name].validation,
            minLength = _this.fields[name].min,
            maxLength = _this.fields[name].max,
            newValid = Validator.validate(validation, ev.target, minLength, maxLength);

        if (newValid) {
          _this.setFieldState(name, newValid.valid, _this.notices[name].message || validation.message);
        }
      });

      _defineProperty(this, "submitHandler", function (ev) {
        ev.preventDefault();
        Object.entries(_this.fields).forEach(function (_ref2) {
          var _ref3 = _slicedToArray(_ref2, 2),
              name = _ref3[0],
              field = _ref3[1];

          var validation = Validator.validate(field.validation, field.node, field.min, field.max);
          field.on('input', _this.inputHandler);
          console.log(name, validation);

          if (typeof validation !== 'undefined') {
            _this.setFieldState(name, validation.valid);
          }
        });

        _this.notices.form.hide();

        _this.form.setFormState();

        if (_this.form.valid) {
          console.log('form is valid');
        } else {
          console.log('form is not valid');

          _this.notices.form.show();

          setTimeout(function () {
            _this.notices.form.hide();
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
        var _this2 = this;

        this.complementOptions().makeForm();
        Object.entries(this.opts.fields).forEach(function (_ref4) {
          var _ref5 = _slicedToArray(_ref4, 2),
              name = _ref5[0],
              field = _ref5[1];

          _this2.makeField(name, field).makeNotice(name, field.notice);
        });
        return this;
      }
    }, {
      key: "complementOptions",
      value: function complementOptions() {
        var _this3 = this;

        // Add lacks classNames and merge.
        this.opts.classNames = this.opts.classNames ? Object.assign({}, defaultConfig.classNames, this.opts.classNames) : defaultConfig.classNames;
        this.opts.classNames.form = Object.assign({}, defaultConfig.classNames.form, this.opts.classNames.form);
        this.opts.classNames.fields = Object.assign({}, defaultConfig.classNames.fields, this.opts.classNames.fields);
        this.opts.classNames.notices = Object.assign({}, defaultConfig.classNames.notices, this.opts.classNames.notices); // Add lacks form options and merge.

        this.opts.form = this.opts.form ? Object.assign({}, defaultConfig.form, this.opts.form) : defaultConfig.form;
        this.opts.form.notice = Object.assign({}, defaultConfig.form.notice, this.opts.form.notice);
        this.opts.form.notice.classNames = Object.assign({}, this.opts.classNames.notice, this.opts.form.notice.classNames); // Add lacks notices options and merge

        this.opts.notices = Object.assign({}, defaultConfig.notices, this.opts.notices); // Add lacks fields options and merge

        Object.entries(this.opts.fields).forEach(function (_ref6) {
          var _ref7 = _slicedToArray(_ref6, 2),
              name = _ref7[0],
              obj = _ref7[1];

          _this3.opts.fields[name] = Object.assign({}, defaultConfig.fields, _this3.opts.fields[name]);
          _this3.opts.fields[name].classNames = _this3.opts.fields[name].classNames ? Object.assign({}, _this3.opts.classNames.fields, _this3.opts.fields[name].classNames) : _this3.opts.classNames.fields;
          _this3.opts.fields[name].notice = Object.assign({}, _this3.opts.notices, _this3.opts.fields[name].notice);
          _this3.opts.fields[name].notice.classNames = Object.assign({}, _this3.opts.classNames.notices, _this3.opts.fields[name].notice.classNames);
        });
        return this;
      }
    }, {
      key: "makeForm",
      value: function makeForm() {
        var options = {
          fields: this.fields,
          classNames: this.opts.classNames.form,
          node: document.querySelector(this.opts.form.block),
          submit: document.querySelector(this.opts.form.submit),
          listener: this.submitHandler
        };
        this.form = new Form(options);
        this.makeNotice('form', this.opts.form.notice);
        return this;
      }
    }, {
      key: "makeField",
      value: function makeField(name, field) {
        var node = this.form.node[name],
            type = node.constructor.name,
            options = {
          node: node,
          validation: field.validation,
          min: field.min,
          max: field.max,
          classNames: field.classNames,
          listener: this.inputHandler
        };

        if (type === HTML_INPUT_ELEMENT || type === HTML_TEXTAREA_ELEMENT) {
          this.fields[name] = new Input(options);
        }

        if (type === RADIO_NODE_LIST) {
          this.fields[name] = new Radio(options);
        }

        if (type === HTML_SELECT_ELEMENT) {
          this.fields[name] = new Select(options);
        }

        return this;
      }
    }, {
      key: "makeNotice",
      value: function makeNotice(name, notice) {
        this.notices[name] = new Notice({
          form: this.form.node,
          classNames: notice.classNames,
          attachTo: notice.attachTo,
          message: notice.message,
          nextToField: notice.nextToField,
          parent: notice.nextToField ? this.fields[name].node : document.querySelector(notice.attachTo)
        });
        return this;
      }
    }, {
      key: "setFieldState",
      value: function setFieldState(name, valid) {
        this.fields[name].setFieldState(valid);

        if (valid) {
          this.notices[name].hide();
        } else {
          this.notices[name].show();
        }

        this.form.setFormState();
        return this;
      }
    }]);

    return FormHandler;
  }();

  return FormHandler;

})));
//# sourceMappingURL=FormHandler.js.map
