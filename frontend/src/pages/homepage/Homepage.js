
import React, { useState, useEffect } from 'react';
import './Homepage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import srkrlogo from  '../../images/srkrlogo.png';
import first from '../../images/first.png';
import second from '../../images/second.png';
import third from '../../images/third.png';
import ipllogo from '../../images/ipllogo.jpg';
import userlogo from '../../images/userlogo.png';
import high from '../../images/highligths.png';
import fix from '../../images/fix1.png';
import live from '../../images/live.png';
import winn from '../../images/WINN.png';
import srkrpos from '../../images/SRKRpos.png';
import bat from '../../images/BAT.png';
import bow from '../../images/BOW.png';
import mostruns from '../../images/mostruns.png';
import image from '../../images/image.png';

const Homepage = () => {
    const [userPopupVisible, setUserPopupVisible] = useState(false);
    const [userDetails, setUserDetails] = useState(null);

    useEffect(() => {
        const carouselContainer = document.querySelector('.carousel-container');
        const items = Array.from(document.querySelectorAll('.carousel-item'));
        let index = 0; 

        const updateCarousel = () => {
            const itemWidth = items[0].offsetWidth + 20; 
            const offset = -index * itemWidth;
            carouselContainer.style.transform = `translateX(${offset}px)`;
            items.forEach((item, i) => {
                item.classList.remove('middle');
                item.style.transform = 'scale(1)';
            });
            items[index].classList.add('middle');
            items[index].style.transform = 'scale(1.3)';
        }

        const autoSlide = () => {
            index = (index + 1) % items.length;
            updateCarousel();
        }

      
        updateCarousel();

    
        const interval = setInterval(autoSlide, 2000);

        return () => clearInterval(interval);
    }, []);

    const openPopup = () => {
        const popup = document.getElementById("popup");
        popup.classList.add("show");
        document.body.classList.add("blurred");
    }

    const closePopup = () => {
        const popup = document.getElementById("popup");
        popup.classList.remove("show");
        document.body.classList.remove("blurred");
        setTimeout(() => {
            popup.style.display = "none";
        }, 500); 
    }

    const handleProfileClick = () => {
        const user = JSON.parse(sessionStorage.getItem('userDetails'));
        if (user) {
            setUserDetails(user);
        } else {
            setUserDetails(null);
        }
        setUserPopupVisible(true);
    };

    const closeUserPopup = () => {
        setUserPopupVisible(false);
    };

    const closeUsersPopup = () => {
        setUserPopupVisible(false);
        sessionStorage.removeItem('userDetails');
        window.location.href = '/';
    };

    return (
        
        <div className="container">

          
                
         
           
            <aside className="sidebar" >
                <div className="logo">
                    <img src={srkrlogo} style={{height:'13vh',width:'13vh',marginLeft:'8vh'}} alt="IPL Logo" />
                </div>
                <div className='butt' style={{marginTop:'-2vh'}}>
               <a href='/'><button>Home</button></a>
               <a href='/teams'> <button>Teams</button></a>
               <a href='#'><button>LiveScore</button></a>
               <a href='/alert'><button>Notifications</button></a>
               <a href='/userschedule'><button>Schedules</button></a>
               <a href='/feedback'><button>feedback</button></a>
               <a href='/admin'><button>adminlogin</button></a>
               </div>
            </aside>
        
            <main className="main-content">
             
                <section className="today-match">
             <div  style={{backgroundColor:'red'}}>
    
             </div>
                <div onClick={handleProfileClick} style={{marginTop:'20vh',marginRight:'15vh'}}>
     
                    </div>
                 <div  className='mytext'>
                    <h2 >Match Summary</h2>
                    </div>
                    <div className="carousel" style={{marginBottom:'2vh'}}>
                        <div className="carousel-wrapper" style={{height:'100vh',}}>
                            <div className="carousel-container" style={{marginTop:'9vh'}}>
                                <div className="carousel-item">
                                    <img src={bat} style={{width:'34vh',height:'45vh'}} alt="Match Image 1" />
                                </div>
                                <div className="carousel-item">
                                    <img src={bow} style={{width:'34vh',height:'45vh'}}alt="Match Image 2" />
                                </div>
                                <div className="carousel-item">
                                    <img src={mostruns} style={{width:'34vh',height:'45vh'}}alt="Match Image 3" />
                                </div>
                                <div className="carousel-item">
                                    <img src={winn} style={{width:'34vh',height:'45vh'}}alt="Match Image 5" />
                                </div>
                                <div className="carousel-item">
                                    <img src={srkrpos} style={{width:'34vh',height:'45vh'}}alt="Match Image 4" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="match-details" style={{marginLeft:'20vh',marginTop:'10vh'}}>
                        <h3>DC vs KKR</h3>
                        <button className="watch-btn">Watch Live</button>
                    </div>
                </section>
               
                {userPopupVisible && (
                    <div className="user-popup">
                        <div className="user-popup-content">
                            <h3>User Profile</h3>
                            {userDetails ? (
                                <div>
                                    <p><strong>Name:</strong> {userDetails.name}</p>
                                    <p><strong>Email:</strong> {userDetails.email}</p>
                                    <p><strong>Registration Number:</strong> {userDetails.regNo}</p>
                                </div>
                            ) : (
                                <p>No user details found.</p>
                            )}
                            <button onClick={closeUserPopup}>Close</button>
                            <button onClick={closeUsersPopup}>Logout</button>
                        </div>
                    </div>
                )}
            </main>
            <section className="highlights" style={{marginLeft:'30vh'}}>
                <div className='mytext'>
                <h2>Highlights</h2>
                </div>
                <div className="highlight-cards">
                    <div className="highlight-card">
                        <img src={high} alt="Highlight 1" />
                      
                    </div>
                    <div className="highlight-card">
                        <img src={live} alt="Highlight 2" />
                      
                    </div>
                    <div className="highlight-card">
                        <img src={fix} alt="Highlight 3" />
                      
                    </div>
                </div>
            </section>  <br/> <br/>  <br/> 
            <div className='footer'>
                <h2 style={{marginLeft:'32vh' }}>SOCIALMEDIA PLATFORMS</h2>
                <p style={{marginLeft:'32vh',fontSize:'2vh'}}>Social media platforms have become integral to modern communication, shaping how we connect, share, and interact with the world. These platforms offer unprecedented reach and engagement, enabling individuals, businesses, and organizations to connect with vast audiences across the globe.</p>
            <div className="social-container">
            <a
                href="https://www.instagram.com/srkr_sports_club?igsh=MXVodzB5d3AxcGo3cw=="
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon instagram"
            >
                <FontAwesomeIcon icon={faInstagram}  style={{height:'5vh',marginLeft:'90vh'}}/>
            </a> 
            <a
                href="https://whatsapp.com/channel/0029VafwW7iKLaHqLUIsqF17"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon whatsapp"
                
            >
                <FontAwesomeIcon icon={faWhatsapp} style={{height:'5vh',marginLeft:'5vh'}} />
            </a>
        </div>
        </div>
 </div>
        
    );
};

export default Homepage;



