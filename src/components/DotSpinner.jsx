const DotSpinner = ({ size = "2.8rem", speed = "0.9s", color = "#183153" }) => {
  return (
    <div 
      className="relative flex items-center justify-start"
      style={{
        height: size,
        width: size,
      }}
    >
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute top-0 left-0 flex items-center justify-start h-full w-full"
          style={{
            transform: `rotate(${i * 45}deg)`,
          }}
        >
          <div
            className="rounded-full bg-opacity-50 shadow-[0_0_20px_rgba(18,31,53,0.3)]"
            style={{
              height: '20%',
              width: '20%',
              backgroundColor: color,
              animation: `pulse0112 ${parseFloat(speed) * 1.111}s ease-in-out infinite`,
              animationDelay: `${parseFloat(speed) * -0.125 * (7 - i)}s`,
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default DotSpinner;
