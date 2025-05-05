import { useState } from "react";
import WalletHeader from "./components/WalletHeader";
import TokenList from "./components/TokenList";
import BottomNav from "./components/BottomNav";
import Toast from "./components/Toast";
import CoinDropHandler from "./components/CoinDropHandler";

export default function App() {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  return (
    <div className="flex flex-col h-screen bg-[#0c0f0e] text-white px-10">
      {/* iPhone status bar mock */}
      {/* <div className="flex justify-between items-center px-5 pt-1 pb-2 text-xs">
        <span>9:41</span>
        <div className="flex items-center space-x-1">
          <span>5G</span>
          <span>100%</span>
        </div>
      </div> */}

      <div className="flex-1 overflow-y-auto">
        <WalletHeader />
        <TokenList refreshing={refreshing} onRefresh={handleRefresh} />
      </div>

      <BottomNav />

      <Toast />

      <CoinDropHandler />
    </div>
  );
}
