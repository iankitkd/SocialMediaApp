export interface Message {
  _id: string;
  content: string;
  senderId: string;
  conversationId: string;
  createdAt: Date;
  type?: 'message' | 'system';
}