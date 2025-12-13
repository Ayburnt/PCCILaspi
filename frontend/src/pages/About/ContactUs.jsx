import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import TopBar from '../../components/layout/TopBar';

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 }
};

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log(formData);
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans selection:bg-blue-100 selection:text-blue-900">
      <TopBar />
      <Navbar />

      <div className="container mx-auto px-4 py-10 lg:py-16 max-w-7xl">
        
        {/* Simple Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
            Get in touch
          </h1>
          <p className="text-slate-600 max-w-xl mx-auto text-lg">
            We'd love to hear from you. Please fill out this form or visit us.
          </p>
        </div>

        {/* Main Content: Map (Left) + Form (Right) */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-8 mb-12"
        >
          
          {/* Left Side: Map Section (Your Map Integrated Here) */}
          <motion.div 
            variants={itemVariants} 
            className="h-full min-h-[400px] lg:min-h-full bg-slate-200 rounded-3xl overflow-hidden shadow-lg border border-gray-100"
          >
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15455.91361967532!2d120.99170295541992!3d14.428408100000006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397d1e8304f75a1%3A0x1c68b907ad58778b!2sHerkings%20Corporation!5e0!3m2!1sen!2sph!4v1765593275807!5m2!1sen!2sph" 
              className="w-full h-full border-0" 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Map Location"
            ></iframe>
          </motion.div>

          {/* Right Side: Contact Form */}
          <motion.div variants={itemVariants} className="bg-white p-8 md:p-10 rounded-3xl shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Send a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none"
                    placeholder="john@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none"
                  placeholder="Inquiry Topic"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none resize-none"
                  placeholder="How can we help you?"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || submitted}
                className={`
                  w-full py-4 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all duration-300
                  ${submitted ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/20'}
                  ${isSubmitting ? 'opacity-70 cursor-wait' : ''}
                `}
              >
                {isSubmitting ? 'Sending...' : submitted ? 'Message Sent!' : <>Send Message <Send size={18} /></>}
              </button>
            </form>
          </motion.div>
        </motion.div>

        {/* Bottom Section: Contact Information Cards */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {/* Card 1: Address */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-4">
              <MapPin size={24} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Address</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Herkings Corporation<br />
              Las Piñas City, Philippines
            </p>
          </div>

          {/* Card 2: Phone */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-green-600 mb-4">
              <Phone size={24} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Phone</h3>
            <div className="flex flex-col gap-1 text-sm">
              <a href="tel:+63XXXXXXXX" className="text-slate-600 hover:text-blue-600 transition">+63 (XXX) XXXX</a>
              <a href="tel:+63XXXXXXXX" className="text-slate-600 hover:text-blue-600 transition">+63 (XXX) XXXX</a>
            </div>
          </div>

          {/* Card 3: Email */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center text-red-600 mb-4">
              <Mail size={24} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Email</h3>
            <div className="flex flex-col gap-1 text-sm">
              <a href="mailto:info@pccilaspinas.org" className="text-slate-600 hover:text-blue-600 transition truncate">info@pccilaspinas.org</a>
            </div>
          </div>

          {/* Card 4: Hours */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center text-purple-600 mb-4">
              <Clock size={24} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Business Hours</h3>
            <p className="text-slate-600 text-sm">
              Mon - Fri: 9:00 AM - 5:00 PM<br />
              Sat - Sun: Closed
            </p>
          </div>

        </motion.div>

      </div>

      <Footer />
    </div>
  );
}