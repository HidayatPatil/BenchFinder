import { Routes, Route, Link } from 'react-router-dom';
import Result from './pages/Result';
import Home from './pages/Home';
import Add from './components/Add';

export default function App() {
    return (
        <div className='app_body'>
            {/* <h1 className="container">BenchFinder App</h1> */}
            <nav>
                <Link to='/' style={{ marginRight: '20px' }}>
                    Home
                </Link>
                <Link to='/results' style={{ marginRight: '20px' }}>
                    Results
                </Link>
                <Link to='/add'>Add Bench</Link>
            </nav>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/results' element={<Result />} />
                <Route path='/add' element={<Add />} />
            </Routes>
        </div>
    );
}
