const tag = "[Controller]";

//생성 시점의 store와 View를 받음

export default class Controller {
  constructor(store, {searchFormView,searchResultView}) {
    this.store = store;
    console.log(tag,'controller');

    this.searchFormView = searchFormView;
    this.searchResultView = searchResultView;

    this.subscribeViewEvents();
    //뷰 이벤트들을 수신할 함수
  }
  subscribeViewEvents(){
    this.searchFormView.on('@submit',(event) => this.search(event.detail.value));
    //검색 함수를 searchFormView에 할당
    this.searchFormView.on('@reset',(event)=> this.resetText(event.detail.value));
    //리셋 버튼 이벤트를 searchFormView에 할당
  }
  search(searchKeyword){//검색 기능을 수행할 함수
    console.log(tag,'keyword',searchKeyword);
    this.store.search(searchKeyword);
    this.render();
  }
  resetText(resetKeyword){
    console.log(tag,'resetEvent',resetKeyword);
    this.store.searchKeyword ='';
    this.store.searchResult = [];
    this.render();
  }
  render(){
    if(this.store.searchKeyword.length > 0){
      this.searchResultView.show(this.store.searchResult);
      return
    }
    this.searchResultView.hide();
  }
}
