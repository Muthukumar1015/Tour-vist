"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Booking = () => {
   const router = useRouter();

   const handleConfirmBooking = (trail) => {
      router.push(
         `/booking-details?title=${encodeURIComponent(trail.title)}&price=${encodeURIComponent(trail.price)}&duration=${encodeURIComponent(trail.duration)}&img=${encodeURIComponent(trail.img)}`
      );
   };
   

   return (
      <div className="container text-center my-5">
         <h2 className="fw-bold">Complete Your Booking</h2>
         <p>Select your trail and provide details to confirm your adventure.</p>

         <div className="row">
            {[
               { img: "/trail1.jpg", title: "Half Day Snowshoe", duration: "5 hr", price: "$80" },
               { img: "/trail2.jpg", title: "Full Day Snowshoe", duration: "8 hr", price: "$120" },
               { img: "/trail3.jpg", title: "Winter Walk", duration: "6 hr", price: "$90" },
               { img: "/trail4.jpg", title: "Ski Tour", duration: "10 hr", price: "$150" },
            ].map((trail, index) => (
               <div key={index} className="col-md-6 col-lg-3">
                  <div className="card shadow-lg border-0">
                     <img src={trail.img} alt={trail.title} className="card-img-top" />
                     <div className="card-body">
                        <h5 className="card-title">{trail.title}</h5>
                        <p>{trail.duration}</p>
                        <p className="fw-bold">{trail.price}</p>
                        <button className="btn btn-danger" onClick={() => handleConfirmBooking(trail)}>
                           Confirm Booking
                        </button>
                     </div>
                  </div>
               </div>
            ))}
         </div>

         {/* Back to Home Button */}
         <Link href="/">
            <button className="btn btn-secondary mt-3">Back to Home</button>
         </Link>
      </div>
   );
};

export default Booking;
