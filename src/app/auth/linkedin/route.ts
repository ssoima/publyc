import { NextRequest, NextResponse } from 'next/server';
import {HOSTNAME} from "@/utils/constants";

export async function GET(request: NextRequest) {
    const clientId = process.env.LINKEDIN_CLIENT_ID as string;
    const redirectUri = encodeURIComponent(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/linkedin/callback`);
    const state = 'random_string'; // Replace with a secure random string
    const scope = encodeURIComponent('liteprofile emailaddress w_member_social');

    const authorizationUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}&scope=${scope}`;

    return NextResponse.redirect(authorizationUrl);
}