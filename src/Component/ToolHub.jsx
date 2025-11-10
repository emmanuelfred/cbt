// ToolHub.jsx
import { useState } from "react";
import { Brain, BookOpen, Calculator, MessageCircle, X } from "lucide-react";
import { MdBuild } from "react-icons/md";
import Dictionary from "./Tools/Dictionary";
import Chat from "./Tools/AIChatBot/Chat";
import ScientificCalculator from "./Tools/ScientificCalculator";

const tools = [
  { name: "Calculator", icon: <Calculator size={20} />, component: <ScientificCalculator /> },
  { name: "Dictionary", icon: <BookOpen size={20} />, component: <Dictionary /> },
  { name: "AI Bot", icon: <Brain size={20} />, component: <Chat /> },
  {
    name: "Customer Care",
    icon: <MessageCircle size={20} />,
    component: (
      <div className="" style={{minHeight:350,maxHeight:550, overflowX:'hidden'}}>
        
        <div className="flex items-center justify-center mb-3 text-center" >
        <h2 className="text-lg font-semibold">Customer Care</h2>
        
      </div>
      <div className="flex flex-col items-center justify-center space-y-4 mt-20" style={{height:'100%'}}>
        <p className="mb-2">Chat with us on WhatsApp:</p>
        <a
          href="https://wa.me/2348061909461"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#0C6F89] text-white px-4 py-2 rounded-full hover:bg-[#014925] transition"
        >
          Open WhatsApp
        </a>
        </div>
      </div>
    ),
  },
];

const ToolHub = () => {
  const [open, setOpen] = useState(false);
  const [activeTool, setActiveTool] = useState(null);

  return (
    <>
      {/* Sidebar */}
      {activeTool && (
        <div className="fixed bottom-5  right-0  bg-[#fff]  w-90 rounded-lg shadow-2xl z-100 p-4 overflow-y-auto transition-transform transform" style={{height:'cal(100vh - 60px)'}}>
          <div className="flex justify-end items-center mb-4">
           
            <button onClick={() => setActiveTool(null)} className="text-gray-500 hover:text-[#014925]">
              <X size={20} />
            </button>
          </div>
          <div>{activeTool.component}</div>
        </div>
      )}

      {/* Tool buttons */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-3">
        {open &&
          tools.map((tool, index) => (
            <button
              key={tool.name}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-[#0C6F89] text-white shadow-lg transform transition-all duration-300 hover:bg-[#014925]"
              style={{ transitionDelay: `${index * 50}ms` }}
              title={tool.name}
              onClick={() => setActiveTool(tool)}
            >
              {tool.icon}
            </button>
          ))}
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-[#014925] text-white shadow-xl transform transition-transform duration-300 hover:scale-110"
        >
          {open ? <X size={20} /> : <MdBuild size={20} />}
        </button>
      </div>
    </>
  );
};

export default ToolHub;
