import { useState } from 'react';
import { X, Eye, EyeOff, Lock } from 'lucide-react';

const AdminLoginModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  if (!isOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    // 1. In a real app, you would check credentials here.
    // 2. For this "Starter Package", we treat this as a gateway.
    // 3. Redirect to the Sanity Studio (Backend)
    
    if(email && password) {
        // Change this URL to your deployed Studio URL later
        window.open('https://pccilaspi.sanity.studio/   ', '_blank'); 
        onClose();
    } else {
        alert("Please enter any email/password to proceed to the Studio.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-lg w-full max-w-md shadow-2xl relative animate-fade-in-up">
        
        {/* Header */}
        <div className="text-center pt-8 pb-4">
          <h2 className="text-2xl font-bold text-gray-900">Admin Login</h2>
          <p className="text-blue-900 text-sm mt-1">Use the admin email to access the CMS</p>
        </div>

        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
        >
          <X size={24} />
        </button>

        {/* Form */}
        <form onSubmit={handleLogin} className="p-8 pt-2 space-y-5">
          
          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input 
              type="email" 
              placeholder="Enter admin email" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-blue-900 outline-none transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Enter password" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-blue-900 outline-none transition"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className="w-full bg-blue-900 text-white font-bold py-3 rounded-lg hover:bg-blue-800 transition shadow-lg mt-2"
          >
            Sign In
          </button>

        </form>
      </div>
    </div>
  );
};

export default AdminLoginModal;