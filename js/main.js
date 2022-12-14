import Controller from "./Controller.js";
import Store from "./store.js";
import storage from "./storage.js";
import SearchFormView from "./views/SearchFormView.js";
import SearchResultView from "./views/SearchResultView.js";

const tag = '[main]'
document.addEventListener("DOMContentLoaded", main);
//DOM이 로딩 완료 되었을 때 main함수를 호출하면서 객체 초기화
function main() {
  console.log(tag,'main');
  const store = new Store(storage);
  //storage객체를 이용하여 스토어를 생성

  const views = {
    searchFormView : new SearchFormView(),
    searchResultView : new SearchResultView(),
  };

  new Controller(store, views);
  //생성한 인스턴스를 컨트롤러에 넣어 컨트롤러 생성자 생성
}
