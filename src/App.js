import './styles/App.css';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import Timer from './components/Timer';
import { useState, useEffect } from 'react';
import { auth, db } from './firebase';
import { doc, setDoc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from 'firebase/auth';
import UserStatistics from './components/UserStatistics';

// TODO
// add forgot password
// Buy pomodoros.me
// deploy!! :)

function App() {
  const [shortBreakLen, setShortBreakLen] = useState(5);
  const [longBreakLen, setLongBreakLen] = useState(10);
  const [workLen, setWorkLen] = useState(25);
  const [currentPeriod, setCurrentPeriod] = useState('work');
  const [longBrInterval, setLongBrInterval] = useState(4);
  const [userId, setUserId] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [showStats, setShowStats] = useState(false);
  // timer position, statsposition to keep track of position when dragged
  const [statsPosition, setStatsPosition] = useState(null);
  const [timerPosition, setTimerPosition] = useState(null);
  // alltime times
  const [totalTime, setTotalTime] = useState(null);
  const [timeStudied, setTimeStudied] = useState(null);
  const [timeOnBreak, setTimeOnBreak] = useState(null);
  const [statsType, setStatsType] = useState('alltime');
  // session times
  const [sessionTotal, setSessionTotal] = useState(null);
  const [sessionStudied, setSessionStudied] = useState(null);
  const [sessionOnBreak, setSessionOnBreak] = useState(null);

  // ensures function is only called the first time App is rendered
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;

        setUserId(uid);
        console.log("Logged In");
        const userRef = doc(db, "users", uid);
        const userSnap = await getDoc(userRef);
        
        const userRead = userSnap.data();
        setLoggedIn(true);
        setUserData(userRead);
        setTotalTime(userRead.totalTime)
        setTimeStudied(userRead.timeStudied);
        setTimeOnBreak(userRead.timeOnBreak);

        if (userRead.shortBreakLen) {
          setShortBreakLen(userRead.shortBreakLen);
        }

        if (userRead.longBreakLen) {
          setLongBreakLen(userRead.longBreakLen);
        }

        if (userRead.workLen) {
          setWorkLen(userRead.workLen);
        }

        if (userRead.longBrInterval) {
          setLongBrInterval(userRead.longBrInterval);
        }

        if (userRead.statsType) {
          setStatsType(userRead.statsType);
        }

        setSessionTotal(0);
        setSessionStudied(0);
        setSessionOnBreak(0);
      } else {
        setUserId(null);
        setUserData(null);
        setTotalTime(null);
        setTimeStudied(null);
        setTimeOnBreak(null);
        setSessionTotal(null);
        setSessionStudied(null);
        setSessionOnBreak(null);

        setLoggedIn(false);
      }
    })
  }, []);

  useEffect(() => {
    if (totalTime || timeStudied || timeOnBreak) {

      if (totalTime !== userData.totalTime ||
          timeStudied !== userData.timeStudied ||
          timeOnBreak !== userData.timeOnBreak) {

            const writeData = async () => {
              const userRef = doc(db, "users", userId);
      
              await setDoc(userRef, {
                totalTime: totalTime,
                timeStudied: timeStudied,
                timeOnBreak: timeOnBreak
              }, { merge: true });
            }
            
            // get new session values
            setSessionTotal(sessionTotal + 1);

            currentPeriod === 'work' ? setSessionStudied(sessionStudied + 1) : setSessionOnBreak(sessionOnBreak + 1);
            
            // write alltime values to server
            writeData().catch(console.error);
          }
    }
  }, [totalTime, timeStudied, timeOnBreak])


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
        loggedIn={loggedIn}
        showStats={showStats}
        setShowStats={setShowStats}
        statsPosition={statsPosition}
        setStatsPosition={setStatsPosition}
        timerPosition={timerPosition}
        setTimerPosition={setTimerPosition}
        setTotalTime={setTotalTime}
        setTimeStudied={setTimeStudied}
        setTimeOnBreak={setTimeOnBreak}
        statsType={statsType}
        setStatsType={setStatsType}
        userId={userId}
      />
      <Timer 
        workLen={workLen}
        shortBreakLen={shortBreakLen}
        longBreakLen={longBreakLen}
        currentPeriod={currentPeriod}
        setCurrentPeriod={setCurrentPeriod}
        longBrInterval={longBrInterval}
        timerPosition={timerPosition}
        setTimerPosition={setTimerPosition}
        loggedIn={loggedIn}
        totalTime={totalTime}
        setTotalTime={setTotalTime}
        timeStudied={timeStudied}
        setTimeStudied={setTimeStudied}
        timeOnBreak={timeOnBreak}
        setTimeOnBreak={setTimeOnBreak}
      />
      { loggedIn &&
        <div style={{visibility: showStats ? 'visible' : 'hidden'}}>
          <UserStatistics 
            statsPosition={statsPosition} 
            setStatsPosition={setStatsPosition}
            totalTime={totalTime}
            timeStudied={timeStudied}
            timeOnBreak={timeOnBreak}
            statsType={statsType}
            sessionTotal = {sessionTotal}
            sessionStudied={sessionStudied}
            sessionOnBreak={sessionOnBreak}
          />
        </div>
      }
      <Footer/>
    </div>
  );
}

export default App;
