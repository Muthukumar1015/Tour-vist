"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Booking = () => {
   const router = useRouter();
   const searchParams = useSearchParams();

   const selectedTrail = {
      title: searchParams.get("title"),
      location: "San Francisco",
      staff: "Staff Member #2",
      duration: searchParams.get("duration"),
      price: parseFloat(searchParams.get("price")) || 0,
      img: searchParams.get("img"),
   };

   const [selectedDate, setSelectedDate] = useState(null);
   const [month, setMonth] = useState(new Date().getMonth());
   const [year, setYear] = useState(new Date().getFullYear());
   const [selectedTime, setSelectedTime] = useState(null);
   const [members, setMembers] = useState(1);
   const [isLoggedIn, setIsLoggedIn] = useState(false);

   const today = new Date();
   const availableTimes = ["7:00 am", "9:00 am", "11:00 am", "1:00 pm", "3:00 pm"];

   // Calculate total price dynamically
   const totalPrice = (selectedTrail.price * members).toFixed(2);

   // Check if user is authenticated
   useEffect(() => {
      const token = localStorage.getItem("authToken");
      setIsLoggedIn(!!token);
   }, []);

   const handleDateClick = (day) => {
      const selectedFullDate = new Date(year, month, day);
      if (selectedFullDate >= today) {
         setSelectedDate(`${year}-${month + 1}-${day}`);
      }
   };

   const changeMonth = (direction) => {
      let newMonth = month + direction;
      let newYear = year;

      if (newMonth < 0) {
         newMonth = 11;
         newYear--;
      } else if (newMonth > 11) {
         newMonth = 0;
         newYear++;
      }

      if (newYear >= 2025 && newYear <= 2027) {
         setMonth(newMonth);
         setYear(newYear);
      }
   };

   const handleConfirmBooking = () => {
      if (!isLoggedIn) {
         alert("You need to log in to continue.");
         router.push("/login");
         return;
      }

      if (!selectedDate || !selectedTime) {
         alert("Please select a date and time before proceeding!");
         return;
      }

      router.push(
         `/booking-details?title=${encodeURIComponent(selectedTrail.title)}&price=${encodeURIComponent(totalPrice)}&date=${encodeURIComponent(selectedDate)}&time=${encodeURIComponent(selectedTime)}&location=${encodeURIComponent(selectedTrail.location)}&staff=${encodeURIComponent(selectedTrail.staff)}&duration=${encodeURIComponent(selectedTrail.duration)}&members=${members}`
      );
   };

   return (
      <div className="container my-5">
         <Link href="/" className="text-dark d-flex align-items-center mb-3">
            <FaChevronLeft className="me-1" /> Back
         </Link>
         <h2 className="fw-bold">{selectedTrail.title}</h2>
         <p>Check out our availability and book the date and time that works for you</p>

         <div className="row">
            <div className="col-md-8">
               <h5>Select a Date and Time</h5>
               <div className="d-flex justify-content-between">
                  <button className="btn" onClick={() => changeMonth(-1)}>
                     <FaChevronLeft />
                  </button>
                  <span>{new Date(year, month).toLocaleString("default", { month: "long" })} {year}</span>
                  <button className="btn" onClick={() => changeMonth(1)}>
                     <FaChevronRight />
                  </button>
               </div>

               <div className="calendar-grid mt-2">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                     <div key={day} className="calendar-day">{day}</div>
                  ))}
                  {Array.from({ length: new Date(year, month, 1).getDay() }).map((_, index) => (
                     <div key={`empty-${index}`} className="calendar-cell empty"></div>
                  ))}
                  {Array.from({ length: new Date(year, month + 1, 0).getDate() }).map((_, day) => {
                     const dateObj = new Date(year, month, day + 1);
                     const isPast = dateObj < today;

                     return (
                        <div
                           key={day}
                           className={`calendar-cell ${selectedDate === `${year}-${month + 1}-${day + 1}` ? "selected" : ""} ${isPast ? "disabled" : ""}`}
                           onClick={() => !isPast && handleDateClick(day + 1)}
                        >
                           {day + 1}
                        </div>
                     );
                  })}
               </div>

               {selectedDate && (
                  <>
                     <p className="mt-3 fw-bold">
                        {new Date(selectedDate).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
                     </p>
                     <div className="d-flex gap-2 flex-wrap">
                        {availableTimes.map((time, index) => (
                           <button
                              key={index}
                              className={`btn btn-outline-dark ${selectedTime === time ? "selected-time" : ""}`}
                              onClick={() => setSelectedTime(time)}
                           >
                              {time}
                           </button>
                        ))}
                     </div>
                  </>
               )}
            </div>

            <div className="col-md-4">
               <div className="border p-3">
                  <h5>Service Details</h5>
                  <img src={selectedTrail.img} alt={selectedTrail.title} className="img-fluid mb-2 rounded" />
                  <p className="fw-bold">{selectedTrail.title}</p>
                  <p>Members: 
                     <button className="btn btn-sm btn-outline-dark ms-2" onClick={() => setMembers(members > 1 ? members - 1 : 1)}>-</button>
                     <span className="mx-2">{members}</span>
                     <button className="btn btn-sm btn-outline-dark" onClick={() => setMembers(members + 1)}>+</button>
                  </p>
                  <p className="fw-bold">Total: ${totalPrice}</p>

                  {selectedDate && selectedTime ? (
                     <>
                        <p>{new Date(selectedDate).toLocaleDateString()} at {selectedTime}</p>
                        <p>{selectedTrail.location}</p>
                        <p>{selectedTrail.staff}</p>
                        <p>{selectedTrail.duration}</p>
                        <button className="btn btn-danger w-100" onClick={handleConfirmBooking}>
                           Next
                        </button>
                     </>
                  ) : (
                     <button className="btn btn-secondary w-100" disabled>
                        Next
                     </button>
                  )}
               </div>
            </div>
         </div>

         <style jsx>{`
            .calendar-grid {
               display: grid;
               grid-template-columns: repeat(7, 1fr);
               gap: 5px;
            }
            .calendar-day {
               font-weight: bold;
               color: gray;
            }
            .calendar-cell {
               padding: 10px;
               text-align: center;
               cursor: pointer;
               border-radius: 5px;
               background: #f8f9fa;
            }
            .calendar-cell.selected {
               background: black;
               color: white;
            }
            .calendar-cell:hover {
               background: lightgray;
            }
            .calendar-cell.disabled {
               background: #e0e0e0;
               cursor: not-allowed;
            }
            .selected-time {
               background: black !important;
               color: white !important;
            }
            .disabled {
               opacity: 0.5;
               cursor: not-allowed;
            }
         `}</style>
      </div>
   );
};

export default Booking;
