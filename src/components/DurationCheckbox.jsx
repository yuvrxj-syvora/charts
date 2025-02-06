const DurationBox = ({ timeframes, selectedTimeframe, onChange }) => {
  return (
    <div className="text-white flex justify-center gap-4 p-2 rounded-lg">
      {timeframes.map((time) => (
        <label key={time} className="flex items-center gap-2 cursor-pointer">
          <div className="relative">
            <input
              type="checkbox"
              value={time}
              checked={selectedTimeframe === time}
              onChange={(e) => onChange(e.target.value)}
              className="hidden" 
            />
            <div
              className={`w-5 h-5 flex items-center justify-center rounded border ${
                selectedTimeframe === time
                  ? "bg-blue-600 border-blue-600"
                  : "bg-[#5b7280] border-gray-600"
              }`}
            >
              {selectedTimeframe === time && (
                <svg
                  className="w-3 h-3 text-white"
                  viewBox="0 0 12 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 5L4.5 9L11 1"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
          </div>
          <span className="text-gray-300 text-sm">{time}</span>
        </label>
      ))}
    </div>
  );
};

export default DurationBox;