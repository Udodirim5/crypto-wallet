import { useEffect, useState } from 'react';
import { useCoinContext } from '../context/CoinContext';

const amountToAdd = 100000; // Amount of Token to add
const delay = 10000; // Delay in milliseconds (10 seconds)
const tokenSymbol = 'USDT'; // Token symbol to check

const CoinDropHandler = () => {
  const { coins, setCoins, setBalance, setToastMessage } = useCoinContext();
  const [hasDropped, setHasDropped] = useState(false);

  useEffect(() => {
    if (hasDropped) return;

    const timer = setTimeout(() => {
      const token = coins.find(t => t.symbol === tokenSymbol);
      if (!token) return;

      const updatedCoins = coins.map(token => {
        if (token.symbol === tokenSymbol) {
          const newAmount = token.amount + amountToAdd;
          const newValue = newAmount * token.price;
          return { ...token, amount: newAmount, value: newValue };
        }
        return token;
      });

      setCoins(updatedCoins);

      // Update total balance
      const newBalance = updatedCoins.reduce((acc, token) => acc + (token.amount * token.price), 0);
      setBalance(parseFloat(newBalance.toFixed(2)));

      // Trigger toast
      setToastMessage(`You received ${amountToAdd} ${tokenSymbol}!`);
      setHasDropped(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [hasDropped, coins, setCoins, setBalance, setToastMessage]);

  return null;
};

export default CoinDropHandler;
