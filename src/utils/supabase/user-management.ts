import { SupabaseClient } from '@supabase/supabase-js'
import { Database } from '@/lib/database.types'
import { createAgent, createLLM } from '@/services/agent'

export async function handleUserAgentConnection(
  supabase: SupabaseClient<Database>,
  userId: string
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
            // Create new agent without passing supabase
            const { llm_id } = await createLLM()


            const { agent_id } = await createAgent({
                name: userId,
                llm_id: llm_id
            })

            // Create connection with new agent_id
            const { error: insertError } = await supabase
                .from('user_agent')
                .insert([
                    {
                        user_id: userId,
                        agent_id: agent_id,
                        llm_id: llm_id
                    }
                ])
            
            if (insertError) {
                throw insertError
            }

            return { user_id: userId, agent_id: agent_id }
        } catch (error) {
            console.error('Error in handleUserAgentConnection:', error)
            throw error
        }
    }

    return existingConnection
} 