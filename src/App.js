import './App.css';
import Routes from "./Routes";
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'


function App() {
  // useEffect(() => {
  //   document.addEventListener('contextmenu', (e) => {
  //     e.preventDefault();
  //   });
  //   document.addEventListener('keydown', (e) => {
  //     if (e.ctrlKey && e.key === 'u') {
  //       e.preventDefault();
  //     }
  //   });
  //   return () => {
  //     document.removeEventListener('contextmenu', () => {});
  //     document.removeEventListener('keydown', () => {});
  //   };
  // }, []);
  return (
<>
<ToastContainer/>
<Routes></Routes>
</>
  );
}

export default App;
