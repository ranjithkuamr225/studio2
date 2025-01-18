import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Store in localStorage for demo purposes
    const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
    messages.push({
      ...formData,
      id: Date.now(),
      date: new Date().toISOString()
    });
    localStorage.setItem('contactMessages', JSON.stringify(messages));
    
    // Reset form
    setFormData({ name: '', email: '', message: '' });
    alert('Message sent successfully!');
  };

  return (
    <section className="relative py-32 bg-black" id="contact">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-[500px] h-[500px] -left-48 top-0 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute w-[500px] h-[500px] -right-48 bottom-0 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-block mb-4"
          >
            <span className="text-sm font-semibold tracking-wider text-blue-400 uppercase bg-blue-500/10 px-4 py-2 rounded-full border border-blue-500/20">
              Contact Us
            </span>
          </motion.div>
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
            Get in Touch
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Let's discuss your next project and bring your vision to life
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="relative group">
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-500 transition-all duration-300 group-hover:border-gray-700"
                  placeholder="Your name"
                  required
                />
              </div>
              <div className="relative group">
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-500 transition-all duration-300 group-hover:border-gray-700"
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div className="relative group">
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-500 transition-all duration-300 group-hover:border-gray-700"
                  placeholder="Your message"
                  required
                ></textarea>
              </div>
              <motion.button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-4 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Send Message
                <Send className="w-4 h-4" />
              </motion.button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {[
              { icon: Mail, title: 'Email Us', content: 'ranjithkumarswami@gmail.com' },
              { icon: Phone, title: 'Call Us', content: '+91 77021 09787' },
              { icon: MapPin, title: 'Visit Us', content: '123 Creative Street\nDesign District, NY 10001' }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="group flex items-start space-x-4 p-6 rounded-2xl bg-gray-900/50 backdrop-blur-sm border border-gray-800 hover:border-gray-700 transition-all duration-300"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full" />
                  <item.icon className="relative w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2 text-white">{item.title}</h3>
                  <p className="text-gray-400 whitespace-pre-line">{item.content}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}