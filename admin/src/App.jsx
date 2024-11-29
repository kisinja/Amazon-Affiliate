import './App.css';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <>
      <ToastContainer />
      <Navbar />
      <div className=''>
        <HomePage />
      </div>
    </>
  );
};

export default App;