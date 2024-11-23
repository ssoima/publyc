export const RETELL_CONFIG = {
  API_KEY: process.env.RETELL_API_KEY!,
  AGENT_ID: process.env.RETELL_AGENT_ID!,
  WEBSOCKET_URL: process.env.RETELL_WEBSOCKET_URL!,
}

export interface RetellMessage {
  type: 'response_required' | 'transcript' | 'error';
  transcript?: string;
  error?: string;
}

export interface RetellResponse {
  type: 'response';
  response: {
    type: 'text';
    text: string;
  };
}

export class RetellAgent {
  private socket: WebSocket | null = null;

  constructor(private websocketUrl: string) {}

  connect() {
    this.socket = new WebSocket(this.websocketUrl);
    
    this.socket.onopen = () => {
      console.log('Connected to Retell agent');
    };

    this.socket.onclose = () => {
      console.log('Disconnected from Retell agent');
    };

    this.socket.onerror = (error) => {
      console.error('Retell WebSocket error:', error);
    };

    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }

  sendMessage(message: RetellResponse) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(message));
    } else {
      throw new Error('WebSocket is not connected');
    }
  }
} 