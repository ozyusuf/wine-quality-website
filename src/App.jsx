import { Suspense, lazy, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import ViewportManager from './components/common/ViewportManager';
import LoadingScreen from './components/common/LoadingScreen';
import CustomCursor from './components/common/CustomCursor';

const ReportPage = lazy(() => import('./pages/ReportPage'));

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <CustomCursor />

      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {!isLoading && (
        <Router>
          <ViewportManager />
          <div className="bg-tech-dark text-white font-sans selection:bg-tech-purple selection:text-white overflow-hidden">
            <Suspense fallback={
              <div className="h-screen w-full flex items-center justify-center bg-black">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-wine-gold"></div>
              </div>
            }>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/report" element={<ReportPage />} />
              </Routes>
            </Suspense>
          </div>
        </Router>
      )}
    </>
  );
}

export default App;
