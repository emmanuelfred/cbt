import React, { useState } from "react";
import {
  Brain,
  BookOpen,
  Calculator,
  CheckSquare,
  X,
} from "lucide-react";
import "./Rightbar.css";

import Chat from "../Tools/AIChatBot/Chat";
import Dictionary from "../Tools/Dictionary";
import ScientificCalculator from "../Tools/ScientificCalculator";
import Task from "../Tools/Task";

function Rightbar() {
  const [activeTool, setActiveTool] = useState(null);

  const handleToolClick = (tool) => {
    setActiveTool(activeTool === tool ? null : tool); // toggle on/off
  };

  const renderTool = () => {
    switch (activeTool) {
      case "ai":
        return <Chat />;
      case "dictionary":
        return <Dictionary />;
      case "calculator":
        return <ScientificCalculator />;
      case "tasks":
        return <Task />;
      default:
        return null;
    }
  };

  return (
    <div className="RightbarContainer">
      {/* Sidebar fixed to right */}
      <div className="Rightbar">
        <ul>
          <li
            className={`Rightbar-tap ${activeTool === "ai" ? "active" : ""}`}
            onClick={() => handleToolClick("ai")}
          >
            <Brain size={24} />
            <span>AI Bot</span>
          </li>
          <li
            className={`Rightbar-tap ${activeTool === "dictionary" ? "active" : ""}`}
            onClick={() => handleToolClick("dictionary")}
          >
            <BookOpen size={24} />
            <span>Dictionary</span>
          </li>
          <li
            className={`Rightbar-tap ${activeTool === "calculator" ? "active" : ""}`}
            onClick={() => handleToolClick("calculator")}
          >
            <Calculator size={24} />
            <span>Calculator</span>
          </li>
          <li
            className={`Rightbar-tap ${activeTool === "tasks" ? "active" : ""}`}
            onClick={() => handleToolClick("tasks")}
          >
            <CheckSquare size={24} />
            <span>Tasks</span>
          </li>
        </ul>
      </div>

      {/* Tool panel appears beside sidebar */}
      {activeTool && (
        <div className="ToolPanel">
          <button
            className="close-btn"
            onClick={() => setActiveTool(null)}
          >
            <X size={20} />
          </button>
          <div className="tool-content">{renderTool()}</div>
        </div>
      )}
    </div>
  );
}

export default Rightbar;
