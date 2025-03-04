import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Footer from './components/footer/Footer';
import Navbar from './components/navbar/Navbar';
import { AuthProvider } from './contexts/AuthContext';
import Home from './pages/home/Home';
import FormProduto from './components/produtos/formprodutos/FormProduto';
import DeletarProduto from './components/produtos/deletarproduto/DeletarProduto';
import Cadastro from './pages/cadastro/Cadastro';
import Login from './pages/login/Login';
import ListaProduto from './components/produtos/listaproduto/ListaProduto';
import CardProduto from './components/produtos/cardproduto/CardProduto'; // Importe o componente



function App() {
  return (
    <>
      <AuthProvider>
        <ToastContainer />
        <BrowserRouter>
          <Navbar />
          <div className='min-h-[80vh'>
            <Routes>
              <Route path='/' element={<Login />} />
              <Route path='/home' element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/cadastro" element={<Cadastro />} />
              <Route path='/form' element={<FormProduto />} />
              <Route path='/deletar' element={<CardProduto />} />
              <Route path="/produtos" element={<ListaProduto />} />
              <Route path="/cadastrarproduto" element={<FormProduto />} />
              <Route path="/editarproduto/:id" element={<FormProduto />} />
              <Route path="/deletarproduto/:id" element={<DeletarProduto />} />

            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;