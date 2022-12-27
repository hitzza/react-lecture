class App extends React.Component{
    constructor(){
        super();

        this.state = {
            searchKeyword : '',
        }
    }
    handleChangeInput(event){
        // this.state.searchKeyword = event.target.value;
        // this.forceUpdate();//변경된 값을 렌더링 해주기 위한 함수
        const searchKeyword = event.target.value;  
        
        if (searchKeyword.length <= 0){
            return this.handleReset();
        }
        
        this.setState({//react에서 state가 변경됨을 감지하는 함수(render함수 호출)
            searchKeyword : searchKeyword
        });
    }
    handleSubmit(event){
        event.preventDefault();
        console.log('handleSubmit',this.state.searchKeyword);
    }
    handleReset(){
        /*
        this.setState({
            searchKeyword : ''
        });
        console.log('reset',this.state.searchKeyword);
        //setState함수는 비동기 함수이기 때문에 다음코드에 setState의 결과물이 바로 반영되지 않음
        */

        this.setState(
            ()=>{
                return {searchKeyword : ''}
            }, () =>{
                console.log('reset',this.state.searchKeyword);
            }
        )
    }

    render(){
        let resetButton = null;
        if(this.state.searchKeyword.length > 0){
            resetButton = <button type="reset" className="btn-reset"></button>
        }//입력값이 있으면 리셋버튼 활성화


        return (
        <>
        <header>
            <h2 className="container">검색</h2>
        </header>

        <div className="container">
        <form 
        onSubmit = {(event)=> this.handleSubmit(event)}//폼에서 서브밋 이벤트 발생시 호출
        onReset = {() => this.handleReset()}//폼에서 리셋 이벤트 발생시 호출
        >
            <input 
                type="text" 
                placeholder="검색어를 입력하세요" 
                autoFocus 
                value = {this.state.searchKeyword}
                onChange = {(event)=> this.handleChangeInput(event)}//인풋 박스 내부에 변화가 생기면 호출
            />
            {resetButton/*리셋버튼*/}
           
        </form>
        </div>
        </>
        );
    }
}

ReactDOM.render(<App/>, document.querySelector('#app'));
