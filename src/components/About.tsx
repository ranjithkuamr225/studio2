import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Lightbulb, Target, Users } from 'lucide-react';

const values = [
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: 'Pushing boundaries with creative solutions',
  },
  {
    icon: Target,
    title: 'Excellence',
    description: 'Delivering quality in every project',
  },
  {
    icon: Users,
    title: 'Collaboration',
    description: 'Working together to achieve greatness',
  },
];

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="relative py-32 bg-black text-white overflow-hidden" id="about">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-[500px] h-[500px] -right-48 top-0 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute w-[500px] h-[500px] -left-48 bottom-0 bg-purple-500/5 rounded-full blur-3xl" />
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
              About Us
            </span>
          </motion.div>
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
            Crafting Digital Excellence
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            We are a creative studio passionate about bringing innovative ideas to life through design and technology.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-blue-500/0 to-blue-500/5 translate-y-3/4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-2xl" />
              <div className="relative p-8 rounded-2xl bg-gray-900/50 backdrop-blur-sm border border-gray-800 hover:border-gray-700 transition-colors duration-300">
                <div className="mb-4 relative">
                  <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full" />
                  <value.icon className="relative w-12 h-12 mx-auto text-blue-500" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">{value.title}</h3>
                <p className="text-gray-400 leading-relaxed">{value.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}