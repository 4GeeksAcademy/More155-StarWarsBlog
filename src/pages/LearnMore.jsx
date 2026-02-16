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

  // Let's add !details cuz adding more details gets me back on 429 error

  if (loading || !details) {
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
    <div className=" learnmore container-fluid min-vh-100 d-flex flex-column justify-content-center">

     <div className="row align-items-center">

      <div className="col-md-6 text-center">
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRo4A6qQr5trO4EHuf09QVZ6ZYLKMfiG0XfQ&s"
        className="card-img-view"
        alt="placeholder"
      />
      </div>

     <div className="col-md-6 text-center">
      <h2>{details?.name}</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati ipsum ab explicabo autem? Maiores eum necessitatibus debitis nemo nam reiciendis quam quasi neque. Aut maxime accusamus impedit excepturi consectetur. Maxime suscipit itaque tempora maiores natus, id rerum asperiores facere iusto labore. Ipsam nisi, expedita delectus soluta voluptatibus dolorem quasi repellat ipsa quia, provident tenetur exercitationem, quibusdam nemo omnis reiciendis ratione.
      </p>
      </div>

      </div>

      <hr className="border border-danger border-2 opacity-100 my-6" />

     <div className=" row text-danger text-center details-row">

      {type === "people" && (
          <>
          <div className="col-md-2"><strong>Gender</strong><br />{details.gender}</div>
          <div className="col-md-2"><strong>Eye Color</strong><br />{details.eye_color}</div>
          <div className="col-md-2"><strong>Hair Color</strong><br />{details.hair_color}</div>
          <div className="col-md-2"><strong>Birth Year</strong><br />{details.birth_year}</div>
          <div className="col-md-2"><strong>Height</strong><br />{details.height}</div>
          <div className="col-md-2"><strong>Mass</strong><br />{details.mass}</div>
         </>
      )}

         {type === "planets" && (
        <>
          <div className="col-md-2"><strong>Climate</strong><br />{details.climate}</div>
          <div className="col-md-2"><strong>Terrain</strong><br />{details.terrain}</div>
          <div className="col-md-2"><strong>Population</strong><br />{details.population}</div>
          <div className="col-md-2"><strong>Diameter</strong><br />{details.diameter}</div>
          <div className="col-md-2"><strong>Gravity</strong><br />{details.gravity}</div>
          <div className="col-md-2"><strong>Population</strong><br />{details.population}</div>
        </>
      )}

      {type === "vehicles" && (
        <>
          <div className="col-md-2"><strong>Model</strong><br />{details.model}</div>
          <div className="col-md-2"><strong>Vehicle class</strong><br />{details.vehicle_class}</div>
          <div className="col-md-2"><strong>Manufacturer</strong><br />{details.manufacturer}</div>
          <div className="col-md-2"><strong>Cost</strong><br />{details.cost_in_credits}</div>
          <div className="col-md-2"><strong>Crew</strong><br />{details.crew}</div>
          <div className="col-md-2"><strong>Length</strong><br />{details.length}</div>
        </>
      )}

      {/* 
      {type === "planets" && (
        <>
          <div className="col-md-3"><strong>Climate</strong><br />{details.climate}</div>
          <div className="col-md-3"><strong>Terrain</strong><br />{details.terrain}</div>
          <div className="col-md-3"><strong>Population</strong><br />{details.population}</div>
          <div className="col-md-3"><strong>Diameter</strong><br />{details.diameter}</div>
          <hr className="my-2" />
          <div className="col-md-3"><strong>Gravity</strong><br />{details.gravity}</div>
          <div className="col-md-3"><strong>Orbital period</strong><br />{details.orbital_period}</div>
          <div className="col-md-3"><strong>Population</strong><br />{details.population}</div>
          <div className="col-md-3 I"><strong>Surface water</strong><br />{details.surface_water}</div>
        </>
      )}

      {type === "vehicles" && (
        <>
          <div className="col-md-3"><strong>Model</strong><br />{details.model}</div>
          <div className="col-md-3"><strong>Vehicle class</strong><br />{details.vehicle_class}</div>
          <div className="col-md-3"><strong>Manufacturer</strong><br />{details.manufacturer}</div>
          <div className="col-md-3"><strong>Cost</strong><br />{details.cost_in_credits}</div>
          <hr className="my-2" />
          <div className="col-md-3"><strong>Cargo capacity</strong><br />{details.cargo_capacity}</div>
          <div className="col-md-3"><strong>Consumables</strong><br />{details.consumables}</div>
          <div className="col-md-3"><strong>Crew</strong><br />{details.crew}</div>
          <div className="col-md-3"><strong>Length</strong><br />{details.length}</div>
          <hr className="my-2" />
          <div className="col-md-3"><strong>Max atmosphering speed</strong><br />{details.max_atmosphering_speed}</div>
          <div className="col-md-3"><strong>Passengers</strong><br />{details.passengers}</div>
        </>
      )}
        */}
    </div>

    </div>
  );
};


