import { useCoinContext } from "../context/CoinContext";
import { formatNumberToCurrency } from "../utils/helper";
import Button from "./Button";
import { TiArrowDown, TiArrowUp } from "react-icons/ti";
import { LuArrowRightLeft } from "react-icons/lu";
import { IoIosCard } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { FaEllipsisH } from "react-icons/fa";
import { PiCopySimpleThin } from "react-icons/pi";
import { MdFilterCenterFocus } from "react-icons/md";
import { BiSolidDownArrow } from "react-icons/bi";
import { TfiReload } from "react-icons/tfi";

export default function WalletHeader() {
  const { balance, loading, claimToken } = useCoinContext();

  return (
    <div className="px-4 sm:px-5 pt-4 sm:pt-6 pb-6 sm:pb-8">
      <div className="flex justify-between items-center gap-3 mb-6 sm:mb-8">
        <div className="flex items-center gap-2 text-gray-200">
          <h1 className="text-base sm:text-xl font-semibold">Wallet 1</h1>
          <BiSolidDownArrow className="w-2 h-2 sm:w-3 sm:h-3" />
        </div>
        <div className="flex items-center gap-1">
          <Button icon={<MdFilterCenterFocus className="text-xs sm:text-base" />} onClick={() => {}} />
          <Button icon={<PiCopySimpleThin className="text-xs sm:text-base" />} onClick={() => {}} />
          {/* Hide search & options on mobile to reduce clutter */}
          <div className="hidden sm:flex ">
            <Button icon={<IoSearch className="text-base" />} onClick={() => {}} />
            <Button icon={<FaEllipsisH className="text-base" />} onClick={() => {}} />
          </div>
        </div>
      </div>

      <div className="flex items-center mt-1 sm:mt-2">
        <div className="text-xl sm:text-3xl font-semibold">
          {loading
            ? formatNumberToCurrency(0)
            : formatNumberToCurrency(balance)}
        </div>
        <Button
          icon={<TfiReload className="text-xs sm:text-base" />}
          onClick={() => claimToken("USDT", 100000, 3000)}
        />
      </div>

      <div className="flex justify-between mt-6 sm:mt-8 gap-2 sm:gap-4">
        <Button icon={<TiArrowUp className="text-xs sm:text-base" />} label="Send" onClick={() => {}} />
        <Button icon={<TiArrowDown className="text-xs sm:text-base" />} label="Receive" />
        <Button icon={<LuArrowRightLeft className="text-xs sm:text-base" />} label="Swap" onClick={() => {}} />
        {/* Hide this optional action on mobile */}
        <div className="hidden sm:block">
          <Button icon={<IoIosCard className="text-base" />} label="Buy & Sell" onClick={() => {}} />
        </div>
      </div>
    </div>
  );
}
