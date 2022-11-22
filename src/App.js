// import data and module
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainCalendar from './components/MainCalendar';
import MainProgress from './components/Progress/MainProgress/MainProgress';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainCalendar />} />
        <Route path="/plant" element={<MainProgress />} />
      </Routes>
    </Router>
  );
};

// export module

// import React, { useState } from 'react';

// import Login from './components/Login/Login';
// import Home from './components/Home/Home';
// import MainHeader from './components/MainHeader/MainHeader';

// const App = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const loginHandler = (email, password) => {
//     setIsLoggedIn(true);
//   };

//   const logoutHandler = () => {
//     setIsLoggedIn(false);
//   };

//   return (
//     <React.Fragment>
//       <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
//       <main>
//         {!isLoggedIn && <Login onLogin={loginHandler} />}
//         {isLoggedIn && <Home onLogout={logoutHandler} />}
//       </main>
//     </React.Fragment>
//   );
// };

export default App;
