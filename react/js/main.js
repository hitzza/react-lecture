import store from './js/Store.js';

const TabType = {
    KEYWORD : 'KEYWORD',
    HISTORY : 'history'
};

const TabLabel = {
    [TabType.KEYWORD] : '추천 검색어',
    [TabType.HISTORY] : '최근 검색어',
}

class App extends React.Component{
    constructor(){
        super();

        this.state = {
            searchKeyword : '',
            searchResult : [],
            submitted :false,
            selectedTab : TabType.KEYWORD,
        };
    }
    handleChangeInput(event){
        // this.state.searchKeyword = event.target.value;
        // this.forceUpdate();//변경된 값을 렌더링 해주기 위한 함수
        const searchKeyword = event.target.value;  
        
        if (searchKeyword.length <= 0 && this.state.submitted){//검색어가 없다면 리셋 버튼을 눌렀을때와 동일한 상태로 만듦
            return this.handleReset();
        }
        
        this.setState({//react에서 state가 변경됨을 감지하는 함수(render함수 호출)
            searchKeyword : searchKeyword
        });
    }
    handleSubmit(event){
        event.preventDefault();
        console.log('handleSubmit',this.state.searchKeyword);
        this.search(this.state.searchKeyword);
    }
    search(searchKeyword){
        const searchResult = store.search(searchKeyword);

        this.setState({
            searchResult,
            submitted :true
        });
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
                return {
                    searchKeyword : '',
                    searchResult : [],
                    submitted :false
                }
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
        
        const searchForm = (
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
               
            </form>);

        const searchResult = (
            this.state.searchResult.length > 0 ?(
                <ul className='result'>
                    {this.state.searchResult.map(({id, imageUrl, name})=>{
                        return (
                            <li key = {id}>
                                <img src = {imageUrl} alt={name}></img>
                                <p>{name}</p>
                            </li>
                        );
                    })}
                </ul>
            ):(
                <div className ='empty-box'>검색 결과가 없습니다</div>
            )
        );

        const taps = (
            <>
            <ul className='tabs'>
                {Object.values(TabType).map((tabType)=> {
                    return (
                        <li 
                        className={this.state.selectedTab === tabType ? 'active': ''} 
                        key = {tabType}
                        onClick={() => {this.setState({selectedTab : tabType})}}
                        >
                            {TabLabel[tabType]}
                        </li>
                    );
                })}
            </ul>
            {this.state.selectedTab === TabType.KEYWORD && <>TODO:추천 검색어</>}
            {this.state.selectedTab === TabType.HISTORY && <>TODO:최근 검색어</>}
            </>
        );

        return (
        <>
        <header>
            <h2 className="container">검색</h2>
        </header>

        <div className="container">
        {searchForm}
        <div className ='content'/* 검색결과 */>
            {this.state.submitted ? searchResult : taps}
        </div>
        </div>
        </>
        );
    }
}

ReactDOM.render(<App/>, document.querySelector('#app'));
