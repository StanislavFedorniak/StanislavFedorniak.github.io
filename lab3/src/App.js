import Ship from './components/Ship';
import Missions from './components/Missions';
import TripLog from './components/TripLog';

function App() {
  return (
    <div className="App">
      <main>
        <Ship />
        <Missions />
        <TripLog />
      </main>
    </div>
  );
}

export default App;
