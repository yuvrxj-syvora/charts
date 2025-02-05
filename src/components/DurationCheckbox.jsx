const DurationBox  = ({ timeframes, selectedTimeframe, onChange }) => {
    return (
      <div class="bg-gray-500 text-white flex gap-2">
        {timeframes.map((time) => (
          <label key={time}>
            <input
              type="checkbox"
              value={time}
              checked={selectedTimeframe === time}
              onChange={(e) => onChange(e.target.value)}
            />
            {time}
          </label>
        ))}
      </div>
    );
  };

export default DurationBox