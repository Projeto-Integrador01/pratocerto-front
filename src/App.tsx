import { ToastContainer } from 'react-toastify';
import Footer from './components/footer/Footer';
import Navbar from './components/navbar/Navbar';
import { AuthProvider } from './contexts/AuthContext';
import Home from './pages/home/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Cadastro from './pages/cadastro/Cadastro';
import Login from './pages/login/Login';
import ListaRestaurantes from './components/restaurantes/listarestaurante/ListaRestaurante';

function App() {
  return (
    <>
      <AuthProvider>
        <ToastContainer/>
          <BrowserRouter>
           <Navbar />
            <Routes>
            <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/restaurantes" element={<ListaRestaurantes/>} />
             <Route path="/login" element={<Login />} />
             <Route path="/cadastro" element={<Cadastro />} />
             <Route path="/home" element={<Home />} />
             <Route path="/" element={<Home />} />
            </Routes>
          <Footer />
      </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;