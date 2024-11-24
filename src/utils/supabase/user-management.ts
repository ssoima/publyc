import { SupabaseClient } from '@supabase/supabase-js'
import { Database } from '@/lib/database.types'
import { AgentContext } from '@/contexts/AgentContext'

export async function handleUserAgentConnection(
  supabase: SupabaseClient<Database>,
  userId: string,
  setAgentId?: (id: string | null) => void
) {
    console.log("checking if user_agent exists")

    // Check if connection exists
    const { data: existingConnection, error: fetchError } = await supabase
        .from('user_agent')
        .select('*')
        .eq('user_id', userId)
        .single()

    console.log("existingConnection", existingConnection)

    if (fetchError) {
        console.error('Error fetching user_agent:', fetchError)
    }

    if (!existingConnection) {
        console.log("no existing connection, creating new agent")
        try {
            // Create new agent via API
            const response = await fetch('/api/agent/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: 'New Agent',
                    voice: 'default'
                })
            })

            if (!response.ok) {
                throw new Error('Failed to create agent')
            }

            const { agent_id } = await response.json()

            // Update context if setAgentId is provided
            if (setAgentId) {
                setAgentId(agent_id)
            }

            // Create connection with new agent_id
            const { error: insertError } = await supabase
                .from('user_agent')
                .insert([
                    {
                        user_id: userId,
                        agent_id: agent_id
                    }
                ])
            
            if (insertError) {
                throw insertError
            }

            return { user_id: userId, agent_id: agent_id }
        } catch (error) {
            console.error('Error in handleUserAgentConnection:', error)
            throw error // Re-throw the error to be handled by the caller
        }
    }

    // Update context with existing agent if setAgentId is provided
    if (setAgentId && existingConnection) {
        setAgentId(existingConnection.agent_id)
    }

    return existingConnection
} 