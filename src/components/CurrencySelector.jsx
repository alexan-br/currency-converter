import { useState, useEffect, useRef } from "react";
import styles from "./CurrencySelector.module.css";
import currenciesData from "../currencies.json"; // Path to your JSON file

const CurrencySelector = ({ onSelectBaseCurrency, onSelectCurrencies }) => {
  const [currencies, setCurrency] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const node = useRef(); // Ref to the component's root element

  useEffect(() => {
    const codes = Object.keys(currenciesData);
    setCurrency(codes);

    // Add event listener to handle clicks outside the component
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup function to remove the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    // Close the dropdown if the click occurred outside the component
    if (node.current && !node.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSelectCode = (code) => {
    if (onSelectBaseCurrency) {
      onSelectBaseCurrency(code);
    } else if (onSelectCurrencies) {
      onSelectCurrencies(code);
    }
    setSearchQuery(code);
    setShowDropdown(false);
  };

  const filteredCurrencyCodes = currencies.filter((code) =>
    code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFocus = () => {
    setShowDropdown(true);
  };

  return (
    <div className={styles.searchContainer} ref={node}>
      <input
        type="text"
        placeholder="Code"
        value={searchQuery}
        onChange={handleSearch}
        className={styles.searchbox}
        onFocus={handleFocus}
      />
      {showDropdown && (
        <ul className={styles.dropdown}>
          {filteredCurrencyCodes.map((code, index) => (
            <li key={index} onClick={() => handleSelectCode(code)}>
              {code}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CurrencySelector;
