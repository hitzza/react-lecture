import View from "./View.js";
import { qs, on } from '../helpers.js';

const tag = '[SearchFormView]';

export default class SearchFormView extends View{
    constructor(){
        console.log(tag,'constructor')
        super(qs('#search-form-view'));
        //부모의 생성자 함수 호출(인자로 받은 엘리먼트 리턴)
        this.resetElement = qs('[type=reset]',this.element);
        //리셋버튼 엘리먼트
        this.showResetButton(false);
        //리셋버튼 엘리먼트 디폴트값
        this.inputElement = qs('[type=text]',this.element);
        //텍스트 엘리먼트
        this.bindEvent();
        //이벤트를 바인딩 할 함수
        
    }
    showResetButton(visible = true){//값이 true면 리셋버튼을 보여주고 false면 삭제 
        this.resetElement.style.display = visible ? 'block' : 'none';
    }
    bindEvent(){//대상 엘리먼트에 이벤트 발생 시 핸들러 호출
        on(this.inputElement,'keyup',() => this.handleKeyUp());
        //inputElement의 keyup이벤트 발생시 호출
        on(this.element,'submit', (event) => this.handleSubmit(event));
        //#search-form-view 의 submit이벤트 발생시 호출
        on(this.resetElement,'click', () => this.handleReset());
    }
    handleKeyUp(){//bindEvent함수에서 keyup이벤트에서 사용할 콜백함수
        const {value} = this.inputElement;
        this.showResetButton(value.length > 0);
        //검색어 입력란에 값이 있으면 ture 아니면 false를 showResetButton함수에 반환 
        if(!value.length){
            this.handleReset();
        }
        
    }
    handleSubmit(event){
        event.preventDefault();//form의 기본성질중 sibmit발생 시 페이지 리셋 기능을 제거하기 위해 사용
        console.log(tag,'handleSubmit');
        const {value} = this.inputElement;
        //검색어로 사용하기 위한 현재 inputElement에 작성한 객체 생성
        this.emit('@submit', {value});
        //검색어로 검색기능 사용할 @submit함수 생성
    }
    handleReset(){
        const {value} = this.inputElement;
        this.showResetButton(false);
        this.emit('@reset',{value});
    }
}