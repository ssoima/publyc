import { NextRequest, NextResponse } from 'next/server';
import { serialize } from 'cookie';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const state = searchParams.get('state');

    // Verify 'state' parameter to prevent CSRF attacks

    const clientId = process.env.LINKEDIN_CLIENT_ID as string;
    const clientSecret = process.env.LINKEDIN_CLIENT_SECRET as string;
    const redirectUri = `{HOSTNAME}/auth/linkedin/callback`;

    try {
        const response = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                grant_type: 'authorization_code',
                code: code as string,
                redirect_uri: redirectUri,
                client_id: clientId,
                client_secret: clientSecret,
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to fetch access token');
        }

        const data = await response.json();
        const { access_token, expires_in } = data;

        // Set the access token in a cookie
        const cookie = serialize('linkedin_access_token', access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: expires_in,
            path: '/',
        });

        const res = NextResponse.redirect('/');
        res.headers.set('Set-Cookie', cookie);
        return res;
    } catch (error) {
        console.error('Error exchanging code for access token:', error);
        return new NextResponse('Authentication failed', { status: 500 });
    }
}