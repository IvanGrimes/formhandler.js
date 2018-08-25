<h1 align="center"><img height="150" src="./sandbox/logo.png" /><br>FormHandler</h1>

<p align="center">
  <a href="https://travis-ci.org/IvanGrimes/formhandler">
    <img src="https://travis-ci.org/IvanGrimes/formhandler.svg?branch=master" />
  </a>
  <a href="https://github.com/IvanGrimes/formhandler/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/mashape/apistatus.svg" />
  </a>
  
</p>

<p align="center">
  <b>Powerful pure Javascript form validator with a feature of adding your own validations</b>
</p>

<p align="center">
  <b><a href="https://ivangrimes.github.io/formhandler/" target="_blank">Documentation</a></b> | 
  <b><a href="https://codepen.io/IvanGrimes/pen/XPXZQp" target="_blank">Demo</a></b>
</p>

* **Custom validations**: you can add your own validations, just add them in the option object.
* **Highly customizable**: has a powerful API and can be used however you want.
* **Built-in sender**: has a built-in sender for a sending your form to the server through XMLHttpRequest or Fetch API.
* **EcmasScript 6**: uses last features of Javascript.
* **MIT Licensed**: free for personal and commercial use.


## Getting started
FormHandler has a few methods to connect to your project: CDN, npm or downloading latest release.
### CDN
For using FormHandler with CDN you need to include CSS in your ``<head>`` tag.
##### Instead **x.x.x** in formhandler@**x.x.x** put version from the top readme.
```html
<link rel="stylesheet" href="//cdn.jsdelivr.net/npm/formhandler@x.x.x/dist/css/formhandler.min.css">
```

Also needed inclusion Javascript before closing ``<body>`` tag.
```html
<script src="//cdn.jsdelivr.net/npm/formhandler@x.x.x/dist/js/formhandler.min.js"></script>
```

### npm
Firstly install FormHandler package from npm.
```
npm i -D formhandler
```

#### Include Javascript
##### If you're using Webpack
In your Javascript file import formhandler.
```javascript
import FormHandler from 'formhandler';
```

##### If you're not using Javascript bundler.
Then move formhandler.min.js from directory /node_modules/formhandler/dist/js/ in your project folder.
Include this one before closing ``<body>`` tag
```html
<script src="/path/to/dir/formhandler.min.js"></script>
```

#### Include CSS
##### If you're Sass/SCSS or another CSS preprocessor.
Import slippery.min.css in your Sass/SCSS file using ``@import``.
```scss
@import "/node_modules/formhandler/dist/css/formhandler.min.css"
```
If you're using another preprocessor, use equivalent of it.

##### If you're not using CSS preprocessor.
Then just include formhandler.min.css inside of ``<head>`` tag.
```html
<link rel="stylesheet" href="/path/to/dir/formhandler.min.css">
```

### Release
If you don't want to use CDN and you don't use npm, then you need to download latest release
from [Releases](https://github.com/IvanGrimes/formhandler/releases).
After that unpack archive and move CSS/JS files from formhandler-x.x.x/dist/ to where you want to.
Finally include slippery.min.css inside ``<head>`` tag.
```html
<link rel="stylesheet" href="/path/to/dir/formhandler.min.css">
```
Also include formhandler.min.js before closing **<body>** tag.
```html
<script src="/path/to/dir/formhandler.min.js"></script>
```

## Using
### HTML Markup
Every inputs must have an attribute name.
```html
<form class="formhandler"
        action="#"
        method="POST">
  <input class="formhandler__field" type="text" name="firstname" placeholder="First name">
  <input class="formhandler__field" type="text" name="lastname" placeholder="Last name">

  <select class="formhandler__field" name="select">
    <option value="">Choose...</option>
    <option value="option 1">Option 1</option>
    <option value="option 2">Option 2</option>
    <option value="option 3">Option 3</option>
    <option value="option 4">Option 4</option>
    <option value="option 5">Option 5</option>
  </select>

  <div>
    Checkbox 1 <input class="formhandler__field" type="checkbox" name="checkbox" value="Checkbox 1">
    Checkbox 2 <input class="formhandler__field" type="checkbox" name="checkbox" value="Checkbox 2">
    Checkbox 3 <input class="formhandler__field" type="checkbox" name="checkbox" value="Checkbox 3">
    Checkbox 4 <input class="formhandler__field" type="checkbox" name="checkbox" value="Checkbox 4">
    Checkbox 5 <input class="formhandler__field" type="checkbox" name="checkbox" value="Checkbox 5">
  </div>

  <div>
    Radio 1 <input class="formhandler__field" type="radio" name="radio" value="Radio 1">
    Radio 2 <input class="formhandler__field" type="radio" name="radio" value="Radio 2">
  </div>

  <textarea class="formhandler__field" name="message"
              cols="30" rows="10" placeholder="Message"></textarea>

  <button class="formhandler__submit" type="submit" name="submit">Submit</button>
</form>
```

After including FormHandler with one of methods and adding HTML markup.
Initialize FormHandler instance in your Javascript file or inside ``<script>`` tag.

### Initialization
Every property of object fields must fit to value of the name attribute input tag.
For example, if you have <input type="text" name="firstname> then for recognizing field object with options must have name is 'firstname'.

```javascript
const formhandler = new FormHandler({
  fields: {
    firstname: {
      validation: 'isName',
    },
    lastname: {
      validation: 'isName',
    },
    select: {
      validation: 'isSelected',
    },
    checkbox: {
      validation: 'isCheckboxChecked',
    },
    radio: {
      validation: 'isRadioChecked',
    },
    message: {
      validation: 'isNonEmpty',
    },
  },
});
```
After that FormHandler instance will be initialized with default settings.


## API
### Built-in validations
| Name       | Support of min/max | Support of input types | Description
|------------|--------------------|------------------------|--------------------------------------------|
| isNonEmpty | Yes                | Any (including textarea) | If input is not empty then it will be valid in range of min and max if it specified.
| isName     | Yes                | Any text-like input types (including textarea) | If input contain only letters then it will be valid in range of min and max if it specified.
| isEmail    | Yes                | Any text-like input types (including textarea) | If input contain valid email address (ex. example@domain.com) then it will be valid in range of min and max if it specified.
| isPhone    | Yes                | Any text-like input types (including textarea) | If input contain valid phone number then it will be valid in range of min and max if it specified.
| isCheckboxChecked | Yes         | checkbox | If any checkbox is checked, then it will be valid. If 'min' was specified, then you must check at least that number of checkboxes. If 'max' was specified, then you must check less or equal number of checkboxes.
| isRadioChecked | No             | radio | Any radio button in the group (radios with the same values of name attribute) must be checked.
| isSelected     | No             | select | Selected 'options' of the 'select' tag must have value.

### Adding your own validations | [Demo](https://codepen.io/IvanGrimes/pen/KxVQOd)
Custom validation must be a function that passes argument node (dom element).
Function should return object with 'valid' property that contains result of validation (boolean) and 'message' property that contains string with a message of the notice.
#### Example:
```javascript
const formhandler = new FormHandler({
  fields: {
    firstname: {
      validation: 'isName',
    },
    lastname: {
      validation: 'isName',
    },
    select: {
      validation: 'isSelected',
    },
    checkbox: {
      validation: 'isCheckboxChecked',
    },
    radio: {
      validation: 'isRadioChecked',
    },
    message: {
      validation: 'isCustom', // We're apply our custom validation to the field message (textarea tag)
    },
  },
  customValidation: {
    isCustom(node) {
      const pattern = /[a-z]/;
      let valid = pattern.test(node.value),
          message = 'iscustom invalid';

      return {
        valid,
        message,
      };
    },
  },
});
```

### Options for the form | [Demo](https://codepen.io/IvanGrimes/pen/VGeQOx)
| Option        | Type             | Default        | Description
|---------------|------------------|----------------|------------|
| block:        | string           | '.formhandler' | Selector for element (block) in which the FormHandler initializes.
| submit:       | string           | '.formhandler__submit' | Selector for the submit button.
| delayForNotice: | number / boolean | 3000 | Specifies delay after that 'not valid' notice disappeared
| notice:       | {                |  |
| message:      | string           | 'Please, fill the form' |
| succesMessage:| string           | 'Form successfully sent'|
| errorMessage: | string           | 'Oops, something went wrong' |
| appendTo:     | string / boolean | false      | Selector of the block to that notice will be append (ex. '.formhandler__notices'). Set to false if you want apply nextToField option.
| nextToField:  | string / boolean | 'after'    | If set to 'before' then notice will appear before input, if set to 'after' then will appear after input. Set to false if you want apply appendTo option.
| classNames:   | {                |            | Contains classNames that applying ONLY to this notice. If you won't create this object, then classNames will be applied to this field from classNames.notices.
| block:        | string           | 'formhandler__notice' | className for a div of notice.
| hidden:       | string           | 'formhandler__notice--hidden' | className for a hidden notice.
| visible:      | string           | 'formhandler__notice-form--visible' | className for a visible notice.
| },             |                  |            |  |
| },            |                  |  |
#### Example:
```javascript
const formhandler = new FormHandler({
  form: {
    block: '.formhandler',
    submit: '.formhandler__submit',
    notice: {
      appendTo: '.formhandler__notices',
      message: 'Please, fill the form',
      succesMessage: 'Form successfully sent',
      errorMessage: 'Oops, something went wrong',
      classNames: {
        block: 'formhandler__notice-form',
        hidden: 'formhandler__notice-form--hidden',
        visible: 'formhandler__notice-form--visible'
      },
    },
  },
  fields: {
    firstname: {
      validation: 'isName',
    },
    lastname: {
      validation: 'isName',
    },
    select: {
      validation: 'isSelected',
    },
    checkbox: {
      validation: 'isCheckboxChecked',
    },
    radio: {
      validation: 'isRadioChecked',
    },
    message: {
      validation: 'isNonEmpty',
    },
  },
});
```


### Options for the fields | [Demo](https://codepen.io/IvanGrimes/pen/bxELyP)
| Option        | Type             | Default    | Description
|---------------|------------------|------------|------------|
| firstname:    | {                |            | Name attribute of the input tag.
| validation:   | string / boolean | none       | Specifies which validation type will be applied. FormHandler have a few built-in types of validation: isNonEmpty, isName, isEmail, isPhone, isCheckboxChecked, isRadioChecked, isSelected **(link to the section 'Built-in validations')**. If set to false then field won't be validated.
| min:          | number / boolean | false      | Specifies the minimum of characters that must be entered for a validity.
| max:          | number / boolean | false      | Specifies the maximum of characters that must be entered for a validity.
| send:         | boolean          | true       | If set to true/false then field will be sent or not (Using component of FormHandler).
| classNames:   | {                |            | Contains classNames that applying ONLY to this field. If you don't create this object  then classNames will be applied to this field from classNames.fields.
| isValid:      | string           | 'formhandler__field--is-valid' | Classname for a valid input.
| isNotValid:   | string           | 'formhandler__field--is-not-valid' | Classname for an invalid input.
| },            |                  |            |  |
| notice:      | {                |            | Contains options and classNames of notice that applying ONLY to this notice |
| message:      | string           | Set up message, that returns the validator or that one you returned in your own validator | Message of the notice that will appear if field is not valid.
| appendTo:     | string / boolean | false      | Selector of the block to that notice will be append (ex. '.formhandler__notices'). Set to false if you want apply nextToField option.
| nextToField:  | string / boolean | 'after'    | If set to 'before' then notice will appear before input, if set to 'after' then will appear after input. Set to false if you want apply appendTo option.
| classNames:   | {                |            | Contains classNames that applying ONLY to this notice. If you won't create this object, then classNames will be applied to this field from classNames.notices.
| block:        | string           | 'formhandler__notice' | className for a div of notice.
| hidden:       | string           | 'formhandler__notice--hidden' | className for a hidden notice.
| visible:      | string           | 'formhandler__notice-form--visible' | className for a visible notice.
| },             |                  |            |  |
| },             |                  |            |  |
#### Example:
```javascript
const formhandler = new FormHandler({
  fields: {
    firstname: {
      validation: 'isName',
      min: 3,
      max: 25,
      send: true,
      classNames: {
        isValid: 'formhandler__field--is-valid',
        isNotValid: 'formhandler__field--is-not-valid',
      },
      notice: {
        message: 'The value is required',
        appendTo: false,
        nextToField: 'after',
        classNames: {
          block: 'formhandler__notice',
          hidden: 'formhandler__notice--hidden',
          visible: 'formhandler__notice--visible',
        },
      },
    },
    lastname: {
      validation: 'isName',
    },
    select: {
      validation: 'isSelected',
    },
    checkbox: {
      validation: 'isCheckboxChecked',
    },
    radio: {
      validation: 'isRadioChecked',
    },
    message: {
      validation: 'isNonEmpty',
    },
  },
});
```

### Options for the className object | [Demo](https://codepen.io/IvanGrimes/pen/mGVXNQ)
| Option | Default | Description
|--------|---------|------------|
| form: | { |
| isValid: | 'formhandler--is-valid' | Classname for a valid form
| isNotValid: | 'formhandler--is-not-valid' | Classname for a invalid form
| }, |  |
| fields: | { |
| isValid: |'formhandler__field--is-valid' | Classname for a valid input.
| isNotValid: | 'formhandler__field--is-not-valid' | Classname for an invalid input.
| }, |  |
| notices | { |
| block: | 'formhandler__notice' | className for a div of notice.
| hidden: | string           | 'formhandler__notice--hidden' | className for a hidden notice.
| visible: | string           | 'formhandler__notice-form--visible' | className for a visible notice.
| }, |  |
#### Example:
```javascript
const formhandler = new FormHandler({
  fields: {
    firstname: {
      validation: 'isName',
    },
    lastname: {
      validation: 'isName',
    },
    select: {
      validation: 'isSelected',
    },
    checkbox: {
      validation: 'isCheckboxChecked',
    },
    radio: {
      validation: 'isRadioChecked',
    },
    message: {
      validation: 'isNonEmpty',
    },
  },
  classNames: {
    form: {
      isValid: 'formhandler--is-valid',
      isNotValid: 'formhandler--is-not-valid',
    },
    fields: {
      isValid: 'formhandler__field--is-valid',
      isNotValid: 'formhandler__field--is-not-valid',
    },
    notices: {
      block: 'formhandler__notice',
      hidden: 'formhandler__notice--hidden',
      visible: 'formhandler__notice--visible',
    },
  },
});
```


### Options for the sender object | [Demo](https://codepen.io/IvanGrimes/pen/zJrWOw)
| Option | Type | Default | Description
|--------|------|---------|------------|
| type | string | 'xhr' | Type of the request, can be 'xhr' (XMLHttpRequest) or 'fetch' (Promise API).
| send | boolean | false | Appoints will it be sent or won't.
| clearFormOnSuccess | true | Appoints will the form be cleared or not after sucessful sending.
#### Example:
```javascript
const formhandler = new FormHandler({
  fields: {
    firstname: {
      validation: 'isName',
    },
    lastname: {
      validation: 'isName',
    },
    select: {
      validation: 'isSelected',
    },
    checkbox: {
      validation: 'isCheckboxChecked',
    },
    radio: {
      validation: 'isRadioChecked',
    },
    message: {
      validation: 'isNonEmpty', // We're apply our custom validation to the field message (textarea tag)
    },
  },
  sender: {
    type: 'xhr',
    send: true,
    clearFormOnSuccess: true,
  },
});
```


### Callbacks | [Demo](https://codepen.io/IvanGrimes/pen/BOjrBe)
| Callback | Description
|----------|------------|
| onFieldChangeState(name, el, pastValidity, newValidity) | Fires when the field changes state
| onFormChangeState(el, pastValidity, newValidity) | Fires when the form changes state
| onSubmit(form, fields) | Fires when the form submitted
| onSend(result) | Fires when the form was sent
#### Example:
```javascript
const formhandler = new FormHandler({
  fields: {
    firstname: {
      validation: 'isName',
    },
    lastname: {
      validation: 'isName',
    },
    select: {
      validation: 'isSelected',
    },
    checkbox: {
      validation: 'isCheckboxChecked',
    },
    radio: {
      validation: 'isRadioChecked',
    },
    message: {
      validation: 'isNonEmpty', // We're apply our custom validation to the field message (textarea tag)
    },
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
    },
    onSend(result) {
      console.log('onsend', result);
    },
  },
});
```

### Methods | [Demo](https://codepen.io/IvanGrimes/pen/KxVoKd)
| Method          | Type | Description
|-----------------|------|------------|
| isFieldValid(field)  | name(string)  | Returns validity of the field
| getFieldValue(field) | name(string) | Returns value of the field
| isFormValid()   | none | Returns validity of the form
| isFormSubmitted()| none | Returns true if form was submitted
| isFormSent() | none | Returns true if form was sent. Works with built-in sender.
| clearForm() | none | Clears all fields and sets their values to the default
| clearField(field) | name(string) | Clears the field
| getField(field) | string(name) | Returns node of the field
| addField(field, {...options}) | string(name), object(options) | Example
| removeField(field) | string(name) | Removes field (node) and it's notice (node).
| validateField(field) | string(name) | Validates this field, also toggle classNames.
| validateForm() | none | Validates all fields of the form, also toggle classNames.
| getFieldAndValues() | none | Returns an object with all fields as property and their value as key (if checkbox, then return Array).
<br />
<b>Method with argument 'field' can pass name attribute of the input tag, className (ex. '.formhandler__field) of the input or the node of the input.</b>

## More examples
### Validation of the field with Promise API | [Demo](https://codepen.io/IvanGrimes/pen/JaGLoM)
### Validation of the field with XMLHttpRequest | [Demo](https://codepen.io/IvanGrimes/pen/dqGmPK)
### Sending of the form with built-in component | [Demo](https://codepen.io/IvanGrimes/pen/OoMvPY)
