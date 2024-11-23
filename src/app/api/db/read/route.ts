import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: Request) {
  try {
    // Get query parameters from URL
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const status = searchParams.get('status');
    const content_type = searchParams.get('content_type');

    let query = supabase
      .from('content_items')
      .select('*')
      .order('created_at', { ascending: false });

    // Add filters if they exist
    if (id) query = query.eq('id', id);
    if (status) query = query.eq('status', status);
    if (content_type) query = query.eq('content_type', content_type);

    const { data, error } = await query;

    if (error) throw error;
    
    return NextResponse.json({ content_items: data });
  } catch (error) {
    console.error('Error fetching content items:', error);
    return NextResponse.json(
      { error: 'Failed to fetch content items' },
      { status: 500 }
    );
  }
} 