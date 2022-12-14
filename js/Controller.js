const tag = "[Controller]";

//생성 시점의 store와 View를 받음

export default class Controller {
  constructor(store, {searchFormView}) {
    this.store = store;
    console.log(tag,'controller');

    this.searchFormView = searchFormView;

    this.subscribeViewEvents();
    //뷰 이벤트들을 수신할 함수
  }
  subscribeViewEvents(){
    this.searchFormView.on('@submit',(event) => this.search(event.detail.value));
    //검색 함수를 searchFormView에 할당
  }
  search(keyword){//검색 기능을 수행할 함수
    console.log(tag,'keyword',keyword);
    //추후 검색기능 추가 예정
  }
}
