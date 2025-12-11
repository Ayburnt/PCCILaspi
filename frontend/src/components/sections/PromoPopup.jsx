import { useState, useEffect } from 'react';
import { X, CheckCircle } from 'lucide-react';

const PromoPopup = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Show popup after 2.5 seconds
    const timer = setTimeout(() => setShow(true), 10000);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center px-4 backdrop-blur-sm">
      <div className="bg-white rounded-lg p-8 max-w-md w-full relative shadow-2xl border-t-8 border-yellow-500">
        <button 
          onClick={() => setShow(false)} 
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500"
        >
          <X size={24} />
        </button>
        
        <div className="text-center">
          <div className="bg-yellow-100 text-yellow-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Membership Renewal</h3>
          <p className="text-gray-600 mb-6">The 2025 renewal period is now open. Renew early to avoid penalties.</p>
          <button 
            onClick={() => setShow(false)} 
            className="w-full bg-blue-900 text-white py-3 rounded-lg font-bold hover:bg-blue-800 transition"
          >
            Renew Online
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromoPopup; // <--- This was the missing line causing the error!