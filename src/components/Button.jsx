const Button = ({ icon, label, onClick, moreClass = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center text-center w-16 ${moreClass}`}
    >
      <span className="bg-[#1e2322] p-3 rounded-full hover:bg-[#2a302e] transition-colors">
        {icon}
      </span>
      {label && (
        <span className="font-light text-sm mt-2 text-gray-300">{label}</span>
      )}
    </button>
  );
};

export default Button;
