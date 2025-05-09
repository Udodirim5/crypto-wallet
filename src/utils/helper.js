export const fetchLivePrices = async (coinIds) => {
  const ids = coinIds.join(",");
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`;

  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch prices");
  return response.json();
};

export const updateTokenData = (tokens, livePrices) => {
  return tokens.map((token) => {
    const live = livePrices[token.id];
    const price = live?.usd || token.price;
    const change24h = live?.usd_24h_change || token.change24h;
    const value = token.amount * price;

    return {
      ...token,
      price,
      change24h,
      value,
    };
  });
};

export const calculateTotalBalance = (tokens) => {
  return tokens.reduce((total, token) => total + token.value, 0);
};

export const formatNumberToCurrency = (number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(number);
};

export const formatNumberToPercentage = (number) => {
  return new Intl.NumberFormat("en-US", {
    style: "percent",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(number / 100);
};

export const formatNumberToDecimal = (number, trailing0s) => {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: trailing0s,
    maximumFractionDigits: 2,
  }).format(number);
};


export const getDateLabel = (isoDate) => {
  const date = new Date(isoDate);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const isToday =
    date.toDateString() === today.toDateString();
  const isYesterday =
    date.toDateString() === yesterday.toDateString();

  if (isToday) return "Today";
  if (isYesterday) return "Yesterday";
  return isoDate; // fallback to raw date like "2024-12-20"
};

export function truncateAddress(address, startLength = 6, endLength = 4) {
  if (!address || address.length <= startLength + endLength + 3) return address;
  return `${address.slice(0, startLength)}...${address.slice(-endLength)}`;
}
