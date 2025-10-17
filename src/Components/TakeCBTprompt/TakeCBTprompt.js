import { useEffect, useState } from 'react';
import cbt from '../../Assets/banner/cbt.png';
import './TakeCBTprompt.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Link } from 'react-router-dom';
import ImageWithLoading from '../ImageWithLoading';
import Skeleton from 'react-loading-skeleton';
import { useCbtstore } from '../../store/cbtStore';



function TakeCBTprompt() {
  const [loading, setLoading] = useState(true);
  const [attempts ,setAttempts] = useState([])
  const { getAllAttempts } = useCbtstore();

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000); // fake delay
  }, []);
useEffect(() => {
  const fetchLeaderboard = async () => {
    try {
      const res = await getAllAttempts();
      
      // Filter those who allowed sharing
      const shared = res.attempts.filter(a => a.sharePermission);

      // Sort by percentage descending
      const sorted = shared.sort((a, b) => b.percentage - a.percentage);

      // Pick top 10
      const top10 = sorted.slice(0, 10);

      setAttempts(top10);
    } catch (err) {
      console.error("Error loading leaderboard:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchLeaderboard();
}, []);


 
  return (
    <div className='TakeCBTprompt container py-5'  >
      {
        loading?(
          <ImageWithLoading height={400}/>


        ):(
          <div className='row align-items-center  detail-container' >
        <div className='col-md-5 mb-4 mb-md-0'>
          <img src={cbt} alt='CBT Illustration' className='img-fluid rounded' />
        </div>
        <div className='col-md-6'>
          <h2 className='mb-3'>Ready to Test Your Knowledge?</h2>
          <p>
            Step into the future of learning with our <strong>Computer-Based Test (CBT)</strong> platform!
            Designed to help you practice real exam questions, track your progress instantly, and improve your performance—all in a smart and simple way.
          </p>
          <ul>
            <li>📘 Practice subject-specific questions</li>
            <li>⏱️ Time-based sessions for real exam experience</li>
            <li>📊 Instant feedback and performance tracking</li>
          </ul>
          <div className='text-center mt-2 btn-container'>
                <Link to='/classroom?page=takeCBT' className='reveal-button  '>Take a CBT Now</Link>
               
            </div>
        </div>
      </div>
        )
      }
      
      <div className="cbt-leaderboard ">
        {
          loading ? ( <Skeleton width={'70%'} height={30}/>):(
            <h3 className='py-2'>🏆 Top 10 CBT Performers</h3>

          )
        }
      

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        autoplay={{ delay: 3000 }}
        loop={true}
        breakpoints={{
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
      >
        {loading
          ? [...Array(4)].map((_, index) => (
              <SwiperSlide key={index}>
                <div className="leaderboard-card p-3 rounded text-center mt-2">
                  <div style={{margin:'0 auto',overflow:'hidden',width:80,height:80,borderRadius:'50%'}}>

                  <ImageWithLoading height={80} width={80}/>
                  </div>
                 
                  
                  <h5><Skeleton width={120} /></h5>
                  <p className="text-muted">
                    <Skeleton width={100} />
                  </p>
                  <div className="score-box">
                    <Skeleton width={80} />
                  </div>
                </div>
              </SwiperSlide>
            ))
          : attempts.map((student, index) => (
          <SwiperSlide key={student._id}>
            <div className="leaderboard-card p-3 rounded text-center">
              <img
                src={student.avatar}
                alt={student.name}
                className="leaderboard-avatar"
                style={{width:80,height:80,minWidth:80,minHeight:80}}
              />
              <div className='leaderboard-info'>
                <h5>{student.name}</h5>
                <span className="text-muted">🗓️ {new Date(student.date).toDateString()}</span>
                <div className="score-box">
                  Score: <strong>{student.percentage}%</strong>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))
        }
      </Swiper>

    </div>

    </div>
  );
}

export default TakeCBTprompt;
