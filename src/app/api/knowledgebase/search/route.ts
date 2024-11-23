import { NextResponse } from 'next/server';
import { generateEmbedding } from '@/lib/embeddings';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const { query } = await request.json();
    
    if (!query) {
      return NextResponse.json(
        { error: 'Query is required' },
        { status: 400 }
      );
    }

    const queryEmbedding = await generateEmbedding(query);
    
    const { data, error } = await supabase.rpc('match_entries', {
      query_embedding: JSON.stringify(queryEmbedding),
      match_threshold: 0.7,
      match_count: 5,
    });

    if (error) throw error;
    
    return NextResponse.json({ results: data });
  } catch (error) {
    console.error('Error searching entries:', error);
    return NextResponse.json(
      { error: 'Failed to search entries' },
      { status: 500 }
    );
  }
} 