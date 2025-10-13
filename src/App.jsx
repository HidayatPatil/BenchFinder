import { Routes, Route, Link } from 'react-router-dom';
import Result from './pages/Result';
import Home from './pages/Home';
import Add from './components/Add';
import Bench from './pages/Bench';

export default function App() {
    return (
        <div className='app_body'>
            <Routes>
                <Route path='/bench' element={<Bench />} />
                <Route path='/' element={<Home />} />
                <Route path='/results' element={<Result />} />
                <Route path='/add' element={<Add />} />
            </Routes>
        </div>
    );
}
