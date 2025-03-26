import React, { useState } from "react";
import DateInput from "./components/DateInput";
import Button from "./components/Button";
import AgeDisplay from "./components/AgeDisplay";
import ErrorMessage from "./components/ErrorMessage";
import "./style/App.css";

function App() {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [errors, setErrors] = useState({});
  const [age, setAge] = useState({ years: 0, months: 0, days: 0 });

  const validateDate = () => {
    const newErrors = {};

    // Check for empty fields
    if (!day) newErrors.day = "This field is required";
    if (!month) newErrors.month = "This field is required";
    if (!year) newErrors.year = "This field is required";

    // Check for valid day, month, and year ranges
    if (day < 1 || day > 31) newErrors.day = "Must be a valid day";
    if (month < 1 || month > 12) newErrors.month = "Must be a valid month";
    if (year > new Date().getFullYear()) newErrors.year = "Must be in the past";

    // Check for valid date (e.g., 31/04/1991)
    const date = new Date(`${year}-${month}-${day}`);
    if (
      date.getDate() != day ||
      date.getMonth() + 1 != month ||
      date.getFullYear() != year
    ) {
      newErrors.day = "Invalid date";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateAge = () => {
    const birthDate = new Date(`${year}-${month}-${day}`);
    const today = new Date();

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
      months--;
      days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    setAge({ years, months, days });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateDate()) {
      calculateAge();
    }
  };

  return (
    <div className="app">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <DateInput
            label="Day"
            name="day"
            value={day}
            onChange={(e) => setDay(e.target.value)}
            error={errors.day}
          />
          <DateInput
            label="Month"
            name="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            error={errors.month}
          />
          <DateInput
            label="Year"
            name="year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            error={errors.year}
          />
        </div>
        <Button type="submit">Calculate Age</Button>
      </form>
      <AgeDisplay years={age.years} months={age.months} days={age.days} />
    </div>
  );
}

export default App;