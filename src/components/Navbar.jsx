import useGlobalReducer from "../hooks/useGlobalReducer";
import { Link } from "react-router-dom";
import { useState } from "react";

// I added a link to get access to LearnMore from the list

export const Navbar = () => {
  const { store, dispatch } = useGlobalReducer();
  const [search, setSearch] = useState("");

    const allItems = [
    ...store.people.map(item => ({ ...item, type: "people" })),
    ...store.planets.map(item => ({ ...item, type: "planets" })),
    ...store.vehicles.map(item => ({ ...item, type: "vehicles" }))
  ];

  const filtered = allItems.filter(item =>
  item.name.toLowerCase().includes(search.toLowerCase())
  );

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

           <form className="d-flex" role="search" onSubmit={(e) => e.preventDefault()}>
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => setSearch(e.target.value)}/>
             {search && (
          <div className="position-absolute bg-white mt-5 shadow search-list">
            {filtered.map(item => (
              <Link
                key={item.uid}
                to={`/more/${item.type}/${item.uid}`}
                className="dropdown-item text-primary"
                onClick={() => setSearch("")}
              >
                {item.name}
              </Link>
            ))}
          </div>
          )}
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

