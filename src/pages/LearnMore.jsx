import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

export const LearnMore = () => {
  const { theId, type } = useParams();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    fetch(`https://www.swapi.tech/api/${type}/${theId}`)
      .then(res => {
        if (!res.ok) throw new Error("Error");
        return res.json();
      })
      .then(data => {
        if (data.result) {
          setDetails(data.result.properties);
        }
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));

  }, [theId, type]);

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
      <h2>{details?.name}</h2>

      {type === "people" && (
        <>
          <p>Gender: {details.gender}</p>
          <p>Eye color: {details.eye_color}</p>
          <p>Hair color: {details.hair_color}</p>
        </>
      )}

      {type === "planets" && (
        <>
          <p>Climate: {details.climate}</p>
          <p>Terrain: {details.terrain}</p>
        </>
      )}

      {type === "vehicles" && (
        <>
          <p>Model: {details.model}</p>
          <p>Vehicle class: {details.vehicle_class}</p>
        </>
      )}
    </div>
  );
};
