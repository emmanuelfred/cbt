// src/Pages/Calculator.jsx
import React from "react";

import ScientificCalculator from "../Components/Tools/ScientificCalculator";


function CalculatorTool() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <ScientificCalculator/>
    </div>
  );
}

export default CalculatorTool;
