import { useState } from 'react'
import reactLogo from './assets/react.svg'
import Manager from './components/Manager'
import './App.css'
import Navbar from './components/Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
   <Navbar />
   <Manager />
     
    </>
  )
}

export default App
