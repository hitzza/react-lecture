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

  search(keword){//검색하는 함수
    this.searchKeyword = keword;
    this.searchResult = this.storage.productData.filter((product) =>
      product.name.includes(keword)//storage에 키워드로 검색한 결과가 있는지 검색
    );
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
}
