import React, { useState } from 'react';
import { useEffect } from 'react';
import AddTodo from '../AddTodo/AddTodo';
import Todo from '../Todo/Todo';
import styles from './TodoList.css';

export default function TodoList({ filter, selDate, date }) {
	const dateYearMonth = `${date.getFullYear()}.${date.getMonth() + 1}`;
	const [todos, setTodos] = useState(() => readTodosFromLocalStorage(dateYearMonth));

	const handleAdd = (todo) => setTodos([...todos, todo]);
	const handleUpdate = (updated) => setTodos(todos.map((t) => (t.id === updated.id ? updated : t)));
	const handleDelete = (deleted) => setTodos(todos.filter((t) => t.id !== deleted.id));

	useEffect(() => {
		localStorage.setItem(dateYearMonth, JSON.stringify(todos));
	}, [todos]);

	let filtered = getFilteredItems(todos, filter);
	filtered = filtered.filter((item, i) => {
		return item.date === selDate;
	});

	return (
		<section className={styles.container}>
			<AddTodo onAdd={handleAdd} selDate={selDate} />
			<ul className={styles.list}>
				{filtered.map((item) => (
					<Todo key={item.id} todo={item} onUpdate={handleUpdate} onDelete={handleDelete} date={date} />
				))}
			</ul>
		</section>
	);
}

function readTodosFromLocalStorage(date) {
	const todos = localStorage.getItem(date);
	return todos ? JSON.parse(todos) : [];
}

function getFilteredItems(todos, filter) {
	if (filter === 'all') return todos;
	return todos.filter((todo) => todo.status === filter);
}
