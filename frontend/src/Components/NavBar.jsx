import { Link, useNavigate } from "react-router";
import { FaRegUserCircle } from "react-icons/fa";
import { useRef, useState } from "react";

const NavBar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setShowDropdown(true);
  };
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setShowDropdown(false);
    }, 2000); // 2000ms = 2 seconds delay
  };
  const handleLogout = () => {
    console.log("User logged out");
    navigate("/login");
  };

  return (
    <div>
      <div>
        <div className="flex justify-between items-center bg-black text-white p-4">
          <div>
            <Link to={"/"} className="text-2xl">
              CleanSL
            </Link>
          </div>
          <div className="flex justify-between items-center gap-4">
            <Link to={"/"}>Home</Link>
            <Link to={"/job"}>Booking</Link>
            <Link
              to="/create"
              className="font-bold uppercase whitespace-nowrap btn"
            >
              BOOK NOW
            </Link>
            <div
              className="relative"
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              <FaRegUserCircle className="w-5 h-5 cursor-pointer hover:text-gray-300" />

              {/* Dropdown Menu */}
              {showDropdown && (
                <div
                  className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    to="/login"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Login
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
