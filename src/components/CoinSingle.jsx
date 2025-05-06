import { BsBellSlashFill } from "react-icons/bs";
import { GoArrowLeft } from "react-icons/go";
import { PiWarningCircleFill } from "react-icons/pi";
import { TiArrowDown, TiArrowUp } from "react-icons/ti";
import { formatNumberToCurrency, formatNumberToDecimal } from "../utils/helper";
import { LuArrowRightLeft } from "react-icons/lu";
import { IoIosCard } from "react-icons/io";
import { AiFillBank } from "react-icons/ai";
import { useCoinContext } from "../context/CoinContext";
import { useEffect, useState } from "react";
import Receive from "./Receive";
import Button from "./Button";
import TransactionCard from "./TransactionCard";

const CoinSingle = ({ token }) => {
  const { setOpenCoinSingle } = useCoinContext();
  const [showReceive, setShowReceive] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);

  const handleClose = (e) => {
    e.stopPropagation(); // Prevent event from bubbling up
    setOpenCoinSingle(false);
    setShowReceive(false);
  };

  return (
    <div
      className="fixed top-0 bottom-0 left-0 right-0 bg-[#0c0f0e] border-t border-[#1e2322] pb-4 pt-2 px-4 z-50 overflow-y-auto"
      onClick={(e) => e.stopPropagation()}
    >
      {/* HEADER */}
      <div className="sticky top-0 flex justify-between items-center py-4 px-6 bg-[#0c0f0e] z-10">
        <Button
          icon={<GoArrowLeft className="text-lg" />}
          onClick={handleClose}
        />

        <div className="flex flex-col text-center">
          <h2 className="text-lg font-medium">{token.symbol}</h2>
          <div className="text-gray-400 font-light text-sm">
            <span>COIN</span>
            {" | "}
            <span>{token.name}</span>
          </div>
        </div>

        <div className="flex gap-3">
          <BsBellSlashFill className="h-5 w-5 text-gray-400 hover:text-white transition-colors" />
          <PiWarningCircleFill className="h-5 w-5 text-gray-400 hover:text-white transition-colors" />
        </div>
      </div>
      {/* COIN CONTENT */}
      <div className="flex flex-col gap-8 justify-center items-center mt-8 px-2">
        <div className="flex flex-col items-center mb-4">
          <img
            src={token.logo}
            alt={token.name}
            className="h-20 w-20 rounded-full mb-4"
          />
          <h1 className="text-2xl font-medium">
            {formatNumberToDecimal(token.amount, 0)} {token.symbol}
          </h1>
          <h4 className="text-gray-400">
            {formatNumberToCurrency(token.value)}
          </h4>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex gap-3 w-full max-w-md justify-center flex-wrap">
          <Button icon={<TiArrowUp />} label="Send" onClick={() => {}} />
          <Button
            icon={<TiArrowDown />}
            label="Receive"
            onClick={() => setShowReceive(true)}
          />
          <Button icon={<LuArrowRightLeft />} label="Swap" onClick={() => {}} />
          <Button icon={<IoIosCard />} label="Buy" onClick={() => {}} />
          <Button icon={<AiFillBank />} label="Sell" onClick={() => {}} />
        </div>
      </div>
      <div className="flex flex-col gap-4 mt-8 px-2">
        <TransactionCard
          type="in" // or "out"
          amount="0.123456"
          symbol="ETH"
          usdValue="200.00"
          address="0x1234567890abcdef1234567890abcdef12345678"
          date="Today"
        />
      </div>
      
      {showReceive && <Receive setShowReceive={setShowReceive} token={token} />}
    </div>
  );
};

export default CoinSingle;
