import { NextResponse } from 'next/server';
import { generateEmbedding } from '@/lib/embeddings';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
    try {
        const data = await request.json();

        console.log(data);
/*
        if (!title || !content || !category) {
            return NextResponse.json(
                { error: 'Title, content, and category are required' },
                { status: 400 }
            );
        }

        const { error } = await supabase
            .from('entries')
            .insert([
                {
                    title: title as string,
                    content: content as string,
                    category: category as string,
                    embedding: JSON.stringify(embedding),
                },
            ]);

        if (error) throw error;
*/
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error adding entry:', error);
        return NextResponse.json(
            { error: 'Failed to add entry' },
            { status: 500 }
        );
    }
}