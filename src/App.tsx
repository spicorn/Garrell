import './App.css'
import { useState } from 'react'
import Splash from './commponents/Splash'
import Home from './commponents/Home'

function App() {
  const [showSplash, setShowSplash] = useState(true)

  return (
    <>
      {showSplash ? (
        <Splash onFinish={() => setShowSplash(false)} duration={3500} />
      ) : (
        <Home />
      )}
    </>
  )
}

export default App
