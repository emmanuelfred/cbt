import React from 'react'
import { useAuthStore } from '../Store/authStore'

function Resendotp(email) {
    const{resendMail,isLoading}=useAuthStore()
    const handleResend=async()=>{
        await resendMail(email)
        }
  return (
    <div style={{marginTop:20,textAlign:'center'}}>
        <a onClick={
            handleResend
        } style={{background:'transparant',color:'#0C6F89',fontSize:16,fontWeight:200,border:'none',textAlign:'center',cursor:'pointer'}}>
            {isLoading?'...':'Resent Email'}
            </a>
    </div>
  )
}

export default Resendotp