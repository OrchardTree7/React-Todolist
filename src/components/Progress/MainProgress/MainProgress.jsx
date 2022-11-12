import React, {useEffect, useState} from 'react';
import Progress from '../Progress/Progress';
import { useLocation } from 'react-router-dom';
import './MainProgress.css';
import { Container, Stack, Button } from 'react-bootstrap';

const MainProgress = () => {
    const location = useLocation()
    const date = location.state.date
    const month = date.getMonth()+1
    
    return (
        <Container>
            <Stack direction="vertical">
                <Stack direction="horizontal">
                    <div className='month'>{month}</div>
                    <Button href="/">Calendar</Button>
                </Stack>
                <Progress date={date}/>
                
            </Stack>
        </Container>      
    )
};
export default MainProgress;