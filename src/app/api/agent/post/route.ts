import { NextRequest, NextResponse } from 'next/server'
import Retell from 'retell-sdk';
import { getPostTitleAndContent } from '@/lib/anthropic';
import { supabase } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  const apiKey = process.env.RETELL_API_KEY;
  
  if (!apiKey) {
    console.error('Missing required environment variables');
    return NextResponse.json(
      { error: 'Server configuration error' },
      { status: 500 }
    );
  }

  try {
    // Get call_id from request body
    const { call_id } = await req.json();
    
    if (!call_id) {
      return NextResponse.json(
        { error: 'call_id is required' },
        { status: 400 }
      );
    }

    const client = new Retell({
      apiKey,
      fetch: fetch
    });

    const callResponse = await client.call.retrieve(call_id);
    const transcript = callResponse.transcript;

    if (!transcript) {
      return NextResponse.json(
        { error: 'No call data found' },
        { status: 404 }
      );
    }

    // Generate title and content using Anthropic
    const { title, content } = await getPostTitleAndContent(transcript, "");

    // Store in Supabase
    const { data, error } = await supabase
      .from('content_items')
      .insert({
        title,
        details: content,
        content_type: 'post',
        status: 'draft'
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ 
      success: true,
      data: {
        id: data.id,
        title: data.title,
        details: data.details
      }
    });

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Error processing call data' },
      { status: 500 }
    );
  }
}
