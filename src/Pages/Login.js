import React, { useState, useEffect } from 'react';
import '../Style/Signin.css'
import { Link } from 'react-router-dom';
import ImageWithLoading from '../Components/ImageWithLoading';
import AOS from 'aos';


function Login() {
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
        <div className='Signin'  style={{justifyContent:'center' ,alignItems:'center', backgroundPosition:'center'}}>
        <div className='signin-container' style={{margin:0,height:'fit-content',borderRadius:10}}  data-aos="zoom-out">
     <h2 style={{marginTop:0}}>Login</h2>
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
           
           <button type="button">Sign In</button>
         </div>
         <p style={{textAlign:'center'}}>
          
                <Link to={'/login'}>Forgotten account?</Link>
               </p>
   

      

     
     </form>
    
   </div>

   </div>

       )
   
  )
}

export default Login