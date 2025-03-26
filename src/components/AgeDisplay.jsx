import React from "react";
import CountUp from "react-countup";

function AgeDisplay({ years, months, days }) {
  return (
    <div className="age-display">
      <div>
        <CountUp end={years} duration={1} /> years
      </div>
      <div>
        <CountUp end={months} duration={1} /> months
      </div>
      <div>
        <CountUp end={days} duration={1} /> days
      </div>
    </div>
  );
}

export default AgeDisplay;