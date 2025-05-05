import { useState, useEffect } from 'react';

export default function useCoinDrop(initialBalance, initialTokens) {
  const [balance, setBalance] = useState(initialBalance);
  const [tokens, setTokens] = useState(initialTokens);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      // Add ETH to tokens
      setTokens(prevTokens => {
        const ethIndex = prevTokens.findIndex(t => t.symbol === 'ETH');
        if (ethIndex >= 0) {
          const newTokens = [...prevTokens];
          newTokens[ethIndex] = {
            ...newTokens[ethIndex],
            amount: newTokens[ethIndex].amount + 0.5,
            value: newTokens[ethIndex].value + (0.5 * newTokens[ethIndex].price)
          };
          return newTokens;
        }
        return prevTokens;
      });

      // Update balance
      setBalance(prevBalance => {
        const eth = initialTokens.find(t => t.symbol === 'ETH');
        const newBalance = prevBalance + (0.5 * eth.price);
        return parseFloat(newBalance.toFixed(2));
      });

      // Show toast
      setToastMessage('You received 0.5 ETH!');
      setShowToast(true);
    }, 10000); // 10 seconds delay

    return () => clearTimeout(timer);
  }, [initialTokens]);

  return { balance, tokens, showToast, toastMessage, setShowToast, setBalance, setTokens };
}