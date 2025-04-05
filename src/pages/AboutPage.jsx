import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <div className="text-5xl mb-4">🚀</div>
          <h1 className="text-4xl font-bold mb-4">About Our Project</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Learn more about our vision, mission, and the team behind this platform.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-xl shadow-md overflow-hidden mb-10"
          >
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
              <p className="text-gray-700 mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget
                ultricies tincidunt, nunc nisl aliquam nisl, eget aliquam nisl nunc vel nisl.
                Donec euismod, nisl eget ultricies tincidunt, nunc nisl aliquam nisl, eget
                aliquam nisl nunc vel nisl. Nullam auctor, nisl eget ultricies tincidunt.
              </p>
              <p className="text-gray-700">
                Praesent et lacinia quam, vel ullamcorper dui. Aliquam eu neque vitae justo 
                vulputate tincidunt. Curabitur vel facilisis nisl, non feugiat enim. Nunc 
                facilisis vestibulum turpis, id tempor neque finibus ut.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-xl shadow-md overflow-hidden mb-10"
          >
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-gray-700 mb-4">
                Fusce consequat ante ac arcu ultrices, vel scelerisque enim faucibus. Vivamus 
                porttitor, magna in tincidunt lacinia, ipsum purus mollis lacus, non tincidunt 
                ligula ipsum ac elit. Phasellus mattis ipsum at molestie gravida. Integer 
                consequat mauris vel est sollicitudin varius.
              </p>
              <p className="text-gray-700">
                Etiam scelerisque ultrices velit, id convallis massa bibendum ut. Donec 
                consectetur hendrerit tristique. Maecenas vel condimentum magna. In hac 
                habitasse platea dictumst. Nulla facilisi. Mauris vel mauris in dolor 
                efficitur eleifend at in magna.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-white rounded-xl shadow-md overflow-hidden mb-10"
          >
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-4">Our Technology</h2>
              <p className="text-gray-700 mb-4">
                Suspendisse potenti. Suspendisse eu odio non nisi condimentum rhoncus. 
                Praesent dignissim tortor ac orci tempus lacinia. Vivamus vel tristique 
                sem, vitae varius purus. Quisque euismod nibh ac dui hendrerit, vel 
                pellentesque magna dignissim.
              </p>
              <p className="text-gray-700">
                Integer at mauris vitae lorem suscipit dapibus. Duis fermentum odio eget 
                metus interdum, eget tincidunt massa tempus. Vivamus ultrices odio at lacus 
                dignissim, eget finibus turpis condimentum. Proin scelerisque dignissim 
                ligula, eget euismod justo maximus eu.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="bg-white rounded-xl shadow-md overflow-hidden"
          >
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-4">Meet The Team</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                <div className="text-center">
                  <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-4xl">👨‍💻</span>
                  </div>
                  <h3 className="font-bold text-lg">John Doe</h3>
                  <p className="text-gray-600">Lead Developer</p>
                </div>
                <div className="text-center">
                  <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-4xl">👩‍💼</span>
                  </div>
                  <h3 className="font-bold text-lg">Jane Smith</h3>
                  <p className="text-gray-600">Project Manager</p>
                </div>
                <div className="text-center">
                  <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-4xl">👨‍🎨</span>
                  </div>
                  <h3 className="font-bold text-lg">Mike Johnson</h3>
                  <p className="text-gray-600">UI/UX Designer</p>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="mt-12 text-center">
            <Link
              to="/"
              className="inline-block bg-cyan-500 hover:bg-cyan-600 text-white font-medium py-3 px-6 rounded-lg transition duration-300"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;