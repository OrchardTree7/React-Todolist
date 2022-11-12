// import data and module
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import MainCalendar from './components/MainCalendar';
import MainProgress from './components/Progress/MainProgress/MainProgress'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainCalendar/>} />
        <Route path="/plant" element={<MainProgress/>} />
      </Routes>
    </Router>
  )
};

// export module
export default App;
