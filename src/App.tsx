import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Footer from './components/footer/Footer';
import Navbar from './components/navbar/Navbar';
import { AuthProvider } from './contexts/AuthContext';
import Home from './pages/home/Home';
import ListaRestaurantes from './components/restaurantes/listarestaurante/ListaRestaurante';

function App() {
  return (
    <AuthProvider>
        <BrowserRouter>
        <ToastContainer/>
          <Navbar />
          <div className="min-h-[80vh]">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/restaurantes" element={<ListaRestaurantes/>} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
    </AuthProvider>
  );
}

export default App;