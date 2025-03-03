import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [currentPath, setCurrentPath] = useState<string>("");

  useEffect(() => {
    // Get the current path from the window location
    setCurrentPath(window.location.pathname);
  }, []);

  return (
    <div className="app-container">
      <h1>Current URL Path:</h1>
      <div className="url-display">
        {currentPath || "/"}
      </div>
    </div>
  )
}

export default App
