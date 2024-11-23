import { useEffect, useRef } from 'react'
import { RetellAgent } from '@/lib/retell'

export function useRetellAgent() {
  const agentRef = useRef<RetellAgent | null>(null)

  useEffect(() => {
    // Initialize the agent
    const agent = new RetellAgent(process.env.NEXT_PUBLIC_RETELL_WEBSOCKET_URL!)
    agentRef.current = agent

    // Connect to the agent
    agent.connect()

    // Cleanup on unmount
    return () => {
      if (agentRef.current) {
        agentRef.current.disconnect()
      }
    }
  }, [])

  return agentRef.current
} 