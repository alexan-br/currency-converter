import { useState, useEffect } from 'react';
import styles from './CurrencySelector.module.css';
import currenciesData from '../currencies.json'; // Path to your JSON file

const CurrencySelector = () => {
  const [currencies, setCurrency] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const codes= Object.keys(currenciesData);
    setCurrency(codes);
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };
  const handleSelectCode = (code) => {
    setSearchQuery(code); // Set search query to the selected code
  };
  const filteredCurrencyCodes = currencies.filter(code =>
    code.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        placeholder="Search Currency Code"
        value={searchQuery}
        onChange={handleSearch}
        className={styles.searchbox}
      />
      <ul className={styles.dropdown}>
        {filteredCurrencyCodes.map((code, index) => (
          <li key={index} onClick={() => handleSelectCode(code)}>{code}</li>
        ))}
      </ul>
    </div>
  );
};
export default CurrencySelector;