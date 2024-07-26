import React, { useEffect, useState } from 'react';
import axios from 'axios';

function KeywordList() {
  const [keywords, setKeywords] = useState([]);
  const [error, setError] = useState(''); //Initialise error state

  useEffect(() => {
    async function fetchKeywords() {
      try{
      const response = await axios.get('http://localhost:3001/keywords');
      setKeywords(response.data);
    } catch {
      setError('Failed to fetch keywords. Please try again later.');
    }
  }
    fetchKeywords();
  }, []);

  return (
    <div>
      <h1>Generated HTML Pages</h1>
      {error && <p>{error}</p>}
      <ul>
        {keywords.map(keyword => (
          <li key={keyword.keyword}>
            <a href={`http://localhost:3001/html/${keyword.keyword}.html`} target="_blank" rel="noopener noreferrer">
              {keyword.keyword}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default KeywordList;