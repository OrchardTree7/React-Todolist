import React, { useState } from 'react';
import { Modal, Button, Container, Row, Col } from 'react-bootstrap';
import Calendar from 'react-calendar';
import MainTodoList from './MainTodoList';
import 'react-calendar/dist/Calendar.css';
import './MainCalendar.css';
import { Link } from 'react-router-dom';
import MainMap from './Map/MainMap';
import { RiPlantLine } from 'react-icons/ri';

const MainCalendar = () => {
	const [date, setDate] = useState(new Date());
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = (value, event) => {
		setDate(value);
		setShow(true);
	};
	return (
		<>
			<Link className='plantBtn' to={'/plant'} state={{ date: date }}>
				<RiPlantLine />
				Plant
			</Link>
			<Calendar onClickDay={handleShow} onChange={setDate} value={date} formatDay={(locale, date) => date.toLocaleDateString('en', { day: 'numeric' })} calendarType='US'></Calendar>
			<Modal size='xl' show={show} onHide={handleClose} centered>
				<Modal.Header>
					<Button onClick={handleClose}>{'<'}</Button>
					<Modal.Title>{`${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Container fluid>
						<Row>
							<Col>
								<MainTodoList date={date}></MainTodoList>
							</Col>
							<Col xl='6' md='12'>
								<MainMap></MainMap>
							</Col>
						</Row>
					</Container>
				</Modal.Body>
			</Modal>
		</>
	);
};
export default MainCalendar;
