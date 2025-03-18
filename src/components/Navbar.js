"use client";
import { useRouter } from "next/navigation";
import Link from "next/link"; // ✅ Import Link
import { FaUserCircle } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = () => {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push("/login"); // Redirects to login page
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link href="/about" className="nav-link">About</Link>
          </li>
          <li className="nav-item">
            <Link href="/trails" className="nav-link">Trails</Link>
          </li>
          <li className="nav-item">
            <Link href="/news" className="nav-link">News</Link>
          </li>
          <li className="nav-item">
            <Link href="/contact" className="nav-link">Contact</Link>
          </li>
          <li className="nav-item">
            <button className="nav-link btn btn-link text-danger d-flex align-items-center" onClick={handleLoginClick}>
              <FaUserCircle size={20} className="me-1" /> Log In
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
