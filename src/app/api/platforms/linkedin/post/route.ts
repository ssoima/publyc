import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { parse } from 'cookie';

const POSTS_API_URL = 'https://api.linkedin.com/rest/posts';

export async function POST(req: NextRequest) {
    try {
        const cookies = parse(req.headers.get('cookie') || '');
        console.log('THE cookies ARE:', cookies);

        const supabase = createClient();

        const body = await req.json();
        const { postContent } = body;

        if (!postContent) {
            return NextResponse.json({ error: 'Post content is required.' }, { status: 400 });
        }

        const user: any = ''; // Fetch or mock your user object accordingly

        // Extract the access token and provider ID from the user object
        const accessToken = user?.app_metadata?.access_token; // Adjust based on your storage
        const providerId = user?.user_metadata?.provider_id; // LinkedIn user ID

        if (!accessToken || !providerId) {
            return NextResponse.json({ error: 'Missing access token or provider ID.' }, { status: 403 });
        }

        // Construct the post payload
        const postPayload = {
            author: `urn:li:person:${providerId}`, // Use the LinkedIn user ID
            commentary: postContent, // Content of the post
            visibility: 'PUBLIC',
            lifecycleState: 'PUBLISHED',
            distribution: {
                feedDistribution: 'MAIN_FEED',
            },
        };

        // Make the POST request to LinkedIn's API
        const response = await fetch(POSTS_API_URL, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'LinkedIn-Version': '202401',
                'X-RestLi-Protocol-Version': '2.0.0',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postPayload),
        });

        if (!response.ok) {
            const errorDetails = await response.json();
            throw new Error(
                `Failed to create post. Status: ${response.status}, Details: ${JSON.stringify(errorDetails)}`
            );
        }

        const postDetails = await response.json();

        // Respond with success and post details
        return NextResponse.json({
            message: 'Post created successfully.',
            postDetails,
        });
    } catch (error: any) {
        console.error('Error creating LinkedIn post:', error.message);
        return NextResponse.json(
            { error: 'Failed to create LinkedIn post.', details: error.message },
            { status: 500 }
        );
    }
}

export function GET() {
    return NextResponse.json({ error: 'Method not allowed. Use POST.' }, { status: 405 });
}git