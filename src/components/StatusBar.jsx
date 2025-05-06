const StatusBar = () => {
  return (
    <div className="flex justify-between items-center px-5 pt-1 pb-2 text-xs">
      <span>9:41</span>
      <div className="flex items-center space-x-1">
        <span>5G</span>
        <span>100%</span>
      </div>
    </div>
  );
};

export default StatusBar;
