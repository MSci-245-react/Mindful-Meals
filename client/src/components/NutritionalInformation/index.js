import React, {useEffect, useState} from 'react';
import './NutritionalInformationTable.css';

const serverURL = '';

const NutritionalInformationTable = () => {
  const [nutritionalData, setNutritionalData] = useState([]);

  useEffect(() => {
    getNutritionalData(); // Fetch nutritional data on component mount
  }, []);

  const getNutritionalData = () => {
    callApiGetNutritionalInformation()
      .then(res => {
        console.log('callApiGetNutritionalInformation returned: ', res);
        // Assuming `res.express` is the correct path; adjust according to your actual response structure
        const parsed = JSON.parse(res.express);
        console.log('callApiGetNutritionalInformation parsed: ', parsed);
        setNutritionalData(parsed);
      })
      .catch(error => console.error('Fetching error: ', error));
  };

  const callApiGetNutritionalInformation = async () => {
    const url = `${serverURL}/api/getNutritionalInfo`; // Corrected template literal syntax
    console.log(url);
    const response = await fetch(url, {
      method: 'POST', // Make sure 'POST' is the correct method; otherwise, use 'GET' if you're retrieving data
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) throw Error(`HTTP error! status: ${response.status}`); // Corrected template literal syntax
    return await response.json();
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Protein (g)</th>
          <th>Carbohydrates (g)</th>
        </tr>
      </thead>
      <tbody>
        {nutritionalData.map((item, index) => (
          <tr key={index}>
            <td>{item.Shrt_Desc}</td>
            <td>{item['Protein_(g)']}</td>
            <td>{item['Carbohydrt_(g)']}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default NutritionalInformationTable;
