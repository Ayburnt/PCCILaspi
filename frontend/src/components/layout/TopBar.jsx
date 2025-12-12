import { Phone, Mail, Facebook, Linkedin } from 'lucide-react';

export default function TopBar() {
  return (
    <div className="bg-blue-900 text-white text-xs py-2 w-full relative z-50">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <div className="flex gap-4">
          <span className="flex items-center gap-2"><Phone size={14} /> (02) 8-123-4567</span>
          <span className="flex items-center gap-2"><Mail size={14} /> secretariat@psmelaspinas.org</span>
        </div>
        <div className="hidden md:flex gap-4">
          <a href="#" className="hover:text-yellow-400 flex items-center gap-1"><Facebook size={14}/> Follow us</a>
          <span className="text-yellow-400 font-bold tracking-wide">LAS PIÑAS CHAPTER</span>
        </div>
      </div>
    </div>
  );
}