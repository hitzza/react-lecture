import { formatRelativeDate } from './js/helpers.js';
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
            keywordList : [],
            historyList : [],
        };
    }
    /** Dom에 마운트가 완료되면 실행되는 함수 */
    componentDidMount(){
        const keywordList = store.getKeywordList();
        const historyList = store.getHistoryList();
        
        this.setState({
            keywordList,
            historyList,            
                        });
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
        const historyList = store.getHistoryList();

        this.setState({
            searchKeyword,
            searchResult,
            historyList,
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
    /** 검색기록의 삭제 버튼 */
    handleClickRemoveHistory(event,keyword){
        /** 상위 element의 이벤트 버블링을 막기위한 코드 */
        event.stopPropagation();
        
        store.removeHistory(keyword);
        const historyList = store.getHistoryList();
        this.setState({historyList});
    }

    render(){
        let resetButton = null;
        if(this.state.searchKeyword.length > 0){
            resetButton = <button type="reset" className="btn-reset"></button>
        }//입력값이 있으면 리셋버튼 활성화
        
        /** 검색창 */
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
        /** 검색 결과 */
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
        /** 추천 검색어 */
        const keywordList = (
            <ul className ='list'>
                {this.state.keywordList.map(({id, keyword},index) =>{
                    return(
                        <li 
                            key={id}
                            onClick={()=> {this.search(keyword)}}
                            >
                            <span className='number'>{index+1}</span>
                            <span>{keyword}</span>
                        </li>
                    )
                })}
            </ul>    
        )
        /** 검색기록 */
        const historyList = (
            <ul className='list'>
                {this.state.historyList.map(({id, keyword, date})=>{
                    return (
                        <li 
                        key = {id} 
                        onClick = {() => {this.search(keyword)}}>
                            <span>{keyword}</span>
                            <span className ='date'>{formatRelativeDate(date)}</span>
                            <button 
                            className = 'btn-remove'
                            onClick ={(event) => {this.handleClickRemoveHistory(event,keyword)}}
                            ></button>
                        </li>
                    )
                })}
            </ul>
        )


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
            {this.state.selectedTab === TabType.KEYWORD && keywordList}
            {this.state.selectedTab === TabType.HISTORY && historyList}
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
