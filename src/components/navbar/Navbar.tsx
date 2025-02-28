import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <div className="w-full flex justify-center py-4 bg-yellow-500 text-black">
        <div className="container flex justify-between text-lg">
          <div>Prato Certo</div>

          <div className="flex gap-4">
            <Link to="/categoria" className="hover:text-indigo-700">
              Categorias
            </Link>

            <Link to="/produtos" className="hover:text-indigo-700">
              Produtos
            </Link>

            <Link to="/vegetarianos" className="hover:text-indigo-700">
              Vegetarianos
            </Link>

            <Link to="/veganos" className="hover:text-indigo-700">
              Veganos
            </Link>

            <Link to="/restaurantes" className="hover:text-indigo-700">
              Restaurantes
            </Link>

            <Link to="/login" className="hover:text-indigo-700">
              Login
            </Link>

            <Link to="/sair" className="hover:text-indigo-700">
              Sair
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
