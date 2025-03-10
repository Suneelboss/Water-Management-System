import React, { useState } from 'react';
import Menu from './components/Menu';

const Settings = () => {
  // State for Tank Height
  const [tankHeight, setTankHeight] = useState(0);
  const [tankHeightUnit, setTankHeightUnit] = useState('inch');

  // State for Leakage Threshold
  const [leakageThreshold, setLeakageThreshold] = useState(0);
  const [leakageThresholdUnit, setLeakageThresholdUnit] = useState('ml');

  // State for Dry Run
  const [dryRun, setDryRun] = useState(0);
  const [dryRunUnit, setDryRunUnit] = useState('millisecond');

  // Handle Save Settings
  const handleSaveSettings = () => {
    const settings = {
      tankHeight: `${tankHeight} ${tankHeightUnit}`,
      leakageThreshold: `${leakageThreshold} ${leakageThresholdUnit}`,
      dryRun: `${dryRun} ${dryRunUnit}`,
    };
    console.log('Settings Saved:', settings);
    // You can add logic to save settings to an API or local storage
  };

  // Handle Reset Settings
  const handleResetSettings = () => {
    setTankHeight(0);
    setTankHeightUnit('inch');
    setLeakageThreshold(0);
    setLeakageThresholdUnit('ml');
    setDryRun(0);
    setDryRunUnit('millisecond');
    console.log('Settings Reset to Default');
  };

  return (
    <div className="flex">
      <Menu />
      <div className="ml-5">
        <h1 className="text-3xl mt-11">Settings:</h1>

        {/* Tank Height */}
        <div className="mt-7">
          <h2 className="text-xl mb-2">Tank Height</h2>
          <div className="flex items-center gap-3">
            <input
              type="number"
              value={tankHeight}
              onChange={(e) => setTankHeight(parseFloat(e.target.value))}
              className="h-14 w-32 p-2 text-2xl bg-gray-200 rounded-2xl text-center"
            />
            <select
              value={tankHeightUnit}
              onChange={(e) => setTankHeightUnit(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg"
            >
              <option value="ft">ft</option>
              <option value="mm">mm</option>
              <option value="cm">cm</option>
              <option value="inch">inch</option>
            </select>
          </div>
        </div>

        {/* Leakage Threshold */}
        <div className="mt-7">
          <h2 className="text-xl mb-2">Leakage Threshold</h2>
          <div className="flex items-center gap-3">
            <input
              type="number"
              value={leakageThreshold}
              onChange={(e) => setLeakageThreshold(parseFloat(e.target.value))}
              className="h-14 w-32 p-2 text-2xl bg-gray-200 rounded-2xl text-center"
            />
            <select
              value={leakageThresholdUnit}
              onChange={(e) => setLeakageThresholdUnit(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg"
            >
              <option value="ml">ml</option>
              <option value="l">l</option>
            </select>
          </div>
        </div>

        {/* Dry Run */}
        <div className="mt-7">
          <h2 className="text-xl mb-2">Dry Run</h2>
          <div className="flex items-center gap-3">
            <input
              type="number"
              value={dryRun}
              onChange={(e) => setDryRun(parseFloat(e.target.value))}
              className="h-14 w-32 p-2 text-2xl bg-gray-200 rounded-2xl text-center"
            />
            <select
              value={dryRunUnit}
              onChange={(e) => setDryRunUnit(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg"
            >
              <option value="millisecond">millisecond</option>
              <option value="second">second</option>
              <option value="hour">hour</option>
            </select>
          </div>
        </div>

        {/* Save and Reset Buttons */}
        <div className="mt-7 flex gap-3">
          <button
            onClick={handleSaveSettings}
            className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Save Settings
          </button>
          <button
            onClick={handleResetSettings}
            className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;