export default class Sender {
  constructor(url, method, fields, listener) {
    this.url = url;
    this.method = method;
    this.fields = fields;
    this.listener = listener;
    Object.defineProperty(this, 'test', {
      value: 123,
      writable: false,
    });
  }

  makeData() {
    let data = new FormData();

    Object.entries(this.fields).forEach(([name, field]) => {
      if (field.send) {
        data.append(name, field.node.files && field.node.files[0] || field.node.value);
      }
    });

    return data;
  }

  makeRequest() { //TODO: Add fetch method
    this.request = new XMLHttpRequest();
    this.request.open(this.method, this.url, true);

    return this;
  }

  sendRequest() {
    this.request.addEventListener('readystatechange', this.listener);

    this.request.send(this.makeData());
  }
}
