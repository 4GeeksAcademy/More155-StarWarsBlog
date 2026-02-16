export const initialStore=()=>{
  return{
    message: null,
    favourites: [],
    people: [],
    planets: [],
    vehicles: [],
  }
}
27
export default function storeReducer(store, action = {}) {
  switch (action.type) {

    case "SET_PEOPLE":
      return {
        ...store,
        people: action.payload
      };

    case "SET_PLANETS":
      return {
        ...store,
        planets: action.payload
      };

    case "SET_VEHICLES":
      return {
        ...store,
        vehicles: action.payload
      };

    case "ADD_FAVORITE":
      if (store.favourites.some(fav => fav.uid === action.payload.uid)) {
        return store;
      }
      return {
        ...store,
        favourites: [...store.favourites, action.payload]
      };

    case "REMOVE_FAVORITE":
      return {
        ...store,
        favourites: store.favourites.filter(
          fav => fav.uid !== action.payload.uid ||
          fav.type !== action.payload.type
        )
      };

    default:
      throw Error("Unknown action.");
  }
}
