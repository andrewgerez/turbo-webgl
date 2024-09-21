import Home from './pages/home'
import Player from './pages/player'
import { Routes, Route } from 'react-router-dom'
import './app.css'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/player' element={<Player />} />
    </Routes>
  )
}

export default App
