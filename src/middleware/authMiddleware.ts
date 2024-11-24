import { createClient } from '@/utils/supabase/server'
import { NextResponse, type NextRequest } from 'next/server'

export async function authMiddleware(request: NextRequest) {
    const supabase = await createClient()
    
    const { data: { user }, error } = await supabase.auth.getUser()
    
    if (error || !user) {
        return NextResponse.json(
            { error: 'Unauthorized' }, 
            { status: 401 }
        )
    }

    // Continue to the API route if authenticated
    return NextResponse.next()
} 