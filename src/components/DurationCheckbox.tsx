
interface DurationBoxProps {
  timeframes: string[];
  selectedTimeframes: string[];
  onChange: (timeframe: string) => void;
}

 const DurationBox: React.FC<DurationBoxProps> = ({
  timeframes,
  selectedTimeframes,
  onChange,
}) => {
  return (
    <div className="text-white flex justify-center gap-4 p-2 rounded-lg">
      {timeframes.map((time) => (
        <label
          key={time}
          className="flex items-center gap-2 cursor-pointer flex-col sm:flex-row sm:gap-3"
        >
          <div>
            <input
              type="checkbox"
              value={time}
              checked={selectedTimeframes.includes(time)}
              onChange={(e) => onChange(e.target.value)}
              className="hidden"
            />
            <div
              className={`w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center rounded border ${
                selectedTimeframes.includes(time)
                  ? "bg-blue-600 border-blue-600"
                  : "bg-[#5b7280] border-gray-600"
              }`}
            >
              {selectedTimeframes.includes(time) && (
                <svg
                  className="w-3 h-3 sm:w-4 sm:h-4 text-white"
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
          <span className="text-gray-300 text-sm sm:text-base">{time}</span>
        </label>
      ))}
    </div>
  );
};

export default DurationBox