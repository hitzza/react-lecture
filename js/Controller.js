import { TabType } from "./views/tabView.js";

const tag = "[Controller]";

//생성 시점의 store와 View를 받음

export default class Controller {
  constructor(store, {searchFormView,searchResultView,tabView,keywordListView}) {
    this.store = store;
    console.log(tag,'controller');

    this.searchFormView = searchFormView;
    this.searchResultView = searchResultView;
    this.tabView = tabView;
    this.keywordListView = keywordListView;

    this.subscribeViewEvents();
    //뷰 이벤트들을 수신할 함수
    this.render();
  }
  subscribeViewEvents(){
    this.searchFormView.on('@submit',(event) => this.search(event.detail.value));
    //검색 함수를 searchFormView에 할당
    this.searchFormView.on('@reset',(event)=> this.resetText(event.detail.value));
    //리셋 버튼 이벤트를 searchFormView에 할당
    this.tabView.on('@change', (event) => this.changeTab(event.detail.value));
    //변경된 탭 이벤트를 tabView에 할당
  }
  search(searchKeyword){//검색 기능을 수행할 함수
    console.log(tag,'keyword',searchKeyword);
    this.store.search(searchKeyword);
    this.render();
  }

  changeTab(tab){
    console.log(tag,'changeTab',tab);
    this.store.selectedTab = tab;
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
      return this.renderSearchResult();
    }
    this.tabView.show(this.store.selectedTab);

    if (this.store.selectedTab === TabType.KEYWORD){
      this.keywordListView.show(this.store.getKeywordList());
    }else if(this.store.selectedTab === TabType.HISTORY){
      this.keywordListView.hide();
    }else{
      throw '사용할 수 없는 탭입니다.';
    }

    this.searchResultView.hide();
  }
  renderSearchResult(){
    this.tabView.hide();
    this.keywordListView.hide();

    this.searchResultView.show(this.store.searchResult);  
  }
}
