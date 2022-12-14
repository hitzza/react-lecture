import View from "./View.js";
import { qs } from '../helpers.js';

const tag = '[SearchResultView]';

//검색 결과 스크립트

export default class SearchResultView extends View{
    constructor(){
        super(qs('#search-result-view'));

        this.template = new Template();
        //DOM을 만드는 용도의 template 객체
    }
    show(data = []){//검색 결과를 배열로 받아 동적으로 DOM에 띄워주는 함수
        this.element.innerHTML =
            data.length > 0 //데이터가 있으면 getList
                ? this.template.getList(data)
                : this.template.getEmptyMessage();
                //데이터가 없으면 getEmptyMessage호출
        super.show();
    }
}
class Template{//화면에 뿌려줄 DOM오브젝트
    getEmptyMessage(){//검색결과가 없을 경우
        return  `
            <div class = "empty-box">검색결과가 없습니다.</div>
        `
    }
    getList(data){//검색 결과 ul요소
        return `
            <ul class = "result">
            ${data.map(this._getItem).join((""))}
            </ul>
        `
        }
    _getItem({imageUrl,name}){//검색결과 내용 li요소
        return`
        <li>
        <img src = '${imageUrl}' alt ='${name}' />
        <p>${name}</p>
        </li>
        `

    }
}