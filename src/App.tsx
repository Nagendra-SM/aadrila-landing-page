import { ThemeProvider } from './components/common/ThemeProvider'
import Navbar from './components/layout/Navbar'
import SplashScreen from './components/common/SplashScreen';
import { useState, useCallback } from 'react';

function App() {

  const [showSplash, setShowSplash] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);

  const handleSplashComplete = useCallback(() => {
    setShowSplash(false);
    // Small delay to ensure smooth transition
    setTimeout(() => setContentVisible(true), 100);
  }, []);

  return (
    <ThemeProvider>
      <div className="min-h-screen">
        {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
        <main
        className={`min-h-screen transition-opacity duration-700 ${
          contentVisible ? 'opacity-100' : 'opacity-0'
        }`}
       >
        <Navbar />
      </main>
        
      </div>
    </ThemeProvider>
  )
}

export default App
