import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import type { TablesInsert } from '@/lib/database.types';

export async function POST(request: Request) {
  try {
    const contentItem = await request.json() as TablesInsert<'content_items'>;
    
    if (!contentItem.title || !contentItem.details || !contentItem.content_type) {
      return NextResponse.json(
        { error: 'Title, details, and content_type are required' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('content_items')
      .insert([contentItem])
      .select()
      .single();

    if (error) throw error;
    
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error creating content item:', error);
    return NextResponse.json(
      { error: 'Failed to create content item' },
      { status: 500 }
    );
  }
} 