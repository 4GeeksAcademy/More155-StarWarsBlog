import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Navbar = () => {

  const { store } = useGlobalReducer();

  return (
    <nav className="navbar navbar-light bg-dark">
      <div className="container">

        <Link to="/">
          <span className="navbar-brand mb-0 h1 text-white">
            Star Wars
          </span>
        </Link>

        <div className="ml-auto">
          <Link to="/">
            <button className="btn btn-danger">
              Favorites ({store.favourites.length}) ▼
            </button>
          </Link>
        </div>

      </div>
    </nav>
  );
};
