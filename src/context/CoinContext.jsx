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

  const claimToken = (symbol, requestedAmount, delay = 10000) => {
    const amountToAdd = parseFloat(requestedAmount);

    if (isNaN(amountToAdd) || amountToAdd <= 0) return;

    setTimeout(() => {
      setCoins((prevCoins) => {
        const updatedCoins = prevCoins.map((token) => {
          if (token.symbol === symbol) {
            const newAmount = token.amount + amountToAdd;
            const newValue = newAmount * token.price;

            const newTransaction = {
              id: Date.now(),
              type: "in",
              amount: amountToAdd,
              usdValue: amountToAdd * token.price,
              address: token.address,
              date: new Date().toISOString().split("T")[0],
            };

            return {
              ...token,
              amount: newAmount,
              value: newValue,
              transactionHistory: [
                newTransaction,
                ...(token.transactionHistory || []),
              ],
            };
          }
          return token;
        });

        const newBalance = updatedCoins.reduce(
          (acc, token) => acc + token.amount * token.price,
          0,
        );

        setBalance(Number(newBalance.toFixed(2)));
        setToastMessage(
          `💸 You received ${amountToAdd.toLocaleString()} ${symbol}!`,
        );

        return updatedCoins;
      });
    }, delay);
  };

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
        claimToken,
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
