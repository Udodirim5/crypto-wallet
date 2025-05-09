import { FaCheckCircle } from "react-icons/fa";
import { TiArrowDown } from "react-icons/ti";
import { formatNumberToCurrency, truncateAddress } from "../utils/helper";

const TransactionCard = ({
  type = "in",
  amount,
  symbol,
  usdValue,
  address,
}) => {
  const isIncoming = type === "in";
  const iconColor = isIncoming ? "text-green-400" : "text-red-400";
  const bgColor = isIncoming ? "bg-green-400/10" : "bg-red-400/10";
  const amountPrefix = isIncoming ? "+" : "-";

  return (
    <div className="w-full px-4 py-3">
      <div className="flex items-start bg-[#1e2322] rounded-xl p-4 shadow-sm gap-4">
        <div className={`p-2 rounded-full ${bgColor}`}>
          <TiArrowDown className={`w-5 h-5 ${iconColor}`} />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-1">
            <span className="text-white font-medium">Transfer</span>
            <span className="text-green-900">
              <FaCheckCircle className="w-4 h-4 inline-block rounded-full bg-green-400" />
            </span>
          </div>
          <div className="flex gap-2 text-sm text-gray-400 mt-0.5">
            {isIncoming ? "From" : "To"}: 
            <span className="block truncate max-w-full">{truncateAddress(address)}</span> {/* Truncate the address */}
          </div>
        </div>
        <div className="text-right">
          <div className={`text-sm font-medium ${iconColor}`}>
            {amountPrefix}
            {parseFloat(amount).toFixed(2)} {symbol}
          </div>
          <div className="text-xs text-gray-400">≈ {formatNumberToCurrency(usdValue)}</div>
        </div>
      </div>
    </div>
  );
};

export default TransactionCard;

// example usage
{
  /* <TransactionCard
  type="in" // or "out"
  amount="0.123456"
  symbol="ETH"
  usdValue="200.00"
  address="0x1234567890abcdef1234567890abcdef12345678"
  date="Today"
/> */
}
