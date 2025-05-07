import { useState } from "react";
import { useCoinContext } from "../context/CoinContext";
import Skeleton from "./Skeleton";
import CoinSingle from "./CoinSingle";
import { formatNumberToCurrency } from "../utils/helper";

const TokenList = ({ refreshing, onRefresh }) => {
  const { loading, coins, openCoinSingle, setOpenCoinSingle } =
    useCoinContext();

  const [startY, setStartY] = useState(0);
  const [pullDown, setPullDown] = useState(0);
  const [selectedTokenId, setSelectedTokenId] = useState(null);

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

  if (loading) return <Skeleton />;

  const handleTokenClick = (id) => {
    if (selectedTokenId !== id) {
      setSelectedTokenId(id);
      setOpenCoinSingle(true);
    } else {
      setOpenCoinSingle((prev) => !prev); // toggle it
    }
  };

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
        <div
          className="flex justify-center py-2"
          style={{ height: `${pullDown}px` }}
        >
          <div
            className="h-6 w-6 border-2 border-[#3385ff] rounded-full"
            style={{ transform: `rotate(${pullDown * 3.6}deg)` }}
          ></div>
        </div>
      )}
      <div className="px-5">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <button className="text-gray-300 border-b-2 border-green-500 font-bold py-1.5">
            Crypto
          </button>
          <button className="text-gray-300/60 font-medium py-1.5">NFTs</button>
        </div>
        {coins.map((token) => (
          <div key={token.id}>
            {/* Clickable token row */}
            <div
              className="flex flex-col py-4 border-b border-[#1e2322] cursor-pointer"
              onClick={() => handleTokenClick(token.id)}
            >
              <div className="flex items-center">
                {/* Token content remains the same */}

                <div className="relative">
                  <img
                    src={token.logo}
                    alt={token.name}
                    className="w-8 h-8 rounded-full mr-3"
                  />
                  {token.networkLogo && (
                    <img
                      src={token.networkLogo}
                      alt={token.name}
                      className="absolute h-4 w-4 rounded-full bottom-1 right-2"
                    />
                  )}
                </div>

                <div className="flex-1">
                  <div className="font-medium">{token.name}</div>
                  <div className="text-xs text-gray-400">
                    {token.amount.toLocaleString("en-US", {
                      maximumFractionDigits: 6,
                    })}{" "}
                    {token.symbol}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">
                    {formatNumberToCurrency(token.value)}
                  </div>
                  <div
                    className={`text-xs ${
                      token.change24h >= 0 ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {token.change24h >= 0 ? "+" : ""}
                    {token.change24h.toFixed(2)}%
                  </div>
                </div>
              </div>
            </div>

            {/* Render CoinSingle outside the clickable div */}
            {openCoinSingle && selectedTokenId === token.id && (
              <CoinSingle token={token} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TokenList;
