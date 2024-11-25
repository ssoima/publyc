'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function InfoIcon() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 inline-flex flex-col items-center">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="mb-4 w-72 rounded-lg bg-white p-4 shadow-lg"
            role="tooltip"
          >
            <div className="space-y-3">
              <p className="text-[15px] text-gray-700">
                Click on the black logo in the middle to start/stop talking.
              </p>
              <p className="text-[15px] text-gray-700">
                Per default, your conversation will be saved to the knowledge base.
              </p>
              <p className="text-[15px] text-gray-700">
              If you want to directly create a new post, mention that in your message.              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gray-100 p-3 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-gray-600"
        >
          <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
          <path d="M9 18h6" />
          <path d="M10 22h4" />
        </svg>
        <span className="sr-only">Toggle information</span>
      </button>
    </div>
  )
}

