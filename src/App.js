import './App.css'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Avia from './components/avia/Avia'
import Info from './components/info/Info'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Navigate to="/avia" />} />
          <Route path="/avia" element={<Avia />} />
          <Route path="/avia/:info" element={<Info />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
