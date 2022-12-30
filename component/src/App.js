import React from 'react';
import Header from './components/Header.js';
import SearchForm from './components/SearchForm.js';
import SearchResult from './components/SearchResult.js';
import store from  './Store.js';

export default class App extends React.Component{
    constructor(){
        super();

        this.state = {
            searchKeyword : '',
            searchResult : [],
            submitted : false,

        }
    }
    /** 검색 */
    search(searchKeyword){
        const searchResult = store.search(searchKeyword);
        this.setState({
            searchResult,
            submitted : true,
        });
    }
    /** 리셋 */
    handleReset(){
        this.setState({
            searchKeyword : '',
            searchResult : [],
            submitted : false,
        });
        console.log('TODO : handleReset');
    }
    /** 키워드 변화 감지 */
    handleChangeInput(searchKeyword){
        if(searchKeyword.length <= 0){
            this.handleReset();
        }
        this.setState({ searchKeyword });
    }

    render(){
        const {searchKeyword, searchResult, submitted} = this.state;

        return (
            <>
                <Header title='검색' />
                <div className='container'>
                    <SearchForm 
                    value = {searchKeyword}
                    onChange = {(value)=> this.handleChangeInput(value)}
                    onSubmit={()=> this.search(searchKeyword)} 
                    onReset={()=> this.handleReset()}
                    />
                    <div className ='content'/* 검색결과 */>
                        {submitted && 
                            <SearchResult 
                                data = {searchResult}
                            />
                        }
                            
                    </div>
                </div>
            </>
        );
    }

}