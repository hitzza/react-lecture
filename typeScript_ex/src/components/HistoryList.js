import React from "react";
import List from "./List.js";
import store from "../Store.js";
import { formatRelativeDate } from "../helpers.js";

export default class HistoryList extends React.Component{
    constructor(){
        super();

        this.state ={
            historyList:[],
        }
    }
    componentDidMount(){
        this.fetch();
    }
    fetch(){
        const historyList = store.getHistoryList();
        this.setState({
            historyList,
        });
    }
    handleClickRemoveHistory(keyword){
        store.removeHistory(keyword);
        this.fetch();
    }
    render(){
        return(
            <List
                data = {this.state.historyList}
                onClick = {this.props.onClick}
                hasDate = {true}
                onRemove = {(keyword) => this.handleClickRemoveHistory(keyword)}
            />
        );
    }

}
