import { createNextId } from "./helpers.js";
import { TabType } from "./views/tabView.js";

const tag = "[store]";

export default class Store {
  constructor(storage) {
    if (!storage) throw "no storage";
    console.log(tag,'store')
    this.storage = storage;

    this.searchKeyword = "";
    this.searchResult = [];
    this.selectedTab = TabType.KEYWORD;

  }

  search(keyword){//검색하는 함수
    this.searchKeyword = keyword;
    this.searchResult = this.storage.productData.filter((product) =>
      product.name.includes(keyword)//storage에 키워드로 검색한 결과가 있는지 검색
    );
    console.log(this.searchKeyword);
    this.addHistory(keyword);
  }
  getKeywordList(){//storage에서 추천 검색어 키워드를 받아서 반환 
    return this.storage.keywordData;
  }
  getHistoryList(){
    return this.storage.historyData.sort(this._sorthHistory);
  }
  _sorthHistory(history1,history2){
    return history2.date > history1.date;
  }
  removeHistory(keyword){
    this.storage.historyData = this.storage.historyData.filter(
        (history)=> history.keyword !== keyword
      );
  }
  addHistory(keyword){
    keyword = keyword.trim();
    if(!keyword){
      return;
    }
    const hasHistory = this.storage.historyData.some((history) => history.keyword === keyword);
    if(hasHistory){
      this.removeHistory(keyword);
    }
    const id = createNextId(this.storage.historyData);
    const date = new Date();
    this.storage.historyData.push({id, keyword, date});
    this.storage.historyData = this.storage.historyData.sort(this._sorthHistory);
  }
}
