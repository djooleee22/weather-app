import React, { useEffect, useState } from "react";
import "./Popular.scss";

const Popular: React.FC = () => {
  const [popularCities, setPopularCities] = useState([]);
  //   useEffect(() => {
  //     Promise.all([
  //       fetch(
  //         "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/london?unitGroup=metric&include=current&key=UXMVW67DY9BWJ9TT7NTQJABPV&contentType=json"
  //       ),
  //       fetch(
  //         "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/new%20york?unitGroup=metric&include=current&key=UXMVW67DY9BWJ9TT7NTQJABPV&contentType=json"
  //       ),
  //       fetch(
  //         "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/moscow?unitGroup=metric&include=current&key=UXMVW67DY9BWJ9TT7NTQJABPV&contentType=json"
  //       ),
  //       fetch(
  //         "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/madrid?unitGroup=metric&include=current&key=UXMVW67DY9BWJ9TT7NTQJABPV&contentType=json"
  //       ),
  //     ])
  //       .then(([resLondon, resNewYork, resMoscow, resMadrid]) => {
  //         Promise.all([
  //           resLondon.json(),
  //           resNewYork.json(),
  //           resMoscow.json(),
  //           resMadrid.json(),
  //         ]);
  //       })
  //       .then(([dataLondon, dataNewYork, dataMoscow, dataMadrid]) => {
  //         // setPopularCities([dataLondon, dataNewYork, dataMoscow, dataMadrid]);
  //         setPopularCities(dataLondon);
  //       });
  //   }, []);
  return <div id="popular">popular</div>;
};

export default Popular;
