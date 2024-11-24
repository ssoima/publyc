import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'
import { createAgent } from '@/services/agent'

export async function POST(request: Request) {
    const supabase = await createClient()
    
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
        return NextResponse.json(
            { error: 'Unauthorized' }, 
            { status: 401 }
        )
    }

    try {
        const body = await request.json()
        const result = await createAgent({
            name: body.name,
            voice: body.voice
        })
        
        return NextResponse.json({ 
            message: 'Agent created successfully',
            agent_id: result.agent_id
        })

    } catch (error) {
        console.error('Error creating agent:', error)
        return NextResponse.json(
            { error: 'Failed to create agent' }, 
            { status: 500 }
        )
    }
} 