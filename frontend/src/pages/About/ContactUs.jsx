import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, ChevronRight, FileText } from 'lucide-react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import TopBar from '../../components/layout/TopBar';
import { client } from '../../sanityClient';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const query = `*[_type == "siteSettings"][0]{
      addressLine1,
      addressLine2,
      contactPhone,
      contactPhone2,
      contactEmail2,
      businessHours,
      googleMapsEmbedUrl
    }`;

    client.fetch(query).then((data) => setSettings(data));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#fcfcfc] text-slate-900">
      <TopBar />
      <Navbar />

      {/* 1. FORMAL BREADCRUMB HEADER */}
      <div className="bg-[#155333] py-12 text-white">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-2 text-yellow-500 text-xs font-bold uppercase tracking-widest mb-4">
            <span>Home</span>
            <ChevronRight size={12} />
            <span className="text-white/80">Contact Us</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold font-serif mb-2">
            Official Correspondence
          </h1>
          <p className="text-green-100/70 max-w-2xl  text-sm md:text-base leading-relaxed">
            The PCCI Las Piñas Secretariat is available to assist with membership inquiries, 
            business certifications, and organizational partnership proposals.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 max-w-7xl">
        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* 2. LEFT SIDE: OFFICIAL DIRECTORY */}
          <aside className="lg:col-span-4 space-y-8">
            <section>
              <h3 className="text-xs font-bold text-[#155333] uppercase tracking-[0.2em] mb-6 border-b border-gray-200 pb-2">
                Secretariat Directory
              </h3>
              
              <div className="space-y-6">
                {/* Address */}
                <div className="flex gap-4">
                  <div className="shrink-0 w-10 h-10 bg-gray-100 flex items-center justify-center text-[#155333] rounded-sm">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm uppercase tracking-tight">Main Office Location</h4>
                    <p className="text-gray-600 text-sm mt-1 leading-relaxed">
                      {settings?.addressLine1 || 'Herkings Corporation'}<br />
                      {settings?.addressLine2 || 'Las Piñas City, Philippines'}
                    </p>
                  </div>
                </div>

                {/* Communication Lines */}
                <div className="flex gap-4">
                  <div className="shrink-0 w-10 h-10 bg-gray-100 flex items-center justify-center text-[#155333] rounded-sm">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm uppercase tracking-tight">Telephone Lines</h4>
                    <div className="text-gray-600 text-sm mt-1 space-y-1">
                      <p>{settings?.contactPhone || '+63 (02) 8XXX-XXXX'}</p>
                      {settings?.contactPhone2 && <p>{settings.contactPhone2}</p>}
                    </div>
                  </div>
                </div>

                {/* Electronic Mail */}
                <div className="flex gap-4">
                  <div className="shrink-0 w-10 h-10 bg-gray-100 flex items-center justify-center text-[#155333] rounded-sm">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm uppercase tracking-tight">Email Correspondence</h4>
                    <p className="text-gray-600 text-sm mt-1 break-all">
                      {settings?.contactEmail2 || 'secretariat@pccilaspinas.org'}
                    </p>
                  </div>
                </div>

                {/* Office Hours */}
                <div className="flex gap-4">
                  <div className="shrink-0 w-10 h-10 bg-gray-100 flex items-center justify-center text-[#155333] rounded-sm">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm uppercase tracking-tight">Standard Office Hours</h4>
                    <div 
                      className="text-gray-600 text-sm mt-1 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: settings?.businessHours?.replace(/\n/g, '<br />') || 'Monday - Friday: 9:00 AM - 5:00 PM' }} 
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Google Map - Simplified Styling */}
            <div className="h-64 bg-gray-200 border border-gray-300 rounded-sm overflow-hidden grayscale-[50%] contrast-[1.1]">
              <iframe 
                src={settings?.googleMapsEmbedUrl || "https://www.google.com/maps/embed?..."}
                className="w-full h-full border-0" 
                allowFullScreen="" 
                loading="lazy" 
                title="Office Location Map"
              ></iframe>
            </div>
          </aside>

          {/* 3. RIGHT SIDE: OFFICIAL INQUIRY FORM */}
          <main className="lg:col-span-8 bg-white border border-gray-200 p-8 md:p-12 shadow-sm">
            <div className="flex items-center gap-3 mb-8 text-[#155333]">
              <FileText size={24} />
              <h2 className="text-2xl font-bold  uppercase tracking-tight">Inquiry Submission Form</h2>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-widest">Full Name / Representative</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:border-[#155333] focus:ring-1 focus:ring-[#155333] outline-none transition-all text-sm"
                    placeholder="Enter full name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-widest">Official Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:border-[#155333] focus:ring-1 focus:ring-[#155333] outline-none transition-all text-sm"
                    placeholder="name@organization.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-widest">Nature of Inquiry (Subject)</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:border-[#155333] focus:ring-1 focus:ring-[#155333] outline-none transition-all text-sm"
                  placeholder="e.g., Membership Application, Partnership, Event Inquiry"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-widest">Detailed Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:border-[#155333] focus:ring-1 focus:ring-[#155333] outline-none transition-all text-sm resize-none"
                  placeholder="Provide a clear description of your request..."
                />
              </div>

              <div className="pt-4 border-t border-gray-100">
                <p className="text-[11px] text-gray-400 mb-6 leading-relaxed italic">
                  <strong>Notice:</strong> By submitting this form, you agree to the PCCI Las Piñas Data Privacy Policy. Your information will be used solely for the purpose of addressing your inquiry and will not be shared with third parties without official consent.
                </p>

                <button
                  type="submit"
                  disabled={isSubmitting || submitted}
                  className={`
                    w-full md:w-auto px-10 py-4 font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-3 transition-all duration-300
                    ${submitted ? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-[#155333] text-white hover:bg-slate-900'}
                  `}
                >
                  {isSubmitting ? 'Processing Submission...' : submitted ? 'Submission Received' : <>Submit Official Inquiry <Send size={14} /></>}
                </button>
              </div>
            </form>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}