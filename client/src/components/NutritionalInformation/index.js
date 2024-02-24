import React, {useEffect, useState} from 'react';

function NutritionalInformation() {
  const [nutritionalInfo, setNutritionalInfo] = useState([]);

  useEffect(() => {
    // Fetch nutritional information from your API
    fetch('/api/getNutritionalInfo')
      .then(response => response.json())
      .then(data => {
        // Assuming the backend sends the data directly without a nested structure
        setNutritionalInfo(data);
      })
      .catch(error => console.error('There was an error!', error));
  }, []);

  return (
    <div>
      <h1>Nutritional Information</h1>
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
          </tr>
        </thead>
        <tbody>
          {nutritionalInfo.map((item, index) => (
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default NutritionalInformation;
