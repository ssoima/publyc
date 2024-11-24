import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    const supabase = await createClient()
    
    // Get the authenticated user from the session
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
        return NextResponse.json(
            { error: 'Unauthorized' }, 
            { status: 401 }
        )
    }

    try {
        // Get request body
        const body = await request.json()
        
        // TODO: Create Retell agent
        // const agent = await retell.createAgent({
        //     name: body.name,
        //     voice: body.voice,
        //     // other parameters...
        // })

        // Update user with new agent_id
        const { error: updateError } = await supabase
            .from('users')
            .update({ 
                agent_id: 'MOCK_AGENT_ID' // This would be agent.id from Retell
            })
            .eq('id', user.id)

        if (updateError) {
            throw updateError
        }

        return NextResponse.json({ 
            message: 'Agent created successfully',
            agent_id: 'MOCK_AGENT_ID'
        })

    } catch (error) {
        console.error('Error creating agent:', error)
        return NextResponse.json(
            { error: 'Failed to create agent' }, 
            { status: 500 }
        )
    }
} 