import Retell from 'retell-sdk';

const client = new Retell({
  apiKey: process.env.RETELL_API_KEY || '' // Using environment variable for API key
});

interface CreateAgentParams {
    name: string;
    voice: string;
}

export async function createAgent(params: CreateAgentParams) {
    console.log("Creating agent")
    const agentResponse = await client.agent.create({
        response_engine: { 
            llm_id: 'llm_8d17bb56a2ba7c7143bbecddeb5f', 
            type: 'retell-llm' 
        },
        voice_id: '11labs-Adrian',
    });
    console.log("Agent created:", agentResponse)
    return {
        agent_id: agentResponse.agent_id
    }
} 