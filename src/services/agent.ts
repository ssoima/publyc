interface CreateAgentParams {
    name: string;
    voice: string;
}

export async function createAgent(params: CreateAgentParams) {
    // TODO: Create Retell agent
    // const agent = await retell.createAgent({
    //     name: params.name,
    //     voice: params.voice,
    //     // other parameters...
    // })
    console.log("Creating agent with params:", params)
    
    return {
        agent_id: 'MOCK_AGENT_ID'
    }
} 