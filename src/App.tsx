import { ToastContainer } from 'react-toastify';
import Footer from './components/footer/Footer';
import Navbar from './components/navbar/Navbar';
import { AuthProvider } from './contexts/AuthContext';
import Home from './pages/home/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ListaVegano from './components/vegano/listavegano/ListaVegano';
import Cadastro from './pages/cadastro/Cadastro';
import Login from './pages/login/Login';
import ListaRestaurantes from './components/restaurantes/listarestaurante/ListaRestaurante';
import ListaVegetariano from './components/vegetariano/listavegetariano/ListaVegetariano';
import ListaCategoria from "./components/categoria/listacategoria/ListaCategoria";
import DeletarCategoria from "./components/categoria/deletarcategoria/DeletarCategoria";
import FormCategoria from "./components/categoria/formcategoria/FormCategoria";

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
             <Route path="/vegetarianos" element={<ListaVegetariano />} />
             <Route path="/login" element={<Login />} />
             <Route path="/cadastro" element={<Cadastro />} />
             <Route path="/restaurantes" element={<ListaRestaurantes/>} />
             <Route path="/form" element={<FormCategoria />} />
            <Route path="/deletar" element={<DeletarCategoria />} />
            <Route path="/categorias" element={<ListaCategoria />} />
            <Route path="/cadastrarcategoria" element={<FormCategoria />} />
            <Route path="/editarcategoria/:id" element={<FormCategoria />} />
            <Route path="/deletarcategoria/:id"element={<DeletarCategoria />}/>
            </Routes>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
