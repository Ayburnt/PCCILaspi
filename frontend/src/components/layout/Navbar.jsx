import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [membershipOpen, setMembershipOpen] = useState(false); // For desktop dropdown
  const [mobileMembershipOpen, setMobileMembershipOpen] = useState(false); // For mobile dropdown
  const [eventsOpen, setEventsOpen] = useState(false); // For desktop events dropdown
  const [mobileEventsOpen, setMobileEventsOpen] = useState(false); // For mobile events dropdown
  const [aboutOpen, setAboutOpen] = useState(false); // For desktop about dropdown
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false); // For mobile about dropdown

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsOpen(false);
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-20 items-center">
          {/* Brand / Logo */}
          <Link
            to="/"
            onClick={scrollToTop}
            className="flex items-center gap-3"
          >
            <img
              src="/pcci-logo.png"
              alt="PCCI Las Piñas Logo"
              className="w-12 h-12 rounded-full border-2 border-yellow-500 shadow-sm object-cover"
            />
            <div className="leading-tight">
              <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
                PCCI
              </h1>
              <span className="text-xs font-semibold text-gray-500 tracking-widest uppercase">
                Las Piñas City
              </span>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8 text-sm font-semibold uppercase tracking-wide text-gray-600">
            <Link
              to="/"
              onClick={scrollToTop}
              className="hover:text-blue-900 transition border-b-2 border-transparent hover:border-red-500"
            >
              Home
            </Link>
            {/* About Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setAboutOpen(!aboutOpen);
                  setMembershipOpen(false);
                  setEventsOpen(false);
                }}
                className={`flex items-center transition border-b-2 ${
                  aboutOpen ? "border-red-500" : "border-transparent"
                } hover:border-red-500`}
              >
                ABOUT US <ChevronDown size={16} className="ml-1" />
              </button>
              {aboutOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg z-50">
                  <Link
                    to="/about/about-us"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setAboutOpen(false)}
                  >
                    About
                  </Link>
                  <Link
                    to="/about/leadership"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setAboutOpen(false)}
                  >
                    Leadership
                  </Link>
                  <Link
                    to="/about/contact-us"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setAboutOpen(false)}
                  >
                    Contact Us
                  </Link>
                </div>
              )}
            </div>

            {/* Membership Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setMembershipOpen(!membershipOpen);
                  setEventsOpen(false); // Close other dropdown
                }}
                className={`flex items-center transition border-b-2 ${
                  membershipOpen ? "border-red-500" : "border-transparent"
                } hover:border-red-500`}
              >
                MEMBERSHIP <ChevronDown size={16} className="ml-1" />
              </button>
              {membershipOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg z-50">
                  <Link
                    to="/members-directory"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setMembershipOpen(false)}
                  >
                    Members Directory
                  </Link>
                  <Link
                    to="/how-to-become-member"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setMembershipOpen(false)}
                  >
                    How to Become a Member
                  </Link>
                  <Link
                    to="/why-join-us"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setMembershipOpen(false)}
                  >
                    Why Join Us
                  </Link>
                </div>
              )}
            </div>

            {/* Events Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setEventsOpen(!eventsOpen);
                  setMembershipOpen(false); // Close other dropdown
                }}
                className={`flex items-center transition border-b-2 ${
                  eventsOpen ? "border-red-500" : "border-transparent"
                } hover:border-red-500`}
              >
                EVENTS <ChevronDown size={16} className="ml-1" />
              </button>
              {eventsOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg z-50">
                  <Link
                    to="/events/upcoming"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setEventsOpen(false)}
                  >
                    Upcoming Events
                  </Link>
                  <Link
                    to="/events/past"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setEventsOpen(false)}
                  >
                    Past Events
                  </Link>
                </div>
              )}
            </div>

            <a
              href="/news"
              className="hover:text-blue-900 transition border-b-2 border-transparent hover:border-red-500"
            >
              News
            </a>

            <Link
              to="/join"
              onClick={scrollToTop}
              className="bg-blue-900 text-white px-5 py-2 rounded hover:bg-blue-800 transition"
            >
              Join Us
            </Link>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-50 border-t">
          <Link
            to="/"
            className="block py-3 px-4 text-gray-700 border-b"
            onClick={scrollToTop}
          >
            Home
          </Link>

          {/* Mobile About Dropdown */}
          <button
            className="w-full text-left flex justify-between items-center py-3 px-4 border-b text-gray-700 font-semibold"
            onClick={() => setMobileAboutOpen(!mobileAboutOpen)}
          >
            ABOUT US <ChevronDown size={16} />
          </button>
          {mobileAboutOpen && (
            <div className="pl-6 bg-gray-100">
              <Link
                to="/about/about-us"
                className="block py-2 px-4 hover:bg-gray-200"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link
                to="/about/leadership"
                className="block py-2 px-4 hover:bg-gray-200"
                onClick={() => setIsOpen(false)}
              >
                Leadership
              </Link>
              <Link
                to="/about/contact-us"
                className="block py-2 px-4 hover:bg-gray-200"
                onClick={() => setIsOpen(false)}
              >
                Contact Us
              </Link>
            </div>
          )}

          {/* Mobile Membership Dropdown */}
          <button
            className="w-full text-left flex justify-between items-center py-3 px-4 border-b text-gray-700 font-semibold"
            onClick={() => setMobileMembershipOpen(!mobileMembershipOpen)}
          >
            MEMBERSHIP <ChevronDown size={16} />
          </button>
          {mobileMembershipOpen && (
            <div className="pl-6 bg-gray-100">
              <Link
                to="/members-directory"
                className="block py-2 px-4 hover:bg-gray-200"
                onClick={() => setIsOpen(false)}
              >
                Members Directory
              </Link>
              <Link
                to="/how-to-become-member"
                className="block py-2 px-4 hover:bg-gray-200"
                onClick={() => setIsOpen(false)}
              >
                How to Become a Member
              </Link>
              <Link
                to="/why-join-us"
                className="block py-2 px-4 hover:bg-gray-200"
                onClick={() => setIsOpen(false)}
              >
                Why Join Us
              </Link>
            </div>
          )}

          {/* Mobile Events Dropdown */}
          <button
            className="w-full text-left flex justify-between items-center py-3 px-4 border-b text-gray-700 font-semibold"
            onClick={() => setMobileEventsOpen(!mobileEventsOpen)}
          >
            EVENTS <ChevronDown size={16} />
          </button>
          {mobileEventsOpen && (
            <div className="pl-6 bg-gray-100">
              <Link
                to="/events/upcoming"
                className="block py-2 px-4 hover:bg-gray-200"
                onClick={() => setIsOpen(false)}
              >
                Upcoming Events
              </Link>
              <Link
                to="/events/past"
                className="block py-2 px-4 hover:bg-gray-200"
                onClick={() => setIsOpen(false)}
              >
                Past Events
              </Link>
            </div>
          )}

          <a
            href="/#news"
            className="block py-3 px-4 text-gray-700 border-b"
            onClick={() => setIsOpen(false)}
          >
            News
          </a>

          <Link
            to="/join"
            className="block py-3 px-4 text-blue-900 font-bold bg-blue-50"
            onClick={scrollToTop}
          >
            Join Us
          </Link>
        </div>
      )}
    </nav>
  );
}
