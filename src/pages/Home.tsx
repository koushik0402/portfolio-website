import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-6">Welcome to My Portfolio</h1>
        <p className="text-xl text-gray-600 mb-8">
          I'm a passionate developer creating amazing web experiences.
        </p>
        <div className="space-x-4">
          <a
            href="/projects"
            className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700"
          >
            View Projects
          </a>
          <a
            href="/contact"
            className="inline-block bg-gray-200 text-gray-800 px-6 py-3 rounded-md hover:bg-gray-300"
          >
            Contact Me
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home; 