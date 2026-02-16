import { useEffect } from "react";
import { Card } from "../components/Card.jsx";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

{/* Getting some 302 errors from time to time, lack of catch errors or async functions I guess, have to check that out DONE this got rid of 302 and 429 errors */}
{/* LearnMore: Already added a catch: error and a spinner when loading */}
{/* Add a dropdown with a delete function plus a trash bin icon for the favorites btn DONE */}

{/* Main issues: Can't fecth on Card to show details on home view, loading slow */}
{/* What details am I supposed to show for vehicles in Card? And in Learn More for every single one of them */}
{/* Not sure if I have to do the whole UI interface for the LearnMore view in terms of Bootstrap Card and Details List Component */}
{/* Should I concatenate id: `${type}-${item.uid}` ? */}

export const Home = () => {

  const { store, dispatch } = useGlobalReducer();

  useEffect(() => {

  const fetchPeople = async () => {
    try {
      const res = await fetch("https://www.swapi.tech/api/people");

      if (!res.ok) {
        console.log("People error status:", res.status);
        return;
      }

      const data = await res.json();

      dispatch({
        type: "SET_PEOPLE",
        payload: data.results
      });

    } catch (error) {
      console.log("People fetch failed:", error);
    }
  };

  const fetchPlanets = async () => {
    try {
      const res = await fetch("https://www.swapi.tech/api/planets");

      if (!res.ok) {
        console.log("Planets error status:", res.status);
        return;
      }

      const data = await res.json();

      dispatch({
        type: "SET_PLANETS",
        payload: data.results
      });

    } catch (error) {
      console.log("Planets fetch failed:", error);
    }
  };

  const fetchVehicles = async () => {
    try {
      const res = await fetch("https://www.swapi.tech/api/vehicles");

      if (!res.ok) {
        console.log("Vehicles error status:", res.status);
        return;
      }

      const data = await res.json();

      dispatch({
        type: "SET_VEHICLES",
        payload: data.results
      });

    } catch (error) {
      console.log("Vehicles fetch failed:", error);
    }
  };

  fetchPeople();
  fetchPlanets();
  fetchVehicles();

}, []);

  return (
    <div className="container mt-4">

     <h2 className="text-danger">Characters</h2>
<div className="d-flex overflow-auto mb-4">
  {store.people.map(person => (
    <div key={person.uid} className="me-3" style={{ flex: "0 0 auto" }}>
      <Card item={person} type="people" />
    </div>
  ))}
</div>

<h2 className="text-danger">Planets</h2>
<div className="d-flex overflow-auto mb-4">
  {store.planets.map(planet => (
    <div key={planet.uid} className="me-3" style={{ flex: "0 0 auto" }}>
      <Card item={planet} type="planets" />
    </div>
  ))}
</div>

<h2 className="text-danger">Vehicles</h2>
<div className="d-flex overflow-auto">
  {store.vehicles.map(vehicle => (
    <div key={vehicle.uid} className="me-3" style={{ flex: "0 0 auto" }}>
      <Card item={vehicle} type="vehicles" />
    </div>
  ))}
</div>
    </div>
  );
};

