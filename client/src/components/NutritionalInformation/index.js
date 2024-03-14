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

  // Function to handle the search on click of the search button
  const handleSearch = () => {
    // Set the nameFilter to the searchTerm to filter the results
    setNameFilter(searchTerm);
  };

  // Filter the data based on the search term
  const filteredNutritionalData = nutritionalData.filter(item => 
    item.Shrt_Desc.toLowerCase().includes(nameFilter.toLowerCase())
  );

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
        <button onClick={handleSearch} className="search-button">
          Search
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Protein (g)</th>
            <th>Carbohydrates (g)</th>
            <th>Water (g)</th>
            <th>Energ_Kcal</th>
            <th>Lipid_Tot</th>
            <th>Ash</th>

          </tr>
        </thead>
        <tbody>
          {filteredNutritionalData.map((item, index) => (
            <tr key={index}>
              <td>{item.Shrt_Desc}</td>
              <td>{item['Protein_(g)']}</td>
              <td>{item['Carbohydrt_(g)']}</td>
              <td>{item['Water_(g)']}</td> 
              <td>{item['Energ_Kcal']}</td>
              <td>{item['Lipid_Tot_']}</td> 
              <td>{item['Ash_(g)']}</td>

            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default NutritionalInformationTable; 