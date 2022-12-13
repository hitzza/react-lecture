const tag = "[Controller]";
//생성 시점의 store와 View를 받음
export default class Controller {
  constructor(store, {searchFormView}) {
    this.store = store;
    console.log(tag,'controller');

    this.searchFormView = searchFormView;
  }
}
