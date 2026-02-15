import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom";

export const Card = ({ item, type }) => {

  const { store, dispatch } = useGlobalReducer();

  const isFavorite = store.favourites.includes(item.name);

  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch({ type: "REMOVE_FAVORITE", payload: item.name });
    } else {
      dispatch({ type: "ADD_FAVORITE", payload: item.name });
    }
  };

   // If I add other fetch to show details on the card i get a 429 error so lets KISS

  return (
    <div className="card m-2" style={{ width: "18rem" }}>
      <img
        src={`https://support.primaryimage.uk/wp-content/uploads/2017/07/400x200.png`}
        className="card-img-top"
      />

      <div className="card-body">
        <h5 className="card-title">{item.name}</h5>
        <div className="d-flex gap-4">
         <Link to={`/more/${type}/${item.uid}`} className="btn btn-danger">Learn More!</Link>

            <button
            onClick={toggleFavorite}
            style={{
              backgroundColor: isFavorite ? "#E6C200" : "transparent",
              border: "2px solid #E6C200",
              borderRadius: "8px",
              padding: "6px 10px",
              cursor: "pointer",
              fontSize: "18px"
            }}
          >
            <span style={{ color: isFavorite ? "black" : "#E6C200" }}>
              {isFavorite ? "♥" : "♡"}
            </span>
          </button>

        </div>
      </div>
    </div>
  );
};
