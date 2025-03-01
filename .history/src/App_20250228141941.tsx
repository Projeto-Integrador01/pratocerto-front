import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Footer from './components/footer/Footer';
import Navbar from './components/navbar/Navbar';
import { AuthProvider } from './contexts/AuthContext';
import Home from './pages/home/Home';
import CardProdutos from './components/produtos/cardprodutos/CardProdutos';

function App() {
  return (
    <>
      <AuthProvider>
        <ToastContainer />
        <BrowserRouter>
          <Navbar />
          <div className='min-h-[80vh'>
          <Routes>
          <Route path="/" element={<CardProdutos produto={undefined}/>} />


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