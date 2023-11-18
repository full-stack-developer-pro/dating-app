// CitySelect.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataService from '../services/data.service';

const CitySelect = () => {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
useEffect(() => {
    const getCity = async () => {
        await DataService.getCities().then((data) => {
            setCities(data.data.geonames);
        });
      };
      getCity();
},[])
//   useEffect(() => {
//     const fetchCities = async () => {
//       try {
//         const response = await axios.get(
//           'http://api.geonames.org/searchJSON',
//           {
//             params: {
//               country: 'GB', // Country code for the United Kingdom
//               featureClass: 'P', // Cities and towns
//               username: 'ingenioushitech2580', // Replace with your GeoNames username
//             },
//           }
//         );

//         setCities(response.data.geonames);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching cities:', error);
//         setLoading(false);
//       }
//     };

//     fetchCities();
//   }, []);

//   if (loading) {
//     return <p>Loading...</p>;
//   }

  return (
    <div>
      <label>Select a city or town:</label>
      <select>
        {cities.map((city) => (
          <option key={city.geonameId} value={city.name}>
            {city.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CitySelect;
