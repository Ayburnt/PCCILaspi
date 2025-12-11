import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-20 items-center">
          {/* Brand / Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center text-white font-bold border-2 border-yellow-500 shadow-sm">
              ⚙️
            </div>
            <div className="leading-tight">
              <h1 className="text-2xl font-bold text-gray-800 tracking-tight">PCCI</h1>
              <span className="text-xs font-semibold text-gray-500 tracking-widest uppercase">Las Piñas City</span>
            </div>
          </div>

          {/* Desktop Links - Mimics PCCI's clean text links */}
          <div className="hidden md:flex items-center space-x-8 text-sm font-semibold uppercase tracking-wide text-gray-600">
            <a href="#home" className="hover:text-blue-900 transition">Home</a>
            <a href="#about" className="hover:text-blue-900 transition">About Us</a>
            <a href="#news" className="hover:text-blue-900 transition">News</a>
            <a href="#join" className="bg-blue-900 text-white px-5 py-2 rounded hover:bg-blue-800 transition">
              Join Us
            </a>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-50 border-t">
          <a href="#home" className="block py-3 px-4 text-gray-700 border-b">Home</a>
          <a href="#about" className="block py-3 px-4 text-gray-700 border-b">About Us</a>
          <a href="#news" className="block py-3 px-4 text-gray-700 border-b">News</a>
          <a href="#join" className="block py-3 px-4 text-blue-900 font-bold bg-blue-50">Join Us</a>
        </div>
      )}
    </nav>
  );
}