import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [myUsd, setMyUsd] = useState(0);

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);

  function onChange(event) {
    setMyUsd(event.target.value);
  }

  return (
    <div className="container">
      <h1>Crypto Exchange ({coins.length})</h1>
      {loading ? <strong>Loading...</strong> : null}

      <input
        onChange={onChange}
        value={myUsd}
        type="number"
        placeholder="Enter USD Amount"
      />
      <select>
        {coins.map((coin) => (
          <option key={coin.id}>
            {coin.name} ({coin.symbol}) :{" "}
            {(myUsd / coin.quotes.USD.price).toFixed(4)} {coin.symbol}
          </option>
        ))}
      </select>

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Coin</th>
              <th>Price (USD)</th>
              <th>Your Amount</th>
            </tr>
          </thead>
          <tbody>
            {coins.map((coin) => (
              <tr key={coin.id}>
                <td>
                  {coin.name} ({coin.symbol})
                </td>
                <td>${coin.quotes.USD.price.toFixed(2)}</td>
                <td
                  className={
                    myUsd / coin.quotes.USD.price > 0 ? "positive" : "negative"
                  }
                >
                  {(myUsd / coin.quotes.USD.price).toFixed(4)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
