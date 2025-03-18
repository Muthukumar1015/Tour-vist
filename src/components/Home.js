"use client"; // Ensures client-side execution in Next.js

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import "bootstrap/dist/css/bootstrap.min.css";

import {
   FaEye,
   FaRegComment,
   FaHeart,
   FaHiking,
   FaShieldAlt,
   FaCameraRetro,
   FaMapMarkedAlt,
} from "react-icons/fa";

const Home = () => {
   const router = useRouter(); // Initialize router

   const handleBooking = (trail) => {
      router.push(`/booking?title=${encodeURIComponent(trail.name)}&price=${encodeURIComponent(trail.price)}&schedule=${encodeURIComponent(trail.schedule)}`);
   };
   
   
   useEffect(() => {
      if (typeof window !== "undefined") {
         import("bootstrap/dist/js/bootstrap.bundle.min.js").then(() => {
            const carouselElement = document.querySelector(
               "#testimonialCarousel"
            );
            
               });
      }
   }, []);
   

   return (
      <div className="bg-dark text-white">
      {/* Video Background Section */}
      <div className="position-relative vh-100">
         <video autoPlay loop muted playsInline className="position-absolute w-100 h-100 object-fit-cover">
            <source src="/background.mp4" type="video/mp4" />
            Your browser does not support the video tag.
         </video>
         <div className="position-absolute top-50 start-50 translate-middle text-center">
            <h1 className="fw-bold">Welcome to Mount Sleet</h1>
            <p>Explore the beauty of winter and create unforgettable experiences in the snow.</p>
            <button className="btn btn-light px-4 py-2 fw-bold" onClick={handleBooking}>
               Book a Trail
            </button>
         </div>
      </div>

         {/* Our Trails Section */}
         <div className="container w-75 mx-auto my-5">
            <div className="row shadow-lg rounded overflow-hidden">
               {/* Left Side - Image */}
               <div className="col-md-4 p-0">
                  <img
                     src="/trails.jpg"
                     alt="Snow Trail"
                     className="w-100 h-100 object-fit-cover rounded-start"
                  />
               </div>

               {/* Right Side - Trails List */}
               <div className="col-md-8 bg-secondary p-5 rounded-end">
                  <h2 className="mb-4 text-center">Our Trails</h2>
                  {[
                     {
                        name: "Half Day Snowshoe",
                        price: "$80",
                        schedule: "Offered Daily",
                     },
                     {
                        name: "Full Day Snowshoe",
                        price: "$120",
                        schedule: "Offered Daily",
                     },
                     {
                        name: "Winter Walk",
                        price: "$40",
                        schedule: "Mon, Tue, Wed, Thu",
                     },
                     { name: "Ski Tour", price: "$100", schedule: "Sat" },
                  ].map((trail, index) => (
                     <div
                        key={index}
                        className="d-flex justify-content-between align-items-center mb-3 border-bottom pb-3"
                     >
                        <div>
                           <h5 className="mb-1">{trail.name}</h5>
                           <p className="mb-0">{trail.schedule}</p>
                           <p className="mb-0">{trail.price}</p>
                        </div>
                        <button className="btn btn-danger" onClick={() => handleBooking(trail)}>
                           Book Now
                        </button>
                     </div>
                  ))}
               </div>
            </div>
         </div>

         {/* "Make Winter Last Forever" Section */}
         <div className="container text-center my-5">
            <h2 className="fw-bold">Make Winter Last Forever</h2>
            <p className="w-50 mx-auto">
               Discover adventure, safety, and memorable experiences in our
               winter wonderland.
            </p>

            <div className="row mt-4">
               {[
                  {
                     icon: <FaHiking />,
                     title: "Adventure",
                     desc: "Experience thrilling snow trails and hikes.",
                  },
                  {
                     icon: <FaShieldAlt />,
                     title: "Safety",
                     desc: "Guided tours ensuring your security in the wild.",
                  },
                  {
                     icon: <FaCameraRetro />,
                     title: "Memories",
                     desc: "Capture moments that last a lifetime.",
                  },
                  {
                     icon: <FaMapMarkedAlt />,
                     title: "Experiences",
                     desc: "Explore breathtaking landscapes and routes.",
                  },
               ].map((item, index) => (
                  <div key={index} className="col-md-3">
                     <div className="fs-1 text-primary">{item.icon}</div>
                     <h5 className="mt-2">{item.title}</h5>
                     <p className="small text-muted">{item.desc}</p>
                  </div>
               ))}
            </div>

            <button className="btn btn-outline-light mt-3">Learn More</button>
         </div>

         {/* Peak Experiences Section (with Auto-Sliding Carousel and Dots) */}
         <div className="container my-5">
            <div className="row align-items-center bg-black text-white p-5 rounded shadow-lg">
               {/* Left Side - Testimonial Carousel */}
               <div className="col-md-6">
                  <h2 className="fw-bold">Peak Experiences</h2>
                  <div
                     id="testimonialCarousel"
                     className="carousel slide carousel-fade"
                  >
                     {/* Carousel Indicators (Dots Only, No Arrows) */}
                     <div className="carousel-indicators">
                        <button
                           type="button"
                           data-bs-target="#testimonialCarousel"
                           data-bs-slide-to="0"
                           className="active bg-danger"
                           aria-current="true"
                           aria-label="Slide 1"
                        ></button>
                        <button
                           type="button"
                           data-bs-target="#testimonialCarousel"
                           data-bs-slide-to="1"
                           className="bg-danger"
                           aria-label="Slide 2"
                        ></button>
                        <button
                           type="button"
                           data-bs-target="#testimonialCarousel"
                           data-bs-slide-to="2"
                           className="bg-danger"
                           aria-label="Slide 3"
                        ></button>
                     </div>

                     <div className="carousel-inner">
                        <div className="carousel-item active">
                           <p className="fst-italic">
                              “The best winter adventure I’ve ever had! The
                              guides were fantastic, and the trails were
                              breathtaking. Highly recommend!”
                           </p>
                           <p className="fw-bold">— Chloe</p>
                        </div>
                        <div className="carousel-item">
                           <p className="fst-italic">
                              “I had an unforgettable time on the ski tour.
                              Everything was well-organized, and the views were
                              stunning!”
                           </p>
                           <p className="fw-bold">— Mark</p>
                        </div>
                        <div className="carousel-item">
                           <p className="fst-italic">
                              “A perfect blend of adventure and relaxation. The
                              guides made sure we were safe while having the
                              time of our lives.”
                           </p>
                           <p className="fw-bold">— Mk</p>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Right Side - Static Image */}
               <div className="col-md-6">
                  <img
                     src="/testimonial.jpg"
                     alt="Happy Group in Snow"
                     className="w-100 rounded"
                  />
               </div>
            </div>
         </div>
         {/* "Sleet News" Section */}
         <div className="container text-center my-5">
            <h2 className="fw-bold">Sleet News</h2>
            <p>Stay updated with the latest winter adventures and tips.</p>

            <div className="row">
               {[
                  {
                     img: "/news1.jpg",
                     title: "How to Experience Winter Hikes Virtually",
                  },
                  {
                     img: "/news2.jpg",
                     title: "Snow and Weather Report: December",
                  },
                  {
                     img: "/news3.jpg",
                     title: "Top Winter Navigation Tips;December",
                  },
               ].map((news, index) => (
                  <div key={index} className="col-md-4">
                     <div className="card border-0 shadow-lg">
                        <img
                           src={news.img}
                           alt={news.title}
                           className="card-img-top"
                        />
                        <div className="card-body bg-dark text-white">
                           <h5 className="card-title">{news.title}</h5>
                           <div className="d-flex justify-content-between">
                              <span>
                                 <FaEye /> 0 <FaRegComment /> 0
                              </span>
                              <FaHeart className="text-danger" />
                           </div>
                        </div>
                     </div>
                  </div>
               ))}
            </div>

            <button className="btn btn-outline-light mt-3">Read More</button>
         </div>
         {/* Extra Space Below */}
         <div className="py-5"></div>
      </div>
   );
};

export default Home;
