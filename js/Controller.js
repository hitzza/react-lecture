const tag = "[Controller]";

export default class Controller {
  constructor(store, {searchFormView}) {
    this.store = store;
    console.log(tag,'controller');

    this.searchFormView = searchFormView;
  }
}
