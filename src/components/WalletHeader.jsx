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
    <div className="px-5 pt-6 pb-8">
      <div className="flex justify-between items-center gap-3 mb-8">
        <div className="flex items-center gap-2 text-gray-200">
          <h1 className="text-xl  font-semibold">Wallet 1</h1>{" "}
          <BiSolidDownArrow className=" w-3 h-3 " />
        </div>
        <div className="flex items-center gap-1">
          <Button icon={<MdFilterCenterFocus />} onClick={() => {}} />
          <Button icon={<PiCopySimpleThin />} onClick={() => {}} />
          <Button icon={<IoSearch />} onClick={() => {}} />
          <Button icon={<FaEllipsisH />} onClick={() => {}} />
        </div>
      </div>
      <div className="flex items-center justify-between mt-2">
        <div className="text-3xl font-semibold">
          {loading
            ? formatNumberToCurrency(0)
            : formatNumberToCurrency(balance)}
        </div>
        <Button
          icon={<TfiReload />}
          onClick={() => claimToken("USDT", 100000, 3000)}
          // moreClass="opacity-10 z-200"
        />
      </div>
      <div className="flex justify-between mt-8">
        <Button icon={<TiArrowUp />} label="Send" onClick={() => {}} />
        <Button icon={<TiArrowDown />} label="Receive" />
        <Button icon={<LuArrowRightLeft />} label="Swap" onClick={() => {}} />
        <Button icon={<IoIosCard />} label="Buy & Sell" onClick={() => {}} />
      </div>
    </div>
  );
}
