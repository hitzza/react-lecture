import storage from "./storage.js";
import { createNextId } from "./helpers.js";

const tag = "[store]";

class Store {
  constructor(storage) {
    if (!storage) throw "no storage";
    console.log(tag,'store')
    this.storage = storage;

  }

  search(keyword){//검색하는 함수
    this.addHistory(keyword);
    return this.searchResult = this.storage.productData.filter((product) =>
      product.name.includes(keyword)//storage에 키워드로 검색한 결과가 있는지 검색
    );
  }
  
  addHistory(keyword=''){
    /** 텍스트의 공백제거 */
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

  getKeywordList(){
    return this.storage.keywordData;
  }
  getHistoryList(){
    return this.storage.historyData.sort(this._sortHistory);
  }
  _sortHistory(history1, history2){
    return history1.date - history2.date;
  }
  removeHistory(keyword){
    this.storage.historyData = this.storage.historyData.filter(
      (history)=> history.keyword !== keyword
    );
  }
}

const store = new Store(storage);

export default store;