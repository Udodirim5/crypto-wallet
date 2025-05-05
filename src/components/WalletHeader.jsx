import { useCoinContext } from "../context/CoinContext";

export default function WalletHeader() {
  const { balance, loading } = useCoinContext();

  return (
    <div className="px-5 pt-6 pb-8">
      <div className="text-sm text-gray-400">Total Balance</div>
      <div className="flex items-center justify-between mt-2">
        <div className="text-3xl font-semibold">
          $
          {loading
            ? 0.00
            : balance.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
        </div>
        <button className="bg-[#1e2322] p-2 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </button>
      </div>
      <div className="flex justify-between mt-8">
        <button className="flex-1 bg-[#3385ff] py-3 rounded-lg mx-1 font-medium">
          Send
        </button>
        <button className="flex-1 bg-[#1e2322] py-3 rounded-lg mx-1 font-medium">
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
