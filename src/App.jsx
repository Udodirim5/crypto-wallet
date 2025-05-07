import { useState } from "react";
import WalletHeader from "./components/WalletHeader";
import TokenList from "./components/TokenList";
import BottomNav from "./components/BottomNav";
import Toast from "./components/Toast";
// import StatusBar from "./components/StatusBar";

export default function App() {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  return (
<div className="flex flex-col h-screen w-full max-w-[700px] m-auto bg-[#0c0f0e] text-white px-10">
{/* <StatusBar /> */}

      <div className="flex-1 overflow-y-auto">
        <WalletHeader />
        <TokenList refreshing={refreshing} onRefresh={handleRefresh} />
      </div>

      <BottomNav />

      <Toast />
    </div>
  );
}
