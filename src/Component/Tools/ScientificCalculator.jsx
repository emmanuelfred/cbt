import React, { useState, useEffect, useRef } from "react";

// Full Scientific Calculator React Component (Tailwind CSS)
// Default export is the component. Drop this file into a React project
// using Tailwind CSS (the markup uses Tailwind utility classes).

export default function ScientificCalculator() {
  const [display, setDisplay] = useState("0");
  const [overwrite, setOverwrite] = useState(true);
  const [memory, setMemory] = useState(null);
  const displayRef = useRef(null);

  const buildEvalExpression = (expr) => {
    let s = expr
      .replace(/×/g, "*")
      .replace(/÷/g, "/")
      .replace(/\^/g, "**")
      .replace(/π/g, "PI")
      .replace(/e\b/g, "E");

    const map = {
      "sin(": "Math.sin(",
      "cos(": "Math.cos(",
      "tan(": "Math.tan(",
      "asin(": "Math.asin(",
      "acos(": "Math.acos(",
      "atan(": "Math.atan(",
      "ln(": "Math.log(",
      "log(": "Math.log10(",
      "sqrt(": "Math.sqrt(",
      "abs(": "Math.abs(",
      "PI": "Math.PI",
      "E": "Math.E",
    };

    for (const k in map) s = s.split(k).join(map[k]);

    return s;
  };

  const safeEval = (expr) => {
    const mapped = buildEvalExpression(expr);
    if (!/^[0-9+\-*/()., MathPIEaxsinteclogqrtanb]+$/.test(mapped)) {
      throw new Error("Invalid characters in expression");
    }
    const fn = new Function(`return ${mapped};`);
    return fn();
  };

  const inputDigit = (digit) => {
    if (overwrite) {
      setDisplay(String(digit));
      setOverwrite(false);
    } else {
      setDisplay((d) => (d === "0" ? String(digit) : d + digit));
    }
  };

  const inputDot = () => {
    if (overwrite) {
      setDisplay("0.");
      setOverwrite(false);
      return;
    }
    if (!display.includes(".")) setDisplay((d) => d + ".");
  };

  const inputOperator = (op) => {
    if (overwrite && op !== "-") {
      setOverwrite(false);
    }
    setDisplay((d) => {
      if (/[+\-*/]$/.test(d)) return d.slice(0, -1) + op;
      return d + op;
    });
    setOverwrite(false);
  };

  const clearAll = () => {
    setDisplay("0");
    setOverwrite(true);
  };

  const clearEntry = () => {
    setDisplay("0");
    setOverwrite(true);
  };

  const backspace = () => {
    setDisplay((d) => {
      if (overwrite) return "0";
      if (d.length <= 1) return "0";
      return d.slice(0, -1);
    });
  };

  const applyUnary = (type) => {
    try {
      const value = safeEval(display);
      let result = value;
      switch (type) {
        case "±":
          result = -value;
          break;
        case "%":
          result = value / 100;
          break;
        case "sqrt":
          result = Math.sqrt(value);
          break;
        case "x²":
          result = Math.pow(value, 2);
          break;
        case "1/x":
          result = 1 / value;
          break;
        case "!":
          result = factorial(value);
          break;
        default:
          break;
      }
      setDisplay(String(formatResult(result)));
      setOverwrite(true);
    } catch (e) {
      setDisplay("Error");
      setOverwrite(true);
    }
  };

  const factorial = (n) => {
    if (n < 0) return NaN;
    if (n === 0) return 1;
    if (n !== Math.floor(n)) return NaN;
    let res = 1;
    for (let i = 1; i <= n; i++) res *= i;
    return res;
  };

  const formatResult = (v) => {
    if (Number.isNaN(v) || !isFinite(v)) return String(v);
    const s = String(v);
    if (s.length > 12 && Math.abs(v) > 1e-6) return v.toPrecision(12).replace(/\.?0+$/, "");
    return s;
  };

  const evaluate = () => {
    try {
      const result = safeEval(display);
      setDisplay(String(formatResult(result)));
      setOverwrite(true);
    } catch (e) {
      setDisplay("Error");
      setOverwrite(true);
    }
  };

  const insertFunction = (fnName) => {
    setDisplay((d) => (overwrite ? fnName + "(" : d + fnName + "("));
    setOverwrite(false);
  };

  const memoryAdd = () => {
    try {
      const val = safeEval(display);
      setMemory((m) => (m === null ? val : m + val));
    } catch {}
  };

  const memorySubtract = () => {
    try {
      const val = safeEval(display);
      setMemory((m) => (m === null ? -val : m - val));
    } catch {}
  };

  const memoryRecall = () => {
    if (memory !== null) {
      setDisplay(String(memory));
      setOverwrite(true);
    }
  };

  const memoryClear = () => setMemory(null);

  useEffect(() => {
    const onKey = (e) => {
      if (/^[0-9]$/.test(e.key)) inputDigit(e.key);
      else if (e.key === ".") inputDot();
      else if (["+", "-", "*", "/"].includes(e.key)) inputOperator(e.key);
      else if (e.key === "Enter") evaluate();
      else if (e.key === "Backspace") backspace();
      else if (e.key === "%") applyUnary("%");
      else if (e.key === "(") setDisplay((d) => (overwrite ? "(" : d + "("));
      else if (e.key === ")") setDisplay((d) => (overwrite ? ")" : d + ")"));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [display, overwrite]);

  return (
    <div className=""style={{minHeight:300}}>
      <div className="flex items-center justify-center mb-3 text-center" >
        <h2 className="text-lg font-semibold">Scientific Calculator</h2>
        
      </div>

      <div className="bg-[#0C6F89] rounded-xl p-4 mb-4 text-white">
        <div
          ref={displayRef}
          className="text-right text-3xl font-mono break-words min-h-[56px]"
          aria-live="polite"
        >
          {display}
        </div>
      </div>

      <div className="grid grid-cols-6 gap-2">
        <button onClick={memoryClear} className="btn">MC</button>
        <button onClick={memoryRecall} className="btn">MR</button>
        <button onClick={memoryAdd} className="btn">M+</button>
        <button onClick={memorySubtract} className="btn">M-</button>
        <button onClick={clearEntry} className="btn">CE</button>
        <button onClick={clearAll} className="btn">C</button>

        <button onClick={() => insertFunction("sin")} className="btn">sin</button>
        <button onClick={() => insertFunction("cos")} className="btn">cos</button>
        <button onClick={() => insertFunction("tan")} className="btn">tan</button>
        <button onClick={() => insertFunction("ln")} className="btn">ln</button>
        <button onClick={() => insertFunction("log")} className="btn">log</button>
        <button onClick={() => { setDisplay((d) => (overwrite ? "(" : d + "(")); setOverwrite(false); }} className="btn">(</button>

        <button onClick={() => insertFunction("asin")} className="btn">asin</button>
        <button onClick={() => insertFunction("acos")} className="btn">acos</button>
        <button onClick={() => insertFunction("atan")} className="btn">atan</button>
        <button onClick={() => insertFunction("sqrt")} className="btn">√</button>
        <button onClick={() => { setDisplay((d) => (overwrite ? ")" : d + ")")); setOverwrite(false); }} className="btn">)</button>
        <button onClick={() => applyUnary("!")} className="btn">n!</button>

        <button onClick={() => inputDigit(7)} className="btn">7</button>
        <button onClick={() => inputDigit(8)} className="btn">8</button>
        <button onClick={() => inputDigit(9)} className="btn">9</button>
        <button onClick={() => inputOperator("/")} className="btn">÷</button>
        <button onClick={() => applyUnary("sqrt")} className="btn">√x</button>
        <button onClick={() => inputOperator("^")} className="btn">^</button>

        <button onClick={() => inputDigit(4)} className="btn">4</button>
        <button onClick={() => inputDigit(5)} className="btn">5</button>
        <button onClick={() => inputDigit(6)} className="btn">6</button>
        <button onClick={() => inputOperator("*")} className="btn">×</button>
        <button onClick={() => applyUnary("x²")} className="btn">x²</button>
        <button onClick={() => applyUnary("1/x")} className="btn">1/x</button>

        <button onClick={() => inputDigit(1)} className="btn">1</button>
        <button onClick={() => inputDigit(2)} className="btn">2</button>
        <button onClick={() => inputDigit(3)} className="btn">3</button>
        <button onClick={() => inputOperator("-")} className="btn">-</button>
        <button onClick={() => applyUnary("±")} className="btn">±</button>
        <button onClick={backspace} className="btn">⌫</button>

        <button onClick={() => inputDigit(0)} className="btn col-span-2">0</button>
        <button onClick={inputDot} className="btn">.</button>
        <button onClick={() => inputOperator("+")} className="btn">+</button>
        <button onClick={() => applyUnary("%")} className="btn">%</button>
        <button onClick={evaluate} className="bg-[#0C6F89] rounded-lg">=</button>
      </div>

      <style jsx>{`
        .btn {
          @apply bg-gray-700/60 hover:bg-gray-600/60 rounded-lg py-3 text-sm font-medium flex items-center justify-center;
        }
        .btn-primary {
          @apply col-span-1 bg-indigo-600 hover:bg-indigo-500 rounded-lg py-3 text-sm font-semibold;
        }
      `}</style>
    </div>
  );
}