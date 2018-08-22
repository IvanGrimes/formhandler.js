import FormHandler from '../FormHandler';
jest.mock('../FormHandler');

beforeEach(() => {
  FormHandler.mockClear();
});

it('Test FormHandler', () => {
  expect(FormHandler).not.toHaveBeenCalled();
  const form = new FormHandler();
});
