import './App.css';
import Routes from "./Routes";
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    document.addEventListener('contextmenu', (e) => {
      e.preventDefault();
    });
    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.key === 'u') {
        e.preventDefault();
      }
    });
    return () => {
      document.removeEventListener('contextmenu', () => {});
      document.removeEventListener('keydown', () => {});
    };
  }, []);
  return (
<>
<Routes></Routes>
</>
  );
}

export default App;
