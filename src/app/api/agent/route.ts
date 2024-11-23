import { NextRequest } from 'next/server'
import Retell from 'retell-sdk';

export const runtime = 'edge'

export async function POST(req: Request) {
  const apiKey = process.env.RETELL_API_KEY;
  
  if (!apiKey) {
    console.error('RETELL_API_KEY is not defined in environment variables');
    return new Response('Server configuration error', { status: 500 });
  }

  try {
    const client = new Retell({
      apiKey,
    });

    const webCallResponse = await client.call.createWebCall({ 
      agent_id: 'agent_44d9118a49a822e22bfc1c2023' 
    });

    return Response.json({ 
      accessToken: webCallResponse.access_token,
      callId: webCallResponse.call_id 
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response('Error creating call', { status: 500 });
  }
} 