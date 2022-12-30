import React from 'react';
import Header from './components/Header.js';
import SearchForm from './components/SearchForm.js';


export default class App extends React.Component{
    constructor(){
        super();

        this.state = {
            searchKeyword : '',
        }
    }
    /** 검색 */
    search(searchKeyword){
        searchKeyword = this.state.searchKeyword;
        console.log('TODO:search',searchKeyword);
    }
    /** 리셋 */
    handleReset(){
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
        return (
            <>
                <Header title='검색' />
                <div className='container'>
                    <SearchForm 
                    value = {this.state.searchKeyword}
                    onChange = {(value)=> this.handleChangeInput(value)}
                    onSubmit={(searchKeyword)=> this.search(searchKeyword)} 
                    onReset={()=> this.handleReset()}
                    />
                </div>
            </>
        );
    }

}