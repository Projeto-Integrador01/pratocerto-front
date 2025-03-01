import Footer from './components/footer/Footer';
import Navbar from './components/navbar/Navbar';
import Home from './pages/home/Home';

function App() {
  return (
    <>
    <AuthProvider>
      <Navbar />
      <Home />
      <Footer />
      </AuthProvider>
    </>
  );
}

export default App;