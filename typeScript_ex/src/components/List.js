import React from "react";
import { formatRelativeDate } from "../helpers.js";

const List = ({
    data = [],
    onClick, 
    hasIndex = false, 
    hasDate = false, 
    onRemove 
})=> {
    
    const handleClickRemoveHistory = (event, keyword) =>{
        event.stopPropagation();
        onRemove(keyword);
    }

    return(
        <ul className="list">
            {data.map((item, index) => (
                <li 
                key={item.id}
                onClick = {()=> onClick(item.keyword)}
                >
                    {hasIndex && <span className='number'>{index+1}</span>}
                    <span>{item.keyword}</span>
                    {hasDate && (
                        <span className ='date'>{formatRelativeDate(item.date)}</span>
                    )}
                    {!!onRemove && (
                    <button 
                    className = 'btn-remove'
                    onClick ={(event) => {handleClickRemoveHistory(event,item.keyword)}}
                    ></button>
                    )}
                </li>
        ))}
        </ul>
    );
}

export default List;