import React, {  useState,useEffect } from 'react';
import './Homepage.css';


import rohii from '../../images/rohit.png';
import kohli from '../../images/kohli.png';
import rohit from '../../images/rohit.png';
import first from '../../images/first.png';
import second from '../../images/second.png';
import third from '../../images/third.png';
import ipllogo from '../../images/ipllogo.jpg';
import profile from '../../images/profile.jpg';
import kohliHighlight from '../../images/kohli.jpg';
import kohliiHighlight from '../../images/kohlii.jpg';
import rohitHighlight from '../../images/rohit.jpg';

const Homepage = () => {
    const [userPopupVisible, setUserPopupVisible] = useState(false);
    const [userDetails, setUserDetails] = useState(null);
    useEffect(() => {
        openPopup();

        const carouselContainer = document.querySelector('.carousel-container');
        const items = Array.from(document.querySelectorAll('.carousel-item'));
        let index = 0; // Start with the first image

        const updateCarousel = () => {
            const itemWidth = items[0].offsetWidth + 20; // Width + gap between items
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

        // Initialize the carousel with the first image
        updateCarousel();

        // Auto slide every 2 seconds
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
        }, 500); // Match the transition duration
    }
    const handleProfileClick = () => {
        console.log("Profile button clicked");
        const user = JSON.parse(localStorage.getItem('userDetails'));
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
        localStorage.removeItem('userDetails');
        window.location.href = '/';
    };
 

    return (
        <div className="container">
            <div className="popup" id="popup">
                <div className="image-container">
                    <img src={second}alt="Image 1" />
                    <img src={third} alt="Image 2" />
                    <img src={first} alt="Image 3" />
                    <img src={second} alt="Image 1" />
                    <img src={third} alt="Image 2" />
                    <img src={first} alt="Image 3" />
                </div><hr /><br /><br /><br /><br /><br />
                <center onClick={closePopup} style={{ cursor: 'pointer' }}>
                    <svg className="arrows">
                        <path className="a1" d="M0 0 L30 32 L60 0"></path>
                        <path className="a2" d="M0 20 L30 52 L60 20"></path>
                        <path className="a3" d="M0 40 L30 72 L60 40"></path>
                    </svg>
                </center>
            </div>
            <aside className="sidebar">
                <div className="logo">
                    <img src={ipllogo} alt="IPL Logo" />
                </div>
                <nav className="nav">
                    <a href='/homepage' className="nav-item">Home</a>
                    <a href="/teams" className="nav-item">Teams</a>
                    <a href="/livescore" className="nav-item">Livescore</a>
                    <a href="/alert" className="nav-item">Notifications</a>
                    <a href="/userschedule" className="nav-item">Sechudles</a>
                </nav>
            </aside>
        
            <main className="main-content">
                <header className="header">
                    <div className="user-profile" onClick={handleProfileClick}>
                        <img src={profile} alt="User Profile" />
                    </div>
                </header>
                <section className="today-match">
                    <h2>Match Summary</h2>
                    <div className="carousel">
                        {/* <button className="carousel-arrow left-arrow">&lt;</button> */}
                        <div className="carousel-wrapper">
                            <div className="carousel-container">
                                <div className="carousel-item">
                                    <img src={rohii} alt="Match Image 1" />
                                </div>
                                <div className="carousel-item">
                                    <img src={kohli} alt="Match Image 2" />
                                </div>
                                <div className="carousel-item">
                                    <img src={rohii} alt="Match Image 4" />
                                </div>
                                <div className="carousel-item">
                                    <img src={rohii} alt="Match Image 5" />
                                </div>
                                <div className="carousel-item">
                                    <img src={kohli} alt="Match Image 6" />
                                </div>
                            </div>
                        </div>
                        {/* <button className="carousel-arrow right-arrow">&gt;</button> */}
                    </div>
                    <div className="match-details">
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
            <section className="highlights">
                    <h2>Highlights</h2>
                    <div className="highlight-cards">
                        <div className="highlight-card">
                            <img src={kohliHighlight} alt="Highlight 1" />
                            <p>CSK vs MI: Highlights</p>
                        </div>
                        <div className="highlight-card">
                            <img src={kohliiHighlight} alt="Highlight 2" />
                            <p>RCB vs SRH: Highlights</p>
                        </div>
                        <div className="highlight-card">
                            <img src={rohitHighlight} alt="Highlight 3" />
                            <p>KKR vs RR: Highlights</p>
                        </div>
                      
                    </div>
                   
                </section>
        </div>
   
    );
};

{/* // export default Homepage;
// function Homepage(){
//     return(
//         <>
//         <h1>homepage</h1>
//         </>
//     )
// } */}

export default Homepage