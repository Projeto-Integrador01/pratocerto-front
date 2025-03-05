import { ToastContainer } from 'react-toastify';
import Footer from './components/footer/Footer';
import Navbar from './components/navbar/Navbar';
import { AuthProvider } from './contexts/AuthContext';
import Home from './pages/home/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ListaVegano from './components/vegano/listavegano/ListaVegano';
import Cadastro from './pages/cadastro/Cadastro';
import Login from './pages/login/Login';

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
             <Route path="/veganos" element={<ListaVegano />} />
             <Route path="/" element={<Login />} />
             <Route path="/cadastro" element={<Cadastro />} />
            </Routes>
          <Footer />
      </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;