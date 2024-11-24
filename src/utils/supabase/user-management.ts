import { SupabaseClient } from '@supabase/supabase-js'
import { Database } from '@/lib/database.types'

export async function handleUserCreation(
  supabase: SupabaseClient<Database>,
  user: {
    id: string
    email?: string
    user_metadata: {
      full_name?: string
      avatar_url?: string
      sub?: string  // LinkedIn's unique identifier
    }
  }
) {
  // Check if user exists in our users table
  const { data: existingUser, error: fetchError } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single()

  if (!existingUser && !fetchError) {
    // User doesn't exist in our table, create them
    const { error: insertError } = await supabase
      .from('users')
      .insert([
        {
          id: user.id,
          email: user.email,
          full_name: user.user_metadata.full_name,
          avatar_url: user.user_metadata.avatar_url,
          linkedin_id: user.user_metadata.sub
        }
      ])
    
    if (insertError) {
      console.error('Error creating user:', insertError)
      throw insertError
    }
  }

  return existingUser
} 