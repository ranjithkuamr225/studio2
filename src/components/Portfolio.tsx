import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';
import { storage } from '../firebase/config';
import { ref as storageRef, listAll, getDownloadURL, StorageReference } from 'firebase/storage';

interface PortfolioImage {
  id: string;
  url: string;
  category: string;
  fileName: string;
}

export default function Portfolio() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [images, setImages] = useState<PortfolioImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        const categories = ['Wedding Photography', 'Birthday Photography', 'Fashion Photography', 'Nature Photography', 'Corporate Events'];
        let allImages: PortfolioImage[] = [];

        for (const category of categories) {
          const categoryRef: StorageReference = storageRef(storage, category);
          try {
            const result = await listAll(categoryRef);
            
            const categoryImages = await Promise.all(
              result.items.map(async (item) => {
                const url = await getDownloadURL(item);
                return {
                  id: item.fullPath,
                  url,
                  category,
                  fileName: item.name
                };
              })
            );
            
            allImages = [...allImages, ...categoryImages];
          } catch (error) {
            console.error(`Error fetching images for category ${category}:`, error);
            // Continue with other categories even if one fails
            continue;
          }
        }

        setImages(allImages);
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const categories = ['All', 'Wedding Photography', 'Birthday Photography', 'Fashion Photography', 'Nature Photography', 'Corporate Events'];

  const getFilteredPhotos = () => {
    if (selectedCategory === 'All') {
      return images;
    }
    return images.filter(image => image.category === selectedCategory);
  };

  return (
    <div className="min-h-screen bg-black text-white py-20">
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4"
      >
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
            Our Photography Portfolio
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Explore our diverse collection of professional photography across various categories
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-400">Loading images...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {getFilteredPhotos().map((photo, index) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="group relative aspect-square overflow-hidden rounded-lg"
              >
                <motion.img
                  src={photo.url}
                  alt={photo.fileName}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-semibold mb-2">{photo.category}</h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}