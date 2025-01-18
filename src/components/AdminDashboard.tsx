import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Upload, Image as ImageIcon, MessageSquare } from 'lucide-react';
import { storage } from '../firebase/config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

interface ImageUpload {
  file: File;
  category: string;
  preview: string;
}

interface ContactMessage {
  id: number;
  name: string;
  email: string;
  message: string;
  date: string;
}

export default function AdminDashboard() {
  const [uploads, setUploads] = useState<ImageUpload[]>([]);
  const [activeTab, setActiveTab] = useState<'uploads' | 'messages'>('uploads');
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  
  const categories = ['Wedding Photography', 'Birthday Photography', 'Fashion Photography', 'Nature Photography', 'Corporate Events'];

  useEffect(() => {
    // Load messages from localStorage
    const storedMessages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
    setMessages(storedMessages);
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>, category: string) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setUploads(prev => [...prev, {
            file,
            category,
            preview: reader.result as string
          }]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleUpload = async () => {
    try {
      setIsUploading(true);
      const uploadPromises = uploads.map(async (upload) => {
        const timestamp = Date.now();
        const fileName = `${upload.category}/${timestamp}_${upload.file.name}`;
        const storageRef = ref(storage, fileName);
        
        // Upload the file
        const snapshot = await uploadBytes(storageRef, upload.file);
        
        // Get the download URL
        const downloadURL = await getDownloadURL(snapshot.ref);
        
        // Save the image metadata to localStorage
        const imageData = {
          url: downloadURL,
          category: upload.category,
          timestamp,
          fileName: upload.file.name
        };
        
        const storedImages = JSON.parse(localStorage.getItem('portfolioImages') || '[]');
        localStorage.setItem('portfolioImages', JSON.stringify([...storedImages, imageData]));
        
        return downloadURL;
      });

      await Promise.all(uploadPromises);
      alert('Images uploaded successfully!');
      setUploads([]);
    } catch (error) {
      console.error('Error uploading images:', error);
      alert('Error uploading images. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const deleteMessage = (id: number) => {
    const updatedMessages = messages.filter(msg => msg.id !== id);
    setMessages(updatedMessages);
    localStorage.setItem('contactMessages', JSON.stringify(updatedMessages));
  };

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-900/50 rounded-2xl p-8 backdrop-blur-lg border border-gray-800"
        >
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
            <div className="flex gap-4">
              <button
                onClick={() => setActiveTab('uploads')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'uploads'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                Portfolio Uploads
              </button>
              <button
                onClick={() => setActiveTab('messages')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'messages'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                Messages
              </button>
            </div>
          </div>

          {activeTab === 'uploads' ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {categories.map((category) => (
                  <motion.div
                    key={category}
                    className="relative group"
                    whileHover={{ scale: 1.02 }}
                  >
                    <label className="block p-6 rounded-xl border-2 border-dashed border-gray-700 hover:border-blue-500 transition-colors cursor-pointer bg-gray-800/50">
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileSelect(e, category)}
                      />
                      <div className="text-center">
                        <ImageIcon className="mx-auto h-12 w-12 text-gray-400 group-hover:text-blue-500 transition-colors" />
                        <span className="mt-2 block text-sm font-medium text-gray-300">
                          Upload {category} Images
                        </span>
                      </div>
                    </label>
                  </motion.div>
                ))}
              </div>

              {uploads.length > 0 && (
                <div className="mt-8">
                  <h2 className="text-xl font-semibold text-white mb-4">Selected Images</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {uploads.map((upload, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={upload.preview}
                          alt={`Upload ${index + 1}`}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                          <span className="text-white text-sm">{upload.category}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleUpload}
                    disabled={isUploading}
                    className={`mt-6 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg ${
                      isUploading 
                        ? 'opacity-50 cursor-not-allowed' 
                        : 'hover:from-blue-700 hover:to-blue-600'
                    }`}
                  >
                    <Upload className="w-5 h-5" />
                    {isUploading ? 'Uploading...' : 'Upload All Images'}
                  </motion.button>
                </div>
              )}
            </>
          ) : (
            <div className="space-y-4">
              {messages.length === 0 ? (
                <p className="text-gray-400 text-center py-8">No messages yet</p>
              ) : (
                messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gray-800/50 p-6 rounded-lg border border-gray-700"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-white">{message.name}</h3>
                        <p className="text-gray-400">{message.email}</p>
                      </div>
                      <button
                        onClick={() => deleteMessage(message.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                    <p className="text-gray-300 mb-2">{message.message}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(message.date).toLocaleString()}
                    </p>
                  </motion.div>
                ))
              )}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}