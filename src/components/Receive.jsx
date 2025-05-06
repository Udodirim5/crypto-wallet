import { GoArrowLeft } from "react-icons/go";
import {
  PiCopySimpleThin,
  PiHashFill,
  PiWarningCircleFill,
} from "react-icons/pi";
import Button from "./Button";
import { IoShareSocialSharp } from "react-icons/io5";
import { TiArrowDown } from "react-icons/ti";
import DotSpinner from "./DotSpinner";

const Receive = ({ setShowReceive, token }) => {
  const copyAddress = () => {
    navigator.clipboard.writeText(token.address);
    // You might want to add a toast notification here
  };

  const handleClose = (e) => {
    e.stopPropagation(); // Prevent event from bubbling up
    setShowReceive(false);
  };

  return (
    <div
      className="fixed inset-0 bg-[#0c0f0e] border-t border-[#1e2322] pb-4 pt-2 px-4 z-101 overflow-y-auto"
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
            {/* Placeholder for QR code - replace with actual QR component */}
            <div className="text-center">
              <div className="text-gray-700 font-medium mb-2">QR CODE</div>
              <div className="w-full h-32 bg-gray-100 flex items-center justify-center mb-2">
                {/* QR Code would go here */}
                <div className="text-xs text-gray-500">
                  <DotSpinner />
                </div>
              </div>
              <p className="text-xs text-gray-500 break-all px-2">
                {token.address}
              </p>
            </div>
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
  );
};

export default Receive;
