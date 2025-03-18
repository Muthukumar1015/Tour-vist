"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap

const Auth = () => {
   const router = useRouter();
   const [isRegister, setIsRegister] = useState(false); // Toggle between login & register
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");
   const [error, setError] = useState("");
   const [successMessage, setSuccessMessage] = useState("");

   const handleSubmit = async (e) => {
      e.preventDefault();

      if (!email || !password) {
         setError("All fields are required!");
         return;
      }

      if (isRegister) {
         if (password !== confirmPassword) {
            setError("Passwords do not match!");
            return;
         }

         try {
            // Simulate a registration API call
            const response = await fetch("https://jsonplaceholder.typicode.com/users", {
               method: "POST",
               headers: {
                  "Content-Type": "application/json",
               },
               body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
               throw new Error("Registration failed. Please try again.");
            }

            // Store user data (including email) in localStorage
            localStorage.setItem("user", JSON.stringify({ email, password }));
            setIsRegister(false); // Switch to login
            setError("");
            alert("Registration successful! Please log in.");
         } catch (err) {
            setError(err.message);
         }
      } else {
         try {
            // Retrieve stored user data from localStorage
            const storedUser = JSON.parse(localStorage.getItem("user"));

            if (!storedUser) {
               setError("User not found! Please register first.");
               return;
            }

            // Check if the stored email and password match the input
            if (storedUser.email === email && storedUser.password === password) {
               localStorage.setItem("authToken", "sampleToken123");
               setSuccessMessage("Continue your trip plan!");
               setTimeout(() => {
                  router.push("/dashboard");
               }, 5000);
            } else {
               setError("Invalid email or password!");
            }
         } catch (err) {
            setError("Login failed! Please try again.");
         }
      }
   };

   // Internal Styles
   const containerStyle = {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      background: "#e0e5ec",
   };

   const cardStyle = {
      width: "350px",
      padding: "20px",
      background: "#f8f9fa",
      boxShadow: "10px 10px 20px #babecc, -10px -10px 20px #ffffff",
      borderRadius: "10px",
      transition: "transform 0.4s ease-in-out, opacity 0.4s ease-in-out",
      transform: isRegister ? "translateX(5%)" : "translateX(0%)",
      opacity: isRegister ? "0.95" : "1",
   };

   const popupStyle = {
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      background: "#fff",
      padding: "20px 30px",
      borderRadius: "12px",
      boxShadow: "0px 8px 20px rgba(0,0,0,0.3)",
      textAlign: "center",
      zIndex: 1000,
      color: "#333",
      transition: "transform 0.4s ease-in-out",
   };

   return (
      <div style={containerStyle}>
         <div style={cardStyle}>
            <h2 className="text-center">{isRegister ? "Register" : "Login"}</h2>
            {error && <p className="text-danger text-center">{error}</p>}
            <form onSubmit={handleSubmit}>
               <div className="mb-3">
                  <input
                     type="email"
                     className="form-control"
                     placeholder="Email"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     required
                  />
               </div>
               <div className="mb-3">
                  <input
                     type="password"
                     className="form-control"
                     placeholder="Password"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     required
                  />
               </div>
               {isRegister && (
                  <div className="mb-3">
                     <input
                        type="password"
                        className="form-control"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                     />
                  </div>
               )}
               <button type="submit" className="btn btn-primary w-100">
                  {isRegister ? "Register" : "Sign In"}
               </button>
            </form>
            <p className="text-center mt-3">
               {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
               <button
                  className="btn btn-link p-0"
                  onClick={() => setIsRegister(!isRegister)}
               >
                  {isRegister ? "Login" : "Register"}
               </button>
            </p>
         </div>

         {successMessage && (
            <div style={popupStyle}>
               <h5 className="mb-3">✈️ 🌍 🧳 {successMessage}</h5>
               <p>Get ready to explore and plan your next adventure!</p>
               <button
                  className="btn btn-success w-100"
                  onClick={() => router.push("/booking-details")}
               >
                  Continue with Trip Mode
               </button>
            </div>
         )}
      </div>
   );
};

export default Auth;
