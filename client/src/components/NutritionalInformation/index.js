import React, { useEffect, useState } from 'react';
import './NutritionalInformationTable.css';

const serverURL = ''; 

const NutritionalInformationTable = () => {
  const [nutritionalData, setNutritionalData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Display 10 rows per page

  useEffect(() => {
    getNutritionalData();
  }, []);

  const getNutritionalData = async () => {
    try {
      const response = await callApiGetNutritionalInformation();
      const parsed = JSON.parse(response.express);
      setNutritionalData(parsed);
    } catch (error) {
      console.error('Fetching error: ', error);
    }
  };

  const callApiGetNutritionalInformation = async () => {
    const url = `${serverURL}/api/getNutritionalInfo`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  };

  const filteredNutritionalData = nutritionalData.filter(item =>
    item.Shrt_Desc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate the rows to display based on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredNutritionalData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredNutritionalData.length / itemsPerPage);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to the first page when search term changes
  };

  // Function to change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="search-container">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
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
          {currentItems.map((item, index) => (
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
      <div className="pagination">
        <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </>
  );
};

export default NutritionalInformationTable;