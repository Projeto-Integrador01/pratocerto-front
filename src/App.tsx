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


function App() {
  return (
    <>
      <AuthProvider>
        <ToastContainer />
        <BrowserRouter>
          <Navbar />
          <div className='min-h-[80vh'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/form' element={<FormProduto />} />
              <Route path='/deletar' element={<DeletarProduto />} />
              <Route path="/login" element={<Login />} />
              <Route path="/cadastro" element={<Cadastro />} />
            </Routes>
            </div>
            <Footer />
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;