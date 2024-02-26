import React, {useEffect, useState} from 'react';
import './NutritionalInformationTable.css';

const NutritionalInformationTable = () => {
  const [nutritionalData, setNutritionalData] = useState([]);

  useEffect(() => {
    fetch('/api/getNutritionalInfo') // Update this to match your correct backend endpoint
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setNutritionalData(data))
      .catch(error => {
        console.error(
          'There has been a problem with your fetch operation:',
          error,
        );
      });
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Calories</th>
          <th>Fat Content</th>
          <th>Saturated Fat</th>
          <th>Cholesterol</th>
          <th>Sodium</th>
          <th>Carbohydrates</th>
          <th>Fiber</th>
          <th>Sugar</th>
          <th>Protein</th>
          {/* Add more headers as needed */}
        </tr>
      </thead>
      <tbody>
        {nutritionalData.map((item, index) => (
          <tr key={index}>
            <td>{item.Name}</td>
            <td>{item.Calories}</td>
            <td>{item.FatContent}</td>
            <td>{item.SaturatedFatContent}</td>
            <td>{item.CholesterolContent}</td>
            <td>{item.SodiumContent}</td>
            <td>{item.CarbohydrateContent}</td>
            <td>{item.FiberContent}</td>
            <td>{item.SugarContent}</td>
            <td>{item.ProteinContent}</td>
            {/* Render more data as needed */}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default NutritionalInformationTable;
