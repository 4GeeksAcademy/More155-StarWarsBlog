import useGlobalReducer from "../hooks/useGlobalReducer";
import { Link } from "react-router-dom";

// I added a link to get access to LearnMore from the list

// Add functionality to search bar, not sure how. Use state input set input plus and e target for the value OnChange ?, a handle change and how would i fetch the local storage? or just call item in general. Could use a OneKeyDown to sent u to the path on LearnMore

export const Navbar = () => {
  const { store, dispatch } = useGlobalReducer();

  const removeFavorite = (uid, type) => {
    dispatch({
      type: "REMOVE_FAVORITE",
      payload: { uid, type }
    });
  };

  return (
    <nav className="navbar navbar-light bg-dark px-4">
      <Link to="/">
        <span className="navbar-brand mb-0 h1 text-white">Star Wars Blog</span>
      </Link>

           <form className="d-flex" role="search">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-danger" type="submit">Search</button>
      </form>

      <div className="dropdown">
        <button
          className="btn btn-danger dropdown-toggle"
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

