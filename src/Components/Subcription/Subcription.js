import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaCheckCircle } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./Subscription.css";

function Subscription() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal states
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [months, setMonths] = useState(1);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/plan/getplan");
        setPlans(res.data);
        console.log(res.data);
      } catch (error) {
        console.error("Error fetching subscription plans:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlans();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading subscription plans...</p>;
  }

  const handleSubscribeClick = (plan) => {
    setSelectedPlan(plan);
    setMonths(1);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPlan(null);
  };

  const totalAmount = selectedPlan ? selectedPlan.price * months : 0;

  const handleProceedPayment = () => {
    // Later you’ll replace this with your Paystack integration
    alert(
      `Proceeding to Paystack payment for ${months} month(s) — Total: ${selectedPlan.currency}${totalAmount}`
    );
    setShowModal(false);
  };

  return (
    <div className="subscription-page">
      <div className="subscription-header d-flex justify-between items-center">
        <h2 className="text-2xl font-bold mb-4 ml-4">Choose Your Plan</h2>
        <Link to="/classroom" className="back-link">
          &larr; Subscription History
        </Link>
      </div>

      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        loop={true}
        pagination={{ clickable: true }}
        navigation={true}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        modules={[Pagination, Navigation]}
        className="plans-swiper"
      >
        {plans.map((plan) => (
          <SwiperSlide key={plan._id}>
            <div className="plan-card">
              <div className="plan-header">
                <h3>{plan.name}</h3>
                <p className="price" style={{ marginBottom: 0 }}>
                  {plan.currency}-{plan.price}/month
                </p>
                <p className="description" style={{ marginBottom: 0 }}>
                  {plan.description}
                </p>
              </div>

              <button
                onClick={() => handleSubscribeClick(plan)}
                className="subscribe-btn"
              >
                Subscribe Now
              </button>

              <div className="plan-body">
                <h4>Features</h4>
                <ul className="plan-features">
                  {plan.features.map((feature, index) => (
                    <li key={feature._id || index} className="plan-feature-item">
                      <FaCheckCircle
                        color={feature.available ? "#15253a" : "gray"}
                        className="plan-icon"
                      />
                      <span
                        className="plan-text"
                        style={{
                          color: feature.available ? "#000" : "#888",
                          textDecoration: feature.available
                            ? "none"
                            : "line-through",
                        }}
                      >
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Modal Section */}
      {showModal && selectedPlan && (
        <div className="modal-overlay">
        
            <div className="modal">
            <h4>{selectedPlan.name} Subscription</h4>
            <p>
              Price per month: <strong>{selectedPlan.currency}{selectedPlan.price}</strong>
            </p>

            <div className="modal-input-group">
              <label>Number of Months:</label>
              <input
                type="number"
                min="1"
                value={months}
                onChange={(e) => setMonths(e.target.value)}
              />
            </div>

            <p className="total-amount">
              Total: <strong>{selectedPlan.currency}{totalAmount}</strong>
            </p>

            <div className="modal-actions">
              <button onClick={handleProceedPayment} className="proceed-btn">
                Proceed to Payment
              </button>
              <button onClick={handleCloseModal} className="cancel-btn">
                Cancel
              </button>
            </div>
          </div>
          </div>
        
      )}
    </div>
  );
}

export default Subscription;
