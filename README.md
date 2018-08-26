<h1 align="center"><img height="150" src="https://github.com/IvanGrimes/formhandler.js/blob/master/sandbox/logo.png?raw=true" /><br>FormHandler 1.1.0</h1>

<p align="center">
  <a href="https://travis-ci.org/IvanGrimes/formhandler.js">
    <img src="https://travis-ci.org/IvanGrimes/formhandler.js.svg?branch=master" />
  </a>
  <a href="https://github.com/IvanGrimes/formhandler.js/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/mashape/apistatus.svg" />
  </a>

</p>

<p align="center">
  <b>Powerful pure Javascript form validator with a feature of adding your own validations</b>
</p>

<p align="center">
  <b><a href="https://ivangrimes.github.io/formhandler.js/" target="_blank">Documentation</a></b> |
  <b><a href="https://codepen.io/IvanGrimes/pen/XPXZQp" target="_blank">Demo</a></b>
</p>

* **Custom validations**: you can add your own validations, just add them in the option object.
* **Highly customizable**: has a powerful **[API](https://ivangrimes.github.io/formhandler.js/#api)** and can be used however you want.
* **Built-in sender**: has a **[built-in sender](https://ivangrimes.github.io/formhandler.js/#options-for-the-sender-object--demo)** for a sending your form to the server through XMLHttpRequest or Fetch API.
* **EcmasScript 6**: uses last features of Javascript.
* **MIT Licensed**: free for personal and commercial use.


## Getting started
formhandler.js has a few methods to connect to your project: CDN, npm or downloading latest release.
### CDN
For using formhandler.js with CDN you need to include CSS in your ``<head>`` tag.
##### Instead **x.x.x** in formhandler.js@**x.x.x** put version from the top readme.
```html
<link rel="stylesheet" href="//cdn.jsdelivr.net/npm/formhandler.js@x.x.x/dist/css/formhandler.min.css">
```

Also needed inclusion Javascript before closing ``<body>`` tag.
```html
<script src="//cdn.jsdelivr.net/npm/formhandler.js@x.x.x/dist/js/formhandler.min.js"></script>
```

### npm
Firstly install formhandler.js package from npm.
```
npm i -D formhandler.js
```

#### Include Javascript
##### If you're using Webpack
In your Javascript file import formhandler.js.
```javascript
import FormHandler from 'formhandler.js';
```

##### If you're not using Javascript bundler.
Then move formhandler.min.js from directory /node_modules/formhandler.js/dist/js/ in your project folder.
Include this one before closing ``<body>`` tag
```html
<script src="/path/to/dir/formhandler.min.js"></script>
```

#### Include CSS
##### If you're Sass/SCSS or another CSS preprocessor.
Import slippery.min.css in your Sass/SCSS file using ``@import``.
```scss
@import "/node_modules/formhandler.js/dist/css/formhandler.min.css"
```
If you're using another preprocessor, use equivalent of it.

##### If you're not using CSS preprocessor.
Then just include formhandler.min.css inside of ``<head>`` tag.
```html
<link rel="stylesheet" href="/path/to/dir/formhandler.min.css">
```

### Release
If you don't want to use CDN and you don't use npm, then you need to download latest release
from [Releases](https://github.com/IvanGrimes/formhandler.js/releases).
After that unpack archive and move CSS/JS files from formhandler.js-x.x.x/dist/ to where you want to.
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
  <div class="formhandler__notices"></div> <!-- For notice of the form -->
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
    <input class="formhandler__field" type="checkbox" name="checkbox" value="Checkbox 1"> Checkbox 1
     <input class="formhandler__field" type="checkbox" name="checkbox" value="Checkbox 2"> Checkbox 2
     <input class="formhandler__field" type="checkbox" name="checkbox" value="Checkbox 3"> Checkbox 3
     <input class="formhandler__field" type="checkbox" name="checkbox" value="Checkbox 4"> Checkbox 4
     <input class="formhandler__field" type="checkbox" name="checkbox" value="Checkbox 5"> Checkbox 5
  </div>

  <div>
     <input class="formhandler__field" type="radio" name="radio" value="Radio 1"> Radio 1
     <input class="formhandler__field" type="radio" name="radio" value="Radio 2"> Radio 2
  </div>

  <textarea class="formhandler__field" name="message"
              cols="30" rows="10" placeholder="Message"></textarea>

  <button class="formhandler__submit" type="submit" name="submit">Submit</button>
</form>
```

After including formhandler.js with one of methods and adding HTML markup.
Initialize formhandler.js instance in your Javascript file or inside ``<script>`` tag.

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
After that formhandler.js instance will be initialized with default settings.


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
  },
});
```
