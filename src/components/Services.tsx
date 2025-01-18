import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Palette, Code, Camera, Megaphone } from 'lucide-react';

const services = [
  {
    icon: Palette,
    title: 'Design',
    description: 'Beautiful and functional designs that captivate your audience',
    gradient: 'from-blue-500 to-purple-500',
  },
  {
    icon: Code,
    title: 'Development',
    description: 'Custom web solutions built with cutting-edge technologies',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    icon: Camera,
    title: 'Photography',
    description: 'Professional photography that tells your story',
    gradient: 'from-pink-500 to-red-500',
  },
  {
    icon: Megaphone,
    title: 'Marketing',
    description: 'Strategic marketing campaigns that drive results',
    gradient: 'from-red-500 to-orange-500',
  },
];

export default function Services() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="relative py-32 bg-gray-900" id="services">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-full h-1/2 bg-gradient-to-b from-black to-transparent" />
        <div className="absolute w-full h-1/2 bottom-0 bg-gradient-to-t from-black to-transparent" />
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
              Our Services
            </span>
          </motion.div>
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
            What We Offer
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            We offer a comprehensive range of creative services to help your business grow and succeed in the digital age
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group relative"
            >
              <div className={`absolute inset-0 bg-gradient-to-b ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl`} />
              <div className="relative p-8 rounded-2xl bg-black/50 backdrop-blur-sm border border-gray-800 hover:border-gray-700 transition-all duration-300 hover:transform hover:-translate-y-2">
                <div className="mb-6 relative">
                  <div className={`absolute inset-0 bg-gradient-to-r ${service.gradient} opacity-20 blur-xl rounded-full`} />
                  <service.icon className="relative w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-white">{service.title}</h3>
                <p className="text-gray-400 leading-relaxed">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}