import { useState, useRef, useEffect } from "react";
import { GoArrowLeft } from "react-icons/go";
import {
  PiCopySimpleThin,
  PiHashFill,
  PiWarningCircleFill,
} from "react-icons/pi";
import Button from "./Button";
import { IoShareSocialSharp } from "react-icons/io5";
import { TiArrowDown } from "react-icons/ti";
import { QRCode } from "react-qrcode-logo";
import { useCoinContext } from "../context/CoinContext";

// SetAmountModal Component
const SetAmountModal = ({ isOpen, onClose, token, address }) => {
  const { claimToken } = useCoinContext();
    const [reqAmount, setReqAmount] = useState("");
  
  const modalRef = useRef();

    const copyAddress = () => {
    navigator.clipboard.writeText(token.address);
    // You might want to add a toast notification here
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#00000070] bg-opacity-70 flex items-center justify-center z-[5000] p-4">
      <div
        ref={modalRef}
        className="bg-[#1e2322] rounded-2xl w-full max-w-md overflow-hidden"
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center p-4 border-b border-[#2a302e]">
          <h3 className="text-lg font-semibold text-white">Request Amount</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-xl"
          >
            ×
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Amount in {token.symbol}
            </label>
            <div className="relative">
              <input
                type="number"
                value={reqAmount}
                onChange={(e) => setReqAmount(e.target.value)}
                placeholder="0.0"
                className="w-full bg-[#0c0f0e] border border-[#2a302e] rounded-xl py-3 px-4 text-white text-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <div className="absolute right-3 top-3">
                <span className="text-white">{token.symbol}</span>
              </div>
            </div>
          </div>

          <div className="bg-[#0c0f0e] p-4 rounded-xl mb-4">
            <p className="text-xs text-gray-400 text-center break-all">
              {address}
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="flex-1 py-3 bg-[#0c0f0e] text-white rounded-xl font-medium hover:bg-[#141817] transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                // Handle the set amount functionality
                onClose();
                copyAddress();
                claimToken("USDT", reqAmount, 60000)
              }}
              className="flex-1 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Receive = ({ setShowReceive, token }) => {
  const [showSetAmountModal, setShowSetAmountModal] = useState(false);
  const copyAddress = () => {
    navigator.clipboard.writeText(token.address);
    // You might want to add a toast notification here
  };

  const handleClose = (e) => {
    e.stopPropagation(); // Prevent event from bubbling up
    setShowReceive(false);
  };

  return (
    <>
      <div
        className="fixed inset-0 h-screen w-full max-w-[700px] m-auto bg-[#0c0f0e] border-t border-[#1e2322] pb-4 pt-2 px-4 z-101 overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="sticky top-0 flex justify-between items-center py-4 px-6 bg-[#0c0f0e] border-b border-[#1e2322] z-10">
          <button
            onClick={handleClose}
            className="p-2 rounded-full hover:bg-[#1e2322] transition-colors"
          >
            <GoArrowLeft className="text-lg text-white" />
          </button>

          <h2 className="text-lg font-medium text-white">
            Receive {token.symbol}
          </h2>

          <button className="p-2 rounded-full hover:bg-[#1e2322] transition-colors">
            <PiWarningCircleFill className="h-5 w-5 text-gray-400 hover:text-white" />
          </button>
        </div>

        {/* RECEIVE CONTENT */}
        <div className="flex flex-col items-center px-6 py-8">
          {/* Token Info */}
          <div className="flex items-center gap-3 mb-8">
            <img
              src={token.logo}
              alt={token.name}
              className="w-10 h-10 rounded-full"
            />
            <div className="flex items-baseline gap-2">
              <h1 className="text-3xl font-semibold text-white">
                {token.symbol}
              </h1>
              <span className="text-xs font-medium text-gray-300 bg-[#1e2322] px-2 py-1 rounded-full">
                COIN
              </span>
            </div>
          </div>

          {/* QR Code Container */}
          <div className="relative p-4 bg-white rounded-xl mb-8">
            <div className="w-48 h-48 flex items-center justify-center">
              <QRCode
                value={token.address}
                size={180}
                fgColor="#000000"
                bgColor="#ffffff"
                quietZone={10} // works like includeMargin
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 w-full max-w-md justify-center">
            <Button
              icon={<PiCopySimpleThin className="text-lg" />}
              label="Copy"
              onClick={copyAddress}
              className="bg-[#1e2322] hover:bg-[#2a302e]"
            />
            <Button
              icon={<PiHashFill className="text-lg" />}
              label="Set Amount"
              onClick={() => setShowSetAmountModal(true)}
              className="bg-[#1e2322] hover:bg-[#2a302e]"
            />
            <Button
              icon={<IoShareSocialSharp className="text-lg" />}
              label="Share"
              className="bg-[#1e2322] hover:bg-[#2a302e]"
            />
          </div>

          {/* Address Box */}
          <div className="flex items-start w-full max-w-md bg-[#1e2322] rounded-2xl p-4 mt-10 shadow-md gap-4">
            <div className="flex-shrink-0">
              <div className="bg-green-400/10 p-2 rounded-full">
                <TiArrowDown className="w-5 h-5 text-green-400" />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="text-white text-base font-semibold">
                Deposit from Exchange
              </div>
              <p className="text-sm text-gray-400 leading-snug mt-1">
                By direct transfer from your exchange account.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Set Amount Modal */}
      <SetAmountModal
        isOpen={showSetAmountModal}
        onClose={() => setShowSetAmountModal(false)}
        token={token}
        address={token.address}
      />
    </>
  );
};

export default Receive;
