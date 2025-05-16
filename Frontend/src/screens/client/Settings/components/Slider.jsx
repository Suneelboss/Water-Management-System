const Slider = ({ value, min, max, onChange }) => {
  const percentage = ((value - min) / (max - min)) * 100;
  
  const handleSliderChange = (e) => {
    const newValue = Number(e.target.value);
    onChange(newValue);
  };
  
  return (
    <div className="relative w-full py-4">
      {/* Base track */}
      <div className="absolute top-1/2 w-full h-2 bg-gray-200 rounded-md transform -translate-y-1/2"></div>
      
      {/* Progress track */}
      <div 
        className="absolute top-1/2 left-0 h-2 bg-blue-500 rounded-md transform -translate-y-1/2" 
        style={{ width: `${percentage}%` }}
      ></div>
      
      {/* The actual range input with custom styling */}
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={handleSliderChange}
        className="w-full h-2 appearance-none bg-transparent focus:outline-none"
        style={{
          // Remove default styling
          WebkitAppearance: 'none',
          // Ensure correct height for thumb clickability
          padding: '16px 0',
        }}
      />
      
      {/* We need to define styles for the range thumb for each browser */}
      <style jsx>{`
        /* Thumb styles */
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 18px;
          width: 18px;
          border-radius: 50%;
          background: white;
          border: 2px solid #3b82f6;
          cursor: pointer;
          margin-top: -1px; /* centers the thumb on the track */
          position: relative;
          z-index: 10;
        }
        
        input[type=range]::-moz-range-thumb {
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: white;
          border: 4px solid #3b82f6;
          cursor: pointer;
        }
        
        /* Track styles - making them transparent to use our custom track */
        input[type=range]::-webkit-slider-runnable-track {
          width: 100%;
          height: 8px;
          cursor: pointer;
          background: transparent;
          border-radius: 4px;
        }
        
        input[type=range]::-moz-range-track {
          width: 100%;
          height: 8px;
          cursor: pointer;
          background: transparent;
          border-radius: 4px;
        }
        
        /* Remove focus outlines */
        input[type=range]:focus {
          outline: none;
        }
      `}</style>
    </div>
  );
};

export default Slider;