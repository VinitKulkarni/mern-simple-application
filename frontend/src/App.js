import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [name, setName] = useState('');
  const [names, setNames] = useState([]);

  const handleSubmit = async () => {
    await axios.post('http://backend:5000/add-name', { name });
    fetchNames();
  };

  const fetchNames = async () => {
    const response = await axios.get('http://backend:5000/names');
    setNames(response.data);
  };

  useEffect(() => {
    fetchNames();
  }, []);

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter name"
      />
      <button onClick={handleSubmit}>Add Name</button>
      <ul>
        {names.map((name, index) => (
          <li key={index}>{name.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
