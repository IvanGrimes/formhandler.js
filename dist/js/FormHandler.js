(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.FormHandler = factory());
}(this, (function () { 'use strict';

  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

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

  function isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _construct(Parent, args, Class) {
    if (isNativeReflectConstruct()) {
      _construct = Reflect.construct;
    } else {
      _construct = function _construct(Parent, args, Class) {
        var a = [null];
        a.push.apply(a, args);
        var Constructor = Function.bind.apply(Parent, a);
        var instance = new Constructor();
        if (Class) _setPrototypeOf(instance, Class.prototype);
        return instance;
      };
    }

    return _construct.apply(null, arguments);
  }

  function _wrapNativeSuper(Class) {
    var _cache = typeof Map === "function" ? new Map() : undefined;

    _wrapNativeSuper = function _wrapNativeSuper(Class) {
      if (Class === null) return null;

      if (typeof Class !== "function") {
        throw new TypeError("Super expression must either be null or a function");
      }

      if (typeof _cache !== "undefined") {
        if (_cache.has(Class)) return _cache.get(Class);

        _cache.set(Class, Wrapper);
      }

      function Wrapper() {
        return _construct(Class, arguments, _getPrototypeOf(this).constructor);
      }

      Wrapper.prototype = Object.create(Class.prototype, {
        constructor: {
          value: Wrapper,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      return _setPrototypeOf(Wrapper, Class);
    };

    return _wrapNativeSuper(Class);
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

  var defaultConfig = {
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
          visible: 'formhandler__notice-form--visible'
        }
      }
    },
    fields: {
      min: false,
      max: false,
      send: true
    },
    notices: {
      appendTo: false,
      nextToField: 'before',
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
        isNotValid: 'formhandler--is-not-valid'
      },
      fields: {
        isValid: 'formhandler__field--is-valid',
        isNotValid: 'formhandler__field--is-not-valid'
      }
    },
    sender: {
      send: false,
      type: 'xhr',
      clearFormOnSuccess: true
    },
    callbacks: {
      onFieldChangeState: function onFieldChangeState() {},
      onFormChangeState: function onFormChangeState() {},
      onSubmit: function onSubmit() {},
      onSend: function onSend() {}
    }
  };

  /* eslint-disable no-useless-constructor */
  var FormHandlerError =
  /*#__PURE__*/
  function (_Error) {
    _inherits(FormHandlerError, _Error);

    function FormHandlerError(props) {
      _classCallCheck(this, FormHandlerError);

      return _possibleConstructorReturn(this, _getPrototypeOf(FormHandlerError).call(this, props));
    }

    return FormHandlerError;
  }(_wrapNativeSuper(Error));

  var Validator =
  /*#__PURE__*/
  function () {
    function Validator(custom) {
      _classCallCheck(this, Validator);

      this.custom = custom;

      if (this.custom) {
        this.addCustomValidations();
      }
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
        return this;
      }
    }], [{
      key: "validate",
      value: function validate(_ref3) {
        var type = _ref3.type,
            node = _ref3.node,
            min = _ref3.min,
            max = _ref3.max;
        if (!type) return;
        var validation = Validator.validations[type];

        if (!validation) {
          throw new FormHandlerError("No handler to validate type ".concat(type));
        } // eslint-disable-next-line consistent-return


        return validation(node, min, max);
      }
    }]);

    return Validator;
  }();

  _defineProperty(Validator, "validations", {
    isCheckboxChecked: function isCheckboxChecked(node, min, max) {
      var message = 'At least one checkbox must be selected';
      var valid = true;
      var checked = 0;
      node.forEach(function (el) {
        if (el.checked) checked += 1;
      });

      if (min && max) {
        if (checked < min) {
          valid = false;
          message = "Minimum ".concat(min, ", maximum ").concat(max, " checkboxes must be selected");
        }

        if (checked > max) {
          valid = false;
          message = "Not more than ".concat(max, " ").concat(max === 1 ? 'checkbox' : 'checkboxes', " must be selected");
        }
      }

      if (min && !max) {
        if (checked < min) {
          valid = false;
          message = "At least ".concat(min, " ").concat(min === 1 ? 'checkbox' : 'checkboxes', " must be selected");
        }
      }

      if (!min && max) {
        if (!checked) {
          message = "Minimum 1, maximum ".concat(max, " checkboxes must be selected");
        }

        if (checked > max) {
          valid = false;
          message = "Not more than ".concat(max, " ").concat(max === 1 ? 'checkbox' : 'checkboxes', " must be selected");
        }
      }

      if (!min && !max && !checked) {
        valid = false;
        message = 'At least one checkbox must be selected';
      }

      return {
        valid: valid,
        message: message
      };
    },
    isRadioChecked: function isRadioChecked(node) {
      var valid = Array.from(node).some(function (el) {
        return el.checked === true;
      });
      var message = 'Please select one of the buttons';
      return {
        valid: valid,
        message: message
      };
    },
    isSelected: function isSelected(node) {
      var valid = Array.from(node.options).filter(function (el) {
        return el.value.length > 0;
      }).some(function (el) {
        return el.selected === true;
      });
      var message = 'Please select one of the options';
      return {
        valid: valid,
        message: message
      };
    },
    isName: function isName(node, min, max) {
      var pattern = /^[a-zA-Z]+$/;
      var valid = pattern.test(node.value);
      var message = 'Must contain only letters';

      var _node$value$trim = node.value.trim(),
          length = _node$value$trim.length;

      if (min && max) {
        if (length < min) {
          valid = false;
          message = "Must contain at least ".concat(min, " ").concat(min === 1 ? 'letter' : 'letters', " but not more than ").concat(max);
        }

        if (length > max) {
          valid = false;
          message = "Must contain not more than ".concat(max, " ").concat(max === 1 ? 'letter' : 'letters');
        }
      }

      if (min && !max) {
        if (length < min) {
          valid = false;
          message = "Must contain at least ".concat(min, " ").concat(min === 1 ? 'letter' : 'letters');
        }
      }

      if (!min && max) {
        if (!length) {
          message = "Must contain at least 1 letter but not more than ".concat(max);
        }

        if (length > max) {
          valid = false;
          message = "Must contain not more than ".concat(max, " ").concat(max === 1 ? 'letter' : 'letters');
        }
      }

      if (!min && !max && !length) {
        valid = false;
        message = 'Must contain at least one letter';
      }

      return {
        valid: valid,
        message: message
      };
    },
    isEmail: function isEmail(node) {
      var pattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      var valid = pattern.test(node.value);
      var message = 'Must be a valid email address';
      return {
        valid: valid,
        message: message
      };
    },
    isPhone: function isPhone(node, min, max) {
      var pattern = /^[+]?[\s./0-9]*[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/g;

      var _node$value$trim2 = node.value.trim(),
          length = _node$value$trim2.length;

      var valid = pattern.test(node.value);
      var message = 'Must be a valid phone number';

      if (min && max) {
        if (length < min) {
          valid = false;
          message = "Must contain at least ".concat(min, " ").concat(min === 1 ? 'digit' : 'digits', " but not more than ").concat(max);
        }

        if (length > max) {
          valid = false;
          message = "Must contain not more than ".concat(max, " ").concat(max === 1 ? 'digit' : 'digits');
        }
      }

      if (min && !max) {
        if (length < min) {
          valid = false;
          message = "Must contain at least ".concat(min, " ").concat(min === 1 ? 'digit' : 'digits');
        }
      }

      if (!min && max) {
        if (!length) {
          message = "Must contain at least 1 digit but not more than ".concat(max);
        }

        if (length > max) {
          valid = false;
          message = "Must contain not more than ".concat(max, " ").concat(max === 1 ? 'digit' : 'digits');
        }
      }

      return {
        valid: valid,
        message: message
      };
    },
    isNonEmpty: function isNonEmpty(node, min, max) {
      var _node$value$trim3 = node.value.trim(),
          length = _node$value$trim3.length;

      var valid = length > 0;
      var message = 'Must contain at least one character';

      if (min && max) {
        if (length < min) {
          valid = false;
          message = "Must contain at least ".concat(min, " ").concat(min === 1 ? 'character' : 'characters', " but not more than ").concat(max);
        }

        if (length > max) {
          valid = false;
          message = "Must contain not more than ".concat(max, " ").concat(max === 1 ? 'character' : 'characters');
        }
      }

      if (min && !max) {
        if (length < min) {
          valid = false;
          message = "Must contain at least ".concat(min, " ").concat(min === 1 ? 'character' : 'characters');
        }
      }

      if (!min && max) {
        if (!length) {
          message = "Must contain at least 1 character but not more than ".concat(max);
        }

        if (length > max) {
          valid = false;
          message = "Must contain not more than ".concat(max, " ").concat(max === 1 ? 'character' : 'characters');
        }
      }

      return {
        valid: valid,
        message: message
      };
    }
  });

  var HTML_SELECT_ELEMENT = 'HTMLSelectElement';
  var INPUT = 'input';
  var LOAD = 'load';
  var UNDEFINED = 'undefined';
  var SUCCESS = 'success';
  var ERROR = 'error';
  var OBJECT = 'object';
  var FORM = 'form';
  var CLICK = 'click';
  var DIV = 'div';
  var READY_STATE_CHANGE = 'readystatechange';
  var XHR = 'xhr';
  var FETCH = 'fetch';
  var AFTER = 'after';
  var BEFORE = 'before';
  var STRING = 'string';
  var CHECKBOX = 'checkbox';
  var RADIO = 'radio';
  var SELECT = 'select-one';
  var NODE_LIST = 'NodeList';
  var COLOR = 'color';

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
      this.valid = null;
      this.submitted = false;
      this.sent = null;
      this.callback = opts.callback;
      this.submit.addEventListener(CLICK, this.listener);
    }

    _createClass(Form, [{
      key: "setState",
      value: function setState() {
        var validity = this.fieldsValidity;
        this.callback(this.node, this.valid, validity);
        this.valid = validity;

        if (this.submitted) {
          this.toggleClassNames();
        }
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
        // eslint-disable-next-line no-unused-vars
        Object.entries(this.fields).forEach(function (_ref2) {
          var _ref3 = _slicedToArray(_ref2, 2),
              name = _ref3[0],
              field = _ref3[1];

          field.clear();
        });
        this.callback(this.node, this.valid, false);
        this.valid = false;
        this.submitted = false;
        this.node.classList.remove(this.classNames.isNotValid);
        this.node.classList.remove(this.classNames.isValid);
      }
    }, {
      key: "fieldsValidity",
      get: function get() {
        var validness = new Set(); // eslint-disable-next-line no-unused-vars

        Object.entries(this.fields).forEach(function (_ref4) {
          var _ref5 = _slicedToArray(_ref4, 2),
              name = _ref5[0],
              field = _ref5[1];

          if (field.validation) {
            validness.add(field.valid);
          }
        });
        return !validness.has(false);
      }
    }]);

    return Form;
  }();

  var Field =
  /*#__PURE__*/
  function () {
    function Field(_ref) {
      var node = _ref.node,
          validation = _ref.validation,
          min = _ref.min,
          max = _ref.max,
          send = _ref.send,
          classNames = _ref.classNames,
          callback = _ref.callback;

      _classCallCheck(this, Field);

      this.node = node;
      this.type = this.node.constructor.name;
      this.name = this.type === NODE_LIST ? this.node[0].name : this.node.name;
      this.validation = validation;
      this.send = send;
      this.min = min;
      this.max = max;
      this.classNames = classNames;
      this.valid = null;
      this.submitted = false;
      this.callback = callback;
    }

    _createClass(Field, [{
      key: "setState",
      value: function setState(valid) {
        this.callback(this.validation, this.name, this.node, this.valid, valid);
        this.valid = valid;

        if (this.submitted) {
          this.toggleClassNames();
        }
      }
    }, {
      key: "setFieldSubmitted",
      value: function setFieldSubmitted(value) {
        this.submitted = value;
      }
    }, {
      key: "on",
      value: function on(type, listener) {
        if (this.type === NODE_LIST) {
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
        if (this.type === NODE_LIST) {
          this.node.forEach(function (el) {
            return el.removeEventListener(type, listener);
          });
        } else {
          this.node.removeEventListener(type, listener);
        }
      }
    }, {
      key: "remove",
      value: function remove() {
        this.node.remove();
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
        this.callback(this.validation, this.name, this.node, this.valid, false);
        this.node.value = '';
        this.valid = false;
        this.submitted = false;
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
    }, {
      key: "clear",
      value: function clear() {
        var _this2 = this;

        this.callback(this.validation, this.name, this.node, this.valid, false);
        this.valid = false;
        this.submitted = false;
        this.node.forEach(function (el) {
          return el.classList.remove(_this2.classNames.isValid);
        });
        this.node.forEach(function (el) {
          return el.classList.remove(_this2.classNames.isNotValid);
        });
        this.node.forEach(function (el) {
          // eslint-disable-next-line no-param-reassign
          el.checked = false;
        });
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
    }, {
      key: "clear",
      value: function clear() {
        this.callback(this.validation, this.name, this.node, this.valid, false);
        this.valid = false;
        this.submitted = false;
        this.node.classList.remove(this.classNames.isValid);
        this.node.classList.remove(this.classNames.isNotValid);
        Array.from(this.node.options).forEach(function (el) {
          el.selected = false;
        });
      }
    }]);

    return Select;
  }(Field);

  var Color =
  /*#__PURE__*/
  function (_Field) {
    _inherits(Color, _Field);

    function Color(_ref) {
      var opts = _extends({}, _ref);

      _classCallCheck(this, Color);

      return _possibleConstructorReturn(this, _getPrototypeOf(Color).call(this, Object.assign({}, opts)));
    }

    _createClass(Color, [{
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
        this.callback(this.validation, this.name, this.node, this.valid, false);
        this.node.value = '#000000';
        this.valid = false;
        this.submitted = false;
        this.node.classList.remove(this.classNames.isNotValid);
        this.node.classList.remove(this.classNames.isValid);
      }
    }]);

    return Color;
  }(Field);

  var Notice =
  /*#__PURE__*/
  function () {
    function Notice(_ref) {
      var form = _ref.form,
          message = _ref.message,
          classNames = _ref.classNames,
          appendTo = _ref.appendTo,
          nextToField = _ref.nextToField,
          parent = _ref.parent;

      _classCallCheck(this, Notice);

      this.form = form;
      this.message = message;
      this.classNames = classNames;
      this.appendTo = appendTo;
      this.nextToField = nextToField;
      this.parent = parent;
      this.node = null;
      this.mount();
    }

    _createClass(Notice, [{
      key: "mount",
      value: function mount() {
        this.node = document.createElement(DIV);
        this.node.classList.add(this.classNames.block);
        this.node.classList.add(this.classNames.hidden);

        if (this.appendTo) {
          this.parent.appendChild(this.node);
        } else {
          if (this.nextToField === BEFORE) {
            if (this.parent.constructor.name === NODE_LIST) {
              this.parent = this.parent[0];
            }

            this.parent.parentElement.insertBefore(this.node, this.parent);
          }

          if (this.nextToField === AFTER) {
            if (this.parent.constructor.name === NODE_LIST) {
              this.parent = this.parent[this.parent.length - 1];
            }

            this.parent.parentElement.insertBefore(this.node, this.parent.nextElementSibling);
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
    }, {
      key: "remove",
      value: function remove() {
        this.node.remove();
      }
    }]);

    return Notice;
  }();

  var Sender =
  /*#__PURE__*/
  function () {
    function Sender(_ref) {
      var type = _ref.type,
          url = _ref.url,
          method = _ref.method,
          data = _ref.data,
          fields = _ref.fields,
          form = _ref.form,
          callbacks = _ref.callbacks;

      _classCallCheck(this, Sender);

      this.type = type;
      this.url = url;
      this.method = method;
      this.data = data();
      this.fields = fields;
      this.form = form;
      this.callbacks = callbacks;
    }

    _createClass(Sender, [{
      key: "makeData",
      value: function makeData() {
        var _this = this;

        var data = new FormData(); // eslint-disable-next-line no-unused-vars

        Object.entries(this.data).forEach(function (_ref2) {
          var _ref3 = _slicedToArray(_ref2, 2),
              name = _ref3[0],
              value = _ref3[1];

          // eslint-disable-next-line no-useless-return
          if (!_this.fields[name].send) return;
          data.append(name, value);
        });
        return data;
      }
    }, {
      key: "sendRequest",
      value: function sendRequest(data) {
        var _this2 = this;

        if (this.type === XHR) {
          var xhr = new XMLHttpRequest();
          xhr.open(this.method, this.url, true);
          xhr.addEventListener(READY_STATE_CHANGE, function (ev) {
            if (ev.target.readyState === 4) {
              if (ev.target.status >= 200 && ev.target.status < 400) {
                _this2.callbacks.setFormState(SUCCESS);

                _this2.callbacks.onSend(SUCCESS);
              } else {
                _this2.callbacks.setFormState(ERROR);

                _this2.callbacks.onSend(ERROR);

                throw new FormHandlerError("Status: ".concat(ev.target.status, ", Text: ").concat(ev.target.statusText));
              }
            }
          });
          xhr.send(data);
        }

        if (this.type === FETCH) {
          fetch(this.url, {
            method: this.method,
            body: data
          }).then(function (response) {
            if (response.status >= 200 && response.status < 400) {
              _this2.callbacks.setFormState(SUCCESS);

              _this2.callbacks.onSend(SUCCESS);
            } else {
              _this2.callbacks.setFormState(ERROR);

              _this2.callbacks.onSend(ERROR);

              throw new FormHandlerError("Status: ".concat(response.status, ", Text: ").concat(response.statusText));
            }
          });
        }
      }
    }]);

    return Sender;
  }();

  var FormHandler =
  /*#__PURE__*/
  function () {
    // TODO: Переименовать опцию appendTo => appendTo
    function FormHandler(_ref) {
      var _this = this;

      var args = _extends({}, _ref);

      _classCallCheck(this, FormHandler);

      _defineProperty(this, "setFormStateFromResponse", function (result) {
        if (result === SUCCESS) {
          _this.notices.form.message = _this.opts.form.notice.successMessage;
          _this.form.sent = true;

          if (_this.opts.sender.clearFormOnSuccess) {
            _this.form.clear();
          }
        }

        if (result === ERROR) {
          _this.notices.form.message = _this.opts.form.notice.errorMessage;
          _this.form.sent = false;
        }

        _this.notices.form.show();
      });

      _defineProperty(this, "inputHandler", function (ev) {
        var name = ev.target.name;
        var validation = Validator.validate(_this.fields[name].validatorOptions);

        if (_this.fields[name].validation) {
          _this.setFieldState(name, validation.valid, validation.message); // eslint-disable-next-line valid-typeof


          if (_typeof(validation.valid) !== OBJECT) {
            _this.form.setState();
          }
        }
      });

      _defineProperty(this, "submitHandler", function (ev) {
        ev.preventDefault();
        var fieldNodes = [];
        var delayForNotice = _this.opts.form.delayForNotice; // eslint-disable-next-line no-unused-vars

        Object.entries(_this.fields).forEach(function (_ref2) {
          var _ref3 = _slicedToArray(_ref2, 2),
              name = _ref3[0],
              field = _ref3[1];

          field.setFieldSubmitted(true);
          fieldNodes.push(field.node);
        });

        _this.callbacks.onSubmit(_this.form.node, fieldNodes);

        _this.validateForm();

        _this.notices.form.message = _this.opts.form.notice.message;

        if (_this.form.valid) {
          _this.notices.form.hide();

          if (_this.opts.sender.send) {
            var options = {
              type: _this.opts.sender.type,
              url: _this.form.node.action,
              method: _this.form.node.method,
              data: _this.getFieldsAndValues,
              fields: _this.fields,
              form: _this.form.node,
              callbacks: {
                setFormState: _this.setFormStateFromResponse,
                onSend: _this.callbacks.onSend
              }
            };
            var sender = new Sender(options);
            sender.sendRequest(sender.makeData());
            setTimeout(function () {
              _this.notices.form.hide();
            }, delayForNotice);
          }
        } else {
          _this.notices.form.show();

          if (delayForNotice) {
            setTimeout(function () {
              _this.notices.form.hide();
            }, delayForNotice);
          }
        }
      });

      _defineProperty(this, "getFieldsAndValues", function () {
        var data = {};
        Object.entries(_this.fields).forEach(function (_ref4) {
          var _ref5 = _slicedToArray(_ref4, 2),
              name = _ref5[0],
              field = _ref5[1];

          var type = field.node.constructor.name;

          if (type === NODE_LIST) {
            // Radio/Checkbox
            var inputType = field.node[0].type;

            if (inputType === CHECKBOX) {
              data[name] = [];
              Array.from(field.node).forEach(function (node) {
                if (node.checked) {
                  data[name].push(node.value);
                }
              });
            }

            if (inputType === RADIO) {
              data[name] = '';
              Array.from(field.node).forEach(function (node) {
                if (node.checked) {
                  data[name] = node.value;
                }
              });
            }
          } else if (type === HTML_SELECT_ELEMENT) {
            // Select
            data[name] = field.node.options[field.node.options.selectedIndex].value;
          } else {
            // Others
            data[name] = field.node.value;
          }
        });
        return data;
      });

      this.opts = args;
      this.fields = {};
      this.notices = {};
      this.form = null;
      this.validator = new Validator(this.opts.customValidations);
      this.callbacks = {};
      this.init();
    }

    _createClass(FormHandler, [{
      key: "init",
      value: function init() {
        var _this2 = this;

        this.complementOptions().makeForm();
        Object.entries(this.opts.fields).forEach(function (_ref6) {
          var _ref7 = _slicedToArray(_ref6, 2),
              name = _ref7[0],
              field = _ref7[1];

          _this2.makeField(name, field);

          if (field.validation) {
            var validation = Validator.validate(_this2.fields[name].validatorOptions);

            _this2.makeNotice(name, field.notice);

            _this2.setFieldState(name, validation.valid, validation.message);
          }
        });
        this.form.setState();
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
        // eslint-disable-next-line no-unused-vars

        Object.entries(this.opts.fields).forEach(function (_ref8) {
          var _ref9 = _slicedToArray(_ref8, 2),
              name = _ref9[0],
              obj = _ref9[1];

          _this3.opts.fields[name] = Object.assign({}, defaultConfig.fields, _this3.opts.fields[name]);
          _this3.opts.fields[name].classNames = _this3.opts.fields[name].classNames ? Object.assign({}, _this3.opts.classNames.fields, _this3.opts.fields[name].classNames) : _this3.opts.classNames.fields;
          _this3.opts.fields[name].notice = Object.assign({}, _this3.opts.notices, _this3.opts.fields[name].notice);
          _this3.opts.fields[name].notice.classNames = Object.assign({}, _this3.opts.classNames.notices, _this3.opts.fields[name].notice.classNames);
        });
        this.opts.sender = this.opts.sender ? Object.assign({}, defaultConfig.sender, this.opts.sender) : defaultConfig.sender;
        this.callbacks = this.opts.callbacks ? Object.assign({}, defaultConfig.callbacks, this.opts.callbacks) : defaultConfig.callbacks;
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
          listener: this.submitHandler,
          callback: this.callbacks.onFormChangeState
        };
        this.form = new Form(options);
        this.makeNotice(FORM, this.opts.form.notice);
        return this;
      }
    }, {
      key: "makeField",
      value: function makeField(name, field) {
        var node = this.form.node.querySelector("[name=".concat(name, "]"));
        var _node = node,
            type = _node.type;
        var options = {
          node: node,
          validation: field.validation,
          min: field.min,
          max: field.max,
          send: field.send,
          classNames: field.classNames,
          callback: this.callbacks.onFieldChangeState
        };

        if (type === RADIO || type === CHECKBOX) {
          node = this.form.node.querySelectorAll("[name=".concat(name, "]"));
          options.node = node;
          this.fields[name] = new Radio(options);
        } else if (type === SELECT) {
          this.fields[name] = new Select(options);
        } else if (type === COLOR) {
          this.fields[name] = new Color(options);
        } else {
          this.fields[name] = new Input(options);
        }

        this.fields[name].on(INPUT, this.inputHandler);
        return this;
      }
    }, {
      key: "makeNotice",
      value: function makeNotice(name, notice) {
        var message = this.fields[name] ? Validator.validate(this.fields[name].validatorOptions).message : false;
        var parent = notice.nextToField ? this.fields[name].node : document.querySelector(notice.appendTo);
        var options = {
          form: this.form.node,
          classNames: notice.classNames,
          appendTo: notice.appendTo,
          message: notice.message || message,
          nextToField: notice.nextToField,
          parent: parent
        };
        this.notices[name] = new Notice(options);
        return this;
      }
    }, {
      key: "setFieldStateFromResponse",
      value: function setFieldStateFromResponse(response, property, name, message) {
        var _this4 = this;

        // eslint-disable-next-line valid-typeof
        if (_typeof(response.then) !== UNDEFINED) {
          response.then(function (data) {
            return data.json();
          }).then(function (json) {
            _this4.setFieldState(name, !!json[property], message);

            _this4.form.setState();
          });
        } else {
          response.addEventListener(LOAD, function (ev) {
            _this4.setFieldState(name, !!JSON.parse(ev.target.response)[property], message);

            _this4.form.setState();
          });
        }
      }
    }, {
      key: "setFieldState",
      value: function setFieldState(name, valid) {
        var message = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.notices[name].message;
        var submitted = this.fields[name].submitted; // eslint-disable-next-line valid-typeof

        if (_typeof(valid) === OBJECT) {
          this.setFieldStateFromResponse(valid.response, valid.property, name, message);
        } else {
          this.fields[name].setState(valid);
        }

        this.notices[name].message = this.opts.fields[name].notice.message || message;

        if (!valid && submitted) {
          this.notices[name].show();
        } else {
          this.notices[name].hide();
        }

        return this;
      }
    }, {
      key: "getFieldNameBy",
      value: function getFieldNameBy(field) {
        // return field name get by NodeList/Selector(.className)
        var type = _typeof(field);

        var name = field.name;
        var node = this.form.node;
        var fieldName;

        if (type === OBJECT) {
          fieldName = name;
        }

        if (type === STRING) {
          var isSelector = /\./.test(field);

          if (isSelector) {
            fieldName = node.querySelector(field).name;
          } else {
            fieldName = field;
          }
        }

        return fieldName;
      }
    }, {
      key: "isFieldValid",
      value: function isFieldValid(field) {
        return this.fields[this.getFieldNameBy(field)].valid;
      }
    }, {
      key: "getFieldValue",
      value: function getFieldValue(field) {
        return this.fields[this.getFieldNameBy(field)].node.value;
      }
    }, {
      key: "isFormValid",
      value: function isFormValid() {
        return this.form.valid;
      }
    }, {
      key: "isFormSubmitted",
      value: function isFormSubmitted() {
        return this.form.submitted;
      }
    }, {
      key: "isFormSent",
      value: function isFormSent() {
        return this.form.sent;
      }
    }, {
      key: "clearForm",
      value: function clearForm() {
        this.form.clear();
      }
    }, {
      key: "clearField",
      value: function clearField(field) {
        // Also clears classNames and field of instance like valid, submitted
        this.fields[this.getFieldNameBy(field)].clear();
        this.form.setState();
      }
    }, {
      key: "getField",
      value: function getField(field) {
        // Returns a field node
        return this.fields[this.getFieldNameBy(field)].node;
      }
    }, {
      key: "addField",
      value: function addField(field, _ref10) {
        var opts = _extends({}, _ref10);

        var options = opts;
        options.notice = options.notice ? options.notice : {};
        var name = this.getFieldNameBy(field);
        var fieldOptions = {
          validation: options.validation,
          min: options.min || defaultConfig.fields.min,
          max: options.max || defaultConfig.fields.max,
          send: options.send || defaultConfig.fields.send,
          classNames: Object.assign({}, this.opts.classNames.fields, options.classNames)
        };
        var noticeOptions = {
          appendTo: options.notice.appendTo || defaultConfig.notices.appendTo,
          nextToField: options.notice.nextToField || defaultConfig.notices.nextToField,
          message: options.notice.message || defaultConfig.notices.message,
          classNames: Object.assign({}, this.opts.classNames.notices, options.notice.classNames)
        };
        this.opts.fields[name] = Object.assign({}, fieldOptions, {
          notice: noticeOptions
        });
        this.makeField(name, this.opts.fields[name]);
        this.fields[name].on(INPUT, this.inputHandler);
        this.makeNotice(name, this.opts.fields[name].notice);
        return this.fields[name].node;
      }
    }, {
      key: "removeField",
      value: function removeField(field) {
        var name = this.getFieldNameBy(field);
        this.fields[name].remove();
        this.notices[name].remove();
      }
    }, {
      key: "validateField",
      value: function validateField(field) {
        // also turns on toggleClassNames
        var name = this.getFieldNameBy(field);

        if (this.fields[name].validation) {
          var validation = Validator.validate(this.fields[name].validatorOptions);
          this.fields[name].submitted = true;
          this.setFieldState(name, validation.valid);
        }

        this.form.setState();
        return this.fields[name].node;
      }
    }, {
      key: "validateForm",
      value: function validateForm() {
        var _this5 = this;

        // also turns on toggleClassNames
        Object.entries(this.fields).forEach(function (_ref11) {
          var _ref12 = _slicedToArray(_ref11, 2),
              name = _ref12[0],
              field = _ref12[1];

          if (field.validation) {
            var validation = Validator.validate(field.validatorOptions);
            field.setFieldSubmitted(true);

            _this5.setFieldState(name, validation.valid, validation.message);
          }
        });
        this.form.submitted = true;
        this.form.setState();
        return this.form.node;
      }
    }]);

    return FormHandler;
  }();

  return FormHandler;

})));
