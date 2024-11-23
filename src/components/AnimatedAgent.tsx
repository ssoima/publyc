'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { RetellWebClient } from "retell-client-js-sdk";

interface AnimatedAgentProps {
  isSpeaking: boolean
  token: string
}

export const AnimatedAgent: React.FC<AnimatedAgentProps> = ({ isSpeaking }) => {
  const retellClientRef = useRef<RetellWebClient | null>(null);
  const [rotation, setRotation] = useState(0);
  const [devices, setDevices] = useState<{ audio: MediaDeviceInfo[] }>({ audio: [] });
  const [token, setToken] = useState('');

  // Get available audio devices
  useEffect(() => {
    async function getAudioDevices() {
      try {
        // Request permission to use microphone
        await navigator.mediaDevices.getUserMedia({ audio: true });
        
        // Get list of audio devices
        const devices = await navigator.mediaDevices.enumerateDevices();
        const audioDevices = devices.filter(device => device.kind === 'audioinput');
        setDevices({ audio: audioDevices });
      } catch (error) {
        console.error("Error accessing audio devices:", error);
      }
    }

    getAudioDevices();
  }, []);

  // Update the token fetch useEffect
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await fetch('/api/agent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        console.log('token', data.accessToken)
        setToken(data.accessToken);
      } catch (error) {
        console.error("Failed to fetch token:", error);
      }
    };

    if (isSpeaking) {
      fetchToken();
    }
  }, [isSpeaking]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    const setupRetellCall = async () => {
      try {
        // Initialize the client if not already done
        if (!retellClientRef.current) {
          retellClientRef.current = new RetellWebClient();
          
          // Set up event listeners
          retellClientRef.current.on("call_started", () => {
            console.log("🎤 Call started");
          });

          retellClientRef.current.on("call_ended", () => {
            console.log("📞 Call ended");
          });

          retellClientRef.current.on("agent_start_talking", () => {
            console.log("🗣️ Agent started talking");
          });

          retellClientRef.current.on("agent_stop_talking", () => {
            console.log("🤐 Agent stopped talking");
          });

          retellClientRef.current.on("error", (error) => {
            console.error("❌ An error occurred:", error);
            retellClientRef.current?.stopCall();
          });

          // Add transcript handling
          retellClientRef.current.on("update", (update) => {
            if (update.transcript) {
              console.log("📝 Transcript:", update.transcript);
            }
          });
        }

        // Get default audio device
        const defaultAudioDevice = devices.audio[0]?.deviceId || 'default';

        // Start the call with audio configuration
        await retellClientRef.current.startCall({
          accessToken: token,
          sampleRate: 24000, // Standard sample rate for good quality
          captureDeviceId: defaultAudioDevice, // Microphone input
          playbackDeviceId: 'default', // Speaker output
          emitRawAudioSamples: false, // Set to true if you need raw audio data
        });

      } catch (error) {
        console.error("Failed to setup Retell call:", error);
      }
    };

    if (isSpeaking && devices.audio.length > 0) {
      console.log('🎤 isSpeaking activated, initiating call...');
      setupRetellCall();
      
      interval = setInterval(() => {
        setRotation((prev) => (prev + 10) % 360);
      }, 100);
    } else if (!isSpeaking && retellClientRef.current) {
      console.log('📞 isSpeaking deactivated, stopping call...');
      retellClientRef.current.stopCall();
      retellClientRef.current = null;
    }

    return () => {
      if (interval) clearInterval(interval);
      if (retellClientRef.current && !isSpeaking) {
        console.log('🧹 Cleanup: Stopping Retell call');
        retellClientRef.current.stopCall();
        retellClientRef.current = null;
      }
    };
  }, [token, devices.audio, isSpeaking]);

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

