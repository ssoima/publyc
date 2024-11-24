import { SupabaseClient } from '@supabase/supabase-js'
import { Database } from '@/lib/database.types'

export async function handleUserAgentConnection(
  supabase: SupabaseClient<Database>,
  userId: string,
  agentId: string
) {
    console.log("checking if user_agent exists")

    // Check if connection exists
    const { data: existingConnection, error: fetchError } = await supabase
        .from('user_agent')
        .select('*')
        .eq('user_id', userId)
        .eq('agent_id', agentId)
        .single()

    if (!existingConnection && !fetchError) {
        // Create new agent via API
        const response = await fetch('/api/agent/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: 'New Agent', // You might want to pass this as a parameter
            voice: 'default'   // You might want to pass this as a parameter
        })
        })

        if (!response.ok) {
        throw new Error('Failed to create agent')
        }

        const { agent_id } = await response.json()

        // Create connection with new agent_id
        const { error: insertError } = await supabase
        .from('user_agent')
        .insert([
            {
            user_id: userId,
            agent_id: agent_id // Use the newly created agent_id
            }
        ])
        
        if (insertError) {
        console.error('Error creating user-agent connection:', insertError)
        throw insertError
        }

        return { user_id: userId, agent_id: agent_id }
    }

    return existingConnection
} 