import './Dashboard.css';

function Dashboard() {
  return (
    <div className='Dashboard'>
        <div className='Dashboard__buttons-container'>
            <button className='Dashboard__button'>
                work
            </button>
            <button className='Dashboard__button'>
                short break
            </button>
            <button className='Dashboard__button'>
                long break
            </button>
        </div>
        <div className='Dashboard__buttons-container'>
            <button className='Dashboard__button'>
                sign in
            </button>
            <button className='Dashboard__button'>
                stats
            </button>
            <button className='Dashboard__button'>
                settings
            </button>
        </div>
    </div>
  );
}

export default Dashboard;
