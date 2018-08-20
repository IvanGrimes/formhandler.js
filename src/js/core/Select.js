import Field from './Field';

export default class Select extends Field {
  constructor({...opts}) {
    super({...opts})
  }
  toggleClassNames() {
    if (this.valid) {
      this.node.classList.remove(this.classNames.isNotValid);
      this.node.classList.add(this.classNames.isValid);
    } else {
      this.node.classList.remove(this.classNames.isValid);
      this.node.classList.add(this.classNames.isNotValid);
    }
  }
}
