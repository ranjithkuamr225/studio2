import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Dynamic background with multiple layers */}
      <div className="absolute inset-0 z-0">
        {/* Main creative workspace image with parallax effect */}
        <div 
          className="absolute inset-0 transform scale-105"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1600508774634-4e11d34730e2?auto=format&fit=crop&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.5)',
          }}
        >
          <motion.div 
            className="absolute inset-0"
            animate={{ 
              scale: [1, 1.05, 1],
              filter: ['brightness(0.5)', 'brightness(0.7)', 'brightness(0.5)']
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        </div>

        {/* Enhanced gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/80" />

        {/* Animated design elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating orbs */}
          <motion.div
            className="absolute -right-4 top-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
            animate={{
              y: [0, 50, 0],
              x: [0, 30, 0],
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
          <motion.div
            className="absolute -left-4 bottom-1/4 w-[30rem] h-[30rem] bg-purple-500/10 rounded-full blur-3xl"
            animate={{
              y: [0, -50, 0],
              x: [0, -30, 0],
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
          {/* Additional accent elements */}
          <motion.div
            className="absolute left-1/4 top-1/3 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        </div>
      </div>
      
      <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-8"
        >
          <motion.div
            className="inline-block"
            animate={{ rotate: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-sm font-semibold tracking-wider text-blue-400 uppercase bg-blue-500/10 px-4 py-2 rounded-full border border-blue-500/20">
              Welcome to Our Studio
            </span>
          </motion.div>
        </motion.div>

        <motion.h1 
          className="text-7xl md:text-8xl font-bold mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent">
            Creative Studio
          </span>
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl mb-12 text-gray-300 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          We craft extraordinary digital experiences that inspire, innovate, and leave a lasting impression
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link to="/portfolio">
            <motion.button
              className="group bg-gradient-to-r from-blue-600 to-blue-500 text-white px-8 py-4 rounded-full font-semibold flex items-center gap-2 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Our Work
              <motion.span
                className="inline-block"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.span>
            </motion.button>
          </Link>
          <motion.button
            className="px-8 py-4 rounded-full font-semibold flex items-center gap-2 bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10 transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Learn More
          </motion.button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2">
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-white"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}