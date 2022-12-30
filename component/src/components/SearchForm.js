import React from "react";

export default class SearchForm extends React.Component{
    constructor(){
        super();

        this.state = {
            searchKeyword : '',
        }
    }
    /** 검색 폼에서 엔터를 눌렀을 때 호출하는 함수 */
    handleSubmit(event){
        event.preventDefault();
        /** 자식요소에서 부모 요소로 props를 전송하기 위한 콜백함수 */
        this.props.onSubmit(this.state.searchKeyword);
    }
    /** 리셋 버튼 클릭시 호출하는 함수 */
    handleReset(){
        this.props.onReset();
    }
    /** 검색창에 변화가 생기면 호출하는 함수 */
    handleChangeInput(event){
        const searchKeyword = event.target.value;
        /** 검색어가 없다면 리셋 버튼 함수 호출 */
        if(searchKeyword.length <= 0){
            this.handleReset();
        }
        this.setState({ searchKeyword });
    }
    

    render(){
        return (
            <form
                onSubmit={(event)=> {this.handleSubmit(event)}}
                onReset={()=> {this.handleReset()}}
            >
                <input 
                    type="text" 
                    placeholder="검색어를 입력하세요" 
                    autoFocus 
                    value = {this.state.searchKeyword}
                    onChange = {(event)=> this.handleChangeInput(event)}//인풋 박스 내부에 변화가 생기면 호출
                />
                {this.state.searchKeyword.length > 0 &&(
                    <button type="reset" className="btn-reset"></button>
                )}
               
            </form>);
    }
}