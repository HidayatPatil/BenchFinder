import { Routes, Route, Link } from 'react-router-dom'
import Result from './Results'
import Home from './Home'

export default function App(){
  return (
    <div className="app_body">
      {/* <h1 className="container">BenchFinder App</h1> */}
      <nav>
        <Link to="/" style={{ marginRight: '20px' }}>Home</Link>
        <Link to="/results">Results</Link>
      </nav>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/results" element={<Result />} />
      </Routes>
    </div>
  )
}