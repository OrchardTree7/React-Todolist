import React, { useState } from 'react';
import { Modal, Button, Container, Row, Col } from 'react-bootstrap';
import Calendar from 'react-calendar';
import MainTodoList from './MainTodoList';
import 'react-calendar/dist/Calendar.css';
import './MainCalendar.css';
import { Link } from 'react-router-dom';
import MainMap from './Map/MainMap';

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
      <Calendar
        onClickDay={handleShow}
        onChange={setDate}
        value={date}
        formatDay={(locale, date) =>
          date.toLocaleDateString('en', { day: 'numeric' })
        }
        calendarType="US"
      ></Calendar>
      <Link className="plantBtn" to={'/plant'} state={{ date: date }}>
        Plant
      </Link>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header>
          <Button onClick={handleClose}>{'<'}</Button>
          <Modal.Title>{`${date.getFullYear()}.${
            date.getMonth() + 1
          }.${date.getDate()}`}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <MainTodoList date={date}></MainTodoList>
        </Modal.Body>
      </Modal>
      <MainMap></MainMap>
    </>
  );
};
export default MainCalendar;
