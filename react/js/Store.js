import storage from "./storage.js";

const tag = "[store]";

class Store {
  constructor(storage) {
    if (!storage) throw "no storage";
    console.log(tag,'store')
    this.storage = storage;

  }

  search(keyword){//검색하는 함수
    return this.searchResult = this.storage.productData.filter((product) =>
      product.name.includes(keyword)//storage에 키워드로 검색한 결과가 있는지 검색
    );
  }

  getKeywordList(){
    return this.storage.keywordData;
  }
}

const store = new Store(storage);

export default store;