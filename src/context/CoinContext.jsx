import React, { createContext, useState, useContext, useEffect } from "react";
import { initialTokens } from "../../data/tokens";
import {
  calculateTotalBalance,
  fetchLivePrices,
  updateTokenData,
} from "../utils/helper";

const CoinContext = createContext();

export const CoinProvider = ({ children }) => {
  const [coins, setCoins] = useState(initialTokens);
  const [balance, setBalance] = useState(0.0);
  const [toastMessage, setToastMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [openCoinSingle, setOpenCoinSingle] = useState(false);

  useEffect(() => {
    const updatePrices = async () => {
      try {
        setLoading(true);
        const coinIds = initialTokens.map((coin) => coin.id); // safer to use static list here
        const livePrices = await fetchLivePrices(coinIds);
        const updatedCoins = updateTokenData(initialTokens, livePrices);
        setCoins(updatedCoins);
        setBalance(calculateTotalBalance(updatedCoins));
        // eslint-disable-next-line
      } catch (error) {
        console.warn("Error fetching live prices");
      } finally {
        setLoading(false);
      }
    };

    updatePrices();
    // const interval = setInterval(updatePrices, 60000); // Update every 60s
    // return () => clearInterval(interval);
  }, []); // Empty dependency array to run only once on mount

  return (
    <CoinContext.Provider
      value={{
        coins,
        setCoins,
        balance,
        setBalance,
        toastMessage,
        setToastMessage,
        loading,
        setLoading,
        openCoinSingle,
        setOpenCoinSingle,
      }}
    >
      {children}
    </CoinContext.Provider>
  );
};

export const useCoinContext = () => {
  const context = useContext(CoinContext);
  if (!context) {
    throw new Error("useCoinContext must be used within a CoinProvider");
  }
  return context;
};
