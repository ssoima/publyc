'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface AnimatedAgentProps {
  isSpeaking: boolean
}

export const AnimatedAgent: React.FC<AnimatedAgentProps> = ({ isSpeaking }) => {
  const [rotation, setRotation] = useState(0)

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isSpeaking) {
      interval = setInterval(() => {
        setRotation((prev) => (prev + 10) % 360)
      }, 100)
    }
    
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isSpeaking])

  return (
    <div className="relative w-48 h-48 md:w-64 md:h-64">
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-[#2D12E9] to-[#000000] rounded-full"
        animate={{
          scale: isSpeaking ? [1, 1.2, 1] : 1,
        }}
        transition={{
          duration: 1,
          repeat: isSpeaking ? Infinity : 0,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute inset-2 bg-[#FFFBF0] dark:bg-black rounded-full flex items-center justify-center"
        animate={{
          rotate: isSpeaking ? 360 : 0
        }}
        transition={{
          duration: 2,
          repeat: isSpeaking ? Infinity : 0,
          ease: "linear"
        }}
      >
        <motion.div
          className="w-16 h-16 md:w-24 md:h-24 border-4 border-[#2D12E9] rounded-full"
          animate={{
            scale: isSpeaking ? [1, 1.3, 1] : 1,
          }}
          transition={{
            duration: 0.5,
            repeat: isSpeaking ? Infinity : 0,
            repeatType: "reverse",
          }}
        />
      </motion.div>
    </div>
  )
}

