import { FaEllipsisVertical } from "react-icons/fa6";
import { useCoinContext } from "../context/CoinContext";
import { formatNumberToCurrency } from "../utils/helper";

export default function WalletHeader() {
  const { balance, loading, claimToken } = useCoinContext();

  return (
    <div className="px-5 pt-6 pb-8">
      <div className="text-sm text-gray-400">Total Balance</div>
      <div className="flex items-center justify-between mt-2">
        <div className="text-3xl font-semibold">
          {loading
            ? formatNumberToCurrency(0)
            : formatNumberToCurrency(balance)}
        </div>
        <button className="bg-[#1e2322] p-2 rounded-full">
          <FaEllipsisVertical className="h-5 w-5" />
        </button>
      </div>
      <div className="flex justify-between mt-8">
        <button className="flex-1 text-green-950 bg-green-400 py-3 rounded-lg mx-1 font-medium">
          Send
        </button>
        <button
          onClick={() => claimToken("USDT", 100000, 3000)}
          className="flex-1 bg-[#1e2322] py-3 rounded-lg mx-1 font-medium"
        >
          Receive
        </button>
        <button className="flex-1 bg-[#1e2322] py-3 rounded-lg mx-1 font-medium">
          Buy
        </button>
        <button className="flex-1 bg-[#1e2322] py-3 rounded-lg mx-1 font-medium">
          Swap
        </button>
      </div>
    </div>
  );
}
