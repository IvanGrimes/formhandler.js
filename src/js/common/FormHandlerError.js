// export default function FormHandlerError(message) {
//   this.name = `FormHandlerError`;
//   this.message = message;
// }

export default class FormHandlerError extends Error {
  constructor(props) {
    super(props);
  }
}
