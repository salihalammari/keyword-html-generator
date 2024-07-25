import React, { useEffect, useState } from 'react';
import axios from 'axios';

function KeywordList() {
  const [keywords, setKeywords] = useState([]);

  useEffect(() => {
    async function fetchKeywords() {
      const response = await axios.get('http://localhost:3001/keywords');
      setKeywords(response.data);
    }
    fetchKeywords();
  }, []);

  return (
    <div>
      <h1>Generated HTML Pages</h1>
      <ul>
        {keywords.map(keyword => (
          <li key={keyword._id}>
            <a href={`http://localhost:3001/keywords/${keyword._id}`} target="_blank" rel="noopener noreferrer">
              {keyword.keyword}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default KeywordList;