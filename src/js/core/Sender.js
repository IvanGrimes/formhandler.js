import {
  HTML_INPUT_ELEMENT,
  HTML_TEXTAREA_ELEMENT,
  RADIO_NODE_LIST,
  HTML_SELECT_ELEMENT,
  READYSTATECHANGE,
  FETCH,
  XHR,
  SUCCESS,
  ERROR,
  OBJECT,
} from "../common/constants";

export default class Sender {
  constructor({type, url, method, fields, form, callbackOnSend}) {
    this.type = type;
    this.url = url;
    this.method = method;
    this.fields = fields;
    this.form = form;
    this.callbackOnSend = callbackOnSend;
    this.sendRequest(this.makeData());
  }

  makeData() {
    const data = new FormData();

    Object.entries(this.fields).forEach(([name, field]) => {
      if (!field.send) return;
      const type = field.node.constructor.name;

      if (type === HTML_INPUT_ELEMENT ||
          type === HTML_TEXTAREA_ELEMENT) {
        data.append(field.name, field.node.value);
      }
      if (type === HTML_SELECT_ELEMENT) {
        data.append(field.name, field.node.options[field.node.options.selectedIndex].value);
      }
      if (type === RADIO_NODE_LIST) {
        Array.from(field.node).forEach(node => {
          if (node.checked) {
            data.append(field.name, node.value);
          }
        });
      }
    });

    return data;
  }

  sendRequest(data) {
    if (this.type === XHR) {
      const xhr = new XMLHttpRequest();
      xhr.open(this.method, this.url, true);
      xhr.addEventListener(READYSTATECHANGE, (ev) => {
        if (ev.target.readyState === 4) {
          if (ev.target.status >= 200 && ev.target.status < 400) {
            this.callbackOnSend(SUCCESS);
          } else {
            console.log(`Status: ${ev.target.status}, Text: ${ev.target.statusText}`);
            this.callbackOnSend(ERROR);
          }
        }
      });
      xhr.send(data);
    }

    if (this.type === FETCH) {
      fetch(this.url, {
        method: this.method,
        body: data,
      }).then(data => {
        if (data.status >= 200 && data.status < 400) {
          this.callbackOnSend(SUCCESS);
        } else {
          console.log(`Status: ${data.status}, Text: ${data.statusText}`);
          this.callbackOnSend(ERROR);
        }
      });
    }
  }
}
