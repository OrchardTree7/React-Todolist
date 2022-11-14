import React, { useState } from 'react';
import { Container, Button, Stack, Form } from 'react-bootstrap';
import Header from './TodoList/Header/Header';
import TodoList from './TodoList/TodoList/TodoList';
import './MainTodoList.css';

const filters = ['all', 'active', 'completed'];

const MainTodoList = ({ date }) => {
	const [filter, setFilter] = useState(filters[0]);
	const selDate = `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`;
	return (
		<Container>
			<Form.Group className='conn' controlId='formListItem'>
				<Stack direction='horizontal' gap={3}>
					<Header filters={filters} filter={filter} onFilterChange={setFilter} />
					<TodoList filter={filter} selDate={selDate} date={date} />
				</Stack>
			</Form.Group>
		</Container>
	);
};

export default MainTodoList;
