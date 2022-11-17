import React from 'react';

import Card from '../UI/Card/Card';
import classes from './Home.module.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainCalendar from '../MainCalendar';
import MainProgress from '../Progress/MainProgress/MainProgress';

const Home = (props) => {
  return (
    <Routes>
      <Route path="/" element={<MainCalendar />} />
      <Route path="/plant" element={<MainProgress />} />
    </Routes>
  );
};

export default Home;
