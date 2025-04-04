import React from 'react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-lg font-semibold mb-4"
            >
              Contact
            </motion.h3>
            <p className="text-gray-300">Email: koushik.yadav@example.com</p>
            <p className="text-gray-300">Phone: +91 1234567890</p>
          </div>
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg font-semibold mb-4"
            >
              Social Links
            </motion.h3>
            <div className="flex space-x-4">
              <a href="https://github.com" className="text-gray-300 hover:text-white">
                GitHub
              </a>
              <a href="https://linkedin.com" className="text-gray-300 hover:text-white">
                LinkedIn
              </a>
              <a href="https://twitter.com" className="text-gray-300 hover:text-white">
                Twitter
              </a>
            </div>
          </div>
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg font-semibold mb-4"
            >
              Quick Links
            </motion.h3>
            <ul className="space-y-2">
              <li>
                <a href="/projects" className="text-gray-300 hover:text-white">
                  Projects
                </a>
              </li>
              <li>
                <a href="/blog" className="text-gray-300 hover:text-white">
                  Blog
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-300 hover:text-white">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-300"
        >
          <p>&copy; {new Date().getFullYear()} Koushik Yadav. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer; 