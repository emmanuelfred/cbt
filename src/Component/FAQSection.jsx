import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is a CBT exam?",
      answer:
        "CBT stands for Computer-Based Test. It’s an electronic testing method where questions are presented and answered on a computer instead of paper.",
    },
    {
      question: "Can I access courses on my phone?",
      answer:
        "Yes! Our platform is fully responsive, so you can study from your mobile phone, tablet, or computer anytime.",
    },
    {
      question: "Are the practice questions similar to real exams?",
      answer:
        "Absolutely! Our questions are modeled after real exam formats like JAMB, WAEC, NECO, and Common Entrance to give you realistic preparation.",
    },
    {
      question: "Do I need internet to take a test?",
      answer:
        "Yes, you’ll need an internet connection to log in and take CBT tests online. However, we’re working on an offline mode for schools.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 bg-[#0c70891c]">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-[#014925] text-center mb-10">
          Frequently <span className=" text-[#0C6F89]">Asked </span> Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white shadow-sm rounded-2xl border border-gray-100 overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="flex justify-between items-center w-full px-6 py-4 text-left"
              >
                <span className="font-semibold text-gray-600 text-lg">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`px-6 pb-4 text-gray-600 transition-all duration-300 ${
                  openIndex === index ? "max-h-40" : "hidden"
                }`}
              >
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
