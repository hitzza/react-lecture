//DOM API를 사용하기 쉬운 형태로 재정의

export function qs(selector, scope = document) {//셀렉터와 root Element를 인자로 받음
  if (!selector) throw "no selector";

  return scope.querySelector(selector);
}//document.querySelector를 재정의

export function qsAll(selector, scope = document) {
  if (!selector) throw "no selector";

  return Array.from(scope.querySelectorAll(selector));
}//document.querySelectorAll을 배열 형태로 리턴

export function on(target, eventName, handler) {
  target.addEventListener(eventName, handler);
}//target Element에 이벤트 리스터롤 호출

export function delegate(target, eventName, selector, handler) {
  //특정 Element하위에 있는 자식 Element들의 이벤트를 처리할 때 사용
  const emitEvent = (event) => {
    const potentialElements = qsAll(selector, target);
    //모든 자식 Element의 요소를 potentialElements변수에 담아
    for (const potentialElement of potentialElements) {
      if (potentialElement === event.target) {//이벤트의 traget과 같을 경우에만 이벤트 핸들러를 호출
        return handler.call(event.target, event);
      }
    }
  };

  on(target, eventName, emitEvent);//결과적으로 on을 리턴함
}

export function emit(target, eventName, detail) {//커스텀 이벤트 생성
  const event = new CustomEvent(eventName, { detail });//커스텀이벤트 생성자로 인스턴스 생성
  target.dispatchEvent(event);//dispatchEvent를 사용해 이벤트를 발생시킴
}

export function formatRelativeDate(date = new Date()) {
  const TEN_SECOND = 10 * 1000;
  const A_MINUTE = 60 * 1000;
  const A_HOUR = 60 * A_MINUTE;
  const A_DAY = 24 * A_HOUR;

  const diff = new Date() - date;

  if (diff < TEN_SECOND) return `방금 전`;
  if (diff < A_MINUTE) return `${Math.floor(diff / 1000)}초 전`;
  if (diff < A_HOUR) return `${Math.floor(diff / 1000 / 60)}분 전`;
  if (diff < A_DAY) return `${Math.floor(diff / 1000 / 60 / 24)}시간 전`;
  return date.toLocaleString("ko-KR", {
    hour12: false,
    dateStyle: "medium",
  });
}//시,분,초 를 나타낼 유틸함수

export function createPastDate(date = 1, now = new Date()) {
  if (date < 1) throw "date는 1 이상입니다";

  const yesterday = new Date(now.setDate(now.getDate() - 1));
  if (date === 1) return yesterday;

  return createPastDate(date - 1, yesterday);
}//과거 날짜를 세기 위한 유틸함수

export function createNextId(list = []) {
  return Math.max(...list.map((item) => item.id)) + 1;
}//회원 아이디를 하나씩 늘려가며 만들기 위한 유틸함수
