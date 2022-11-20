import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import Progress from '../Progress/Progress';
import { useLocation } from 'react-router-dom';
import './MainProgress.css';
import { Container, Stack, Button } from 'react-bootstrap';
import { BsCalendar3 } from 'react-icons/bs'

const MainProgress = () => {
    const location = useLocation()
    const date = location.state.date
    const month = date.getMonth()+1
    
    return (
        <Container>
            <Link className='calendarBtn' to={'/'} >
                    <BsCalendar3/>
                    Calendar
            </Link>
            <div className='background'>
                <div className='month'>{month}</div>
                <Progress date={date}/>
            </div>
        </Container>      
    )
};
export default MainProgress;