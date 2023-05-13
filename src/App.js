import './App.css';
import Footer from './Footer';
import Dashboard from './Dashboard';
import Timer from './Timer';
import { useState } from 'react';

// TODO
// create timer
// modify register form to throw error if verify password, password not the same
// create settings form

function App() {
  const [shortBreakLen, setShortBreakLen] = useState(5);
  const [longBreakLen, setLongBreakLen] = useState(10);
  const [workLen, setWorkLen] = useState(25);

  return (
    <div className="App">
      <Dashboard 
        workLen={workLen}
        setWorkLen={setWorkLen}
        shortBreakLen={shortBreakLen}
        setShortBreakLen={setShortBreakLen}
        longBreakLen={longBreakLen}
        setLongBreakLen={setLongBreakLen}
      />
      <Timer 
        workLen={workLen}
        shortBreakLen={shortBreakLen}
        longBreakLen={longBreakLen}
        />
      <Footer/>
    </div>
  );
}

export default App;
