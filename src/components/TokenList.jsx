import { useState } from 'react';
import { useCoinContext } from '../context/CoinContext';
import Skeleton from './Skeleton';

export default function TokenList({ refreshing, onRefresh }) {
  const { loading, coins } = useCoinContext();

  const [startY, setStartY] = useState(0);
  const [pullDown, setPullDown] = useState(0);
  
  const handleTouchStart = (e) => {
    setStartY(e.touches[0].clientY);
  };
  
  const handleTouchMove = (e) => {
    const y = e.touches[0].clientY;
    const diff = y - startY;
    if (diff > 0 && window.scrollY === 0) {
      setPullDown(Math.min(diff, 100));
    }
  };
  
  const handleTouchEnd = () => {
    if (pullDown > 50) {
      onRefresh();
    }
    setPullDown(0);
  };
  
  if (loading)  return <Skeleton />;
  
  return (
    <div 
      className="pb-20"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {refreshing && (
        <div className="flex justify-center py-2">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#3385ff]"></div>
        </div>
      )}
      {pullDown > 0 && !refreshing && (
        <div className="flex justify-center py-2" style={{ height: `${pullDown}px` }}>
          <div 
            className="h-6 w-6 border-2 border-[#3385ff] rounded-full" 
            style={{ transform: `rotate(${pullDown * 3.6}deg)` }}
          ></div>
        </div>
      )}
      <div className="px-5">
        <div className="text-sm text-gray-400 mb-2">Tokens</div>
        {coins.map((token) => (
          <div key={token.id} className="flex items-center py-4 border-b border-[#1e2322]">
            <img src={token.logo} alt={token.name} className="w-8 h-8 rounded-full mr-3" />
            <div className="flex-1">
              <div className="font-medium">{token.name}</div>
              <div className="text-xs text-gray-400">{token.amount.toLocaleString('en-US', { maximumFractionDigits: 6 })} {token.symbol}</div>
            </div>
            <div className="text-right">
              <div className="font-medium">${token.value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
              <div className={`text-xs ${token.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {token.change24h >= 0 ? '+' : ''}{token.change24h.toFixed(2)}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}