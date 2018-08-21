export default class Sender {
  constructor({type, url, method, form, formState}) {
    this.type = type;
    this.url = url;
    this.method = method;
    this.form = form;
    this.formState = formState;
    this.sendRequest();
  }

  sendRequest() {
    const data = new FormData(this.form);

    if (this.type === 'xhr') {
      const xhr = new XMLHttpRequest();

      xhr.open(this.method, this.url, true);
      xhr.addEventListener('readystatechange', (ev) => {
        if (ev.target.readyState === 4) {
          if (ev.target.status !== 200) {
            console.log(`Status: ${ev.target.status}, Text: ${ev.target.statusText}`);
            this.formState('error');
          } else {
            this.formState('success');
          }
        }
      });
      xhr.send(data);
    }

    if (this.type === 'fetch') {
      fetch(this.url, {
        method: this.method,
        body: data,
      }).then(data => {
        if (data.status !== 200) {
          console.log(`Status: ${data.status}, Text: ${data.statusText}`);
          this.formState('error');
        } else {
          this.formState('success');
        }
      });
    }
  }
}
