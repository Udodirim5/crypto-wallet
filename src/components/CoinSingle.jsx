import { BsBellSlashFill } from "react-icons/bs";
import { GoArrowLeft } from "react-icons/go";
import { PiWarningCircleFill } from "react-icons/pi";
import { TiArrowDown, TiArrowUp } from "react-icons/ti";
import {
  formatNumberToCurrency,
  formatNumberToDecimal,
  getDateLabel,
} from "../utils/helper";
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

  const groupedTransactions = (token.transactionHistory ?? [])
    .sort((a, b) => new Date(b.date) - new Date(a.date)) // newest first
    .reduce((groups, tx) => {
      const label = getDateLabel(tx.date);
      if (!groups[label]) groups[label] = [];
      groups[label].push(tx);
      return groups;
    }, {});

  return (
      <div
        className="fixed top-0 bottom-0 left-0 right-0 w-[700px] m-auto bg-[#0c0f0e] border-t border-[#1e2322] pb-4 pt-2 px-4 z-50 overflow-y-auto"
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
            <div className="relative">
              <img
                src={token.logo}
                alt={token.name}
                className="h-20 w-20 rounded-full mb-4"
              />
              {token.networkLogo && (
                <img
                  src={token.networkLogo}
                  alt={token.name}
                  className="absolute h-4 w-4 rounded-full bottom-4 right-2"
                />
              )}
            </div>
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
            <Button
              icon={<LuArrowRightLeft />}
              label="Swap"
              onClick={() => {}}
            />
            <Button icon={<IoIosCard />} label="Buy" onClick={() => {}} />
            <Button icon={<AiFillBank />} label="Sell" onClick={() => {}} />
          </div>
        </div>
        {/* TRANSACTION HISTORY */}
        <div className="mt-12 w-[900px] max-w-full  m-auto">
          {token.transactionHistory && token.transactionHistory.length > 0 ? (
            <>
              <h3 className="text-lg font-medium text-white px-4 mb-4">
                Transaction History
              </h3>

              <div className="flex flex-col gap-2">
                {Object.entries(groupedTransactions).map(
                  ([label, transactions]) => (
                    <div key={label}>
                      <h3 className="text-sm text-gray-400 font-medium mb-2">
                        {label}
                      </h3>
                      <div className="flex flex-col gap-3">
                        {transactions.map(
                          ({ id, type, amount, usdValue, address }) => (
                            <TransactionCard
                              key={id}
                              type={type}
                              amount={amount}
                              symbol={token.symbol}
                              usdValue={usdValue}
                              address={address}
                            />
                          )
                        )}
                      </div>
                    </div>
                  )
                )}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 bg-[#1e2322] rounded-full flex items-center justify-center mb-4">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className="text-gray-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                  />
                </svg>
              </div>
              <p className="text-gray-400 font-medium">No transactions yet</p>
              <p className="text-gray-500 text-sm mt-1">
                Your {token.symbol} transactions will appear here
              </p>
            </div>
          )}
        </div>{" "}
        {showReceive && (
          <Receive setShowReceive={setShowReceive} token={token} />
        )}
      </div>
  );
};

export default CoinSingle;
