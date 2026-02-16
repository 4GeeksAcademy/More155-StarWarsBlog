import useGlobalReducer from "../hooks/useGlobalReducer";
import { Link } from "react-router-dom";

// I added a link to get access to LearnMore from the list

export const Navbar = () => {
  const { store, dispatch } = useGlobalReducer();

  const removeFavorite = (uid, type) => {
    dispatch({
      type: "REMOVE_FAVORITE",
      payload: { uid, type }
    });
  };

  return (
    <nav className="navbar navbar-light bg-light px-4">
      <Link to="/">
        <span className="navbar-brand mb-0 h1">Star Wars Blog</span>
      </Link>

      <div className="dropdown">
        <button
          className="btn btn-dark dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
        >
          Favorites ({store.favourites.length})
        </button>

        <ul className="dropdown-menu dropdown-menu-end">
          {store.favourites.length === 0 ? (
            <li className="dropdown-item text-muted">(empty)</li>
          ) : (
            store.favourites.map((fav) => (
              <li
                key={fav.uid}
                className="dropdown-item d-flex justify-content-between align-items-center text-primary"
              >
                <Link to={`/more/${fav.type}/${fav.uid}`}> 
               {fav.name}
             </Link> 
                <i
                  className="fa-solid fa-trash"
                  style={{ cursor: "pointer", color: "black" }}
                  onClick={() => removeFavorite(fav.uid, fav.type)}
                ></i>
              </li>
            ))
          )}
        </ul>
      </div>
    </nav>
  );
};

