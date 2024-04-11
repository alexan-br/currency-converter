import { useState } from "react";
import "./App.css";
import { Header } from "./components/Header";
import CurrencySelector from "./components/CurrencySelector";

function App() {
  const [exchangeRate, setExchangeRate] = useState();
  const [baseCurrency, setBaseCurrency] = useState("EUR");
  const [targetCurrency, setTargetCurrency] = useState("USD");
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState(null);

  const handleBaseCurrencyChange = (currency) => {
    setBaseCurrency(currency);
  };

  const handleTargetCurrencyChange = (currency) => {
    setTargetCurrency(currency);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  let exchangRateResult = 0;

  const fetchExchangeRate = async () => {
    const response = await fetch(
      `https://api.currencyapi.com/v3/latest?apikey=cur_live_sNvG6JcfHm42dacE5OWs8SExFUaTmC38C1bAxZnf&currencies=${targetCurrency}&base_currency=${baseCurrency}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch exchange rate");
    }
    const data = await response.json();
    console.log(data.data[targetCurrency].value);
    setExchangeRate(data.data[targetCurrency].value);
    return data.data[targetCurrency].value;
  };

  return (
    <>
      <Header />
      <main>
        <div className="currency-container">
          <label>
            Amount to convert
            <div className="amount-inputs">
              <input
                type="number"
                placeholder="Amount"
                className="currency-amount"
                value={amount}
                onChange={handleAmountChange}
              />
              <CurrencySelector
                onSelectBaseCurrency={handleBaseCurrencyChange}
              />
            </div>
          </label>
        </div>
        <div>
          <CurrencySelector onSelectCurrencies={handleTargetCurrencyChange} />
        </div>
        <button onClick={(exchangRateResult = fetchExchangeRate)}>
          Convert
        </button>
        <p>
          {isNaN(Math.round(amount * exchangeRate * 100) / 100)
            ? ""
            : Math.round(amount * exchangeRate * 100) / 100}
        </p>
      </main>
    </>
  );
}

export default App;
