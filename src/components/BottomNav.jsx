import { FaChartLine, FaCoins, FaCompass } from "react-icons/fa";
import { IoMdHome } from "react-icons/io";
import { LuArrowRightLeft } from "react-icons/lu";

export default function BottomNav() {
  return (
    <div className="fixed bottom-0 left-0 right-0 w-[700px] m-auto bg-[#0c0f0e] border-t border-[#1e2322] pb-4 pt-2 px-10 z-0">
      <div className="flex justify-between">
        <button className="flex flex-col items-center">
          <IoMdHome className="h-6 w-6 text-green-400" />
          <span className="text-xs mt-1 text-green-400">Home</span>
        </button>
        <button className="flex flex-col items-center">
          <LuArrowRightLeft className="h-6 w-6 text-gray-400" />
          <span className="text-xs mt-1 text-gray-400">Swap</span>
        </button>
        <button className="flex flex-col items-center">
          <FaCoins className="h-6 w-6 text-gray-400" />
          <span className="text-xs mt-1 text-gray-400">Earn</span>
        </button>
        <button className="flex flex-col items-center">
          <FaChartLine className="h-6 w-6 text-gray-400" />
          <span className="text-xs mt-1 text-gray-400">Activity</span>
        </button>
        <button className="flex flex-col items-center">
          <FaCompass className="h-6 w-6 text-gray-400" />
          <span className="text-xs mt-1 text-gray-400">Discover</span>
        </button>
      </div>
    </div>
  );
}
