import { useState } from "react";
import "./App.css";
import { Header } from "./components/Header";
import CurrencySelector from "./components/CurrencySelector";

function App() {
  const [exchangeRate, setExchangeRate] = useState();
  const [baseCurrency, setBaseCurrency] = useState("EUR");
  const [targetCurrency, setTargetCurrency] = useState("USD");
  const [amount, setAmount] = useState("");
  const [resultVisible, setResultVisible] = useState(false);

  const handleBaseCurrencyChange = (currency) => {
    setBaseCurrency(currency);
  };

  const handleTargetCurrencyChange = (currency) => {
    setTargetCurrency(currency);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const fetchExchangeRate = async () => {
    const response = await fetch(
      `https://api.currencyapi.com/v3/latest?apikey=cur_live_sNvG6JcfHm42dacE5OWs8SExFUaTmC38C1bAxZnf&currencies=${targetCurrency}&base_currency=${baseCurrency}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch exchange rate");
    }
    const data = await response.json();
    setExchangeRate(data.data[targetCurrency].value);
    setResultVisible(true);
    return data.data[targetCurrency].value;
  };

  const swapCurrencies = () => {
    // Échanger les valeurs de baseCurrency et targetCurrency
    const temp = baseCurrency;
    setBaseCurrency(targetCurrency);
    setTargetCurrency(temp);
  };

  return (
    <>
      <Header />
      <main>
        <div className="container">
          <div className="currency-container">
            <label>
              Amount
              <div className="amount-inputs">
                <input
                  type="number"
                  placeholder="Amount"
                  className="currency-amount"
                  value={amount}
                  onChange={handleAmountChange}
                />
              </div>
            </label>
            <label htmlFor="">
              From
              <CurrencySelector
                onSelectBaseCurrency={handleBaseCurrencyChange}
              />
            </label>
          </div>
          <button onClick={swapCurrencies}>⇆</button>
          <div>
            To
            <CurrencySelector onSelectCurrencies={handleTargetCurrencyChange} />
          </div>
        </div>
        <button onClick={fetchExchangeRate} className="convert-button">
          Convert
        </button>
        {resultVisible && (
          <p className="result">
            {isNaN(Math.round(amount * exchangeRate * 100) / 100)
              ? ""
              : Math.round(amount * exchangeRate * 100) / 100}{" "}
            {targetCurrency}
          </p>
        )}
      </main>
    </>
  );
}

export default App;
