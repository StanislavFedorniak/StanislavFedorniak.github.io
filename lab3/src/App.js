import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Ship from './components/Ship';
import Missions from './components/Missions';
import TripLog from './components/TripLog';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li><Link to="/">Стан корабля</Link></li>
            <li><Link to="/missions">Місії</Link></li>
            <li><Link to="/log">Журнал подорожей</Link></li>
          </ul>
        </nav>
        <main>
          <Routes>
            <Route path="/" element={<Ship />} />
            <Route path="/missions" element={<Missions />} />
            <Route path="/log" element={<TripLog />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
