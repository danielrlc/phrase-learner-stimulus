import { Controller } from 'stimulus';

export default class extends Controller {
  flip_sentence() {
    this.textTarget.textContent = `Hello there`;
  }
}
