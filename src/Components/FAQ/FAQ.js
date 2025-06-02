import React, { useState } from "react";
import './FAQ.css'; // You can style this using your preferred CSS method

import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
function FAQ() {
    const [openIndex, setOpenIndex] = useState(null);

    const toggle = (index) => {
      setOpenIndex(openIndex === index ? null : index);
    };
  return (
    <div className='faq-section container mt-5 mb-5'>
         <div className="text-center mb-4" style={{maxWidth: '900px', margin: '0 auto'}}>
        <h3>FAQ</h3>
        <h1>Frequently Asked Questions: We're Here to Help</h1>
      </div>
      <div className='row' style={{gap: '20px', justifyContent: 'center'}}>
       
        <div className="faq-accordion col-md-5">
            {/* FAQ 1 */}
            <div className="faq-item ">
                <button
                className=""
                onClick={() => toggle(0)}
                >
                <span>What types of courses do you offer?</span>
                <span className="ml-4 text-xl text-green-700">
                    {openIndex === 0 ? <FaMinusCircle /> : <FaPlusCircle />}
                </span>
                </button>
                {openIndex === 0 && (
                <div className="mt-2 text-gray-700">
                    We offer a wide range of courses across various fields such as
                    Business & Management, Technology & Coding, Design & Creative Arts,
                    and Finance & Accounting. Our courses are designed for learners at
                    different levels, from beginners to advanced professionals.
                </div>
                )}
            </div>

            {/* FAQ 2 */}
            <div className="faq-item ">
                <button
                className=""
                onClick={() => toggle(1)}
                >
                <span>How do I enroll in a course?</span>
                <span className="ml-4 text-xl ">
                    {openIndex === 1 ? <FaMinusCircle /> : <FaPlusCircle />}
                </span>
                </button>
                {openIndex === 1 && (
                <div className="mt-2 text-gray-700">
                    Enrolling in a course is simple! Just sign up for an account, browse
                    our course catalog, and select the course you’re interested in. Once
                    you’ve completed the payment process, you’ll gain immediate access to
                    the course materials.
                </div>
                )}
            </div>

            {/* FAQ 3 */}
            <div className="faq-item ">
                <button
                className=""
                onClick={() => toggle(2)}
                >
                <span>Are the courses self-paced or instructor-led?</span>
                <span className="ml-4 text-xl text-green-700">
                    {openIndex === 2 ? <FaMinusCircle /> : <FaPlusCircle />}
                </span>
                </button>
                {openIndex === 2 && (
                <div className="mt-2 text-gray-700">
                    Our platform offers both self-paced courses and instructor-led
                    courses. Self-paced courses allow you to learn at your own speed,
                    while instructor-led courses provide scheduled lessons, live
                    sessions, and personal feedback.
                </div>
                )}
            </div>
         

        </div>
        <div className="faq-accordion col-md-5">
            {/* FAQ 1 */}
            <div className="faq-item ">
                <button
                className=""
                onClick={() => toggle(4)}
                >
                <span>Do I receive a certificate after completing a course?</span>
                <span className="ml-4 text-xl text-green-700">
                    {openIndex === 4 ? <FaMinusCircle /> : <FaPlusCircle />}
                </span>
                </button>
                {openIndex === 4 && (
                <div className="mt-2 text-gray-700">
                   Yes, upon successfully completing a course, you will receive a certificate 
                   of completion that can be shared on your LinkedIn profile, resume, or with potential employers.
                </div>
                )}
            </div>

            {/* FAQ 2 */}
            <div className="faq-item ">
                <button
                className=""
                onClick={() => toggle(5)}
                >
                <span>What if I have technical issues during a course?</span>
                <span className="ml-4 text-xl ">
                    {openIndex === 5 ? <FaMinusCircle /> : <FaPlusCircle />}
                </span>
                </button>
                {openIndex === 5 && (
                <div className="mt-2 text-gray-700">
                    If you encounter any technical issues, you can reach out to our support team via email or live chat. We are available 24/7 to
                     help resolve any problems quickly so that your learning experience is uninterrupted.
                </div>
                )}
            </div>

            {/* FAQ 3 */}
            <div className="faq-item ">
                <button
                className=""
                onClick={() => toggle(6)}
                >
                <span>Can I access the course materials after completing the course?</span>
                <span className="ml-4 text-xl text-green-700">
                    {openIndex === 6 ? <FaMinusCircle /> : <FaPlusCircle />}
                </span>
                </button>
                {openIndex === 6 && (
                <div className="mt-2 text-gray-700">
                    Yes, once you’ve completed a course, you will have lifetime access to the course materials,
                     including videos, assignments, and resources, so you can revisit them anytime for reference or review.
                </div>
                )}
            </div>
         

        </div>

      </div>
    </div>
  )
}

export default FAQ