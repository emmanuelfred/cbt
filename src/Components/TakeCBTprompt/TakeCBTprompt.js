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


// Dummy data - Replace this with real leaderboard data from backend
const leaderboardData = [
  {
    name: "Chisom Okafor",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    score: 94,
    date: "2025-06-01",
  },
  {
    name: "Ada Nwosu",
    avatar: "https://randomuser.me/api/portraits/women/45.jpg",
    score: 92,
    date: "2025-06-02",
  },
  {
    name: "Ibrahim Musa",
    avatar: "https://randomuser.me/api/portraits/men/74.jpg",
    score: 90,
    date: "2025-06-01",
  },
  {
    name: "Blessing Eze",
    avatar: "https://randomuser.me/api/portraits/women/24.jpg",
    score: 89,
    date: "2025-06-03",
  },
  // ... add up to top 10
];

function TakeCBTprompt() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000); // fake delay
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
          : leaderboardData.map((student, index) => (
              <SwiperSlide key={index}>
                <div className="leaderboard-card p-3 rounded text-center">
                  <img
                    src={student.avatar}
                    alt={student.name}
                    className="leaderboard-avatar"
                  />
                  <h5>{student.name}</h5>
                  <p className="text-muted">🗓️ {new Date(student.date).toDateString()}</p>
                  <div className="score-box">
                    Score: <strong>{student.score}%</strong>
                  </div>
                </div>
              </SwiperSlide>
            ))}
      </Swiper>

    </div>

    </div>
  );
}

export default TakeCBTprompt;
