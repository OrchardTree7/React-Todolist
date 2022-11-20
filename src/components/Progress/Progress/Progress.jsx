import React, { useEffect, useState } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import "./Progress.css";

const Progress = ({date}) => {
    const dateYearMonth = `${date.getFullYear()}.${date.getMonth()+1}`
    const todos = readTodosFromLocalStorage(dateYearMonth)
    
    const allTodos = todos.length
    // 해당 달의 completed todos 필터링
    const completedTodos = todos.filter((todo) => todo.status == 'completed').length
    const completed = Math.round(completedTodos/allTodos*100)
    return(
        <div classNmae='body'>
            <ProgressBar 
                maxCompleted={100}
                completed={completed} 
                bgColor="#3a3c68"
                baseBgColor="#fff"
                height="15px"
                
            />
            <img className='plantImg' src={`assets/plant/${Math.floor(completed/4)}.png`}/>            
        </div>
    )
};
export default Progress;

function readTodosFromLocalStorage(month) {
	const todos = localStorage.getItem(month);
	return todos ? JSON.parse(todos) : [];
}