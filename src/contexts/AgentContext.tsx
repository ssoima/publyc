'use client'

import { createContext, useContext, useEffect, useState } from 'react';

export const AgentContext = createContext<{ 
  agentId: string | null;
  setAgentId: (id: string | null) => void;
}>({ 
  agentId: null,
  setAgentId: () => {} 
});

export function AgentProvider({ children }: { children: React.ReactNode }) {
    const [agentId, setAgentId] = useState<string | null>(null);

    return (
        <AgentContext.Provider value={{ agentId, setAgentId }}>
            {children}
        </AgentContext.Provider>
    );
}

export const useAgent = () => useContext(AgentContext); 