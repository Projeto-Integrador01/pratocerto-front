import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import ListaCategoria from "./components/categoria/listacategoria/ListaCategoria";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Modalcategoria from "./components/categoria/modalcategoria/ModalCategoria";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="min-h-[80vh] flex flex-col items-center justify-center bg-[#ffffff]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categoria" element={<ListaCategoria />} />
          <Route path="/cadastrarcategoria" element={<Modalcategoria />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
