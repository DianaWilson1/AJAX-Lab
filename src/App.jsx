import { useEffect, useState } from 'react';

const App = () => {
  const [query, setQuery] = useState('');
  const [starships, setStarships] = useState([]);
  const [filteredStarships, setFilteredStarships] = useState([]);

  // Fetch all starships from SWAPI
  const fetchStarships = async () => {
    let allStarships = [];
    let url = 'https://swapi.dev/api/starships/';
    while (url) {
      const res = await fetch(url);
      const data = await res.json();
      allStarships = [...allStarships, ...data.results];
      url = data.next;
    }
    setStarships(allStarships);
    setFilteredStarships(allStarships); // ✅ Show all on load
  };

  useEffect(() => {
    fetchStarships();
  }, []);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const filtered = starships.filter((ship) =>
      ship.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredStarships(filtered);
  };

  return (
    <div style={{ padding: '20px' }}>
      <form onSubmit={handleSubmit}>
        <label htmlFor="search">Search for a Starship: </label>
        <input
          type="text"
          id="search"
          value={query}
          onChange={handleChange}
        />
        <button type="submit">Search</button>
      </form>

      <h2>Displaying {filteredStarships.length} Starships</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
        {filteredStarships.map((ship) => (
          <div
            key={ship.name}
            style={{
              border: '1px solid #ccc',
              borderRadius: '10px',
              padding: '1rem',
              backgroundColor: '#f8f8f8',
            }}
          >
            <h3>{ship.name}</h3>
            <p><strong>Class:</strong> {ship.starship_class}</p>
            <p><strong>Manufacturer:</strong> {ship.manufacturer}</p>
            <p><strong>Model:</strong> {ship.model}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
