import { User } from "./user";

export interface Message {
  _id: string;
  content: string;
  senderId: string;
  conversationId: string;
  createdAt: Date;
  type?: 'message' | 'system';
}

export interface Conversation {
  _id: string;
  participants: User[];
  lastMessage: Message;
}