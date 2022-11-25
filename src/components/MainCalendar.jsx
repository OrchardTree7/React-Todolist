import React, { useState, useEffect } from 'react';
import { Modal, Button, Container, Row, Col } from 'react-bootstrap';
import Calendar from 'react-calendar';
import MainTodoList from './MainTodoList';
import 'react-calendar/dist/Calendar.css';
import './MainCalendar.css';
import { Link } from 'react-router-dom';
import MainMap from './Map/MainMap';
import { RiPlantLine } from 'react-icons/ri';
import moment from 'moment';

const MainCalendar = () => {
	const [calendarDate, setCalendarDate] = useState(new Date());
	const [date, setDate] = useState(new Date());
	const [show, setShow] = useState(false);
	const [location, setLocation] = useState(null);

	// 타일에 달성률 표시를 위한 데이터 불러오기
	const dateYearMonth = `${date.getFullYear()}.${date.getMonth() + 1}`;
	const [todos, setTodos] = useState(() => readTodosFromLocalStorage(dateYearMonth));

	useEffect(() => {
		navigator.geolocation.getCurrentPosition((pos) => {
			setLocation({ lng: pos.coords.longitude, lat: pos.coords.latitude });
		});
	}, []);

	const handleClose = () => { setShow(false); setTodos(() => readTodosFromLocalStorage(dateYearMonth)) };
	const handleShow = (value, event) => {
		setDate(value);
		setShow(true);
	};
	// 타일에 todo에서 작성한 내용 불러오기
	const titleContent = ({ date, view }) =>
		todos
			.filter((todo) => todo.date === moment(date).format('YYYY.MM.DD'))
			.map((item) => <div>{item.text}</div>)
	return (
		<>
			<Link className='plantBtn' to={'/plant'} state={{ calendarDate: calendarDate }}>
				<RiPlantLine />
				Plant
			</Link>
			<Calendar
				tileContent={titleContent}
				onActiveStartDateChange={(e) => {
					setCalendarDate(e.activeStartDate);
				}}
				onClickDay={handleShow}
				onChange={setDate}
				value={date}
				formatDay={(locale, date) => date.toLocaleDateString('en', { day: 'numeric' })}
				calendarType='US'
				// 타일에 클래스명 할당해 스타일 추가
				tileClassName={({ date, view }) => {
					if (todos.find((todo) => todo.date === moment(date).format('YYYY.MM.DD')) || todos.find((todo) => todo.date === moment(date).format('YYYY.MM.D'))) {
						return 'highlight';
					}
				}}
			></Calendar>
			<Modal size='xl' show={show} onHide={handleClose} centered>
				<Modal.Header>
					<Button className='buttoncc' onClick={handleClose}>
						{'<'}
					</Button>
					<Modal.Title>{`${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Container fluid>
						<Row>
							<Col>
								<MainTodoList date={date}></MainTodoList>
							</Col>
							<Col xl='6' md='12'>
								<MainMap date={date} location={location}></MainMap>
							</Col>
						</Row>
					</Container>
				</Modal.Body>
			</Modal>
		</>
	);
};

function readTodosFromLocalStorage(date) {
	const todos = localStorage.getItem(date);
	return todos ? JSON.parse(todos) : [];
}

export default MainCalendar;
