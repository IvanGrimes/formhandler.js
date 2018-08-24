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
      var message = 'Check any boxes';
      var valid = false;
      var checked = 0;
      node.forEach(function (el) {
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
        valid: valid,
        message: message
      };
    },
    isRadioChecked: function isRadioChecked(node) {
      var valid = Array.from(node).some(function (el) {
        return el.checked === true;
      });
      var message = 'Please, press any button';
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
      var message = 'Please, choose any option';
      return {
        valid: valid,
        message: message
      };
    },
    isName: function isName(node, min, max) {
      var pattern = /^[A-Za-z]/;
      var valid = pattern.test(node.value);
      var message = 'Must contain any latin character';

      if (node.value.length === 0) {
        valid = false;

        if (min && !max) {
          message = "Must contain at least ".concat(min, " latin character");
        }

        if (!min && max) {
          message = "Must contain at least one latin character and less than ".concat(max + 1);
        }

        if (min && max) {
          message = "Must contain between ".concat(min, " and ").concat(max, " latin characters");
        }
      } else {
        if (min && node.value.length < min) {
          valid = false;
          message = "Must contain at least ".concat(min, " latin characters");
        }

        if (max && node.value.length > max) {
          valid = false;
          message = "Must contain less than ".concat(max + 1, " latin characters");
        }

        if (min && node.value.length > min) {
          valid = true;
        }
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
    isPhone: function isPhone(node) {
      var pattern = /^[+]?[\s./0-9]*[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/g;
      var valid = pattern.test(node.value);
      var message = 'Must contain a valid phone number';
      return {
        valid: valid,
        message: message
      };
    },
    isNonEmpty: function isNonEmpty(node, min, max) {
      var valid = node.value.length > 0;
      var message = 'Must be non empty';

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
      this.valid = false;
      this.submitted = false;
      this.sended = null;
      this.callback = opts.callback;
      this.submit.addEventListener(CLICK, this.listener);
    }

    _createClass(Form, [{
      key: "setFormState",
      value: function setFormState() {
        var validity = this.fieldsValidity;
        console.log(validity);
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
      this.valid = false;
      this.submitted = false;
      this.callback = callback;
    }

    _createClass(Field, [{
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
      key: "setFieldState",
      value: function setFieldState(valid) {
        this.callback(this.name, this.node, this.valid, valid);
        this.valid = valid;

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
        this.callback(this.name, this.node, this.valid, false);
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
      key: "setFieldState",
      value: function setFieldState(valid) {
        this.callback(this.name, this.node, this.valid, valid);
        this.valid = valid;

        if (this.submitted) {
          this.toggleClassNames();
        }
      }
    }, {
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

        this.callback(this.name, this.node, this.valid, false);
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
      key: "setFieldState",
      value: function setFieldState(valid) {
        this.callback(this.name, this.node, this.valid, valid);
        this.valid = valid;

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
        this.callback(this.name, this.node, this.valid, false);
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
      key: "setFieldState",
      value: function setFieldState(valid) {
        this.callback(this.name, this.node, this.valid, valid);
        this.valid = valid;

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
        this.callback(this.name, this.node, this.valid, false);
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
          attachTo = _ref.attachTo,
          nextToField = _ref.nextToField,
          parent = _ref.parent;

      _classCallCheck(this, Notice);

      this.form = form;
      this.message = message;
      this.classNames = classNames;
      this.attachTo = attachTo;
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

        if (this.attachTo) {
          this.parent.appendChild(this.node);
        } else {
          if (this.nextToField === BEFORE) {
            this.form.insertBefore(this.node, this.parent);
          }

          if (this.nextToField === AFTER) {
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
          fields = _ref.fields,
          form = _ref.form,
          callbacks = _ref.callbacks;

      _classCallCheck(this, Sender);

      this.type = type;
      this.url = url;
      this.method = method;
      this.fields = fields;
      this.form = form;
      this.callbacks = callbacks;
    }

    _createClass(Sender, [{
      key: "makeData",
      value: function makeData() {
        var data = new FormData(); // eslint-disable-next-line no-unused-vars

        Object.entries(this.fields).forEach(function (_ref2) {
          var _ref3 = _slicedToArray(_ref2, 2),
              name = _ref3[0],
              field = _ref3[1];

          if (!field.send) return;
          var type = field.node.constructor.name;

          if (type === NODE_LIST) {
            // Radio/Checkbox
            Array.from(field.node).forEach(function (node) {
              if (node.checked) {
                data.append(field.name, node.value);
              }
            });
          } else if (type === HTML_SELECT_ELEMENT) {
            data.append(field.name, field.node.options[field.node.options.selectedIndex].value);
          } else {
            // Others
            data.append(field.name, field.node.value);
          }
        });
        return data;
      }
    }, {
      key: "sendRequest",
      value: function sendRequest(data) {
        var _this = this;

        if (this.type === XHR) {
          var xhr = new XMLHttpRequest();
          xhr.open(this.method, this.url, true);
          xhr.addEventListener(READY_STATE_CHANGE, function (ev) {
            if (ev.target.readyState === 4) {
              if (ev.target.status >= 200 && ev.target.status < 400) {
                _this.callbacks.setFormState(SUCCESS);

                _this.callbacks.onSend(SUCCESS);
              } else {
                _this.callbacks.setFormState(ERROR);

                _this.callbacks.onSend(ERROR);

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
              _this.callbacks.setFormState(SUCCESS);

              _this.callbacks.onSend(SUCCESS);
            } else {
              _this.callbacks.setFormState(ERROR);

              _this.callbacks.onSend(ERROR);

              throw new FormHandlerError("Status: ".concat(response.status, ", Text: ").concat(response.statusText));
            }
          });
        }
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
        message: 'please, fill the form',
        successMessage: 'ok',
        errorMessage: 'oops',
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
    },
    sender: {
      send: true,
      type: 'xhr',
      clearOnSuccess: true
    },
    callbacks: {
      onFieldChangeState: function onFieldChangeState() {},
      onFormChangeState: function onFormChangeState() {},
      onSubmit: function onSubmit() {},
      onSend: function onSend() {}
    }
  };

  var FormHandlerUtil =
  /*#__PURE__*/
  function () {
    function FormHandlerUtil(_ref) {
      var args = _extends({}, _ref);

      _classCallCheck(this, FormHandlerUtil);

      this.opts = args;
      this.fields = {};
      this.notices = {};
      this.form = null;
      this.validator = new Validator(this.opts.customValidations);
      this.callbacks = this.opts.callbacks;
    }

    _createClass(FormHandlerUtil, [{
      key: "complementOptions",
      value: function complementOptions() {
        var _this = this;

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

        Object.entries(this.opts.fields).forEach(function (_ref2) {
          var _ref3 = _slicedToArray(_ref2, 2),
              name = _ref3[0],
              obj = _ref3[1];

          _this.opts.fields[name] = Object.assign({}, defaultConfig.fields, _this.opts.fields[name]);
          _this.opts.fields[name].classNames = _this.opts.fields[name].classNames ? Object.assign({}, _this.opts.classNames.fields, _this.opts.fields[name].classNames) : _this.opts.classNames.fields;
          _this.opts.fields[name].notice = Object.assign({}, _this.opts.notices, _this.opts.fields[name].notice);
          _this.opts.fields[name].notice.classNames = Object.assign({}, _this.opts.classNames.notices, _this.opts.fields[name].notice.classNames);
        });
        this.opts.sender = this.opts.sender ? Object.assign({}, defaultConfig.sender, this.opts.sender) : defaultConfig.sender;
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
        return this.form.sended;
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
      }
    }, {
      key: "getField",
      value: function getField(field) {
        // Returns a field node
        return this.fields[this.getFieldNameBy(field)].node;
      }
    }, {
      key: "addField",
      value: function addField(field, _ref4) {
        var opts = _extends({}, _ref4);

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
          attachTo: options.notice.attachTo || defaultConfig.notices.attachTo,
          nextToField: options.notice.nextToField || defaultConfig.notices.nextToField,
          message: options.notice.message || defaultConfig.notices.message,
          classNames: Object.assign({}, this.opts.classNames.notices, options.notice.classNames)
        };
        this.makeField(name, fieldOptions);
        this.makeNotice(name, noticeOptions);
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

        if (field.validation) {
          var validation = Validator.validate(this.fields[name].validatorOptions);
          this.fields[name].submitted = true;
          this.setFieldState(name, validation.valid);
        }

        return this.fields[name].node;
      }
    }, {
      key: "validateForm",
      value: function validateForm() {
        var _this2 = this;

        // also turns on toggleClassNames
        Object.entries(this.fields).forEach(function (_ref5) {
          var _ref6 = _slicedToArray(_ref5, 2),
              name = _ref6[0],
              field = _ref6[1];

          if (field.validation) {
            var validation = Validator.validate(field.validatorOptions);
            field.setFieldSubmitted(true);

            _this2.setFieldState(name, validation.valid);
          }
        });
        this.form.submitted = true;
        return this.form.node;
      }
    }, {
      key: "getFieldsAndValues",
      value: function getFieldsAndValues() {
        var data = {};
        Object.entries(this.fields).forEach(function (_ref7) {
          var _ref8 = _slicedToArray(_ref7, 2),
              name = _ref8[0],
              field = _ref8[1];

          var type = field.node.constructor.name;

          if (type === NODE_LIST) {
            // Radio/Checkbox
            data[name] = [];
            Array.from(field.node).forEach(function (node) {
              if (node.checked) {
                data[name].push(node.value);
              }
            });
          } else if (type === HTML_SELECT_ELEMENT) {
            // Select
            data[name] = field.node.options[field.node.options.selectedIndex].value;
          } else {
            // Others
            data[name] = field.node.value;
          }
        });
        return data;
      }
    }]);

    return FormHandlerUtil;
  }();

  var FormHandler =
  /*#__PURE__*/
  function (_FormHandlerUtil) {
    _inherits(FormHandler, _FormHandlerUtil);

    function FormHandler(_ref) {
      var _this;

      var args = _extends({}, _ref);

      _classCallCheck(this, FormHandler);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(FormHandler).call(this, Object.assign({}, args)));

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "setFormStateFromResponse", function (result) {
        if (result === SUCCESS) {
          _this.notices.form.message = _this.opts.form.notice.successMessage;
          _this.form.send = true;

          if (_this.opts.sender.clearOnSuccess) {
            _this.form.clear();
          }
        }

        if (result === ERROR) {
          _this.notices.form.message = _this.opts.form.notice.errorMessage;
          _this.form.send = false;
        }

        _this.notices.form.show();
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "inputHandler", function (ev) {
        var name = ev.target.name;
        var validation = Validator.validate(_this.fields[name].validatorOptions);

        if (_this.fields[name].validation) {
          _this.setFieldState(name, validation.valid, validation.message);
        }
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "submitHandler", function (ev) {
        ev.preventDefault();
        var fieldNodes = []; // eslint-disable-next-line no-unused-vars

        Object.entries(_this.fields).forEach(function (_ref2) {
          var _ref3 = _slicedToArray(_ref2, 2),
              name = _ref3[0],
              field = _ref3[1];

          field.setFieldSubmitted(true);
          fieldNodes.push(field.node);
        });

        _this.callbacks.onSubmit(_this.form.node, fieldNodes);

        _this.validateForm();

        if (_this.form.valid) {
          _this.notices.form.hide();

          if (_this.opts.sender.send) {
            var options = {
              type: _this.opts.sender.type,
              url: _this.form.node.action,
              method: _this.form.node.method,
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
            }, 2000);
          }
        } else {
          _this.notices.form.show();

          setTimeout(function () {
            _this.notices.form.hide();
          }, 2000);
        }
      });

      _this.init();

      return _this;
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

          console.log(name, field);

          _this2.makeField(name, field);

          if (field.validation) {
            _this2.makeNotice(name, field.notice);
          }
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
        var parent = notice.nextToField ? this.fields[name].node : document.querySelector(notice.attachTo);
        var options = {
          form: this.form.node,
          classNames: notice.classNames,
          attachTo: notice.attachTo,
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
        var _this3 = this;

        // eslint-disable-next-line valid-typeof
        if (_typeof(response.then) !== UNDEFINED) {
          response.then(function (data) {
            return data.json();
          }).then(function (json) {
            _this3.setFieldState(name, !!json[property], message);
          });
        } else {
          response.addEventListener(LOAD, function (ev) {
            _this3.setFieldState(name, !!JSON.parse(ev.target.response)[property], message);
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
          this.fields[name].setFieldState(valid);
        }

        if (!valid && submitted) {
          this.notices[name].show();
        } else {
          this.notices[name].hide();
        }

        this.form.setFormState();
        return this;
      }
    }]);

    return FormHandler;
  }(FormHandlerUtil);

  return FormHandler;

})));
//# sourceMappingURL=FormHandler.js.map
