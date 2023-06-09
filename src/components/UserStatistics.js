import '../styles/UserStatistics.css'
import Draggable from 'react-draggable';
import { useState } from 'react';

function UserStatistics({statsPosition, setStatsPosition, totalTime, timeStudied, timeOnBreak, statsType, sessionTotal, sessionStudied, sessionOnBreak}) {
    const [drag, setDrag] = useState(false);

    const handleDrag = (e, data) => {
        setDrag(!drag);
        setStatsPosition({x: data.x, y: data.y});
    }

    return (
        <div className='UserStatistics'>
            <Draggable
                onStart={handleDrag}
                onStop={handleDrag}
                position={statsPosition}
            >
                <div 
                    className="UserStatistics__statistics-container"
                    style={{
                        outline: drag ? '1px solid rgb(255, 238, 0)' : 'none'
                }}>
                    {statsType === 'alltime' ?
                    <div>
                        <div className="UserStatistics__single-statistic-container">
                            <h1 className="UserStatistics__time">{timeStudied}</h1>
                            <p className="UserStatistics__label">minutes working</p>
                        </div>
                        <div className="UserStatistics__single-statistic-container">
                            <h1 className="UserStatistics__time">{timeOnBreak}</h1>
                            <p className="UserStatistics__label">minutes on break</p>
                        </div>
                        <div className="UserStatistics__single-statistic-container">
                            <h1 className="UserStatistics__time">{totalTime}</h1>
                            <p className="UserStatistics__label">total minutes</p>
                        </div>
                    </div>
                    :
                    <div>
                        <div className="UserStatistics__single-statistic-container">
                            <h1 className="UserStatistics__time">{sessionStudied}</h1>
                            <p className="UserStatistics__label">minutes working</p>
                        </div>
                        <div className="UserStatistics__single-statistic-container">
                            <h1 className="UserStatistics__time">{sessionOnBreak}</h1>
                            <p className="UserStatistics__label">minutes on break</p>
                        </div>
                        <div className="UserStatistics__single-statistic-container">
                            <h1 className="UserStatistics__time">{sessionTotal}</h1>
                            <p className="UserStatistics__label">total minutes</p>
                        </div>
                    </div>
                    }
                </div>
            </Draggable>
        </div>
    )
}

export default UserStatistics;