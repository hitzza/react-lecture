import React from "react";

const SearchForm = ({value, onChange, onSubmit, onReset}) => {
    /** 검색 폼에서 엔터를 눌렀을 때 호출하는 함수 */
    const handleSubmit = (event) => {
        event.preventDefault();
        /** 자식요소에서 부모 요소로 props를 전송하기 위한 콜백함수 */
        onSubmit();
    }
    
    /** 리셋 버튼 클릭시 호출하는 함수 */
    const handleReset = () => {
        onReset();
    }
    /** 검색창에 변화가 생기면 호출하는 함수 */
    const handleChangeInput = (event) => {
        onChange(event.target.value);
    }
    
    
    
    return (
        <form
            onSubmit={handleSubmit}
            onReset={handleReset}
        >
            <input 
                type="text" 
                placeholder="검색어를 입력하세요" 
                autoFocus 
                value = {value}
                onChange = {handleChangeInput}//인풋 박스 내부에 변화가 생기면 호출
            />
            {value.length > 0 &&(
                <button type="reset" className="btn-reset"></button>
            )}
           
        </form>);
};
export default SearchForm;