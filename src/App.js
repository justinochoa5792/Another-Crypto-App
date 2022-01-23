import "./App.css";
import { useEffect, useState } from "react";
import Axios from "axios";
import Coin from "./components/Coin.jsx";

function App() {
  const [coins, setCoins] = useState([]);
  const [word, setWord] = useState("");

  const getCrypto = async () => {
    const response = await Axios.get(
      "https://api.coinstats.app/public/v1/coins?skip=0"
    );
    setCoins(response.data.coins);
  };

  useEffect(() => {
    getCrypto();
  }, []);

  const filteredCoins = coins.filter((coin) => {
    return coin.name.toLowerCase().includes(word.toLowerCase());
  });

  return (
    <div className="App">
      <div className="cryptoHeader">
        <input
          type="text"
          placeholder="Bitcoin..."
          onChange={(e) => {
            setWord(e.target.value);
          }}
        />
      </div>
      <div className="cryptoDisplay">
        {filteredCoins.map((crypto) => {
          return (
            <Coin
              name={crypto.name}
              icon={crypto.icon}
              price={crypto.price}
              symbol={crypto.symbol}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
