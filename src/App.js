import './App.css';
import Footer from './Footer';
import Dashboard from './Dashboard';
import Timer from './Timer';
import { useState } from 'react';

// TODO
// modify timer behavior when time == 0
// modify register form to throw error if verify password, password not the same
// create settings form

function App() {
  const [shortBreakLen, setShortBreakLen] = useState(5);
  const [longBreakLen, setLongBreakLen] = useState(10);
  const [workLen, setWorkLen] = useState(25);
  const [currentPeriod, setCurrentPeriod] = useState('work');
  const [longBrInterval, setLongBrInterval] = useState(4);

  return (
    <div className="App">
      <Dashboard 
        workLen={workLen}
        setWorkLen={setWorkLen}
        shortBreakLen={shortBreakLen}
        setShortBreakLen={setShortBreakLen}
        longBreakLen={longBreakLen}
        setLongBreakLen={setLongBreakLen}
        currentPeriod={currentPeriod}
        setCurrentPeriod={setCurrentPeriod}
        longBrInterval={longBrInterval}
        setLongBrInterval={setLongBrInterval}
      />
       <Timer 
        workLen={workLen}
        shortBreakLen={shortBreakLen}
        longBreakLen={longBreakLen}
        currentPeriod={currentPeriod}
        setCurrentPeriod={setCurrentPeriod}
        longBrInterval={longBrInterval}
        />
      <Footer/>
    </div>
  );
}

export default App;
