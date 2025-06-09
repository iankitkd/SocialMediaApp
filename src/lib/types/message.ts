export interface Message {
  _id: string;
  content: string;
  senderId: string;
  receiverId: string;
  createdAt: Date;
  type?: 'message' | 'system';
}