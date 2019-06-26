import React, { useState, useEffect } from "react";
import ReactMapGL from "react-map-gl";
import { Marker, Popup } from "react-map-gl";
import * as countries from "../data/war.json";

// import 'font-awesome/css/font-awesome.min.css';
// import tank from "../icon/tank.svg"

// change into class
// take out useState and change to state
// state =

//CREATE AN AXIOSWITHOUTAUTH, remove const token, remove headers

const Map = () => {
  //   console.log("Hey look at me!", countries);
  const [viewport, setViewport] = useState({
    latitude: 45,
    longitude: 45,
    width: "100vw",
    height: "100vh",
    zoom: 10
  });

  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    const warInfo = e => {
      if (e.key === "Escape") {
        setSelectedCountry(null);
      }
    };
    window.addEventListener("click", warInfo);

    return () => {
      window.removeEventListener("click", warInfo);
    };
  }, []);

  return (
    <div>
      <ReactMapGL
        {...viewport}
        // mapboxApiAccessToken={process.env.REACT_APP_MAP_TOKEN}
        mapboxApiAccessToken={
          "pk.eyJ1IjoicmVlZHRqIiwiYSI6ImNqeGM3aHR6NzAwaHUzeW52MnhlNzhhNmcifQ.Wd9r5mNmWaQAuG5vZsUIyg"
        }
        mapStyle="mapbox://styles/reedtj/cjxca3nb401eh1clrr1hry2r7"
        onViewportChange={viewport => {
          setViewport(viewport);
        }}
      >
        {countries.default.map((country, i) => {
          //   console.log("heres the lat!", country.latitude);
          if (country.latitude || country.longitude) {
            return (
              <Marker
                key={country.name}
                longitude={country.longitude}
                latitude={country.latitude}
              >
                <button className="marker-btn">
                  <img className="img-btn" src="../icon/tank.svg" alt="tank" />
                </button>
              </Marker>
            );
          }
          //   else {

          //     console.log(`bad coordinates at ${i}`);
          //   }
        })}
        {selectedCountry ? (
          <Popup
            latitude={selectedCountry.latitude}
            longitude={selectedCountry.longitude}
            onClose={() => {
              selectedCountry(null);
            }}
          >
            <div>
              <h1>hello</h1>
            </div>
          </Popup>
        ) : null}
      </ReactMapGL>
    </div>
  );
};

export default Map;
