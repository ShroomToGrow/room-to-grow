/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';

const PlantList = (props) => {
  const [plantList, setPlantList] = useState(null);

  const { family } = props;
  const { gState } = props;
  const { setPlant } = props;

  useEffect(
    () => {
      if (gState.name === null || family === null) return;
      // console.log('fetching plant list', gState.name);
      fetch(`/location/${gState.slug}/${family}`)
        .then((response) => response.json())
        .then((data) => {
          console.log('fetched list of plants:', data);
          console.log(typeof data);
          // const list = data.plants.map((plant) => plant.common_name);
          setPlantList(data.plants);
          setPlantDetails(null);
        })
        .catch((err) => console.log('oops', err));
    },
    [family],

    // FOR TESTING W/O BACKEND ONLY
    // () => setPlantList(['rose', 'grass', 'amarillys']),
    // [family]
  );

  if (family === null || plantList === null) return (<div />);

  return (
    <ul id="plantList">
      {plantList.map((plant, index) => (
        <li key={index}>
          <img src={plant.image_url} width="40px" height="40px" />
          <button className="list-buttons" onClick={() => setPlant(plant)}>
            {plant.common_name}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default PlantList;
