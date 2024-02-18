import { Link, Route, Routes } from 'react-router-dom'
import './App.css'
import ConvColor from './components/conColor/ConvColor'
import Exercises from './components/exercises/Exercises'

const HomeLinks = () => (
  <ol>
    <li><Link to={'/ra4/convColor'}>Конвертер цветов</Link></li>
    <li><Link to={'/ra4/exercises'}>Учёт тренировок</Link></li>
  </ol>
)


function App() {
  return (
    <Routes>
      <Route path='/ra4/' element={<HomeLinks />} />
      <Route path='/ra4/convColor' element={<ConvColor />} />
      <Route path='/ra4/exercises' element={<Exercises />} />
    </Routes>
  )
}

export default App
