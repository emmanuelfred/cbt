import { useState, useEffect } from 'react';
import '../Style/Signin.css'
import FloatingShape from '../Components/FloatingShape'
import ImageWithLoading from '../Components/ImageWithLoading';

import AOS from 'aos';
import SignUpPage from '../imported/SignUpPage';
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




  return (
    loading ? 
       (<div style={{padding:10}} ><ImageWithLoading height={900}/></div>)
       : (
        <div
        style={{paddingTop:100}}
          className='min-h-screen bg-gradient-to-br from-[#15253a] via-[#20537c] to-[#15253a] flex items-center justify-center relative overflow-hidden'
        >
          <FloatingShape color='bg-[#f4825d]' size='w-64 h-64' top='-5%' left='10%' delay={0} />
          <FloatingShape color='bg-[#f4825d]' size='w-48 h-48' top='70%' left='80%' delay={5} />
          <FloatingShape color='bg-[#f4825d]' size='w-32 h-32' top='40%' left='-10%' delay={2} />
          
          <SignUpPage/>


        </div>

        

       )
   
  )
}

export default Signin