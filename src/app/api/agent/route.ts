import { NextRequest, NextResponse } from 'next/server'
import Retell from 'retell-sdk';

export async function POST(req: NextRequest) {
  const apiKey = process.env.RETELL_API_KEY;
  
  if (!apiKey) {
    console.error('RETELL_API_KEY is not defined in environment variables');
    return NextResponse.json(
      { error: 'Server configuration error' },
      { status: 500 }
    );
  }

  try {
    const client = new Retell({
      apiKey,
      fetch: fetch
    });

    const webCallResponse = await client.call.createWebCall({ 
      agent_id: 'agent_44d9118a49a822e22bfc1c2023' 
    });

    return NextResponse.json({ 
      accessToken: webCallResponse.access_token,
      callId: webCallResponse.call_id 
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Error creating call' },
      { status: 500 }
    );
  }
} 