import React, { useEffect, useState } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import styles from "./Progress.css";

const Progress = ({date}) => {
    const dateYearMonth = `${date.getFullYear()}.${date.getMonth()+1}`
    const todos = readTodosFromLocalStorage(dateYearMonth)
    
    const allTodos = todos.length
    // 해당 달의 completed todos 필터링
    const completedTodos = todos.filter((todo) => todo.status == 'completed').length
    
    return(
        <div>
            <ProgressBar 
                completed={Math.round(completedTodos/allTodos*100)} 
                bgColor="#36CF00"
                baseBgColor="#fff"
            />
        </div>
    )
};
export default Progress;

function readTodosFromLocalStorage(month) {
	const todos = localStorage.getItem(month);
	return todos ? JSON.parse(todos) : [];
}