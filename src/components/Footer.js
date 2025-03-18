"use client";

import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaFacebookF, FaInstagram, FaArrowUp } from "react-icons/fa";

const Footer = () => {
  // Function to handle smooth scrolling
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-dark text-light py-5">
      <div className="container">
        <div className="row align-items-center">
          {/* Left Section - Brand Info */}
          <div className="col-md-4 text-center text-md-start mb-4 mb-md-0">
            <h5 className="fw-bold">Mount Sleet</h5>
            <p className="text-secondary mb-1">Winter Tours & Adventures</p>
            <p className="text-secondary small">&copy; {new Date().getFullYear()} Mount Sleet. All Rights Reserved.</p>
          </div>

          {/* Center Section - Navigation Links */}
          <div className="col-md-4 text-center">
            <ul className="list-unstyled mb-0">
              {["About", "Trails", "News", "Contact"].map((item, index) => (
                <li key={index} className="mb-2">
                  <Link href={`/${item.toLowerCase()}`} className="text-light text-decoration-none fw-light">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Section - Social & Booking */}
          <div className="col-md-4 text-center text-md-end">
            <div className="d-flex justify-content-center justify-content-md-end gap-3 mb-3">
              <Link href="#" className="text-light fs-5">
                <FaFacebookF />
              </Link>
              <Link href="#" className="text-light fs-5">
                <FaInstagram />
              </Link>
            </div>
            <button className="btn btn-danger px-4 py-2 fw-bold">Book Now</button>
          </div>
        </div>

        {/* Go Up Button with Smooth Scrolling */}
        <div className="text-center mt-4">
          <button onClick={scrollToTop} className="btn btn-link text-light text-decoration-none fw-bold">
            Go Up <FaArrowUp />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
