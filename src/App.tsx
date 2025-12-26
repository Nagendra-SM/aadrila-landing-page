import { ThemeProvider } from "./components/common/ThemeProvider";
import SplashScreen from "./components/common/SplashScreen";
import { useState, useCallback } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import MainLayout from "./components/layout/MainLayout";

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);

  const handleSplashComplete = useCallback(() => {
    setShowSplash(false);
    // Small delay to ensure smooth transition
    setTimeout(() => setContentVisible(true), 100);
  }, []);

  return (
    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider>
          <div className="min-h-screen">
            {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
            <div
              className={`min-h-screen transition-opacity duration-700 ${
                contentVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              <Routes>
                <Route element={<MainLayout />}>
                  <Route index element={<Home />} />
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </div>
          </div>
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
