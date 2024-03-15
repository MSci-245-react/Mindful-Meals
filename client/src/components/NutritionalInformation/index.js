import React, { useEffect, useState } from 'react';
import './NutritionalInformationTable.css';

const serverURL = '';

const NutritionalInformationTable = () => {
  const [nutritionalData, setNutritionalData] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // State to keep track of the search term

  useEffect(() => {
    getNutritionalData(); // Fetch nutritional data on component mount
  }, []);

  const getNutritionalData = () => {
    callApiGetNutritionalInformation()
      .then(res => {
        const parsed = JSON.parse(res.express);
        setNutritionalData(parsed);
      })
      .catch(error => console.error('Fetching error: ', error));
  };

  const callApiGetNutritionalInformation = async () => {
    const url = `${serverURL}/api/getNutritionalInfo`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) throw Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  };

  // Filter the data based on the search term
  const filteredNutritionalData = searchTerm
    ? nutritionalData.filter(item =>
        item.Shrt_Desc.toLowerCase().includes(searchTerm.toLowerCase()))
    : nutritionalData;

  return (
    <>
      <div className="search-container">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search ingredients..."
          className="search-input"
        />
      </div>
      <table>
        <thead>
          <tr>
            <th className="name-column">Name</th>
            <th>Protein (g)</th>
            <th>Carbohydrates (g)</th>
            <th>Water (g)</th>
            <th>Energy (kcal)</th>
            <th>Total Fat (g)</th>
            <th>Ash (g)</th>
            <th>Fiber (g)</th>
            <th>Total Sugar (g)</th>
            <th>Calcium (mg)</th>
            <th>Iron (mg)</th>
            <th>Vitamin C (mg)</th>
          </tr>
        </thead>
        <tbody>   
          {filteredNutritionalData.map((item, index) => (
            <tr key={index}>
              <td className="name-column">{item.Shrt_Desc}</td> 
              <td>{item['Protein_(g)']}</td>
              <td>{item['Carbohydrt_(g)']}</td>
              <td>{item['Water_(g)']}</td>
              <td>{item['Energ_Kcal']}</td>
              <td>{item['Lipid_Tot_(g)']}</td>
              <td>{item['Ash_(g)']}</td>
              <td>{item['Fiber_TD_(g)']}</td> 
              <td>{item['Sugar_Tot_(g)']}</td> 
              <td>{item['Calcium_(mg)']}</td> 
              <td>{item['Iron_(mg)']}</td> 
              <td>{item['Vit_C_(mg)']}</td> 
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default NutritionalInformationTable; 