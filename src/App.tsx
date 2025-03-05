import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Footer from './components/footer/Footer';
import Navbar from './components/navbar/Navbar';
import { AuthProvider } from './contexts/AuthContext';
import Home from './pages/home/Home';
import FormProduto from './components/produtos/formprodutos/FormProduto';
import Cadastro from './pages/cadastro/Cadastro';
import Login from './pages/login/Login';
import ListaProduto from './components/produtos/listaproduto/ListaProduto';
import ListaProdutoLogado from './components/produtos/listaprodutologado/ListaProdutoLogado';



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
              <Route path="/produtos" element={<ListaProduto />} />
              <Route path="/produtoslogado" element={<ListaProdutoLogado />} />
              <Route path="/cadastrarproduto" element={<FormProduto />} />
              <Route path="/cadastrarproduto/:id" element={<FormProduto />} />
              <Route path="/editarproduto/:id" element={<FormProduto />} />

            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;