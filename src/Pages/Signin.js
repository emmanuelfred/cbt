import React, { useState, useEffect } from 'react';
import '../Style/Signin.css'
import { Link } from 'react-router-dom';
import ImageWithLoading from '../Components/ImageWithLoading';
import AOS from 'aos';
function Signin() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for 2 seconds
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    AOS.init({
      duration: 1000,
       // ← allows the animation to happen more than once
    });
  }, []);

  const [formData, setFormData] = useState({
    first_name: '',
 
    password: '',
    email: '',
   
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Form submitted successfully!");
    // You can send the data to your backend here
  };
  return (
    loading ? 
      (<div style={{padding:10}} ><ImageWithLoading height={900}/></div>)
       : (
        <div className='Signin'>
          <div className='signin-container' data-aos="zoom-out" >
            <h2>Create An Account</h2>
            <form onSubmit={handleSubmit} >
            
                <div className='form-step'>
                  <input
                  
                    type="text"
                    name="first_name"
                    placeholder="Full Name"
                    value={formData.first_name}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    value={formData.last_name}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="text"
                    name="password"
                    placeholder="Password"
                    value={formData.sur_name}
                    onChange={handleChange}
                    required
                  />
                    <input
                    type="text"
                    name="sur_name"
                    placeholder="Comfirm Password"
                    value={formData.sur_name}
                    onChange={handleChange}
                    required
                  />
                    <label className='checkboxContainer'>
                    <input
                      type="checkbox"
                      name="agree"
                      className='checknox'
                      checked={formData.agree || false}
                      onChange={(e) => setFormData({ ...formData, agree: e.target.checked })}
                      required
                    />
                    <span className='checkboxLabel'>
                      I agree to the <a href="/terms" target="_blank" rel="noopener noreferrer">Terms of Service</a> and <a href="/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>.
                    </span>
                  </label>
                  <label className='checkboxContainer'>
                      <input
                        type="checkbox"
                        name="agree"
                        className='checknox'
                        checked={formData.agree || false}
                        onChange={(e) => setFormData({ ...formData, agree: e.target.checked })}
                        required
                      />
                      <span className='checkboxLabel'>
                      Remainber Me
                      </span>
                    </label>
                  
                  <button type="button">Sign UP</button>
                </div>
              

            
            </form>
            <p>
              I already have an account <Link to={'/login'}>Login</Link>
            </p>
          </div>

          </div>

       )
   
  )
}

export default Signin