
export interface GameServer {
  id: string;
  name: string;
  ip: string;
  port: number;
  game: string;
  map: string;
  players: number;
  maxPlayers: number;
  votes: number;
  status: 'online' | 'offline';
  lastUpdated: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  role: 'user' | 'admin';
  lastVotedAt?: Date;
}

export interface Ticket {
  id: string;
  userId: string;
  subject: string;
  category: 'Technical' | 'Billing' | 'Abuse' | 'General';
  status: 'Open' | 'Responded' | 'Closed';
  createdAt: Date;
  lastUpdate: Date;
}

export interface TicketReply {
  id: string;
  ticketId: string;
  userId: string;
  message: string;
  isAdmin: boolean;
  createdAt: Date;
}

export interface Partner {
  id: string;
  name: string;
  imageUrl: string;
  link: string;
}
