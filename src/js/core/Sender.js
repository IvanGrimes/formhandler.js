import FormHandlerError from '../common/FormHandlerError';
import {
  HTML_SELECT_ELEMENT,
  READY_STATE_CHANGE,
  FETCH,
  XHR,
  SUCCESS,
  ERROR,
  NODE_LIST,
} from '../common/constants';

export default class Sender {
  constructor({
    type, url, method, fields, form, callbacks,
  }) {
    this.type = type;
    this.url = url;
    this.method = method;
    this.fields = fields;
    this.form = form;
    this.callbacks = callbacks;
  }

  makeData() {
    const data = new FormData();

    // eslint-disable-next-line no-unused-vars
    Object.entries(this.fields).forEach(([name, field]) => {
      if (!field.send) return;
      const type = field.node.constructor.name;

      if (type === NODE_LIST) { // Radio/Checkbox
        Array.from(field.node).forEach((node) => {
          if (node.checked) {
            data.append(field.name, node.value);
          }
        });
      } else if (type === HTML_SELECT_ELEMENT) {
        data.append(field.name, field.node.options[field.node.options.selectedIndex].value);
      } else { // Others
        data.append(field.name, field.node.value);
      }
    });

    return data;
  }

  sendRequest(data) {
    if (this.type === XHR) {
      const xhr = new XMLHttpRequest();
      xhr.open(this.method, this.url, true);
      xhr.addEventListener(READY_STATE_CHANGE, (ev) => {
        if (ev.target.readyState === 4) {
          if (ev.target.status >= 200 && ev.target.status < 400) {
            this.callbacks.setState(SUCCESS);
            this.callbacks.onSend(SUCCESS);
          } else {
            this.callbacks.setState(ERROR);
            this.callbacks.onSend(ERROR);
            throw new FormHandlerError(`Status: ${ev.target.status}, Text: ${ev.target.statusText}`);
          }
        }
      });
      xhr.send(data);
    }

    if (this.type === FETCH) {
      fetch(this.url, {
        method: this.method,
        body: data,
      }).then((response) => {
        if (response.status >= 200 && response.status < 400) {
          this.callbacks.setState(SUCCESS);
          this.callbacks.onSend(SUCCESS);
        } else {
          this.callbacks.setState(ERROR);
          this.callbacks.onSend(ERROR);
          throw new FormHandlerError(`Status: ${response.status}, Text: ${response.statusText}`);
        }
      });
    }
  }
}
