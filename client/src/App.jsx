import { useState } from 'react'
import Header from './components/Header'
import Home from './components/Home'
import Resgister from './components/Resgister'
import {Routes,Route} from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/registration' element={<Resgister/>}/>
      </Routes>
    </>
  )
}

export default App
