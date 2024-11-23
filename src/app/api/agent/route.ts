import { NextRequest } from 'next/server'

export const runtime = 'edge' // Required for WebSocket support

export async function GET(req: NextRequest) {
  const upgradeHeader = req.headers.get('Upgrade')
  if (upgradeHeader !== 'websocket') {
    return new Response('Expected websocket connection', { status: 426 })
  }

  try {
    const { socket, response } = Deno.upgradeWebSocket(req)

    socket.onopen = () => {
      console.log('WebSocket connection established')
    }

    socket.onmessage = async (event) => {
      try {
        const data = JSON.parse(event.data)
        
        // Handle different interaction types
        switch (data.type) {
          case 'response_required':
            // Handle agent response
            const response = {
              type: 'response',
              response: {
                type: 'text',
                text: 'Hello! How can I help you today?'
              }
            }
            socket.send(JSON.stringify(response))
            break

          case 'transcript':
            // Handle real-time transcript
            console.log('Transcript:', data.transcript)
            break

          case 'error':
            console.error('Retell error:', data.error)
            break

          default:
            console.log('Unhandled message type:', data.type)
        }
      } catch (error) {
        console.error('Error processing message:', error)
      }
    }

    socket.onerror = (error) => {
      console.error('WebSocket error:', error)
    }

    socket.onclose = () => {
      console.log('WebSocket connection closed')
    }

    return response

  } catch (error) {
    console.error('Error establishing WebSocket connection:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
} 