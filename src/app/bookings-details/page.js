"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";

const BookingDetails = () => {
   const searchParams = useSearchParams();
   const router = useRouter();

   const bookingInfo = {
      title: searchParams.get("title") || "Unknown Trail",
      date: searchParams.get("date") || "N/A",
      time: searchParams.get("time") || "N/A",
      location: searchParams.get("location") || "San Francisco",
      staff: searchParams.get("staff") || "Staff Member #2",
      duration: searchParams.get("duration") || "N/A",
      members: searchParams.get("members") || 1,
      price: searchParams.get("price") || "0.00",
   };

   const [formData, setFormData] = useState({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
   });

   const [errors, setErrors] = useState({});
   const [showModal, setShowModal] = useState(false);

   useEffect(() => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser) {
         setFormData((prev) => ({
            ...prev,
            firstName: storedUser.firstName || "",
            lastName: storedUser.lastName || "",
            email: storedUser.email || "",
            phone: storedUser.phone || "",
         }));
      }
   }, []);

   const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };

   const validateForm = () => {
      let newErrors = {};
      if (!formData.firstName.trim()) newErrors.firstName = "First name is required.";
      if (!formData.lastName.trim()) newErrors.lastName = "Last name is required.";
      if (!formData.email.trim()) newErrors.email = "Email is required.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email format.";
      if (!formData.phone.trim()) newErrors.phone = "Phone number is required.";

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
   };

   const handleBooking = () => {
      if (validateForm()) {
         setShowModal(true); // Show modal only if form is valid
      }
   };

   return (
      <div className="container my-5">
         <Link href="/booking" className="text-dark d-flex align-items-center mb-3">
            &lt; Back
         </Link>
         <h3>Client Details</h3>
         <div className="border p-3 mb-3">
            <p>Have an account? <Link href="/login">Log in</Link></p>
         </div>
         <div className="row">
            <div className="col-md-6">
               <label>First name *</label>
               <input type="text" className="form-control" name="firstName" value={formData.firstName} onChange={handleChange} required />
               {errors.firstName && <small className="text-danger">{errors.firstName}</small>}

               <label>Last name *</label>
               <input type="text" className="form-control" name="lastName" value={formData.lastName} onChange={handleChange} required />
               {errors.lastName && <small className="text-danger">{errors.lastName}</small>}

               <label>Email *</label>
               <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
               {errors.email && <small className="text-danger">{errors.email}</small>}

               <label>Phone *</label>
               <input type="text" className="form-control" name="phone" value={formData.phone} onChange={handleChange} required />
               {errors.phone && <small className="text-danger">{errors.phone}</small>}

               <label>Add your message</label>
               <textarea className="form-control" name="message" value={formData.message} onChange={handleChange}></textarea>
            </div>
            <div className="col-md-6 border p-3">
               <h5>Booking Details</h5>
               <p><strong>{bookingInfo.title}</strong></p>
               <p>{bookingInfo.date} at {bookingInfo.time}</p>
               <p>{bookingInfo.location}</p>
               <p>{bookingInfo.staff}</p>
               <p>{bookingInfo.duration}</p>
               <p className="fw-bold">Total: ${bookingInfo.price}</p>
               <button className="btn btn-danger w-100" onClick={handleBooking}>Book Now</button>
            </div>
         </div>

         {/* Bootstrap Modal */}
         {showModal && (
            <div className="modal fade show d-block" tabIndex="-1" role="dialog">
               <div className="modal-dialog modal-dialog-centered" role="document">
                  <div className="modal-content text-center p-4">
                     <button type="button" className="close position-absolute end-0 m-3" onClick={() => setShowModal(false)}>&times;</button>
                     <h4 className="fw-bold">We can't accept online orders right now</h4>
                     <p>Please contact us to complete your purchase.</p>
                     <button className="btn btn-dark mt-3" onClick={() => setShowModal(false)}>Got It</button>
                  </div>
               </div>
            </div>
         )}

         <style jsx>{`
            .modal-content {
               max-width: 400px;
               margin: auto;
               background: white;
               border-radius: 10px;
               box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
            }
            .modal.fade.show {
               display: flex;
               align-items: center;
               justify-content: center;
               position: fixed;
               top: 0;
               left: 0;
               width: 100%;
               height: 100%;
               background: rgba(0, 0, 0, 0.5);
            }
            .close {
               background: none;
               border: none;
               font-size: 1.5rem;
               cursor: pointer;
            }
         `}</style>
      </div>
   );
};

export default BookingDetails;
