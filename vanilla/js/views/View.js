import { emit, on } from "../helpers.js";

//모든 view들이 공통으로 사용 할 부모 클래스 정의
//DOM API에서 사용
const tag = "[View]";

export default class View {
  constructor(element) {
    if (!element) throw "no element";

    this.element = element;
    this.originalDisplay = this.element.style.dispaly || "";
    //현재 엘리먼트의 default display값을 originDisplay에 저장
    return this;
  }
  /*
    생성자 인자를 element로 받아서 사용
  */

  hide() {
    this.element.style.display = "none";
    return this;
  }

  show() {
    this.element.style.display = this.originalDisplay;
    return this;
  }

  on(eventName, handler) {//이벤트를 발생시킬 함수, helpers에 정의한 유틸리티성 함수
    on(this.element, eventName, handler);
    return this;
  }

  emit(eventName, data) {//커스텀 이벤트를 발행하는 함수
    emit(this.element, eventName, data);
    return this;
  }
}
