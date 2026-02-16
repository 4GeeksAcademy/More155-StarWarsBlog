import { useEffect, useState } from "react";
import { Card } from "../components/Card.jsx";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { ClipLoader } from "react-spinners"; 

// LocalStorge fixed 429() errors 

export const Home = () => {

  const { store, dispatch } = useGlobalReducer();
  const [loading, setLoading] = useState(true);

  useEffect(() => {

  const fetchPeople = async () => {
    try {
      const savedPeople = localStorage.getItem("people");

      // check if the item is already on the storage, parse JSON to turn into array
      if (savedPeople) {
        return JSON.parse(savedPeople);
      }

      const res = await fetch("https://www.swapi.tech/api/people");

      if (!res.ok) {
        console.log("People error status:", res.status);
        return [];
      }

      const data = await res.json();

      // Same slice, if it works, try to extend - promise all so ALL of it loads 

      const detailedPeople = await Promise.all(
        data.results.slice(0, 5).map(async (person) => {
          try {
            const detailRes = await fetch(person.url);

            if (!detailRes.ok) return person;

            const detailData = await detailRes.json();

            return {
              ...person,
              ...detailData.result.properties
            };

          } catch {
            return person;
          }
        })
      );

      // Set the item on storage

      localStorage.setItem("people", JSON.stringify(detailedPeople));

      return detailedPeople;

    } catch (error) {
      console.log("People fetch failed:", error);
      return [];
    }
  };

  // planets

  const fetchPlanets = async () => {
    try {
      const savedPlanets = localStorage.getItem("planets");

      if (savedPlanets) {
        return JSON.parse(savedPlanets);
      }

      const res = await fetch("https://www.swapi.tech/api/planets");

      if (!res.ok) {
        console.log("Planets error status:", res.status);
        return [];
      }

      const data = await res.json();

      const detailedPlanets = await Promise.all(
        data.results.slice(0, 5).map(async (planet) => {
          try {
            const detailRes = await fetch(planet.url);

            if (!detailRes.ok) return planet;

            const detailData = await detailRes.json();

            return {
              ...planet,
              ...detailData.result.properties
            };

          } catch {
            return planet;
          }
        })
      );

      localStorage.setItem("planets", JSON.stringify(detailedPlanets));

      return detailedPlanets;

    } catch (error) {
      console.log("Planets fetch failed:", error);
      return [];
    }
  };

  // vehicles

  const fetchVehicles = async () => {
    try {
      const savedVehicles = localStorage.getItem("vehicles");

      if (savedVehicles) {
        return JSON.parse(savedVehicles);
      }

      const res = await fetch("https://www.swapi.tech/api/vehicles");

      if (!res.ok) {
        console.log("Vehicles error status:", res.status);
        return [];
      }

      const data = await res.json();

      const detailedVehicles = await Promise.all(
        data.results.slice(0, 5).map(async (vehicle) => {
          try {
            const detailRes = await fetch(vehicle.url);

            if (!detailRes.ok) return vehicle;

            const detailData = await detailRes.json();

            return {
              ...vehicle,
              ...detailData.result.properties
            };

          } catch {
            return vehicle;
          }
        })
      );

      localStorage.setItem("vehicles", JSON.stringify(detailedVehicles));

      return detailedVehicles;

    } catch (error) {
      console.log("Vehicles fetch failed:", error);
      return [];
    }
  };

  // Separated actions for better loading and organization

  const loadData = async () => {
    setLoading(true);

    const people = await fetchPeople();
    const planets = await fetchPlanets();
    const vehicles = await fetchVehicles();

    dispatch({ type: "SET_PEOPLE", payload: people });
    dispatch({ type: "SET_PLANETS", payload: planets });
    dispatch({ type: "SET_VEHICLES", payload: vehicles });

    setLoading(false);
  };

  loadData();

}, []);


  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "60vh" }}>
        <ClipLoader
          color="#c9a227" 
          size={80}
          aria-label="Loading Spinner"
        />
      </div>
    );
  }

  return (
    <div className="container mt-4">

     <h2 className="text-danger">Characters</h2>
<div className="d-flex overflow-x-auto mb-4">
  {store.people.map(person => (
    <div key={person.uid} className="me-3" style={{ flex: "0 0 auto" }}>
      <Card item={person} type="people" />
    </div>
  ))}
</div>

<h2 className="text-danger">Planets</h2>
<div className="d-flex overflow-x-auto mb-4">
  {store.planets.map(planet => (
    <div key={planet.uid} className="me-3" style={{ flex: "0 0 auto" }}>
      <Card item={planet} type="planets" />
    </div>
  ))}
</div>

<h2 className="text-danger">Vehicles</h2>
<div className="d-flex overflow-x-auto">
  {store.vehicles.map(vehicle => (
    <div key={vehicle.uid} className="me-3" style={{ flex: "0 0 auto" }}>
      <Card item={vehicle} type="vehicles" />
    </div>
  ))}
</div>
    </div>
  );
};

