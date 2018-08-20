import Field from './Field';

export default class Radio extends Field {
  constructor({...opts}) {
    super({...opts});
  }

  toggleClassNames() {
    if (this.valid) {
      this.node.forEach(el => el.classList.remove(this.classNames.isNotValid));
      this.node.forEach(el => el.classList.add(this.classNames.isValid));
    } else {
      this.node.forEach(el => el.classList.remove(this.classNames.isValid));
      this.node.forEach(el => el.classList.add(this.classNames.isNotValid));
    }
  }
}
