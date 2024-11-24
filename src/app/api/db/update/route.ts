import { NextResponse } from 'next/server';
import type { TablesUpdate } from '@/lib/database.types';
import {createClient} from "@/utils/supabase/server";

export async function PUT(request: Request) {
  const supabase = await createClient()

  try {
    const { id, ...updateData } = await request.json() as TablesUpdate<'content_items'> & { id: string };
    
    if (!id) {
      return NextResponse.json(
        { error: 'ID is required for updating' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('content_items')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error updating content item:', error);
    return NextResponse.json(
      { error: 'Failed to update content item' },
      { status: 500 }
    );
  }
} 