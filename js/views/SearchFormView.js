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
    bindEvent(){//대상 엘리먼트에 keyup이벤트 발생 시 핸들러 호출
        on(this.inputElement,'keyup',() => this.handleKeyUp());
    }
    handleKeyUp(){//bindEvent함수에서 keyup이벤트에서 사용할 콜백함수
        const {value} = this.inputElement;
        this.showResetButton(value.length > 0);
    }
}