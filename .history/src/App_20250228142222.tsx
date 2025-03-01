import { BrowserRouter, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Footer from './components/footer/Footer';
import Navbar from './components/navbar/Navbar';
import { AuthProvider } from './contexts/AuthContext';
import Home from './pages/home/Home';
import Produto from './models/Produtos';


function App() {
  return (
    <>
      <AuthProvider>
        <ToastContainer />
        <BrowserRouter>
          <Navbar />
          <div className='min-h-[80vh'>
          <Routes>
            

          </Routes>
          </div>
          <Home />
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;